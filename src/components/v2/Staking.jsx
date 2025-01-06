import Axios from "axios";
import { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_ENDPOINT } from "../../constants";
import { MultiTabDetectContext } from "../MultiTabDetectContext";
import MineOption2 from "./MineOption2";

const listPeriod = [
    { name: 7, rate: "0.1%" },
    { name: 15, rate: "0.12%" },
    { name: 30, rate: "0.15%" },
    { name: 45, rate: "0.17%" },
    { name: 60, rate: "0.20%" },
    { name: 90, rate: "0.30%" },
    { name: 120, rate: "0.35%" },
    { name: 180, rate: "0.40%" },
    { name: 360, rate: "0.50%" },
    { name: 540, rate: "0.60%" },
    { name: 720, rate: "0.70%" }
];

const Staking = (props) => {
    const { multiTabDetect } = useContext(MultiTabDetectContext);

    const [listNetwork] = useState([
        { id: 1, name: "Kaspa Wallet" },
    ]);

    const [networkSelected, setNetworkSelected] = useState(1);

    const [loading, setLoading] = useState(false);

    const [walletType, setWalletType] = useState(1);
    const [miningAmount, setMiningAmount] = useState(0);

    const formattedPrice = (amount) => {
        const formattedNumber = new Intl.NumberFormat("en-US", {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);

        // Append the currency code after the formatted number
        return `${formattedNumber}`;
    };

    const buyPackage = () => {
        if (multiTabDetect) {
            toast.error("Multiple browser tab was opend, please close all old browser tab", {
                position: "top-right",
                autoClose: 1500,
            });
            return;
        }

        if (loading) return;

        setLoading(true);

        if (miningAmount <= 0) {
            toast.error("Package not found!", {
                position: "top-right",
                autoClose: 1500,
                onClose: () => {
                    setLoading(false);
                }
            });
            return;
        }

        Swal.fire({
            title: `Confirm staking $${miningAmount}`,
            text: `Are you sure you want staking?`,
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
                    walletAddress: localStorage.getItem("walletAddress"),
                    amount: miningAmount,
                    period: periodSelected
                });

                let config = {
                    method: "post",
                    url: `${API_ENDPOINT}management/invest`,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                        "ngrok-skip-browser-warning": "69420",
                    },
                    data: data,
                };

                // Axios.request(config)
                //     .then((response) => {
                //         if (response.data === "ok") {
                //             toast.success("Staking successfull!", {
                //                 position: "top-right",
                //                 autoClose: 1500,
                //                 onClose: () => window.location.reload(),
                //             });
                //         } else {
                //             toast.error(response.data, {
                //                 position: "top-right",
                //                 autoClose: 1500,
                //                 onClose: () => {
                //                     setLoading(false);
                //                 }
                //             });
                //         }
                //     })
                //     .catch((error) => {
                //         toast.error("Please try again later", {
                //             position: "top-right",
                //             autoClose: 1500,
                //             onClose: () => {
                //                 setLoading(false);
                //             }
                //         });
                //     });
            } else {
                setLoading(false);
            }
        });

        // Add code to handle the purchase here
    };

    const [periodSelected, setPeriodSelected] = useState(7);

    const handleChangeWalletType = (walletType) => {
        setNetworkSelected(walletType);
    };

    const handleChangePeriod = (periodValue) => {
        setPeriodSelected(periodValue);
    }

    return (
        <div className="fadeIn">
            <div className="card-container">
                <div className="card-items">
                    <div className="card-content-transaction pt-[20px]">
                        <label
                            className="block text-white text-sm font-bold"
                            htmlFor="email"
                        >
                            Amount
                        </label>
                        <input
                            className="bg-white text-dark shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="number"
                            min={1}
                            value={miningAmount}
                            onChange={e => { setMiningAmount(e.target.value) }}
                        />
                    </div>

                    <div className="card-content-transaction">
                        <label
                            className="block text-white text-sm font-bold"
                            htmlFor="packageName"
                        >
                            Package
                        </label>
                        <select
                            className=" shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="packageName"
                            value={periodSelected}
                            onChange={(e) => { handleChangePeriod(e.target.value) }}
                        >
                            {listPeriod.map((network, index) => (
                                <option key={index} value={network.name}>
                                    {network.name}days - {network.rate}/day
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="card-content-transaction ">
                        <label
                            className="block text-white text-sm font-bold"
                            htmlFor="packageName"
                        >
                            Wallet type
                        </label>
                        <select
                            className=" shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="packageName"
                            value={networkSelected}
                            onChange={(e) => { handleChangeWalletType(e.target.value) }}
                        >
                            {listNetwork.map((network) => (
                                <option key={network.id} value={network.id}>
                                    {network.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="card-content-transaction mb-[20px]">
                        <label
                            className="block text-white text-sm font-bold"
                            htmlFor="email"
                        >
                            Balance
                        </label>
                        <input
                            className="bg-white text-dark shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="number"
                            min={0}
                            value={props.kaspaBalance}
                            readOnly
                            disabled
                        />
                    </div>

                </div>
            </div>
            <div className="flex items-center justify-center">
                <button onClick={buyPackage} className="button-89 mt-[10px] mb-[20px] pt-[10px] pb-[20px]">Staking</button></div>
        </div>
    )
};

export default Staking;