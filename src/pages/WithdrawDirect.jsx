import React, { useState, useEffect } from "react";
import Axios from "axios";
import styles from "../style";
import { Footer, FooterDashboard, UserNavbar } from "../components";
import Modal from "react-modal";
import WithdrawCardDirect from "../components/WithdrawCardDirect";
import { API_ENDPOINT } from "../constants";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    width: "70%", // Default width for larger screens
    maxWidth: "800px",
    height: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "2rem",
  },
  overlay: {
    zIndex: 1000, // Ensure it stays on top
    backgroundColor: "rgba(0, 0, 0, 0.75)", // Dark background for better focus
  },
};

const WithdrawDirect = () => {
  const isSmallScreen = window.innerWidth <= 768;

  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("walletAddress")
  );
  const [publicKey, setPublicKey] = useState(localStorage.getItem("publicKey"));
  const [walletStateInit, setWalletStateInit] = useState(
    localStorage.getItem("walletStateInit")
  );
  const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token"));
  const [isInTree, setIsInTree] = useState(localStorage.getItem("is_in_tree"));
  const [notificationModalOpen, setNotificationModalOpen] = useState(true); // Notification modal state

  const closeNotificationModal = () => {
    setNotificationModalOpen(false); // Close the notification and continue logic
    window.location.href = "/dashboard";
  };
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    let config = {
      method: "get",
      url: `${API_ENDPOINT}management/balance/${walletAddress}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "ngrok-skip-browser-warning": "69420",
      },
    };

    Axios.request(config)
      .then((response) => {
        setBalance(response.data.balances[2].balance);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className=" w-full h-full">
      <div className={`${styles.paddingX} ${styles.flexCenterNav}`}>
        <div className={`${styles.boxWidth}`}>
          <UserNavbar />
        </div>
      </div>

      <div className={` ${styles.flexStart} bg-image`}>
        <div className={`${styles.boxWidthDashboard}`}>
          {isInTree === "true" ? (
            <>
              <WithdrawCardDirect balance={balance} />
            </>
          ) : (
            <></>
            // Modal noti
          )}
        </div>
      </div>

      {isInTree === "true" && (
        <div className={`${styles.paddingX} ${styles.flexCenterNav}`}>
          <div className={`${styles.boxWidthDashboard}`}>
            <FooterDashboard />
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawDirect;
