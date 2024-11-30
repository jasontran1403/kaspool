import React, { useState } from "react";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TrustWalletConnect from "./TrustWalletConnect";

// USDT BEP20 Contract Information
const USDT_CONTRACT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955"; // Official USDT on BSC
const USDT_ABI = [
  {
    "constant": true,
    "inputs": [{ "name": "account", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "name": "", "type": "uint256" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
  },
  {
    "constant": false,
    "inputs": [
      { "name": "recipient", "type": "address" },
      { "name": "amount", "type": "uint256" },
    ],
    "name": "transfer",
    "outputs": [{ "name": "", "type": "bool" }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
  },
  // Add other functions as needed
];


const SendUSDT = () => {
  const [recipientAddress, setRecipientAddress] = useState(""); // Store the recipient's wallet address
  const [amount, setAmount] = useState(""); // Store the amount to send
  const [loading, setLoading] = useState(false); // Track the loading state

  const handleSendUSDT = async () => {
    if (!recipientAddress) {
      toast.error("Recipient address is required", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }
  
    // Validate recipient address
    if (!ethers.utils.isAddress(recipientAddress)) {
      toast.error("Invalid recipient address", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }
  
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }
  
    setLoading(true);
  
    try {
      // Ensure the wallet is connected
      if (!window.ethereum) {
        throw new Error("No Ethereum wallet detected. Please install MetaMask or another wallet.");
      }
  
      const provider = new ethers.providers.Web3Provider(window.ethereum);
  
      // Check if the wallet is already connected
      const accounts = await provider.listAccounts();
      if (accounts.length === 0) {
        await provider.send("eth_requestAccounts", []);
      }
  
      const signer = provider.getSigner();
      const usdtContract = new ethers.Contract(USDT_CONTRACT_ADDRESS, USDT_ABI, signer);
  
      // Parse the amount to send into the correct decimal format (18 decimals for USDT)
      const amountToSend = ethers.utils.parseUnits(amount, 18);
  
      // Get the sender's balance using the correct ABI for balanceOf
      
  
      // Call the transfer function
      const tx = await usdtContract.transfer(recipientAddress, amountToSend);
  
      toast.info("Transaction sent! Waiting for confirmation...", {
        position: "top-right",
        autoClose: 2000,
      });
  
      // Wait for the transaction to be confirmed
      await tx.wait();
  
      toast.success(`Transaction confirmed! TX Hash: ${tx.hash}`, {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      if (error.code === "UNPREDICTABLE_GAS_LIMIT" && error.message.includes("BEP20: transfer amount exceeds balance")) {
        toast.error("Transaction failed: Insufficient balance", {
          position: "top-right",
          autoClose: 1200,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <TrustWalletConnect />
      <div style={{ marginBottom: "10px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Recipient Address:
        </label>
        <input
          type="text"
          placeholder="Enter recipient's address"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Amount (USDT):
        </label>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>
      <button
        onClick={handleSendUSDT}
        disabled={loading}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: loading ? "#ccc" : "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Sending..." : "Send USDT"}
      </button>
      <ToastContainer />
    </div>
  );
};

export default SendUSDT;
