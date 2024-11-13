import React, { useState, useEffect } from "react";
import Axios from "axios";
import styled from "styled-components";
import styles from "../style";

import "../assets/css/TreeView.css";
import { API_ENDPOINT } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import ReflinkModal from "./ReflinkModal";
import { Button } from ".";
import { toast, ToastContainer } from "react-toastify";

const CloseButton = styled.svg`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 18px;
  top: 18px;
  cursor: pointer;
`;

const Tree = () => {
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("walletAddress")
  );
  const [publicKey, setPublicKey] = useState(localStorage.getItem("publicKey"));
  const [walletStateInit, setWalletStateInit] = useState(
    localStorage.getItem("walletStateInit")
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );

  const [prevWallets, setPrevWallets] = useState([]); // Stack to hold previous wallet addresses
  const [currWallet, setCurrWallet] = useState(walletAddress);
  const [userRoot, setUserRoot] = useState({});
  const [root, setRoot] = useState({});
  const [treeData, setTreeData] = useState(null);
  const [modalReflink, setModalReflink] = useState(false);
  const [refInfo, setRefInfo] = useState({});

  useEffect(() => {
    fetchTreeByRoot(currWallet); // Fetch tree using current wallet
  }, [currWallet]);

  const fetchTreeByRoot = (rootAddress) => {
    let data = JSON.stringify({
      walletAddress: rootAddress,
    });

    let config = {
      method: "post",
      url: `${API_ENDPOINT}management/userMapDown5Level`,
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      data: data,
    };

    Axios.request(config)
      .then((response) => {
        setTreeData(response.data.root);
        setUserRoot(response.data.root.userInfo);
        if (Object.keys(root).length === 0) {
          setRoot(response.data.root.userInfo);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closeReflinkModal = () => {
    setModalReflink(false);
  };

  function handleOpenModal(open) {
    closeReflinkModal();
  }

  const isSmallScreen = window.innerWidth <= 768;

  const handleGenerateRefLink = (rootId, placementId, side) => {
    if (!rootId || !placementId || !side) return;

    let data = JSON.stringify({
      rootWalletAddress: rootId,
      placementWalletAddress: placementId,
      side: side,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${API_ENDPOINT}management/generate-ref-link`,
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      data: data,
    };

    Axios.request(config)
      .then((response) => {
        if (!response.data) {
          toast.error("Rootid or placementid doesnt existed", {
            position: "top-right",
            autoClose: 1500,
          });
        } else {
          setRefInfo(response.data);
          setModalReflink(true);
        }
      })
      .catch((error) => {
        toast.error(error, {
          position: "top-right",
          autoClose: 1500,
        });
      });
  };

  const handleCopyRefLink = (refCode) => {
    const currentUrl = `${window.location.origin}/refcode=${refCode}`;
    console.log(currentUrl);

    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        // You can also trigger a toast or visual feedback here if needed
        toast.success("Referral link copied to clipboard", {
          position: "top-right",
          autoClose: 1500,
        });
      })
      .catch((error) => {
        toast.error("Failed to copy referral link: ", error, {
          position: "top-right",
          autoClose: 1500,
        });
      });
  };
  

  const handleClick = (address) => {
    setPrevWallets((prev) => [...prev, currWallet]); // Push current wallet to prev wallets stack
    setCurrWallet(address); // Update current wallet to the new address
  };

  const handleGoBack = () => {
    setPrevWallets((prev) => {
      if (prev.length === 0) return prev; // No previous wallets
      const lastWallet = prev[prev.length - 1]; // Get the last wallet
      setCurrWallet(lastWallet); // Set it as current wallet
      console.log("ok");
      return prev.slice(0, -1); // Remove the last wallet from the stack
    });
  };

  const renderTree = (node, depth = 0, position = 0, parent, side) => {
    if (depth > 3) return null; // Limit depth to 5 levels (0-4)

    const displayName = node?.userInfo?.displayName || null;

    return (
      <li key={`${depth}-${position}`}>
        <div className={`node  ${!displayName ? "placeholder" : ""}`}>
          {displayName ? (
            <a
              className="glass"
              onClick={() => {
                handleClick(node.userInfo.walletAddress);
              }}
            >
              <p>{displayName}</p>

              <p className="sponsor">
                Sponsor: {node.userInfo?.rootDisplayName || "N/A"}
              </p>
              <p className="sponsor">Sales: {node.userInfo?.sales || 0}</p>
              <p className="sponsor">
                Left: {node.userInfo?.teamSalesLeft || 0}
              </p>
              <p className="sponsor">
                Right: {node.userInfo?.teamSalesRight || 0}
              </p>
            </a>
          ) : parent ? (
            <a
              onClick={() => {
                handleGenerateRefLink(root.walletAddress, parent, side);
              }}
            >
              <FontAwesomeIcon
                icon={faUserPlus}
                style={{ fontSize: "30px", paddingTop: "30px" }}
              />
            </a>
          ) : (
            <a></a>
          )}
        </div>
        <ul>
          {/* Render left subtree */}
          {renderTree(
            node?.left,
            depth + 1,
            position * 2,
            node?.userInfo.walletAddress,
            "left"
          )}
          {/* Render right subtree */}
          {renderTree(
            node?.right,
            depth + 1,
            position * 2 + 1,
            node?.userInfo.walletAddress,
            "right"
          )}
        </ul>
      </li>
    );
  };

  return (
    <div className="tree">
      <button
        className="glass-button"
        onClick={handleGoBack}
        disabled={prevWallets.length === 0}
      >
        Back
      </button>
      <ul className="tree-ul">
        {renderTree(treeData)} {/* Render the entire tree */}
      </ul>

      <ReflinkModal
        isOpen={modalReflink}
        onRequestClose={closeReflinkModal}
        contentLabel="Reflink information"
      >
        <CloseButton
          onClick={(e) => handleOpenModal(false)}
          style={{ zIndex: "9999" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20.39 20.39"
        >
          <title>X</title>
          <line
            x1="19.39"
            y1="19.39"
            x2="1"
            y2="1"
            fill="none"
            stroke="#5c3aff"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            x1="1"
            y1="19.39"
            x2="19.39"
            y2="1"
            fill="none"
            stroke="#5c3aff"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
        </CloseButton>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%", // Ensure the content takes the full height of the modal
          }}
        >
          <section
            className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} investment-card sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}
          >
            <div className="flex-1 flex flex-col">
              <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div>
                  <label className="block text-white text-sm font-bold mb-2">
                    Display name of root
                  </label>
                  <input
                    className="bg-white text-dark shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    value={refInfo.rootDisplayName}
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-bold mb-2">
                    Display name of placement
                  </label>
                  <input
                    className="bg-white text-dark shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    value={refInfo.placementDisplayName}
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-bold mb-2">
                    Side
                  </label>
                  <input
                    className="bg-white text-dark shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    value={refInfo.side}
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-bold mb-2">
                    Reflink
                  </label>
                  <div className="flex flex-row items-center relative">
                    <input
                      className="bg-white text-dark shadow appearance-none border rounded w-full py-2 px-3 pr-10 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      value={`https://www.kaspool.io/refcode=${refInfo.code}`}
                      readOnly
                      onClick={() => handleCopyRefLink(refInfo.code)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </ReflinkModal>
      <ToastContainer stacked />
    </div>
  );
};

export default Tree;
