import React, { useEffect, useState } from "react";
import { createThirdwebClient } from "thirdweb";
import { ConnectButton, useWalletInfo, useDisconnect } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { useActiveAccount } from "thirdweb/react";
import { useAddress } from "@thirdweb-dev/react";

const client = createThirdwebClient({
  clientId: "c4917b86730652d8197cc695ca2b38eb",
});

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("com.trustwallet.app"),
  createWallet("org.uniswap"),
];

const TrustWalletConnect = () => {
  const activeAccount = useActiveAccount();
  const { isConnected } = useWalletInfo(client);
  const disconnect = useDisconnect(); // Sử dụng hook useDisconnect
  const [isLocalConnected, setIsLocalConnected] = useState(
    localStorage.getItem("walletAddress")?.length > 0
  );

  useEffect(() => {
    if (activeAccount?.address) {
      localStorage.setItem("walletAddress", activeAccount.address);
      localStorage.setItem("publicKey", activeAccount.address);
      localStorage.setItem("walletStateInit", activeAccount.address);
    }
  }, [activeAccount]);

  const handleConnect = () => {
    setTimeout(() => {
      if (activeAccount?.address) {
        localStorage.setItem("walletAddress", activeAccount.address);
        localStorage.setItem("publicKey", activeAccount.address);
        localStorage.setItem("walletStateInit", activeAccount.address);
      }
    }, 3000); // Thời gian chờ là 3000 milliseconds (3 giây)
  };
  

  // Handle wallet disconnection
  const disconnectWallet = () => {
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("publicKey");
    localStorage.removeItem("walletStateInit");
    localStorage.removeItem("is_in_tree");
    localStorage.removeItem("is_lock");
    localStorage.removeItem("access_token");
    localStorage.removeItem("bep20");
    localStorage.removeItem("management");
    window.location.href = "/";
  };

  return (
    <div>
      <ConnectButton
      connectButton={{ label: "Connect" }}

        client={client}
        wallets={wallets}
        connectModal={{
          size: "compact",
          title: "Kaspool",
          showThirdwebBranding: false,
        }}
        onConnect={() => handleConnect()}
        onDisconnect={() => disconnectWallet()}
      />
    </div>
  );
};

export default TrustWalletConnect;
