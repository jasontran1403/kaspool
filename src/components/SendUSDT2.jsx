import {
  createThirdwebClient,
  prepareContractCall,
  prepareTransaction,
  toWei,
  getContract
} from "thirdweb";
import { bsc } from "thirdweb/chains";
import {
  TransactionButton,
  useActiveAccount,
} from "thirdweb/react";
import TrustWalletConnect from "./TrustWalletConnect";
import { useState } from "react";
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

function App() {
  const account = useActiveAccount();
  const [walletReceiver, setWalletReceiver] = useState("");
  const [amount, setAmount] = useState(0);

  return (
    <div className="flex py-12 px-3">
      <div className="m-auto max-w-[550px] text-center">
        <div className="mt-5 mx-auto">
          <TrustWalletConnect />
        </div>
        {account && (
          <>
            <div className="mx-auto sm:mb-[30px] flex flex-col justify-between items-center gap-[50px] animation-show-dashboard border border-gray-200 rounded-lg shadow card-blue-green flex flex-row justify-between items-center w-full h-full">
              <div className="transaction-details">
                <label htmlFor="receiver">Receiver wallet</label>
                <input id="receiver" type="text" placeholder="Receiver wallet address...." value={walletReceiver} onChange={(e) => setWalletReceiver(e.target.value)} />
              </div>
              <div className="transaction-details">
                <label htmlFor="amount">Amount</label>
                <input id="amount" type="text" placeholder="Amount to send..." value={amount} onChange={(e) => setAmount(e.target.value)} />
              </div>
            </div>
            <TransactionButton
              transaction={() => {
                // Create a transaction object and return it
                const tx = prepareContractCall({
                  contract,
                  method: "function transfer(address to, uint256 value)",
                  params: [walletReceiver, toWei(amount)],
                });
                return tx;
              }}
              onTransactionConfirmed={(receipt) => {
                toast.success(`Transaction confirmed ${receipt.transactionHash}`, {
                  position: "top-right",
                  autoClose: 3000,
                });
              }}
            >
              Send
            </TransactionButton>
          </>
        )}
      </div>
    </div>
  );
}

export default App;