'use client';

import { useState } from 'react';
import { Importer, ImporterField } from 'react-csv-importer';
import { ethers, Contract } from 'ethers';
import { Box } from '@mui/material';
import multisendJson from "./multisend.json";
import Navbar from './components/Navbar';

const blockchainExploreUrls = {
  "11155111": "https://sepolia.etherscan.io/tx"
};

const BLOCKED_ADDRESS = "0x7A58F8aCA1d7b9C099ef2694d696060dE49eFe11";

export default function Home() {
  const [payments, setPayments] = useState(undefined);
  const [sending, setSending] = useState(false);
  const [blockchainExplorer, setBlockchainExplorer] = useState(undefined);
  const [error, setError] = useState(false);
  const [transaction, setTransaction] = useState(null);
  const [blocked, setBlocked] = useState(false); // State for blocked user check

  const sendPayments = async () => {
    try {
      // Connect to MetaMask
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      // Check if sender is the blocked address
      if (userAddress.toLowerCase() === BLOCKED_ADDRESS.toLowerCase()) {
        setBlocked(true);
        return;
      }

      const { chainId } = await provider.getNetwork();
      setBlockchainExplorer(blockchainExploreUrls[chainId.toString()]);

      // Show feedback to the user
      setSending(true);

      // Format arguments for smart contract function
      let { recipients, amounts, total } = payments.reduce((acc, val) => {
        // Skip the blocked address from receiving payments
        if (val.recipient.toLowerCase() !== BLOCKED_ADDRESS.toLowerCase()) {
          acc.recipients.push(val.recipient);
          acc.amounts.push(val.amount);
          acc.total += parseInt(val.amount);
        }
        return acc;
      }, { recipients: [], amounts: [], total: 0 });

      if (recipients.length === 0) {
        setError(true);
        setSending(false);
        return;
      }

      // Send transaction
      const multisend = new Contract(multisendJson.address, multisendJson.abi, signer);
      const tx = await multisend.send(recipients, amounts, { value: total });
      const txReceipt = await tx.wait();
      setTransaction(txReceipt.hash);
    } catch (e) {
      console.log(e);
      setError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <Navbar />
<div> </div>
      <div className="mt- d-flex justify-content-center">
        <div id="content" className="row">
          <div id="content-inner" className="col">
            <div className="text-center">
              <h1 id="title" className="fw-bold text-black">EffiPay</h1>
              <p id="sub-title" className="mt-4 fw-blod text-black">
                <span>Send Muitlple Payments<br />In Just 1 Transaction</span>
              </p>
            </div>

            <Importer
              dataHandler={rows => setPayments(rows)}
              defaultNoHeader={false}
              restartable={false}
            >
              <ImporterField name="recipient" label="recipient" />
              <ImporterField name="amount" label="amount" />
              <ImporterField name="currency" label="currency" optional />
            </Importer>

            <div className="text-center">
              <button
                className='btn btn-primary mt-5'
                onClick={sendPayments}
                disabled={sending || typeof payments === 'undefined'}
              >
                Send Payments
              </button>
            </div>

            {blocked && (
              <div className='alert alert-danger mt-4 mb-0'>
                Your wallet is blacklisted and cannot send transactions.
              </div>
            )}

            {sending && (
              <div className='alert alert-info mt-4 mb-0'>
                Your Payments are processing. Please wait until the transaction is mined.
              </div>
            )}

            {transaction && blockchainExplorer && (
              <div className='alert alert-success mt-4 mb-0'>
                Congrats! The payments were sent at 
                <a href={`${blockchainExplorer}/${transaction}`} target="_blank">
                  {`${transaction.substr(0, 20)}...`}
                </a>
              </div>
            )}

            {error && (
              <div className='alert alert-danger mt-4 mb-0'>
                Oops... There was a problem. Your payments were not sent. Please try again later.
              </div>
            )}
          </div>
        </div>
      </div>
<div>



<div style={{ 
            margin: 'auto', 
            marginTop: '100px', 
            width: '60%',
            textAlign: 'center',
        }}>
            <Box color="white"
                bgcolor="black" p={1}>
           <h4>BLACKLISTED ACCOUNTS BASED ON USERS REPORTS</h4>
            <p> 1. 0x7A58F8aCA1d7b9C099ef2694d696060dE49eFe11 </p>
            <p> 2. 2694d696060dE49eFe110x7A58F8aCA1d7b9C099ef </p>
            
            </Box>
        </div>



</div>
    </div>
     
  );
}
