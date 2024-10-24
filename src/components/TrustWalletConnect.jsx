import React, { useState } from "react";
import Web3 from "web3";

const TrustWalletConnect = () => {
  const [account, setAccount] = useState(null);
  const [isConnected] = useState(
    localStorage.getItem("walletAddress")?.length > 0
  );

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
        if (chainId === BigInt(56)) {
          localStorage.setItem("walletAddress", accountAddress);
          localStorage.setItem("publicKey", accountAddress);
          localStorage.setItem("walletStateInit", accountAddress);
          window.location.href = "/";
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
    window.location.href = "/";
  };

  return (
    <div>
      {isConnected ? (
        <div className="blockchain-header__account" id="wallet-connect-section">
          <a className="blc-btn-dashboard" href="/dashboard">
            <span>
              <i className="fas fa-user" />
              Dashboard
            </span>
          </a>

          <a className="blc-btn" onClick={disconnectWallet}>
            <span>
              <i className="fas fa-user" />
              Disconnect
            </span>
          </a>
        </div>
      ) : (
        <div className="blockchain-header__account" id="wallet-connect-section" onClick={connectWallet}>
          <a className="blc-btn">
            <span>
              <i className="fas fa-user" />
              Connect
            </span>
          </a>
        </div>
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

const buttonDashboardStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: "aqua",
  color: "green",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const disconnectButtonStyle = {
  ...buttonStyle, // Kế thừa các thuộc tính từ buttonStyle
  backgroundColor: "#e74c3c", // Màu nền khác cho nút ngắt kết nối
};

export default TrustWalletConnect;
