import Axios from "axios";
import { useState } from "react";
import styles from "../style";
import Button from "./Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_ENDPOINT } from "../constants";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { Tooltip } from "@mui/material";
import CopyIcon from '@mui/icons-material/FileCopy';

const DepositUSDTItem = ({ depositHistory }) => {
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("walletAddress")
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );
  const [networkSelected, setNetworkSelected] = useState("");

  const [listNetwork, setListNetwork] = useState([
    { id: 1, name: "USDT BEP20" },
  ]);

  const [amount, setAmount] = useState(0);
  const [qrImage, setQrImage] = useState("");
  const [depositWallet] = useState(localStorage.getItem("bep20"));

  const handleSelectPackage = (packageId) => {
    const selectedPackage = listPackages.find(
      (pkg) => pkg.id === parseInt(packageId)
    );
    if (selectedPackage) {
      setNetworkSelected(packageId);
    }
  };

  const handleCreateDeposit = () => {
    if (amount <= 0) {
      return;
    }
    let data = JSON.stringify({
      walletAddress: walletAddress,
      amount: amount,
      method: 1,
    });

    Swal.fire({
      title: "Confirm deposit",
      text: `Are you sure you want to deposit ${amount}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, transfer it!",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
      customClass: {
        confirmButton: "custom-confirm-button", // Custom class for confirm button
        cancelButton: "custom-cancel-button", // Custom class for cancel button
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        let config = {
          method: "post",
          url: `${API_ENDPOINT}management/generate-qr`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "ngrok-skip-browser-warning": "69420",
          },
          data: data,
          responseType: "blob",
        };

        Axios.request(config)
          .then((response) => {
            // Assuming response.data contains the image URL or base64 string
            const qrCodeBlob = response.data;
            const qrCodeUrl = URL.createObjectURL(qrCodeBlob);
            setQrImage(qrCodeUrl);
            toast.success("Created deposit order!", {
              position: "top-right",
              autoClose: 1500,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(depositWallet).then(
      () => {
        toast.success("Wallet address copied to clipboard!", {
          position: "top-right",
          autoClose: 1500,
        });
      },
      (err) => {
        console.error("Could not copy text: ", err);
        toast.error("Failed to copy wallet address!", {
          position: "top-right",
          autoClose: 1500,
        });
      }
    );
  };

  const handleCancelDeposit = () => {
    Swal.fire({
      title: "Confirm cancel deposit",
      text: `Are you sure you want to cancel ${amount}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, transfer it!",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
      customClass: {
        confirmButton: "custom-confirm-button", // Custom class for confirm button
        cancelButton: "custom-cancel-button", // Custom class for cancel button
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        let data = JSON.stringify({
          walletAddress: walletAddress,
          amount: 0,
          method: 0,
        });

        let config = {
          method: "post",
          url: `${API_ENDPOINT}management/cancel-deposit`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "ngrok-skip-browser-warning": "69420",
          },
          data: data,
        };

        Axios.request(config)
          .then((response) => {
            if (response.data === "ok") {
              setQrImage("");
              toast.success("Canceled deposit order!", {
                position: "top-right",
                autoClose: 1500,
                onClose: () => window.location.reload(),
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <section
      className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow `}
    >
      <div
        className="flex-1 flex flex-col"
        style={{ overflow: "hidden", width: "90svw" }}
      >
        <h2 className={styles.heading2}>Deposit</h2>
        <div className="shadow-md rounded-lg px-4 py-6 sm:px-8 sm:py-8  mb-4">
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="packageName"
            >
              Network
            </label>
            <select
              className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="packageName"
              value={networkSelected}
              onChange={(e) => setNetworkSelected(e.target.value)}
            >
              {listNetwork.map((network) => (
                <option key={network.id} value={network.id}>
                  {network.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="tokenBalance"
            >
              Amount
            </label>
            <input
              className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="tokenBalance"
              type="text"
              value={amount}
              min="10"
              onChange={(e) => {
                const value = e.target.value;

                const regex = /^[0-9]*\.?[0-9]*$/;

                if (regex.test(value)) {
                  const numericValue = parseFloat(value);
                  if (!isNaN(numericValue) && numericValue > 0) {
                    setAmount(value);
                  } else {
                    setAmount("");
                  }
                }
              }}
            />
          </div>

          {qrImage && (
            <div className="mb-6 flex flex-col justify-center gap-5">
              <img
                src={qrImage}
                alt="QR Code"
                className="max-w-full sm:max-w-sm" // Ensure image scales responsively
              />
              <div className="flex items-center">
                <Tooltip title={depositWallet} arrow>
                  <input
                    style={{
                      cursor: "pointer",
                      width: "100%", // Full width
                      whiteSpace: "nowrap", // Prevents wrapping
                      overflow: "hidden", // Hides overflow
                    }}
                    onClick={handleCopy}
                    value={depositWallet}
                    readOnly
                  />
                </Tooltip>
                <button
                  onClick={handleCopy}
                  className="ml-2 p-1 rounded hover:bg-gray-200"
                  aria-label="Copy wallet address"
                >
                  <CopyIcon style={{ color: "white" }}/>
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            {qrImage.length === 0 ? (
              <Button handleClick={handleCreateDeposit} content={"Deposit"} />
            ) : (
              <Button handleClick={handleCancelDeposit} content={"Cancel"} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DepositUSDTItem;
