import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styles from "../style";
import styled from "styled-components";
import promotion from "../assets/promotion.jpg";
import { FooterDashboard, MainDashboard, UserNavbar } from "../components";
import Form from "../components/Form";
import LockModal from "../components/LockModal";

const CloseButton = styled.svg`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 18px;
  top: 18px;
  cursor: pointer;
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    width: window.innerWidth < 768 ? "100svw" : "70svw", // Dynamic width based on screen size
    height: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    padding: "0px!important",
    backgroundColor: "rgb(31 41 55 / var(--tw-bg-opacity))",
  },
  overlay: {
    zIndex: 1000,
    backgroundColor: "rgb(31 41 55 / var(--tw-bg-opacity))",
  },
};

const Dashboard = () => {
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("walletAddress")
  );
  const [publicKey, setPublicKey] = useState(localStorage.getItem("publicKey"));
  const [walletStateInit, setWalletStateInit] = useState(
    localStorage.getItem("walletStateInit")
  );
  const [isOpen, toggle] = useState(false);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );

  const [isInTree] = useState(localStorage.getItem("is_in_tree"));
  const [isLock] = useState(localStorage.getItem("is_lock"));

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalLock, setModalLock] = useState(false);

  function handleOpenModal(open) {
    closeLockModal();
  }

  useEffect(() => {
    if (isInTree === "true") {
      setModalLock(false);
    } else if (isInTree === "false") {
      setModalLock(true);
    }

    // if (isLock === "true") {
    //   setModalLock(true);
    // } else if (isLock === "false") {
    //   setModalLock(false);
    // }
  }, [isInTree]); // Trigger when notification modal closes

  const closeModal = () => {
    setIsOpen(false);
  };

  const closeLockModal = () => {
    setModalLock(false);
  };

  // Determine if the screen is small or large
  const isSmallScreen = window.innerWidth <= 768;

  const closeNotificationModal = () => {
    setNotificationModalOpen(false); // Close the notification and continue logic
  };

  return (
    <div className="w-full h-full">
      <div className={`${styles.paddingX} ${styles.flexCenterNav}`}>
        <div className={`${styles.boxWidthDashboard}`}>
          <UserNavbar />
        </div>
      </div>

      {/* Lock Modal */}
      {isInTree === "true" && (
        <div className={`${styles.flexStart} bg-image`}>
          <MainDashboard />
        </div>
      )}

      <LockModal
        isOpen={modalLock}
        onRequestClose={closeLockModal}
        contentLabel="Account lock"
      >
        <CloseButton
          onClick={(e) => handleOpenModal(false)}
          style={{ zIndex: "9999" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20.39 20.39"
        >
          <title>X</title>
          <line
            x1="19.39"
            y1="19.39"
            x2="1"
            y2="1"
            fill="none"
            stroke="#5c3aff"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            x1="1"
            y1="19.39"
            x2="19.39"
            y2="1"
            fill="none"
            stroke="#5c3aff"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
        </CloseButton>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%", // Ensure the content takes the full height of the modal
          }}
        >
          <p
            style={{
              textAlign: "center",
              fontSize: isSmallScreen ? "30px" : "40px", // Adjust line height based on screen size
              color: "orangered",
            }}
          >
            Your account is not in our system, please contact with your refferal
            for further information.
          </p>
        </div>
      </LockModal>

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

export default Dashboard;
