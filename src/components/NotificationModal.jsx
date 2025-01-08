import { useContext, useState } from "react";
import { API_ENDPOINT } from "../constants";
import Axios from "axios";
import { MultiTabDetectContext } from "../components/MultiTabDetectContext";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3); // Slight dark overlay for contrast
`;

const ModalContainer = styled(motion.div)`
  width: 50svw;
  height: auto;
  background: rgba(130, 130, 130, 0.2); // Transparent background for glass effect
  backdrop-filter: blur(10px); // Blur effect for glassmorphism
  box-shadow: 
    0 4px 30px rgba(0, 0, 0, 0.1),           // Soft shadow for depth
    0 0 25px rgba(173, 216, 230, 0.7),       // Increase the glow radius and opacity
    0 0 50px rgba(173, 216, 230, 0.5);       // Additional glow for shininess
  position: absolute;
  z-index: 99999999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 40px;
  overflow: hidden; // Ensures the border animation stays within the container

  // The animated border effect
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 2px solid #01a1b3; // 1px solid white border
    border-radius: inherit; // Match modal's border-radius
    box-sizing: border-box;
    animation: snake-border 4s linear infinite; // Animation running in a loop
    pointer-events: none; // Avoid interaction with the border
  }

  @media (max-width: 768px) {
    width: 80svw; // Adjust width for mobile
    height: auto; // Adjust height for mobile
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px; // Smaller border radius for mobile
  }

  // Keyframes for the snake-like border movement
  @keyframes snake-border {
    0% {
      clip-path: inset(0 100% 0 0); // Start from the top left
    }
    20% {
      clip-path: inset(0 0 100% 0); // Move along the top
    }
    50% {
      clip-path: inset(0 0 0 100%); // Move down the right side
    }
    80% {
      clip-path: inset(100% 0 0 0); // Move along the bottom
    }
    100% {
      clip-path: inset(0 100% 0 0); // Move up the left side and reset
    }
  }
`;

const modalVariant = {
  initial: { opacity: 0 },
  isOpen: { opacity: 1 },
  exit: { opacity: 0 },
};
const containerVariant = {
  initial: { top: "-50%", transition: { type: "spring" } },
  isOpen: { top: "50%", transition: { duration: 1 } }, // Set the duration to 1 second for showing
  exit: { top: "-50%", transition: { duration: 0.5 } }, // Optional: Adjust exit duration if needed
};

const NotificationModal = ({ isOpen, closeNotiModal, qrSource, manualWalletAddress, handleCopyKaspa }) => {
  const [transactionId, setTransactionId] = useState("");
  const { multiTabDetect } = useContext(MultiTabDetectContext);

  const [loading, setLoading] = useState(false);
  const validateTransaction = () => {
    if (multiTabDetect) {
      toast.error("Multiple browser tabs are open. Please close all old browser tabs.", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }

    if (loading) return;

    setLoading(true);

    if (transactionId === "") {
      toast.error("Please provide the transaction_id in the input field for validation.", {
        position: "top-right",
        autoClose: 1500,
        onClose: () => {
          setLoading(false);
        }
      });
      return;
    }

    let data = JSON.stringify({
      walletAddress: localStorage.getItem("walletAddress"),
      transactionId: transactionId
    });

    let config = {
      method: "post",
      url: `${API_ENDPOINT}management/validate-kaspa-deposit`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "ngrok-skip-browser-warning": "69420",
      },
      data: data,
    };

    Axios.request(config)
      .then((response) => {
        if (response.data === "ok") {
          toast.success("Deposit create successful!", {
            position: "top-right",
            autoClose: 1500,
            onClose: () => {
              window.location.reload();
            }
          });
        } else {
          toast.error(response.data, {
            position: "top-right",
            autoClose: 1500,
            onClose: () => {
              setLoading(false);
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Please try again later", {
          position: "top-right",
          autoClose: 1500,
          onClose: () => {
            setLoading(false);
          }
        });
      });
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={"initial"}
          animate={"isOpen"}
          exit={"exit"}
          variants={modalVariant}
        >
          <ModalContainer variants={containerVariant} >
            <div className="modal-content-container">
              <div className="content-body">
                <img src={qrSource} alt="" />
                <input onClick={() => handleCopyKaspa(manualWalletAddress)} className="cursor-pointer bg-white text-dark shadow appearance-none rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:shadow-outline" type="text" value={manualWalletAddress} readOnly />
                <input className="cursor-pointer bg-white text-dark shadow appearance-none rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:shadow-outline" type="text"
                  value={transactionId}
                  placeholder="Transaction ID for validation process"
                  onChange={(e) => {
                    setTransactionId(e.target.value)
                  }}
                />

              </div>
              <div className="content-footer">
                <button className="button-89 mt-[10px] mb-[20px] pt-[10px] pb-[20px]" onClick={closeNotiModal}>Close</button>
                <button className="button-89 mt-[10px] mb-[20px] pt-[10px] pb-[20px]" onClick={validateTransaction}>Confirm</button>
              </div>
            </div>
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default NotificationModal;
