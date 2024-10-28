import { useState, useEffect } from "react";
import Axios from "axios";
import { close, menu } from "../assets";
import logo from "../assets/logo.png";
import { userNavLinks } from "../constants";
import { API_ENDPOINT } from "../constants";
import TrustWalletConnect from "./TrustWalletConnect";
import { useLocation, Navigate } from "react-router-dom";

const UserNavbar = () => {
  const locationRef = useLocation();

  // Extract the full path after "/"
  const fullPath = locationRef.pathname.slice(11); // Remove leading "/"
  // Check if the path matches "refcode=<actual-code>"
  const refcodeMatch = fullPath.match(/^refcode=(.+)$/);

  const refcode = refcodeMatch ? refcodeMatch[1] : null;

  console.log(refcode);
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [wallet] = useState(localStorage.getItem("walletAddress"));
  const isAdmin = window.location.href.includes("/admin");
  const id = location.pathname.split("/admin/dashboard/")[1];

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleOpenModal = () => {
    openModal();
  };

  const handleDisconnect = async () => {
    // Xóa thông tin ví khi ngắt kết nối
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("publicKey");
    localStorage.removeItem("walletStateInit");
    localStorage.removeItem("is_in_tree");
    localStorage.removeItem("is_lock");
    localStorage.removeItem("bep20");
    let config = {
      method: "get",
      url: `${API_ENDPOINT}auth/logout/${localStorage.getItem("access_token")}`,
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    };

    Axios.request(config).then((response) => {
      if (response.data) {
        window.location.href = "/";
      }
    });
  };

  return (
    <nav className="w-full flex flex-1 justify-between items-center navbar">
      <a href="/" className="">
        {/* <img
          src={logo}
          alt="hoobank"
          className="hidden md:flex lg:w-[200px] lg:h-[80px] w-[160px] h-[60px] logo-glow"
        /> */}
      </a>
      <ul className="list-none sm:flex hidden justify-center items-center flex-1 mx-10">
        {userNavLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-white" : "text-dimWhite"
            } ${index === userNavLinks.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={() => {
              setActive(nav.title);
              handleOpenModal(true, index);
            }}
          >
            {isAdmin ? (
              <a href={`/admin/${nav.id}/${id}`}>{nav.title}</a>
            ) : refcode !== null && nav.id === "dashboard" ? (
              <a href={`/${nav.id}/refcode=${refcode}`}>{nav.title}</a>
            ) : (
              <a href={`/${nav.id}`}>{nav.title}</a>
            )}
          </li>
        ))}
      </ul>
      <div className="flex justify-end items-center">
        <TrustWalletConnect />
      </div>
      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
          style={{ zIndex: 9999 }}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {userNavLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } ${index === userNavLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.title)}
              >
                {isAdmin ? (
                  <a href={`/admin/${nav.id}/${id}`}>{nav.title}</a>
                ) : refcode !== null && nav.id === "dashboard" ? (
                  <a href={`/${nav.id}/refcode=${refcode}`}>{nav.title}</a>
                ) : (
                  <a href={`/${nav.id}`}>{nav.title}</a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
