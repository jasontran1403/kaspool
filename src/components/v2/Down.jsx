import { useState, useEffect } from "react";
import Axios from "axios";
import { API_ENDPOINT } from "../../constants";
import Deposit from "./Deposit";
import Staking from "./Staking";
import MyStaking from "./MyStaking";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TABLE_HEAD_MINING = ["Date", "Amount", "Profit", "Process"];

const Down = (props) => {
    const [listTransaction, setListTransaction] = useState([]);

    useEffect(() => {

        let config = {
            method: 'get',
            url: `${API_ENDPOINT}management/get-staking/${localStorage.getItem("walletAddress")}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                "ngrok-skip-browser-warning": "69420",
            }
        };

        Axios.request(config)
            .then((response) => {
                setListTransaction(response.data);
            })
            .catch((error) => {
                toast.error("Please try again later", {
                    position: "top-right",
                    autoClose: 1500
                });
            });

    }, []);

    return (
        <div className="fadeIn">
            {props.selectedDownTab === "Deposit" && <Deposit
                gKaspa={props.gKaspa}
                walletAddress={props.walletAddress}
            />}
            {props.selectedDownTab === "Staking" && <Staking
                bep20={props.bep20}
                usdtWallet={props.walletAddress}
                kaspaBalance={props.kaspaBalance}
                usdtBalance={props.usdtBalance}
                connectedBalance={props.connectedBalance}
            />}
            {props.selectedDownTab === "My Staking" && <MyStaking
                className="w-full flex justify-center items-center"
                TABLE_HEAD={TABLE_HEAD_MINING}
                TABLE_ROWS={listTransaction}
            />}
        </div>
    )
};

export default Down;