// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

// Importing ReentrancyGuard from OpenZeppelin to prevent reentrancy attacks
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Multisend is ReentrancyGuard {
    // Events to log successful and failed payments
    event PaymentSent(address indexed recipient, uint256 amount);
    event PaymentFailed(address indexed recipient, uint256 amount);

    /**
     * @dev Function to send Ether to multiple recipients in a single transaction
     * @param recipients Array of recipient addresses
     * @param amounts Array of Ether amounts to be sent to each recipient
     * The function ensures:
     * - The recipients and amounts arrays have the same length
     * - The sender has provided sufficient Ether
     * - If a transaction fails, it is logged
     */
    function send(
        address payable[] calldata recipients,
        uint256[] calldata amounts
    ) external payable nonReentrant {
        // Ensure the recipients and amounts arrays have the same length
        require(
            recipients.length == amounts.length,
            "Recipients and Amounts must have the same length"
        );

        uint256 totalAmount = 0;

        // Calculate the total amount to be sent
        for (uint256 i = 0; i < amounts.length; i++) {
            totalAmount += amounts[i];
        }

        // Ensure the sender has provided enough Ether for the total amount
        require(
            totalAmount <= msg.value,
            "Insufficient Ether sent for the total amount"
        );

        // Iterate through each recipient and send the corresponding amount
        for (uint256 i = 0; i < recipients.length; i++) {
            (bool success, ) = recipients[i].call{value: amounts[i]}("");
            if (success) {
                // Emit an event if the payment is successful
                emit PaymentSent(recipients[i], amounts[i]);
            } else {
                // Emit an event if the payment fails
                emit PaymentFailed(recipients[i], amounts[i]);
            }
        }

        // Calculate any leftover Ether and refund it to the sender
        uint256 leftover = msg.value - totalAmount;
        if (leftover > 0) {
            (bool refundSuccess, ) = payable(msg.sender).call{value: leftover}("");
            require(refundSuccess, "Refund failed");
        }
    }
}
