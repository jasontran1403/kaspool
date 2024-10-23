import Axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import ReactDOM from "react-dom/client";
import Router from "./routes";
import "./index.css";

import { API_ENDPOINT } from "./constants";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [isConnected] = useState(localStorage.getItem("walletAddress")?.length > 0 ? true : false);
  const [lastStatus, setLastStatus] = useState();
  const isAdmin = window.location.href.includes("/admin");
  const id = location.pathname.split("/admin/dashboard/")[1];

  useEffect(() => {
    var timeout;

    if (isAdmin) {
      timeout = setTimeout(() => {
        let data = JSON.stringify({
          walletAddress: id,
        });

        let config = {
          method: "post",
          url: `${API_ENDPOINT}auth/admin-jwt`,
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
          data: data,
        };

        Axios.request(config).then((response) => {
          console.log("ok123 " + id);
          localStorage.setItem("walletAddress", response.data.wallet_address);
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("is_in_tree", response.data.is_in_tree);
          localStorage.setItem("is_lock", response.data.is_lock);
          localStorage.setItem("bep20", response.data.bep20);
        });
      }, 500);
    } else {
      if (isConnected) {
        // Lưu địa chỉ ví vào localStorage
        
        timeout = setTimeout(() => {
          let data = JSON.stringify({
            walletAddress: localStorage.getItem("walletAddress"),
            publicKey: localStorage.getItem("walletAddress"),
            walletStateInit: localStorage.getItem("walletAddress"),
          });

          let config = {
            method: "post",
            url: `${API_ENDPOINT}auth/authenticate`,
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "69420",
            },
            data: data,
          };

          Axios.request(config).then((response) => {
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("is_in_tree", response.data.is_in_tree);
            localStorage.setItem("is_lock", response.data.is_lock);
            localStorage.setItem("bep20", response.data.bep20);
          });
        }, 500);
      } else {
        // Xóa thông tin ví khi ngắt kết nối
        localStorage.removeItem("walletAddress");
        localStorage.removeItem("publicKey");
        localStorage.removeItem("walletStateInit");
        localStorage.removeItem("is_in_tree");
        localStorage.removeItem("is_lock");
        localStorage.removeItem("access_token");
        localStorage.removeItem("bep20");
        localStorage.removeItem("management");

        let config = {
          method: "get",
          url: `${API_ENDPOINT}auth/logout/${localStorage.getItem(
            "access_token"
          )}`,
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        };

        Axios.request(config).then((response) => {
          if (response.data) {
            if (lastStatus) {
              setLastStatus(false);
              window.location.href = "/";
            }
          }
        });
      }
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isConnected]);

  return <Router />;
}

Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </React.StrictMode>
);
