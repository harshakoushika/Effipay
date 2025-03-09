"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
export default function instruction(){
 
  return (
    <>
      <Navbar />
      <div id="chandu"> 
      <div className="container mt-5">


        <div className="card shadow p-4">

        <h1 className="text-BLACK mb-4">How to Use EffiPay?</h1>
          <ul className="list-group mb-4">
            <li className="list-group-item">Create a CSV file with the following columns: recipient address, amount, and asset type.</li>
            <li className="list-group-item">You can include up to 100 payment entries in the CSV file.</li>
            <li className="list-group-item">Import or drag the CSV file, verify the details, and click "Send Payments." Ensure you have a MetaMask wallet with sufficient funds.</li>
            <li className="list-group-item">Once the transaction is completed, check the transaction details using the provided Etherscan link.</li>
          </ul>

          <h1 className="text-BLACK mb-4">If Your Transaction Fails</h1>
          <ul className="list-group">
            <li className="list-group-item">Verify that all details are correct.</li>
            <li className="list-group-item">Check if your account has been blacklisted.</li>
          </ul>

          <h1 className="text-BLACK mb-4">How to Report an Account?</h1>
          <ul className="list-group mb-4">
            <li className="list-group-item">Contact EffiPay using the "Contact Us" form.</li>
            <li className="list-group-item">Provide your email and a detailed description of the suspicious or illegal activities associated with the account.</li>
            <li className="list-group-item">If an account receives more than 30 reports, it will be blocked on EffiPay.</li>
          </ul>

          <h1 className="text-BLACK mb-4">How to Unblock Your Account on EffiPay?</h1>
          <ul className="list-group mb-4">
            <li className="list-group-item">Submit a complete history of your account transactions for verification.</li>
            <li className="list-group-item">If a specific group or individual has flagged you, provide a valid reason to request removal from the blacklist.</li>
          </ul>

          

         
        </div>
      </div>
      </div>
    </>
  );
}
