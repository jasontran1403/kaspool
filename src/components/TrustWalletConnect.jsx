import React, { useState } from "react";
import Web3 from "web3";

const TrustWalletConnect = () => {
  const [account, setAccount] = useState(null);

  // Hàm kết nối với Trust Wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        // Yêu cầu kết nối tài khoản
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const accountAddress = accounts[0];
        setAccount(accountAddress);
        // Kiểm tra mạng BSC (Binance Smart Chain)
        const chainId = await web3.eth.getChainId();
        console.log(chainId);
        if (chainId === 56n) {
          localStorage.setItem("walletAddress", accountAddress);
          localStorage.setItem("publicKey", accountAddress);
          localStorage.setItem("walletStateInit", accountAddress);
          window.location.href = "/dashboard";
        }
      } catch (error) {
        console.error("Lỗi kết nối:", error);
      }
    } else {
      alert("Vui lòng cài đặt Trust Wallet hoặc MetaMask.");
    }
  };

  // Hàm ngắt kết nối ví
  const disconnectWallet = () => {
    setAccount(null);
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("publicKey");
    localStorage.removeItem("walletStateInit");
    localStorage.removeItem("is_in_tree");
    localStorage.removeItem("is_lock");
    localStorage.removeItem("access_token");
    localStorage.removeItem("bep20");
    localStorage.removeItem("management");
  };

  return (
    <div>
      {account ? (
        <div>
          <button onClick={disconnectWallet} style={disconnectButtonStyle}>
            Disconnect
          </button>
        </div>
      ) : (
        <button onClick={connectWallet} style={buttonStyle}>
          Connect
        </button>
      )}
    </div>
  );
};

// Custom style for the buttons
const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: "#3498db",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const disconnectButtonStyle = {
  ...buttonStyle, // Kế thừa các thuộc tính từ buttonStyle
  backgroundColor: "#e74c3c", // Màu nền khác cho nút ngắt kết nối
};

export default TrustWalletConnect;
