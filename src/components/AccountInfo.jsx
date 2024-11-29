import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_ENDPOINT } from "../constants";
import { useState } from "react";

const AccountInfo = (props) => {
  const isAdmin = window.location.href.includes('/admin');
  const id = location.pathname.split('/admin/dashboard/')[1];
  const [displayName, setDisplayName] = useState("");
  const [usdtWallet, setUsdtWallet] = useState("");
  const [kaspaWallet, setKaspaWallet] = useState("");

  const formatNumber = (numberString) => {
    // Format the number with commas
    const formattedNumber = new Intl.NumberFormat("en-US").format(numberString);
    return formattedNumber;
  };

  const handleUpdateInfo = () => {
    if (displayName === "" || usdtWallet === "" || kaspaWallet === "") {
      toast.error("Input field is required", {
        position: "top-right",
        autoClose: 1500,
      });

      return;
    }

    Swal.fire({
      title: `Confirm update account info`,
      text: `Are you sure you want to update account info?`,
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
        toast.success("Update account info successful", {
          position: "top-right",
          autoClose: 1500,
          onClose: () => {
            window.location.reload();
          }
        });
      }
    });
  }

  return (
    <div className="card-blue-green sm:w-[80svw] mx-auto sm:mb-[30px] w-[80svw] bg-gray-800 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {/* Use flex to arrange content */}
      <div className="flex flex-col mx-[20px] justify-start content-center items-center pt-[20px] gap-[20px]">
        <div className="info-details-item relative pb-[20px] border-b border-gray-300">
          <span>Name</span>
          <input type="text" placeholder="Display name, default is xxxx...xxxx" />
        </div>

        <div className="info-details-item pb-[10px]">
          <span>USDT(BEP20)</span>
          <input type="text" placeholder="USDT BEP20 wallet address" />
        </div>

        <div className="info-details-item pb-[10px]">
          <span>KASPA</span>
          <input type="text" placeholder="KASPA wallet address" />
        </div>

        <div className="info-details-item pb-[10px]">
          <span>Total Sales</span>
          <input type="text" value={`$${formatNumber(props.totalSales)}`} readOnly disabled />
        </div>

        <div className="info-details-item pb-[10px]">
          <span>Maxout</span>
          <input type="text" value={`$${formatNumber(props.maxout)}`} readOnly disabled />
        </div>

        <div className="info-details-item pb-[10px]">
          <span>Sponsor</span>
          <input type="text" value={props.root} readOnly disabled />
        </div>

        <div className="text-center pb-[20px]">
          <button class="button-43" onClick={handleUpdateInfo} role="button">Update Info</button>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
