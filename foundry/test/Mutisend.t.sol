// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Multisend} from "../src/Multisend.sol";

contract MultisendTest is Test {
    Multisend public multisend;

    function setUp() public {
        multisend = new Multisend();
    }

    function test_send() public {
        address payable;
        uint;
        recipients[0] = payable(0xCb01159FF27299fd3c41E8190952D0253E1D1fBB);
        recipients[1] = payable(0x3AaC212445AdAAbD411433556F75e3A91A259747);
        amounts[0] = 50;
        amounts[1] = 100;

        // Send funds
        multisend.send{value: 150}(recipients, amounts);

        // Check balances
        assertEq(address(recipients[0]).balance, amounts[0]);
        assertEq(address(recipients[1]).balance, amounts[1]);
    }

    function test_pause() public {
        multisend.pause();
        address payable;
        uint;
        recipients[0] = payable(0xCb01159FF27299fd3c41E8190952D0253E1D1fBB);
        amounts[0] = 50;

        // Attempting to send while paused should revert
        vm.expectRevert("Pausable: paused");
        multisend.send{value: 50}(recipients, amounts);
    }

    function test_unpause() public {
        multisend.pause();
        multisend.unpause();
        address payable;
        uint;
        recipients[0] = payable(0xCb01159FF27299fd3c41E8190952D0253E1D1fBB);
        amounts[0] = 50;

        // Should work after unpausing
        multisend.send{value: 50}(recipients, amounts);
    }

    function test_revertOnMismatchedArrays() public {
        address payable;
        uint;
        recipients[0] = payable(0xCb01159FF27299fd3c41E8190952D0253E1D1fBB);
        recipients[1] = payable(0x3AaC212445AdAAbD411433556F75e3A91A259747);

        // Expect revert due to mismatched arrays
        vm.expectRevert("Recipients and Amounts should have same length");
        multisend.send{value: 100}(recipients, amounts);
    }

    function test_revertOnInsufficientFunds() public {
        address payable;
        uint;
        recipients[0] = payable(0xCb01159FF27299fd3c41E8190952D0253E1D1fBB);
        recipients[1] = payable(0x3AaC212445AdAAbD411433556F75e3A91A259747);
        amounts[0] = 50;
        amounts[1] = 100;

        // Expect revert due to insufficient funds
        vm.expectRevert("Insufficient funds sent");
        multisend.send{value: 120}(recipients, amounts);
    }
}

