import { ConnectButton } from "web3uikit"
export default function Header() {
    return (
        <div className="p-5 border-b-2 flex flex-row">
            <h1 className="bg-green-400 text-white font-bold py-4 px-4 font-blog text-3xl rounded m1-auto ">
                Decentralized Lottery
            </h1>
            <div className="ml-auto py-2 px-4">
                <ConnectButton moralisAuth={false} />
            </div>
        </div>
    )
}
