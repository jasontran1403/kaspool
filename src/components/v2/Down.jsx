import Deposit from "./Deposit";
import Staking from "./Staking";
import MyStaking from "./MyStaking";

const Down = (props) => {
    return (
        <div className="fadeIn">
            {props.selectedDownTab === "Deposit" && <Deposit
            />}
            {props.selectedDownTab === "Staking" && <Staking
                connectedBalance={props.connectedBalance}
                usdtWallet={props.usdtWallet}
                bep20={props.bep20}
            />}
            {props.selectedDownTab === "My Staking" && <MyStaking
                usdtBalance={props.usdt}
                transferWallet={props.transferWallet}
            />}
        </div>
    )
};

export default Down;