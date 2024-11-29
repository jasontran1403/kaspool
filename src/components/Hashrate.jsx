const HashRate = (props) => {
  const isAdmin = window.location.href.includes('/admin');
  const id = location.pathname.split('/admin/dashboard/')[1];

  const formatNumber = (numberString) => {
    // Format the number with commas
    const formattedNumber = new Intl.NumberFormat("en-US").format(numberString);
    return formattedNumber;
  };

  const formatDate = (dateString) => {
    // Create a new Date object
    const date = new Date(dateString);

    // Format the time
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // Format the date
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();

    const formattedDate = `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;

    return formattedDate;
  };

  return (
    <div className="card-blue-green sm:w-[80svw] w-[80svw] sm:mb-[30px] mx-auto border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h3 className="text-white text-xl text-center flex document pt-[20px] pb-[10px] pl-[20px] pr-[20px]">Hashrate</h3>
      <div className="flex flex-row justify-center items-center w-full pt-[20px] pb-[20px] pl-[20px] pr-[20px]">
        <h5 className="text-xl font-medium text-white text-center">
          Coming Soon
        </h5>
      </div>
    </div>
  );
};

export default HashRate;
