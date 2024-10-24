import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styles from "../style";
import styled from "styled-components";
import promotion from "../assets/promotion.jpg";
import { MainDashboard, UserNavbar } from "../components";
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
      setIsOpen(false);
    } else if (isInTree === "false") {
      setIsOpen(true);
    }

    if (isLock === "true") {
      setModalLock(true);
    } else if (isLock === "false") {
      setModalLock(false);
    }
  }, [isInTree, isLock]); // Trigger when notification modal closes

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

  console.log(isInTree === "true" ? "yes" : "no");

  return (
    <div className="bg-primary w-full h-full">
      <div className={`${styles.paddingX} ${styles.flexCenterNav}`}>
        <div className={`${styles.boxWidthDashboard}`}>
          <UserNavbar />
        </div>
      </div>

      {/* Lock Modal */}
      {isInTree === "true" ? (
        <div className={`bg-primary ${styles.flexStart} bg-image`}>
          <MainDashboard />
        </div>
      ) : (
        <div className={`bg-primary ${styles.flexStart} bg-image`}>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Update sponsor"
          >
            <Form />
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
