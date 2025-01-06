import Deposit from "./Deposit";
import Staking from "./Staking";
import MyStaking from "./MyStaking";

const Down = (props) => {
    return (
        <div className="fadeIn">
            {props.selectedDownTab === "Deposit" && <Deposit
            />}
            {props.selectedDownTab === "Staking" && <Staking
                usdtWallet={props.usdtWallet}
                kaspaBalance={props.kaspaBalance}
            />}
            {props.selectedDownTab === "My Staking" && <MyStaking
                usdtBalance={props.usdt}
                transferWallet={props.transferWallet}
            />}
        </div>
    )
};

export default Down;