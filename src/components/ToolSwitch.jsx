import mining from "../assets/icons/mining.png"
import balance from "../assets/icons/balance.png"
import deposit from "../assets/icons/deposit.png"
import withdraw from "../assets/icons/withdraw.png"
import transfer from "../assets/icons/transfer.png"

const ToolSwitch = (props) => {
  const isAdmin = window.location.href.includes('/admin');
  const id = location.pathname.split('/admin/dashboard/')[1];

  return (
    <div className="card-blue-green sm:w-[80svw] mx-auto sm:mb-[30px] w-[80svw] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-row mx-[20px] justify-between items-center h-full pt-[20px] pb-[20px]">
      <div className={`tool-item  ${props.active === 1 ? "drop-shadow-icon duration-500" : ""}`} onClick={() => props.handleSwitchToolTab(1)}>
          <img src={balance} height={32} width={32} alt="" />
        </div>

        <div className={`tool-item  ${props.active === 2 ? "drop-shadow-icon duration-500" : ""}`} onClick={() => props.handleSwitchToolTab(2)}>
          <img src={mining} height={32} width={32} alt="" />
        </div>

        <div className={`tool-item ${props.active === 3 ? "drop-shadow-icon duration-500" : ""}`} onClick={() => props.handleSwitchToolTab(3)}>
          <img src={deposit} height={32} width={32} alt="" />
        </div>

        <div className={`tool-item ${props.active === 4 ? "drop-shadow-icon duration-500" : ""}`} onClick={() => props.handleSwitchToolTab(4)}>
          <img src={withdraw} height={32} width={32} alt="" />
        </div>

        <div className={`tool-item ${props.active === 5 ? "drop-shadow-icon duration-500" : ""}`} onClick={() => props.handleSwitchToolTab(5)}>
          <img src={transfer} height={32} width={32} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ToolSwitch;
