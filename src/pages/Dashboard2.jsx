import Axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import styles from "../style";
import { FooterDashboard, TreeVisualize, UserNavbar } from "../components";
import { useLocation } from "react-router-dom";
import TrustWalletConnect from "../components/TrustWalletConnect";
import Navigation from "../components/Navigation";
import MiningStat from "../components/MiningStat";
import GeneralWallet from "../components/GeneralWallet";
import ToolSwitch from "../components/ToolSwitch";
import ToolTabMining from "../components/ToolTabMining";
import ToolTabDeposit from "../components/ToolTabDeposit";
import ToolTabWithdraw from "../components/ToolTabWithdraw";
import ToolTabTransfer from "../components/ToolTabTransfer";
import BalanceTab from "../components/BalanceTab";
import DepositHistoryTab from "../components/DepositHistoryTab";
import WithdrawHistoryTab from "../components/WithdrawHistoryTab";
import TransferHistoryTab from "../components/TransferHistoryTab";
import MiningHistoryTab from "../components/MiningHistoryTab";
import BalanceSwitch from "../components/BalanceSwitch";
// import HashRate from "../components/HashRate";
import Download from "../components/Download";
import { API_ENDPOINT } from "../constants";
import Affiliate from "../components/Affiliate";
import logo from "../landingpage-assets/img/resources/logo-white.png";
import AccountInfo from "../components/AccountInfo";
import DirectTreeView from "../components/DirectTreeView";
import { MultiTabDetectContext } from "../components/MultiTabDetectContext";
import Socials from "../components/Socials";
import DashboardNavbar from "../components/DashboardNavbar";

const Dashboard2 = () => {
  const { multiTabDetect } = useContext(MultiTabDetectContext);

  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("walletAddress")
  );
  const [publicKey, setPublicKey] = useState(localStorage.getItem("publicKey"));
  const [walletStateInit, setWalletStateInit] = useState(
    localStorage.getItem("walletStateInit")
  );
  const [isOpen, toggle] = useState(false);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );

  const [isInTree] = useState(localStorage.getItem("is_in_tree"));
  const [isLock] = useState(localStorage.getItem("is_lock"));

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalLock, setModalLock] = useState(false);

  const location = useLocation();

  const fullPath = location.pathname.slice(1); // Remove leading "/"

  const refcodeMatch = fullPath.match(/^refcode=(.+)$/);
  const refcode = refcodeMatch ? refcodeMatch[1] : null;

  function handleOpenModal(open) {
    closeLockModal();
  }

  useEffect(() => {
    if (isInTree === "true") {
      setModalLock(false);
    } else if (isInTree === "false") {
      setModalLock(true);
    }
  }, [isInTree]); // Trigger when notification modal closes

  const closeModal = () => {
    setIsOpen(false);
  };

  const closeLockModal = () => {
    setModalLock(false);
  };

  const [currentToolTab, setCurrentToolTab] = useState(1);
  const handleSwitchToolTab = (id) => {
    if (currentToolTab === id) {
      setCurrentToolTab(1);
    } else {
      setCurrentToolTab(id);
    }
  };

  const [currentBalanceTab, setCurrentBalanceTab] = useState(1);
  const handleSwitchBalanceTab = (id) => {
    if (currentBalanceTab === id) {
      setCurrentBalanceTab(1);
    } else {
      setCurrentBalanceTab(id);
    }
  };

  const [currentNavigationTab, setCurrentNavigationTab] = useState(1);
  const handleSwitchNavbar = (id) => {
    if (currentNavigationTab !== id) {
      setCurrentNavigationTab(id);
    }
  };

  const [balance, setBalance] = useState(0);
  const [rank, setRank] = useState(0);
  const [totalMining, setTotalMining] = useState(0);
  const [totalReward, setTotalReward] = useState(0);
  const [totalCommission, setTotalCommission] = useState(0);
  const [maxout, setMaxout] = useState(0);
  const [direct, setDirect] = useState(0);
  const [binary, setBinary] = useState(0);
  const [leader, setLeader] = useState(0);
  const [teamSalesLeft, setTeamSalesLeft] = useState(0);
  const [teamSalesRight, setTeamSalesRIght] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [pop, setPop] = useState(0);
  const [usdt, setUsdt] = useState(0);
  const [dailyReward, setDailyReward] = useState(0);
  const [transfer, setTransfer] = useState(0);
  const [totalDirect, setTotalDirect] = useState(0);
  const [totalBinary, setTotalBinary] = useState(0);
  const [totalLeader, setTotalLeader] = useState(0);
  const [totalPop, setTotalPop] = useState(0);


  useEffect(() => {
    let config = {
      method: "get",
      url: `${API_ENDPOINT}management/balance/${walletAddress}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "ngrok-skip-browser-warning": "69420",
      },
    };

    Axios.request(config)
      .then((response) => {
        let usdtResponse = response.data.balances[0].balance;
        let directResponse = response.data.balances[2].balance;
        let binaryResponse = response.data.balances[3].balance;
        let leaderResponse = response.data.balances[4].balance;
        let popResponse = response.data.balances[5].balance;
        let transferResponse = response.data.balances[6].balance;
        let maxoutResponse = response.data.balances[7].balance;
        let rewardResponse = response.data.balances[8].balance;
        setUsdt(usdtResponse);
        setDirect(directResponse);
        setBinary(binaryResponse);
        setLeader(leaderResponse);
        setPop(popResponse);
        setMaxout(maxoutResponse);
        setDailyReward(rewardResponse);
        setTransfer(transferResponse);

        setTotalReward(response.data.totalReward);
        setTotalDirect(response.data.totalDirect);
        setTotalBinary(response.data.totalBinary);
        setTotalLeader(response.data.totalLeader);
        setTotalPop(response.data.totalPop);
        setRank(response.data.rank);
        setTeamSalesLeft(response.data.leftTeamSales);
        setTeamSalesRIght(response.data.rightTeamSales);
        setTotalSales(response.data.totalSales);
        setTotalMining(response.data.totalMining);
        console.log(response.data.totalSales);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [currentAffiliateTab, setCurrentAffiliateTab] = useState(1);

  const handleSwitchAffiliateTab = (id) => {
    if (currentAffiliateTab === id) {
      setCurrentAffiliateTab(1);
    } else {
      setCurrentAffiliateTab(id);
    }
  }

  return (
    <div className="w-full h-auto">
      <div className={` hidden sm:flex`}>
        <div className={``}>
          <DashboardNavbar handleSwitchNavbar={handleSwitchNavbar} />
        </div>
      </div>

      <div className={`p-[10px] flex-col sm:hidden`}>
        <div className="flex justify-between  items-center">
          <a className="cursor-pointer pl-[30px] relative" href="/">
            <div className="relative inline-block">
              <img
                className={`${currentNavigationTab === 3 ? "rank" : "logo"}`}
                src={currentNavigationTab === 3 ? (rank > 0 ? `src/assets/rank/${rank}.png` : logo) : logo}
                width={80}
                height={80}
                alt=""
              />
              {(currentNavigationTab === 3 && rank > 0) && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
                  {rank}
                </span>
              )}
            </div>
          </a>

          <TrustWalletConnect />
        </div>
      </div>


      {currentNavigationTab === 3 && <div className="dashboard-container animation-show-dashboard sm:mt-[0px]">
        <ToolSwitch
          handleSwitchToolTab={handleSwitchToolTab}
          active={currentToolTab}
          className="w-full" // Adjust width for small screens
        />

        {currentToolTab === 2 &&
          <ToolTabMining
          />
        }

        {currentToolTab === 3 &&
          <ToolTabDeposit
          />
        }

        {currentToolTab === 4 &&
          <ToolTabWithdraw
          />
        }

        {currentToolTab === 5 &&
          <ToolTabTransfer
          />
        }

        {currentToolTab === 1 && <><GeneralWallet
          usdt={usdt}
          transfer={transfer}
          totalMining={totalMining}
          dailyReward={dailyReward}
          rank={rank}
          className="w-full" // Adjust width for small screens
        />

          <BalanceTab
            className="w-full"
            usdt={usdt}
            kaspa={200}
            ratioKaspa={0.1533}
            nacho={300}
            ratioNacho={0.0001424}
            kaspy={400}
            ratioKaspy={0.00003199}
            kasper={500}
            ratioKasper={0.0002701}
          /></>}
      </div>}

      {currentNavigationTab === 4 && <div className="dashboard-container animation-show-dashboard sm:mt-[0px]">
        <BalanceSwitch
          handleSwitchBalanceTab={handleSwitchBalanceTab}
          active={currentBalanceTab}
          className="w-full" // Adjust width for small screens
        />
        {currentBalanceTab === 1 &&
          <MiningHistoryTab
          />
        }
        {currentBalanceTab === 2 &&
          <DepositHistoryTab
          />

        }
        {currentBalanceTab === 3 &&
          <WithdrawHistoryTab
          />

        }
        {currentBalanceTab === 4 &&
          <TransferHistoryTab
          />
        }


      </div>}

      {currentNavigationTab === 5 && <div className="dashboard-container animation-show-dashboard sm:mt-[0px]">
        <Download
        />

        {/* <HashRate
        /> */}
      </div>}

      {currentNavigationTab === 2 && <div className="dashboard-container animation-show-dashboard sm:mt-[0px]">
        <Affiliate
          active={currentAffiliateTab}
          handleSwitchAffiliateTab={handleSwitchAffiliateTab}
        />

        {currentAffiliateTab === 1 &&
          <MiningStat
            personalSales={totalSales}
            teamSalesLeft={teamSalesLeft}
            teamSalesRight={teamSalesRight}
            personalReward={totalReward}
            directCommission={totalDirect}
            leaderCommission={totalLeader}
            popCommission={totalPop}
            binaryCommission={totalBinary}
            affiliateReward={totalCommission}
          />
        }

        {currentAffiliateTab === 2 &&
          <div className="w-full sm:w-[80svw] mx-auto sm:mb-[30px] w-[80svw] border border-gray-200 rounded-lg shadow">
            <div className="flex flex-col justify-between items-center w-full h-auto pt-[20px] pb-[20px]">
              <TreeVisualize />
            </div>
          </div>
        }

        {currentAffiliateTab === 3 &&
          <div className="w-full sm:w-[80svw] mx-auto sm:mb-[30px] w-[80svw] ">
            <div className="card-blue-green flex flex-col justify-between items-center w-full h-auto pl-[20px] pr-[20px] pt-[20px] pb-[20px] border rounded-lg">
              <DirectTreeView />
            </div>
          </div>}
      </div>}

      {currentNavigationTab === 1 && <div className="dashboard-container animation-show-dashboard sm:mt-[0px]">
        <AccountInfo
          totalSales={totalSales}
          maxout={maxout}
          root="root"
        />
      </div>}

      <div className="flex sm:hidden bottom-navigation">
        <Navigation handleSwitchNavbar={handleSwitchNavbar} />
      </div>
      <div className="hidden sm:block">
        {isInTree === "true" && (
          <FooterDashboard />
        )}
      </div>
    </div>
  );
};

export default Dashboard2;