import Axios from "axios";
import {
  createThirdwebClient,
  prepareContractCall,
  prepareTransaction,
  toWei,
  getContract,
} from "thirdweb";
import { bsc } from "thirdweb/chains";
import { TransactionButton, useActiveAccount } from "thirdweb/react";
import { API_ENDPOINT } from "../../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const client = createThirdwebClient({
  clientId: "c4917b86730652d8197cc695ca2b38eb",
});

const usdtBEP20ContractAddress = "0x55d398326f99059ff775485246999027b3197955";

const contract = getContract({
  address: usdtBEP20ContractAddress,
  chain: bsc,
  client,
});

const StakingOption2 = ({
  walletAddress,
  amount,
  connectedBalance,
  walletReceiver,
  periodSelected,
  networkSelected
}) => {
  const account = useActiveAccount();

  const handleDirectTransferMining = (hash) => {
    let data = JSON.stringify({
      walletAddress: localStorage.getItem("walletAddress"),
      amountKaspa: amount,
      period: periodSelected,
      walletType: networkSelected
    });

    let config = {
      method: "post",
      url: `${API_ENDPOINT}management/staking-kaspa`,
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
          toast.success("Staking successfull!", {
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
  };

  return (
    <div>
      {account && (
        <>
          <TransactionButton style={{ marginTop: "25px" }}
            transaction={() => {
              // Create a transaction object and return it
              if (amount <= 1) {
                toast.error("Mining amount must be greater than 1USDT", {
                  position: "top-right",
                  autoClose: 1800,
                });
                return;
              }
              if (amount > connectedBalance) {
                toast.error("USDT BEP20 balance insuffient", {
                  position: "top-right",
                  autoClose: 1800,
                });
                return;
              }
              if (walletReceiver === "" && walletAddress === "") {
                return;
              }
              const tx = prepareContractCall({
                contract,
                method: "function transfer(address to, uint256 value)",
                params: [walletReceiver, toWei(amount)],
              });
              return tx;
            }}
            onTransactionConfirmed={(receipt) => {
              handleDirectTransferMining(receipt.transactionHash);
            }}
            onError={(error) => {
              toast.error(error, {
                position: "top-right",
                autoClose: 1800,
              });
            }}
          >
            Mining
          </TransactionButton>
        </>
      )}
    </div>
  );
};

export default StakingOption2;
