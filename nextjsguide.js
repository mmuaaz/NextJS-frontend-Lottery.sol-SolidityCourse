//Guide to get started and work with this project
// RUN COMM:yarn create next-app .
//copy yarn.lock and package.json files from @patrick github repo; then RUN COMM: yarn
// RUN COMM:yarn add --dev prettier
;/index.js is the default page where we use "NextJS"; this is where we be able to use JS and HTML together/
// inside index.js is where all the ReactJS syntax
//NextJS is based on ReactJs
//Imports work with our front end and require works with backend
// To run all of this we run command RUN COMM: yarn run dev
;/app.JS is gonna be an entry point for everything/
// So the way REACT and NEXTJS works is you everything written as "components" which has lots of HTML syntax with JS in it
//all of our pages gets wrapped through this "_app.js". In this "_app.js" the page is written as a component
// and on this homepage we are sticking "index.js" in here, we are swapping out components for index.js
;/Api is when we want to get HTTP POST request/
;/styles is gonna be CSS for our project/
// CSS  => Cascading Style Sheets: Its a way to style your HTML
;/Manual Header: Creating a folder "components" and a file with name "header.js" or "header.jsx"*/
;/Components are independent and reusable bits of code./
//They serve the same purpose as JS functions, but work in isolation and return HTML.
//We are gonna create a chunk of HTML and export it to our index.js
//We are only gonna be using our header in one ;/are*/, its still nice to modularize the project regardless
//to get started, its gonna be "functional" base component
;/React-moralis/
//https://www.npmjs.com/package/react-moralis
//RUN COMM: yarn add moralis react-moralis     /as we already have react and react-dom in the "package.json"
// we are not using "dev dependencies" "--dev" tags, because for our production built; when we actually create the website, you will need moralis
//and "react-moralis", but we dont need "prettier", so "dev dependencies" in the "package.json" represent dependencies that we use for our back-end
//developments and these dev dependencies come in handy for that purpose only
;/"Hook"/
// Hook let you "hook-into" React state and lifecycle features
//in order to useMorralis our entire application(in our "_app.js" in function MyApp after return keyword) needs to be wrapped around whats called "MoralisProvider" which is gonna be a context provider for us
;/REACT HOOKS/
// Hooks allow function components to have access to state and other React features. Because of this, class components are generally no longer needed.
// We want our application to be different when we are connected to Metamask versus when we are not
// We want our front-end to re-render when we connect to a wallet and render again when we disconnect
;/HOOK*/ //allows us to work with "state" and this automatically re-render for us when we change states
;/Jsx Files/ // in raw HTML files we cant just use JS code where we want but in "JSX" files, we can by using "{}" these brackets
;/useEffect/ //is a "core React Hook";   /it is a function that takes 2 parameters;  a function, and optionally it takes a dependency array as its secodn parameter
// so what useEffect does is it keeps checking the dependency array for a change in value, whenever something changes there, it calls a function and then re-render the front-end
;/StrictMode renders components twice (on dev but not production) in order to detect any problems with your code and warn you about them (which can be quite useful)./
;/circular renders/ //possible with the use of "no dependencies" if you have some useEffect() that changes some value and you have another useEffect() that re-renders when that value changes; then they will keep changing back and fourth
;/onAccountChanged/ // takes a function
;/Creating the Header and Robust Connect button by installing a web3uikit****/
// create a new folder in "components" folder with the name "Header.js"
// import { ConnectButton } from "web3uikit"
// export default function Header() {
//     return (
//         <div>
//             <ConnectButton moralisAuth={false} />
//         </div>
//     )
// }
//RUN COMM: yarn add web3uikit
;/LotteryEntrance.js/ // creating a file with this name in this "componenets" folder
//We should create and update front end deploy script, so after we deploy stuff, we run a little script that will create this "constant" folder for us with a whole bunch of stuff
// we write this script which is connected to our front end so that whenever we deploy the contracts and no matter what chain we are on; it runs our front-end accordingly and update our "constants" folder
// So another thing we did, is added a variable in the ".env" file, so that we configure if we want to update our front-end or not, because sometimes we dont want to care about front end
;/created "constants" folder and files "abi.json", "contractAddresses.json"/
;/created a file with name "index.js" where we import both abi and contractAddresses and then export them in the same file/
;/extracting chainId from "useMoralis"/ // the reason why moralis knows about chainId is, because in the "header" componenet, we had connected the metamask with moralis provider
//so thats how it knows about the chainId that we are on, this gets passed to all the components indside those moralis provided tags
;/"runContractFunction" can both send tx and read State/ // this one of the ways we can send tx and send function
//One of the ways that we are gonna do it right when our Lottery.sol loads, we are gonna run a function to read that "entranceFee" value, we can do this by using useEffect()
// useEffect() can keep running and look for changes in some parameter
//We only wanna to try and get the raffle entrance Fee if "web3 is enabled"
;/"useNotifications/ // Imported "NotificationsProvider" in "_app.js" and wrapped "components" around <NotificationsProvider>
;/styling/ // we have "components" library and "css" libraries to allow us to import pre-done code blocks for us to use in our front-end
;/TAILWINDCSS/ //web3schools.con/css     //tailwindcss, postcss, autoprefixer these are gonna make up tailwind with NextJS
//search tailwind with NextJs installation:     https://tailwindcss.com/docs/guides/nextjs
// follow along the commands with "yarn" package installer
//copy the code written there to update the file "tailwind.config.js" which we got from running the commands
;/install "PostCSS Language Support" extension /
/*  <h1 className="py-4 px-4 font-blog text-3xl">Decentralized Lottery</h1>*/ // this code is settnig header1, x-padding 4, y-padding-4, bold text and font size-3xl
// <div className="ml-auto py-2 px-4">                              // ml-atuo    is automatic left margin
// className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded ml-auto"     here we are saying use background blue of shade 400, when mouse hovers it the background changes to shade of 500
//text color is white font be bold and the postion on the y-axis be at 2, while at x-axis be 4, and the left margin be auto
;/IPFS/ // https://www.ipfs.io
//Its decentralized distributed data structure thats not BC but similar to a BC, there is no mining but there is "pining data"/
// IPFS allows us to create a Tx HASH for our html data, which then hosted on our node, that data can be optionally pinned by other nodes and then many of these nodes be running this data
//in a decetralized manner, all the other nodes has the same Hashing algorithm
;/static website can be created with NEXT JS/
//IPFS just hosts code, it doesnt have the ability to run any server stuff so we dont want any of the server stuff to be added on our websites, thats why we create a static website
// RUN COMM: yarn build         //it is like a production build
//There is some server based applications that NEXTJS comes automatically rendered as static HTML, that if we use them static build wont work
// to check we RUN COMM: yarn next export;      it should fail if you have any of that non-static stuff
// We should get a "out " folder which contains our static code, that we can use on IPFS, if you dont want to use static stuff "useMoralis" and "NEXTJS" both gives the optionality to
//to not have the static code
;/import the "out" folder/ //to IPFS and pin it to the local node; copy the CID and open page on the browser ipfs://<CID>
;/Hosting on IPFS & Filecoin using Fleek/ //fleek.co
