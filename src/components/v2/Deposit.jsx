import { useContext, useState } from "react";
import { API_ENDPOINT } from "../../constants";
import Axios from "axios";
import { MultiTabDetectContext } from "../MultiTabDetectContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

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

    const deposit = () => {
        if (multiTabDetect) {
            toast.error("Multiple browser tab was opend, please close all old browser tab", {
                position: "top-right",
                autoClose: 1500,
            });
            return;
        }

        if (loading) return;

        setLoading(true);

        if (depositAmount <= 0) {
            toast.error("Deposit amount must be greater than 10!", {
                position: "top-right",
                autoClose: 1500,
                onClose: () => {
                    setLoading(false);
                }
            });
            return;
        }

        Swal.fire({
            title: `Confirm deposit $${miningAmount}`,
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
                    walletAddress: props.usdtWallet,
                    amount: depositAmount,
                });

                let config = {
                    method: "post",
                    url: `${API_ENDPOINT}management/deposit-kas`,
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
                            toast.success("Mine successfull!", {
                                position: "top-right",
                                autoClose: 1500,
                                onClose: () => window.location.reload(),
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
        console.log(walletType);
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
            <button onClick={deposit} className="button-89 mt-[10px] mb-[20px] pt-[10px] pb-[20px]">Deposit</button></div>
        </div>
    )
};

export default Deposit;