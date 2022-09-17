import { useMoralis, useWeb3Contract } from "react-moralis" // "useWeb3Content" is used as a hook for getting the contract to work on our
//front-end
//import { chainId } from "react-moralis"

import { abi, contractAddresses } from "../constants" //"../constants/index.js"  // we can import the file but we imported the whole folder
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"
//import { handleClientScriptLoad } from "next/script"
export default function LotteryEntrance() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdHex)

    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    // const { entranceFee, setEntranceFee } = useState("0")
    const [entranceFee, setEntranceFee] = useState("0") // "setEntranceFee" is the function to update the "entranceFee", // we are giving "0"
    //as the starting value
    const [numPlayers, setnumPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")
    ;/"useState" hook will allow re-render of the front-end, otherwise the entrance fee wont be visible as the webpage doesnt get it on time/
    const dispatch = useNotification() //gives us that "pop-up" that we want

    //MOrali is smart enough to know that which is a view function and which is a tx, so the tx one populate Metamask to popup

    //enterRaffle is a tx function
    const {
        runContractFunction: enterRaffle,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        params: {},
        msgValue: entranceFee /* */,
    })

    //getEntranceFee is a view function
    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
    })
    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getNumberOfPlayers",
        params: {},
        //  msgValue: entranceFee /* */,
    })
    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getRecentWinner",
        params: {},
        msgValue: entranceFee /* */,
    })
    async function updateUI() {
        //cant use await outside this "updateUI" async function
        const entranceFeeFromCall = (await getEntranceFee()).toString()
        const numPlayersFromCall = (await getNumberOfPlayers()).toString()
        const recentWinnerFromCall = await getRecentWinner()
        setEntranceFee(entranceFeeFromCall)
        setnumPlayers(numPlayersFromCall)
        setRecentWinner(recentWinnerFromCall)
        //console.log(entranceFee)
    }
    useEffect(() => {
        if (isWeb3Enabled) {
            //try to read the entrance Fee
            updateUI()
        }
    }, [isWeb3Enabled])

    // should use another useEffect() to listen for the event  "RequestedRaffleWinner" and use that listener to auto refresh the
    // front-end accordingly

    const handleSuccess = async function (tx) {
        await tx.wait(1) //not checking the block confirmation, instead checking if the tx was successfully sent to metamask
        handleNewNotification(tx)
        updateUI()
    }
    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Tx Notification",
            position: "topR",
            icon: "bell",
        })
    }
    return (
        <div className="p-5 rounded ml-auto">
            Ready to Go ! !
            {raffleAddress ? (
                <div>
                    <button
                        className="bg-blue-400 hover:bg-blue-500 text-white  font-bold py-2 px-4 rounded ml-auto"
                        onClick={async function () {
                            await enterRaffle({
                                onSuccess: handleSuccess,
                                onError: (error) => console.log(error),
                            })
                        }}
                        disabled={isLoading || isFetching} // here we are saying the code to disable the "connect" button while we are loading or fetching data
                    >
                        {isLoading || isFetching ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            <div>Enter Raffle</div>
                        )}
                    </button>
                    <div>Entrance Fee: {ethers.utils.formatUnits(entranceFee, "ether")}</div>
                    <div>ETH Number of Players: {numPlayers}</div>
                    <div>RecentWinner: {recentWinner}</div>
                </div>
            ) : (
                <div>No Raffle Address Detected</div>
            )}
        </div>
    )
}
