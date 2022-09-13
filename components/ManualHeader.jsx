import { useMoralis } from "react-moralis"
import { useEffect } from "react"

//to get started, its gonna be "functional" base component
export default function ManualHeader() {
    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } =
        useMoralis() //useMoralis is known as a"hook", "enableWeb3" is a function we are extracting off "useMoralis"
    //"enableWeb3" only works with Metamask
    // const { isWeb3Enabled } = useMoralis()      /checks for if a Metamask wallet is connected to or not
    useEffect(() => {
        if (isWeb3Enabled) return
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("connected")) {
                enableWeb3()
            } // so here are checking if the localstorage has "connected" in it, if it doenst then only run "enable Web3" or ask for "connect" button
        }
        /*if we dont give it the array  it will run anytime something re-renders
    or if we give a blank arry it will run once on load and doesnt return true on Connect*/
    }, [isWeb3Enabled]) // so we are checking anytime we run "enableWeb3" if "isWeb3Enabled" changes
    ;/ Setting the website if we disconnect Metamask, it doesnt keep asking to connect whenever we refresh/
    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`)
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("Null Account Found")
            }
        })
    }, [])
    return (
        <div>
            {account ? (
                <div>
                    Connected to {account.slice(0, 6)}...{account.slice(account.length - 4)}
                    {/* so here we are setting the code so that if someone switches accounts while being CONNECTED, the button shows the
                    changed account */}
                </div>
            ) : (
                <button
                    onClick={async () => {
                        await enableWeb3()
                        if (typeof window !== "undefined") {
                            //we are saying if the "window" object is not undefined; in some version of NextJs there is an
                            //issue o NextJS knowing about this window variable, so we added this syntax to avoid that
                            window.localStorage.setItem("connected", "injected") //we are saying that we ares setting-up an item in "application" where "localstorage"
                            //is there, and creating "connected" to "injected"
                        }
                    }}
                    disabled={isWeb3EnableLoading}
                >
                    Connect
                </button>
            )}
            {/* The above syntax after "return" is enough to write for the Connect button functionality */}
            {/* the syntax in "{account}" is saying if we are connected to an account then Display "Connected to .." otherwise display
            a button with a label "connect" and uppon pressing that button popup Metamask asking permission to connect */}
        </div>
    )
}
