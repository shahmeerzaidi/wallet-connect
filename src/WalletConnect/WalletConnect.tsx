import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { useState } from "react";


export default function HomePage() {
  localStorage.clear();

  const [walletAddress, setWalletAddress] = useState("");

  function connectWallet() {
    // Create a connector
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // Required
      qrcodeModal: QRCodeModal,
    });
    // Check if connection is already established
    if (!connector.connected) {
      // create new session
      connector.createSession();
    }
    

    // Subscribe to connection events
    connector.on("connect", (error, payload) => {
      setWalletAddress(payload.params[0].accounts[0]);
      QRCodeModal.close();
      if (error) {
        throw error;
      }

      // Get provided accounts and chainId
      const { accounts, chainId } = payload.params[0];
    });

    connector.on("session_update", (error, payload) => {
      if (error) {
        throw error;
      }

      // Get updated accounts and chainId
      const { accounts, chainId } = payload.params[0];
    });

    connector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }

      // Delete connector
    });
  }
  return (
    <>
      <h1>{walletAddress ? "Welcome" : "Connect Your Wallet"}</h1>
      {walletAddress ? <h2> {walletAddress}</h2> : "Connect Your Wallet"}
      <hr />
      <button onClick={connectWallet} disabled={!!walletAddress}>
        ({!walletAddress ? "Connect Wallet" : "Connected"})
      </button>
    </>
  );
}
