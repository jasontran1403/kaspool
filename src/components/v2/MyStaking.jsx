import React, { useState } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";

const MyStaking = ({
  TABLE_HEAD,
  TABLE_ROWS,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;

  // Filter rows based on search term
  const filteredRows = TABLE_ROWS.filter((row) =>
    row.stakingCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Total pages
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  // Sliced rows for the current page
  const currentRows = filteredRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Next page handler
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Previous page handler
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Format the time
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const time = `${hours}:${minutes}:${seconds}`;

    // Format the date
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    return { time, date: formattedDate };
  };

  const formatNumber = (numberString) => {
    // Parse the input to ensure it's a number
    const number = parseFloat(numberString);

    if (isNaN(number)) return numberString; // Return original if parsing fails

    // Format the number with commas and two decimal places
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  };

  const shortenCode = (input) => {
    if (typeof input !== "string" || input.length < 8) {
      return input; // Return the input as is if it's not a string or too short
    }
    return input.substring(0, 3) + "..." + input.substring(input.length - 3);
  };

  const handleCopy = (input) => {
    navigator.clipboard.writeText(input)
      .then(() => {
        // You can also trigger a toast or visual feedback here if needed
        toast.success(`Staking code has been copied`, {
          position: "top-right",
          autoClose: 1500,
        });
      })
      .catch((error) => {
        toast.error("Failed to copy: ", error, {
          position: "top-right",
          autoClose: 1500,
        });
      });
  };

  return (
    <div className="fadeIn">
      <div className="card-container">
        <div className="card-items">
          <Card className="card-blue-green h-full w-full flex flex-col ">
            <CardHeader
              floated={false}
              shadow={false}
              className="bg-transparent rounded-none"
            >
              <div className="mb-[15px] mt-[15px] flex flex-col justify-between gap-8 md:flex-row md:items-center">
                <div className="flex w-full ">
                  <div className="w-full md:w-72 relative ">
                    <input
                      type="text"
                      placeholder="Search by code"
                      className="pl-4 w-full pr-10 rounded px-3 py-3 input-white"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1); // Reset to page 1 on search
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardBody className="flex overflow-x-auto px-0 hide-scroll">
              <table className="w-full min-w-max table-auto">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className={`border-y p-2 ${head === "Status" ? "text-right" : "text-left"}`}
                      >
                        <Typography
                          variant="small"
                          color="white"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="min-h-[20rem]">
                  {currentRows.map(
                    ({ stakingCode, amount, date, status, period, remain }, index) => {
                      const isLast = index === currentRows.length - 1;
                      const classes = isLast
                        ? "pt-2 pl-2 pr-2 border-b pb-2"
                        : "p-2 border-b border-blue-gray-50";

                      return (
                        <tr key={stakingCode}>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="white"
                              className="font-normal cursor-pointer"
                            >
                              Staking
                            </Typography>
                            <Typography
                              variant="small"
                              color="white"
                              className="font-normal cursor-pointer"
                              onClick={() => { handleCopy(stakingCode) }}
                            >
                              {shortenCode(stakingCode)}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography variant="small" color="white" className="font-normal">
                              {formatDate(date * 1000).time}
                            </Typography>
                            <Typography variant="small" color="white" className="font-normal">
                              {formatDate(date * 1000).date}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="white"
                              className="font-normal"
                            >
                              {formatNumber(amount)}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <div
                              className={`w-full rounded h-4 ${remain === 0 ? 'bg-red-500' : 'bg-gray-300'}`}>
                              <div
                                className={`h-4 rounded ${remain === 0 ? 'bg-red-500' : 'bg-green-400'}`}
                                style={{ width: `${(remain / period) * 100}%` }}
                              ></div>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </CardBody>
            <CardFooter className="flex items-center justify-center border-blue-gray-50 mt-[-19px] mb-[-4px]">
              <div className="flex items-center gap-2">
                <Button
                  variant="outlined"
                  color="white"
                  size="sm"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>

                <Typography variant="small" color="white">
                  Page {currentPage} of {totalPages}
                </Typography>

                <Button
                  variant="outlined"
                  size="sm"
                  color="white"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MyStaking;
