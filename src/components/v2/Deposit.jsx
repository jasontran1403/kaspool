import { useContext, useState } from "react";
import { API_ENDPOINT } from "../../constants";
import Axios from "axios";
import { MultiTabDetectContext } from "../MultiTabDetectContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import NotificationModal from "../NotificationModal";

const Deposit = (props) => {
    const { multiTabDetect } = useContext(MultiTabDetectContext);

    const [loading, setLoading] = useState(false);

    const [depositAmount, setDepositAmount] = useState(0);

    const formattedPrice = (amount) => {
        const formattedNumber = new Intl.NumberFormat("en-US", {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);

        // Append the currency code after the formatted number
        return `${formattedNumber}`;
    };

    const [qrSource, setQrSource] = useState("");
    const [modalDeposit, setModalDeposit] = useState(false);

    const handleToggleModalDeposit = () => {
        setModalDeposit(prev => !prev);

        // Cancel deposit
        let config = {
            method: "GET",
            url: `${API_ENDPOINT}management/cancel-kaspa-deposit/${props.walletAddress}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                "ngrok-skip-browser-warning": "69420",
            },
        };

        Axios.request(config)
            .then((response) => {
                if (response.data === "ok") {
                    toast.success("Kaspa deposit order has been canceled", {
                        position: "top-right",
                        autoClose: 1500,
                        onClose: () => {
                            window.location.reload();
                        }
                    });
                }
            })
            .catch((error) => {
                toast.error('Please try again later', error, {
                    position: "top-right",
                    autoClose: 1500,
                    onClose: () => {
                        setLoading(false);
                    }
                });
            });
    }

    const handleCopyKaspa = (targetValue) => {
        navigator.clipboard.writeText(targetValue)
            .then(() => {
                toast.success("Kaspa Address copied to clipboard", {
                    position: "top-right",
                    autoClose: 1500
                });
            })
            .catch((err) => {
                toast.error('Failed to copy text: ', err, {
                    position: "top-right",
                    autoClose: 1500
                });
            });
    };

    const deposit = () => {
        if (multiTabDetect) {
            toast.error("Multiple browser tabs are open. Please close all old browser tabs.", {
                position: "top-right",
                autoClose: 1500,
            });
            return;
        }

        if (loading) return;

        setLoading(true);

        if (depositAmount <= 1) {
            toast.error("Deposit amount must be greater than 1!", {
                position: "top-right",
                autoClose: 1500,
                onClose: () => {
                    setLoading(false);
                }
            });
            return;
        }

        Swal.fire({
            title: `Confirm deposit ${depositAmount}KAS`,
            text: `Are you sure you want deposit?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, confirm it!",
            cancelButtonText: "No, cancel it",
            reverseButtons: true,
            customClass: {
                confirmButton: "custom-confirm-button", // Custom class for confirm button
                cancelButton: "custom-cancel-button", // Custom class for cancel button
            },
            buttonsStyling: false,
        }).then((result) => {
            if (result.isConfirmed) {
                let data = JSON.stringify({
                    walletAddress: props.walletAddress,
                    amount: depositAmount,
                    method: 3,
                });

                let config = {
                    method: "post",
                    url: `${API_ENDPOINT}management/generate-qr`,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                        "ngrok-skip-browser-warning": "69420",
                    },
                    data: data,
                    responseType: "blob",
                };

                Axios.request(config)
                    .then((response) => {
                        const qrCodeBlob = response.data;
                        const qrCodeUrl = URL.createObjectURL(qrCodeBlob);
                        setQrSource(qrCodeUrl);
                        setModalDeposit(true);
                        toast.success("Deposit create successful!", {
                            position: "top-right",
                            autoClose: 1500,
                            onClose: () => {
                                setLoading(false);
                            }
                        });
                    })
                    .catch((error) => {
                        toast.error("Please try again later", {
                            position: "top-right",
                            autoClose: 1500,
                            onClose: () => {
                                setLoading(false);
                            }
                        });
                    });
            } else {
                setLoading(false);
            }
        });

        // Add code to handle the purchase here
    };

    const handleChangeWalletType = (walletType) => {
        setNetworkSelected(walletType);
    };

    const formatNumber = (numberString) => {
        // Parse the input to ensure it's a number
        const number = parseFloat(numberString);

        // Format the number with commas and two decimal places
        const formattedNumber = new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(number);

        return formattedNumber;
    };

    return (
        <div className="fadeIn">
            <div className="card-container">
                <div className="card-items">
                    <div className="card-content-deposit">
                        <label
                            className="block text-white text-sm font-bold"
                            htmlFor="email"
                        >
                            Amount
                        </label>
                        <input
                            className="bg-white text-dark shadow appearance-none rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                            id="email"
                            type="number"
                            min={0}
                            value={depositAmount}
                            onChange={e => { setDepositAmount(e.target.value) }}
                        />
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <button onClick={deposit} className="button-89 mt-[10px] mb-[20px] pt-[10px] pb-[20px]">Deposit</button>
            </div>
            <div className="deposit-container" style={{ position: "absolute", zIndex: "9999999" }}>
                <NotificationModal
                    closeNotiModal={handleToggleModalDeposit}
                    isOpen={modalDeposit}
                    qrSource={qrSource}
                    manualWalletAddress={props.gKaspa}
                    handleCopyKaspa={handleCopyKaspa}
                />
            </div>
        </div>
    )
};

export default Deposit;