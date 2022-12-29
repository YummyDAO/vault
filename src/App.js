import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Hamburger from './components/Hamburger'
import SideMenu from './components/SideMenu'
import About from './components/Testabout'
import Accordion from "./components/Accordion";
import Header from "./components/Header";
import Tabs from "./components/TabComponent/Tabs";
import logo from "./logo.png"
import {ethers} from "ethers";
import contractAbi from './utils/Maddyvault.json';
import ERC20Abi from './utils/Erc20faucet.json';
import { Deposit } from './deposit';

const CONTRACT_ADDRESS = '0x674de548F003506d5B2001413517e2d1ad00348b';//vault
const ERC20 = '0xe6CD223b24138F9bCa15fcDAFb461fdA82D259FD';//testtoken


/*const OpenSeaLink = (props) => {
	return (
		<a className="link" href={`https://testnets.opensea.io/assets/mumbai/${props.contract}/${props.mintId}`} target="_blank" rel="noopener noreferrer">
			<p className="underlined">{' '}{props.linkName}{' '}</p>
		</a>
	);
}*/

const App = () => {

  const [isMenuActive, activeMenu] = useState(false)
  //const  [withdraw, setwithdraw] = useState("")
  //const  [deposit, setdeposit] = useState("")
   const [currentAccount, setCurrentAccount] = useState('');
   const [value, setValue] = useState('');
   const [tvl, settvl] = useState('');
  const [balwallet, setbalwallet] = useState('');
  const [balvault, setbalvault] = useState('');
  const  [price, setprice] = useState("")

  	const connectWallet = async () => {
		try {
			const { ethereum } = window;

			if (!ethereum) {
				alert("Get MetaMask -> https://metamask.io/");
				return;
			}

			// Fancy method to request access to account.
			const accounts = await ethereum.request({ method: "eth_requestAccounts" });
		
			// Boom! This should print out public address once we authorize Metamask.
			console.log("Connected", accounts[0]);
			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log(error)
		}
	};

  	const checkIfWalletIsConnected = async () => {
		// First make sure we have access to window.ethereum
		const { ethereum } = window;
	
		if (!ethereum) {
			console.log("Make sure you have MetaMask!");
			return;
		} else {
			console.log("We have the ethereum object", ethereum);
		}

		// Check if we're authorized to access the user's wallet
		const accounts = await ethereum.request({ method: 'eth_accounts' });

		// Users can have multiple authorized accounts, we grab the first one if its there!
		if (accounts.length !== 0) {
			const account = accounts[0];
			console.log('Found an authorized account:', account);
			setCurrentAccount(account);
		} else {
			console.log('No authorized account found');
		}
	};

  	const deposit = async () => {
	  try {
		const { ethereum } = window;
		if (ethereum) {
		  const provider = new ethers.providers.Web3Provider(ethereum);
		  const signer = provider.getSigner();
		  const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);
		  let amount = ethers.utils.parseUnits(value.toString(), "ether");
	
				console.log("check deposit value.", amount)
		  let tx = await contract.deposit(amount);
		  // Wait for the transaction to be mined
				const receipt = await tx.wait();
	
				// Check if the transaction was successfully completed
				if (receipt.status === 1) {
					console.log("Domain minted! https://mumbai.polygonscan.com/tx/"+tx.hash);//change to oklink
					
					// Set the record for the domain
					//tx = await contract.setDetails (domain, record);
					//await tx.wait();
	
					console.log("Record set! https://mumbai.polygonscan.com/tx/"+tx.hash);
					// Call fetchMints after 2 seconds
				    //setTimeout(() => {
					    //fetchMints();
				    //}, 5000);
					
					//setRecord('');
					//setDomain('');
				}
				else {
					alert("Transaction failed! Please try again");
				}
		}
	  }
	  catch(error){
		console.log(error);
	  }
	};

  	const Withdraw = async () => {
	  try {
		const { ethereum } = window;
		if (ethereum) {
		  const provider = new ethers.providers.Web3Provider(ethereum);
		  const signer = provider.getSigner();
		  const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);
		  let amount = ethers.utils.parseUnits(value.toString(), "ether");
	
				console.log("Going to pop wallet now to pay gas...")
		  let tx = await contract.withdraw(amount);
		  // Wait for the transaction to be mined
				const receipt = await tx.wait();
	
				// Check if the transaction was successfully completed
				if (receipt.status === 1) {
					console.log("Domain minted! https://mumbai.polygonscan.com/tx/"+tx.hash);//change to oklink
					
					// Set the record for the domain
					//tx = await contract.setDetails (domain, record);
					//await tx.wait();
	
					console.log("Record set! https://mumbai.polygonscan.com/tx/"+tx.hash);
					// Call fetchMints after 2 seconds
				    //setTimeout(() => {
					    //fetchMints();
				    //}, 5000);
					
					//setRecord('');
					//setDomain('');
				}
				else {
					alert("Transaction failed! Please try again");
				}
		}
	  }
	  catch(error){
		console.log(error);
	  }
	};

  	const fetchtvl = async () => {
		  try {
			const { ethereum } = window;
			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);
				const address1 = currentAccount;
	
				let tx = await contract.balance();
				console.log(tx)
				let newvalue = tx.toString();
				console.log(newvalue)
				const ethvalue = ethers.utils.formatEther(newvalue)
				const ethvalue1 = Math.round(ethvalue * 1e4) / 1e4;
				console.log(ethvalue)
				//console.log("Record set https://mumbai.polygonscan.com/tx/"+tx.hash);
				settvl(ethvalue1)
	
				//fetchMints();
				//setRecord('');
				//setDomain('');
			}
		  } catch(error) {
			console.log(error);
		  }
		//setLoading(false);
	};

  const fetchbalvault = async () => {
    try {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);
      const address1 = currentAccount;

      let tx = await contract.balanceOf(address1);
      console.log(tx)
      let newvalue = tx.toString();
      console.log(newvalue)
      const ethvalue = ethers.utils.formatEther(newvalue)
      const ethvalue1 = Math.round(ethvalue * 1e4) / 1e4;
      console.log(ethvalue)
      //console.log("Record set https://mumbai.polygonscan.com/tx/"+tx.hash);
      setbalvault(ethvalue1)

      //fetchMints();
      //setRecord('');
      //setDomain('');
    }
    } catch(error) {
    console.log(error);
    }
  //setLoading(false);
};

const fetchbalwallet = async () => {
  try {
  const { ethereum } = window;
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ERC20, ERC20Abi.abi, signer);
    const address1 = currentAccount;

    let tx = await contract.balanceOf(address1);
    console.log(tx)
    let newvalue = tx.toString();
    console.log(newvalue)
    const ethvalue = ethers.utils.formatEther(newvalue)
    const ethvalue1 = Math.round(ethvalue * 1e4) / 1e4;
    console.log(ethvalue)
    //console.log("Record set https://mumbai.polygonscan.com/tx/"+tx.hash);
    setbalwallet(ethvalue1)

    //fetchMints();
    //setRecord('');
    //setDomain('');
  }
  } catch(error) {
  console.log(error);
  }
//setLoading(false);
};

const fetchprice = async () => {
  try {
  const { ethereum } = window;
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);
    const address1 = currentAccount;

    let tx = await contract.getPricePerFullShare();
    console.log(tx)
    let newvalue = tx.toString();
    console.log(newvalue)
    const ethvalue = ethers.utils.formatEther(newvalue)
    const ethvalue1 = Math.round(ethvalue * 1e4) / 1e4;
    console.log(ethvalue)
    //console.log("Record set https://mumbai.polygonscan.com/tx/"+tx.hash);
    setprice(ethvalue1)

    //fetchMints();
    //setRecord('');
    //setDomain('');
  }
  } catch(error) {
  console.log(error);
  }
//setLoading(false);
};

  	useEffect(() => {
		checkIfWalletIsConnected();
	}, [])

  	useEffect(() => {
		setTimeout(() => {
		fetchprice()
		fetchbalvault()
		fetchbalwallet()
		fetchtvl()
		}, 5000)
	}, [fetchprice,fetchtvl,fetchbalwallet,fetchbalvault])

  return (
    <div className='App'>
      <div className='App-divider'>
      <Routes>
        <Route path="/" element={App}>
        </Route>
      </Routes>
        <div className='class1'>
          <header className='class1head'>
            <div className='class4'>
              <div className='class5'>
                <div className='class6'>
                  <a className='class7 logo' href='#'>
                    {/*<img alt="BIFI" src="https://app.beefy.finance/static/media/header-logo.c746cd56.svg"></img>*/}
                    <img alt="Maddy logo" src={logo}></img>
                      </a>
                  <a className='class8 display-null' href="https://www.vault.test.maddyprotocol.xyz">
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7.16957 3.25H16.8304C17.3646 3.24999 17.8104 3.24998 18.1747 3.27974C18.5546 3.31078 18.9112 3.37789 19.2485 3.54973C19.7659 3.81338 20.1866 4.23408 20.4503 4.75153C20.6221 5.08879 20.6892 5.44545 20.7203 5.82533C20.75 6.18956 20.75 6.6354 20.75 7.16955V16.8305C20.75 17.3646 20.75 17.8104 20.7203 18.1747C20.6892 18.5546 20.6221 18.9112 20.4503 19.2485C20.1866 19.7659 19.7659 20.1866 19.2485 20.4503C18.9112 20.6221 18.5546 20.6892 18.1747 20.7203C17.8104 20.75 17.3646 20.75 16.8305 20.75H7.16955C6.6354 20.75 6.18956 20.75 5.82533 20.7203C5.44545 20.6892 5.08879 20.6221 4.75153 20.4503C4.23408 20.1866 3.81338 19.7659 3.54973 19.2485C3.37789 18.9112 3.31078 18.5546 3.27974 18.1747C3.24998 17.8104 3.24999 17.3646 3.25 16.8304V7.16957C3.24999 6.63541 3.24998 6.18956 3.27974 5.82533C3.31078 5.44545 3.37789 5.08879 3.54973 4.75153C3.81338 4.23408 4.23408 3.81338 4.75153 3.54973C5.08879 3.37789 5.44545 3.31078 5.82533 3.27974C6.18956 3.24998 6.63541 3.24999 7.16957 3.25ZM5.94748 4.77476C5.66036 4.79822 5.52307 4.8401 5.43251 4.88624C5.19731 5.00608 5.00608 5.19731 4.88624 5.43251C4.8401 5.52307 4.79822 5.66036 4.77476 5.94748C4.75058 6.24336 4.75 6.62757 4.75 7.2V16.8C4.75 17.3724 4.75058 17.7566 4.77476 18.0525C4.79822 18.3397 4.8401 18.4769 4.88624 18.5675C5.00608 18.8027 5.19731 18.9939 5.43251 19.1138C5.52307 19.1599 5.66036 19.2018 5.94748 19.2252C6.24336 19.2494 6.62757 19.25 7.2 19.25H16.8C17.3724 19.25 17.7566 19.2494 18.0525 19.2252C18.3397 19.2018 18.4769 19.1599 18.5675 19.1138C18.8027 18.9939 18.9939 18.8027 19.1138 18.5675C19.1599 18.4769 19.2018 18.3397 19.2252 18.0525C19.2494 17.7566 19.25 17.3724 19.25 16.8V7.2C19.25 6.62757 19.2494 6.24336 19.2252 5.94748C19.2018 5.66036 19.1599 5.52307 19.1138 5.43251C18.9939 5.19731 18.8027 5.00608 18.5675 4.88624C18.4769 4.8401 18.3397 4.79822 18.0525 4.77476C17.7566 4.75058 17.3724 4.75 16.8 4.75H7.2C6.62757 4.75 6.24336 4.75058 5.94748 4.77476Z" fill="currentColor"></path><path d="M12.0001 6.75C12.4143 6.75 12.7501 7.08579 12.7501 7.5L12.7501 8.12882C13.252 8.13924 13.7822 8.17314 14.1806 8.27196C14.5827 8.37168 14.8277 8.77843 14.728 9.18046C14.6283 9.58249 14.2216 9.82757 13.8195 9.72785C13.4306 9.6314 12.7219 9.6211 12.0051 9.62588C11.9435 9.62629 11.901 9.62598 11.8667 9.62517C11.8371 9.62447 11.8025 9.62287 11.8023 9.62287L11.8017 9.62284C11.7947 9.62257 11.7706 9.62164 11.6219 9.62558C11.297 9.63593 11.0589 9.70886 10.9234 9.80219C10.8281 9.86785 10.7505 9.95867 10.7501 10.1887C10.7499 10.3123 10.7784 10.3772 10.8027 10.4151C10.8296 10.4571 10.8799 10.5093 10.9793 10.5627C11.1965 10.6794 11.5531 10.7499 12.0001 10.7499C12.5311 10.7499 13.1795 10.8065 13.7182 11.0838C14.0005 11.229 14.2686 11.4429 14.4629 11.7516C14.6584 12.0621 14.7501 12.4224 14.7501 12.8124C14.7501 13.5246 14.3717 14.0366 13.8688 14.3517C13.5369 14.5597 13.1458 14.6886 12.7501 14.7688V15.5C12.7501 15.9142 12.4143 16.25 12.0001 16.25C11.5859 16.25 11.2501 15.9142 11.2501 15.5V14.8485C10.8821 14.8412 10.4887 14.8168 9.90705 14.7441C9.49604 14.6927 9.20449 14.3179 9.25587 13.9069C9.30725 13.4959 9.68209 13.2043 10.0931 13.2557C10.8889 13.3552 11.2531 13.3532 11.8334 13.3502C11.929 13.3496 12.0305 13.3491 12.1407 13.349C12.5772 13.2942 12.8882 13.196 13.0723 13.0807C13.2247 12.9851 13.2501 12.9128 13.2501 12.8124C13.2501 12.6617 13.2167 12.5876 13.1935 12.5507C13.1691 12.5119 13.1247 12.4653 13.0319 12.4176C12.8207 12.3089 12.4691 12.2499 12.0001 12.2499C11.4471 12.2499 10.8027 12.1706 10.2696 11.8842C9.6842 11.5698 9.24866 11.0054 9.25008 10.1861C9.25133 9.46539 9.57001 8.91305 10.0724 8.56693C10.4331 8.31848 10.8537 8.19855 11.2501 8.15074L11.2501 7.5C11.2501 7.08579 11.5859 6.75 12.0001 6.75Z" fill="currentColor"></path></svg>
                    Maddy Vaults
                    </a>
                  <a className='class8 display-null' href="https://www.msd.test.maddyprotocol.xyz">
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7.16957 3.25H16.8304C17.3646 3.24999 17.8104 3.24998 18.1747 3.27974C18.5546 3.31078 18.9112 3.37789 19.2485 3.54973C19.7659 3.81338 20.1866 4.23408 20.4503 4.75153C20.6221 5.08879 20.6892 5.44545 20.7203 5.82533C20.75 6.18956 20.75 6.6354 20.75 7.16955V16.8305C20.75 17.3646 20.75 17.8104 20.7203 18.1747C20.6892 18.5546 20.6221 18.9112 20.4503 19.2485C20.1866 19.7659 19.7659 20.1866 19.2485 20.4503C18.9112 20.6221 18.5546 20.6892 18.1747 20.7203C17.8104 20.75 17.3646 20.75 16.8305 20.75H7.16955C6.6354 20.75 6.18956 20.75 5.82533 20.7203C5.44545 20.6892 5.08879 20.6221 4.75153 20.4503C4.23408 20.1866 3.81338 19.7659 3.54973 19.2485C3.37789 18.9112 3.31078 18.5546 3.27974 18.1747C3.24998 17.8104 3.24999 17.3646 3.25 16.8304V7.16957C3.24999 6.63541 3.24998 6.18956 3.27974 5.82533C3.31078 5.44545 3.37789 5.08879 3.54973 4.75153C3.81338 4.23408 4.23408 3.81338 4.75153 3.54973C5.08879 3.37789 5.44545 3.31078 5.82533 3.27974C6.18956 3.24998 6.63541 3.24999 7.16957 3.25ZM5.94748 4.77476C5.66036 4.79822 5.52307 4.8401 5.43251 4.88624C5.19731 5.00608 5.00608 5.19731 4.88624 5.43251C4.8401 5.52307 4.79822 5.66036 4.77476 5.94748C4.75058 6.24336 4.75 6.62757 4.75 7.2V16.8C4.75 17.3724 4.75058 17.7566 4.77476 18.0525C4.79822 18.3397 4.8401 18.4769 4.88624 18.5675C5.00608 18.8027 5.19731 18.9939 5.43251 19.1138C5.52307 19.1599 5.66036 19.2018 5.94748 19.2252C6.24336 19.2494 6.62757 19.25 7.2 19.25H16.8C17.3724 19.25 17.7566 19.2494 18.0525 19.2252C18.3397 19.2018 18.4769 19.1599 18.5675 19.1138C18.8027 18.9939 18.9939 18.8027 19.1138 18.5675C19.1599 18.4769 19.2018 18.3397 19.2252 18.0525C19.2494 17.7566 19.25 17.3724 19.25 16.8V7.2C19.25 6.62757 19.2494 6.24336 19.2252 5.94748C19.2018 5.66036 19.1599 5.52307 19.1138 5.43251C18.9939 5.19731 18.8027 5.00608 18.5675 4.88624C18.4769 4.8401 18.3397 4.79822 18.0525 4.77476C17.7566 4.75058 17.3724 4.75 16.8 4.75H7.2C6.62757 4.75 6.24336 4.75058 5.94748 4.77476Z" fill="currentColor"></path><path d="M12.0001 6.75C12.4143 6.75 12.7501 7.08579 12.7501 7.5L12.7501 8.12882C13.252 8.13924 13.7822 8.17314 14.1806 8.27196C14.5827 8.37168 14.8277 8.77843 14.728 9.18046C14.6283 9.58249 14.2216 9.82757 13.8195 9.72785C13.4306 9.6314 12.7219 9.6211 12.0051 9.62588C11.9435 9.62629 11.901 9.62598 11.8667 9.62517C11.8371 9.62447 11.8025 9.62287 11.8023 9.62287L11.8017 9.62284C11.7947 9.62257 11.7706 9.62164 11.6219 9.62558C11.297 9.63593 11.0589 9.70886 10.9234 9.80219C10.8281 9.86785 10.7505 9.95867 10.7501 10.1887C10.7499 10.3123 10.7784 10.3772 10.8027 10.4151C10.8296 10.4571 10.8799 10.5093 10.9793 10.5627C11.1965 10.6794 11.5531 10.7499 12.0001 10.7499C12.5311 10.7499 13.1795 10.8065 13.7182 11.0838C14.0005 11.229 14.2686 11.4429 14.4629 11.7516C14.6584 12.0621 14.7501 12.4224 14.7501 12.8124C14.7501 13.5246 14.3717 14.0366 13.8688 14.3517C13.5369 14.5597 13.1458 14.6886 12.7501 14.7688V15.5C12.7501 15.9142 12.4143 16.25 12.0001 16.25C11.5859 16.25 11.2501 15.9142 11.2501 15.5V14.8485C10.8821 14.8412 10.4887 14.8168 9.90705 14.7441C9.49604 14.6927 9.20449 14.3179 9.25587 13.9069C9.30725 13.4959 9.68209 13.2043 10.0931 13.2557C10.8889 13.3552 11.2531 13.3532 11.8334 13.3502C11.929 13.3496 12.0305 13.3491 12.1407 13.349C12.5772 13.2942 12.8882 13.196 13.0723 13.0807C13.2247 12.9851 13.2501 12.9128 13.2501 12.8124C13.2501 12.6617 13.2167 12.5876 13.1935 12.5507C13.1691 12.5119 13.1247 12.4653 13.0319 12.4176C12.8207 12.3089 12.4691 12.2499 12.0001 12.2499C11.4471 12.2499 10.8027 12.1706 10.2696 11.8842C9.6842 11.5698 9.24866 11.0054 9.25008 10.1861C9.25133 9.46539 9.57001 8.91305 10.0724 8.56693C10.4331 8.31848 10.8537 8.19855 11.2501 8.15074L11.2501 7.5C11.2501 7.08579 11.5859 6.75 12.0001 6.75Z" fill="currentColor"></path></svg>
                    MSD Stablecoin
                  </a>
                  <a className='class8 display-null' href='https://www.selfpay.test.maddyprotocol.xyz'>
                    <span className='class9'>
                      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.25 16.8304L3.25 7.16956C3.24999 6.63541 3.24998 6.18956 3.27974 5.82533C3.31078 5.44544 3.37789 5.08879 3.54973 4.75152C3.81338 4.23408 4.23408 3.81339 4.75153 3.54973C5.08879 3.37789 5.44545 3.31078 5.82533 3.27974C6.18956 3.24998 6.6354 3.24999 7.16955 3.25H16.8305C17.3646 3.24999 17.8104 3.24998 18.1747 3.27974C18.5546 3.31078 18.9112 3.37789 19.2485 3.54973C19.7659 3.81338 20.1866 4.23408 20.4503 4.75152C20.6221 5.08879 20.6892 5.44544 20.7203 5.82533C20.75 6.18956 20.75 6.6354 20.75 7.16955V16.8305C20.75 17.3646 20.75 17.8104 20.7203 18.1747C20.6892 18.5546 20.6221 18.9112 20.4503 19.2485C20.1866 19.7659 19.7659 20.1866 19.2485 20.4503C18.9112 20.6221 18.5546 20.6892 18.1747 20.7203C17.8104 20.75 17.3646 20.75 16.8304 20.75H7.16957C6.63541 20.75 6.18956 20.75 5.82533 20.7203C5.44545 20.6892 5.08879 20.6221 4.75153 20.4503C4.23408 20.1866 3.81338 19.7659 3.54973 19.2485C3.37789 18.9112 3.31078 18.5546 3.27974 18.1747C3.24998 17.8104 3.24999 17.3646 3.25 16.8304ZM4.77476 18.0525C4.79822 18.3396 4.8401 18.4769 4.88624 18.5675C5.00608 18.8027 5.19731 18.9939 5.43251 19.1138C5.52307 19.1599 5.66036 19.2018 5.94748 19.2252C6.24336 19.2494 6.62757 19.25 7.2 19.25H16.8C17.3724 19.25 17.7566 19.2494 18.0525 19.2252C18.3396 19.2018 18.4769 19.1599 18.5675 19.1138C18.8027 18.9939 18.9939 18.8027 19.1138 18.5675C19.1599 18.4769 19.2018 18.3396 19.2252 18.0525C19.2494 17.7566 19.25 17.3724 19.25 16.8V7.2C19.25 6.62757 19.2494 6.24336 19.2252 5.94748C19.2018 5.66035 19.1599 5.52307 19.1138 5.43251C18.9939 5.19731 18.8027 5.00608 18.5675 4.88624C18.4769 4.8401 18.3396 4.79822 18.0525 4.77476C17.7566 4.75058 17.3724 4.75 16.8 4.75H7.2C6.62757 4.75 6.24336 4.75058 5.94748 4.77476C5.66036 4.79822 5.52307 4.8401 5.43251 4.88624C5.19731 5.00608 5.00608 5.19731 4.88624 5.43251C4.8401 5.52307 4.79822 5.66035 4.77476 5.94748C4.75058 6.24336 4.75 6.62757 4.75 7.2L4.75 16.8C4.75 17.3724 4.75058 17.7566 4.77476 18.0525ZM8 16.75C7.58579 16.75 7.25 16.4142 7.25 16L7.25 11C7.25 10.5858 7.58579 10.25 8 10.25C8.41421 10.25 8.75 10.5858 8.75 11V16C8.75 16.4142 8.41421 16.75 8 16.75ZM12 16.75C11.5858 16.75 11.25 16.4142 11.25 16V8C11.25 7.58579 11.5858 7.25 12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V16C12.75 16.4142 12.4142 16.75 12 16.75ZM16 16.75C15.5858 16.75 15.25 16.4142 15.25 16V13C15.25 12.5858 15.5858 12.25 16 12.25C16.4142 12.25 16.75 12.5858 16.75 13V16C16.75 16.4142 16.4142 16.75 16 16.75Z" fill="currentColor"></path></svg>
                      Self Payable
                      <span className='class10'>New</span>
                    </span>
                  </a>
                  <a className='class8 display-null' href='https://maddy-protocol.gitbook.io/maddy-protocol/'>
                  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.75C7.44365 3.75 3.75 7.44365 3.75 12C3.75 16.5563 7.44365 20.25 12 20.25C16.5563 20.25 20.25 16.5563 20.25 12C20.25 7.44365 16.5563 3.75 12 3.75ZM2.25 12C2.25 6.61522 6.61522 2.25 12 2.25C17.3848 2.25 21.75 6.61522 21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M15.5303 9.46967C15.8232 9.76256 15.8232 10.2374 15.5303 10.5303L11.5303 14.5303C11.2374 14.8232 10.7626 14.8232 10.4697 14.5303L8.46967 12.5303C8.17678 12.2374 8.17678 11.7626 8.46967 11.4697C8.76256 11.1768 9.23744 11.1768 9.53033 11.4697L11 12.9393L14.4697 9.46967C14.7626 9.17678 15.2374 9.17678 15.5303 9.46967Z" fill="currentColor"></path></svg>
                    Docs
                    </a>
                </div>
                <div className='class6'>
                  <a className="class8 display-null" href="/onramp">
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.16957 4.25H17.8304C18.3646 4.24999 18.8104 4.24998 19.1747 4.27974C19.5546 4.31078 19.9112 4.37789 20.2485 4.54973C20.7659 4.81338 21.1866 5.23408 21.4503 5.75153C21.6221 6.08879 21.6892 6.44545 21.7203 6.82533C21.75 7.18956 21.75 7.6354 21.75 8.16955V15.8305C21.75 16.3646 21.75 16.8104 21.7203 17.1747C21.6892 17.5546 21.6221 17.9112 21.4503 18.2485C21.1866 18.7659 20.7659 19.1866 20.2485 19.4503C19.9112 19.6221 19.5546 19.6892 19.1747 19.7203C18.8104 19.75 18.3646 19.75 17.8305 19.75H6.16955C5.6354 19.75 5.18956 19.75 4.82533 19.7203C4.44545 19.6892 4.08879 19.6221 3.75153 19.4503C3.23408 19.1866 2.81338 18.7659 2.54973 18.2485C2.37789 17.9112 2.31078 17.5546 2.27974 17.1747C2.24998 16.8104 2.24999 16.3646 2.25 15.8304V8.16957C2.24999 7.63541 2.24998 7.18956 2.27974 6.82533C2.31078 6.44545 2.37789 6.08879 2.54973 5.75153C2.81338 5.23408 3.23408 4.81338 3.75153 4.54973C4.08879 4.37789 4.44545 4.31078 4.82533 4.27974C5.18956 4.24998 5.63541 4.24999 6.16957 4.25ZM3.75 9.75V15.8C3.75 16.3724 3.75058 16.7566 3.77476 17.0525C3.79822 17.3396 3.8401 17.4769 3.88624 17.5675C4.00608 17.8027 4.19731 17.9939 4.43251 18.1138C4.52307 18.1599 4.66036 18.2018 4.94748 18.2252C5.24336 18.2494 5.62757 18.25 6.2 18.25H17.8C18.3724 18.25 18.7566 18.2494 19.0525 18.2252C19.3396 18.2018 19.4769 18.1599 19.5675 18.1138C19.8027 17.9939 19.9939 17.8027 20.1138 17.5675C20.1599 17.4769 20.2018 17.3396 20.2252 17.0525C20.2494 16.7566 20.25 16.3724 20.25 15.8V9.75H3.75ZM20.25 8.25H3.75V8.2C3.75 7.62757 3.75058 7.24336 3.77476 6.94748C3.79822 6.66036 3.8401 6.52307 3.88624 6.43251C4.00608 6.19731 4.19731 6.00608 4.43251 5.88624C4.52307 5.8401 4.66036 5.79822 4.94748 5.77476C5.24336 5.75058 5.62757 5.75 6.2 5.75H17.8C18.3724 5.75 18.7566 5.75058 19.0525 5.77476C19.3396 5.79822 19.4769 5.8401 19.5675 5.88624C19.8027 6.00608 19.9939 6.19731 20.1138 6.43251C20.1599 6.52307 20.2018 6.66036 20.2252 6.94748C20.2494 7.24336 20.25 7.62757 20.25 8.2V8.25ZM6.25 15C6.25 14.5858 6.58579 14.25 7 14.25H9C9.41421 14.25 9.75 14.5858 9.75 15C9.75 15.4142 9.41421 15.75 9 15.75H7C6.58579 15.75 6.25 15.4142 6.25 15Z" fill="currentColor"></path></svg>
                    Buy Crypto
                  </a>
                  <Link to="/about" className='class8 display-null'>About</Link>
                  <a className="class8 display-null" href="/onramp">
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M18 6.75C18.1147 6.74999 18.2265 6.77629 18.3274 6.82524C18.3654 6.84367 18.4015 6.86514 18.4354 6.88929C18.4974 6.9335 18.5531 6.98744 18.6 7.05C19.3145 8.00269 20.0285 8.71629 20.5608 9.18945C20.8266 9.42577 21.0463 9.6013 21.1967 9.71593C21.2719 9.77322 21.3297 9.81522 21.3673 9.84191C21.386 9.85526 21.3997 9.86477 21.408 9.87045L21.416 9.87597C21.7605 10.1058 21.8537 10.5715 21.624 10.916C21.3943 11.2607 20.9286 11.3538 20.584 11.124L20.5806 11.1218L20.5751 11.1181L20.5576 11.1061C20.5432 11.0962 20.5232 11.0823 20.498 11.0643C20.4476 11.0285 20.3765 10.9768 20.2877 10.9091C20.11 10.7737 19.8609 10.5742 19.5642 10.3106C19.3209 10.0943 19.045 9.83429 18.75 9.53046V15.7501H21C21.4142 15.7501 21.75 16.0859 21.75 16.5001C21.75 16.9143 21.4142 17.2501 21 17.2501H3C2.58579 17.2501 2.25 16.9143 2.25 16.5001C2.25 16.0859 2.58579 15.7501 3 15.7501H5.25V9.53045C4.95495 9.83429 4.67907 10.0943 4.43577 10.3106C4.13913 10.5742 3.89002 10.7737 3.71234 10.9091C3.62347 10.9768 3.55237 11.0285 3.50202 11.0643C3.47684 11.0823 3.45684 11.0962 3.44239 11.1061L3.42491 11.1181L3.41938 11.1218L3.41742 11.1231L3.41602 11.124C3.07138 11.3538 2.60572 11.2607 2.37596 10.916C2.14625 10.5715 2.23954 10.1058 2.58397 9.87597L2.59203 9.87045C2.60028 9.86477 2.61397 9.85526 2.63274 9.84191C2.67028 9.81522 2.72809 9.77322 2.80328 9.71593C2.95372 9.6013 3.17336 9.42577 3.43922 9.18945C3.97153 8.71629 4.68548 8.00269 5.4 7.05C5.44908 6.98456 5.50775 6.92855 5.57323 6.88325C5.60277 6.86281 5.63392 6.84439 5.66653 6.82822C5.76902 6.77734 5.88299 6.74998 6.00004 6.75C6.01973 6.75 6.03934 6.75078 6.05884 6.75232C6.26336 6.7684 6.4506 6.86734 6.57896 7.02322C6.60572 7.05572 6.62992 7.0907 6.65119 7.12791C6.94281 7.63828 7.24296 8.07609 7.54579 8.45177C8.16042 9.21424 8.78608 9.72085 9.3739 10.0589C9.50316 10.1332 9.63152 10.1999 9.75858 10.2598C10.6025 10.657 11.3891 10.75 12 10.75C12.7029 10.75 13.6383 10.6269 14.6261 10.0589C15.5035 9.55431 16.4653 8.67412 17.3488 7.12791C17.4723 6.91177 17.6949 6.7712 17.9426 6.7522C17.9617 6.75074 17.9808 6.75 18 6.75ZM6.75 9.82781V15.7501H8.25V11.1268C7.74364 10.7917 7.2392 10.3656 6.75 9.82781ZM9.75 15.7501V11.8751C10.2852 12.0627 10.7928 12.1627 11.25 12.2111V15.7501H9.75ZM12.75 15.7501V12.2111C13.2072 12.1627 13.7148 12.0628 14.25 11.8752V15.7501H12.75ZM15.75 15.7501V11.1269C16.2564 10.7918 16.7608 10.3656 17.25 9.82787V15.7501H15.75Z" fill="currentColor"></path></svg>
                    Bridge Maddy
                  </a>
                  <a className="class8 display-null" href="/onramp">
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M18 6.75C18.1147 6.74999 18.2265 6.77629 18.3274 6.82524C18.3654 6.84367 18.4015 6.86514 18.4354 6.88929C18.4974 6.9335 18.5531 6.98744 18.6 7.05C19.3145 8.00269 20.0285 8.71629 20.5608 9.18945C20.8266 9.42577 21.0463 9.6013 21.1967 9.71593C21.2719 9.77322 21.3297 9.81522 21.3673 9.84191C21.386 9.85526 21.3997 9.86477 21.408 9.87045L21.416 9.87597C21.7605 10.1058 21.8537 10.5715 21.624 10.916C21.3943 11.2607 20.9286 11.3538 20.584 11.124L20.5806 11.1218L20.5751 11.1181L20.5576 11.1061C20.5432 11.0962 20.5232 11.0823 20.498 11.0643C20.4476 11.0285 20.3765 10.9768 20.2877 10.9091C20.11 10.7737 19.8609 10.5742 19.5642 10.3106C19.3209 10.0943 19.045 9.83429 18.75 9.53046V15.7501H21C21.4142 15.7501 21.75 16.0859 21.75 16.5001C21.75 16.9143 21.4142 17.2501 21 17.2501H3C2.58579 17.2501 2.25 16.9143 2.25 16.5001C2.25 16.0859 2.58579 15.7501 3 15.7501H5.25V9.53045C4.95495 9.83429 4.67907 10.0943 4.43577 10.3106C4.13913 10.5742 3.89002 10.7737 3.71234 10.9091C3.62347 10.9768 3.55237 11.0285 3.50202 11.0643C3.47684 11.0823 3.45684 11.0962 3.44239 11.1061L3.42491 11.1181L3.41938 11.1218L3.41742 11.1231L3.41602 11.124C3.07138 11.3538 2.60572 11.2607 2.37596 10.916C2.14625 10.5715 2.23954 10.1058 2.58397 9.87597L2.59203 9.87045C2.60028 9.86477 2.61397 9.85526 2.63274 9.84191C2.67028 9.81522 2.72809 9.77322 2.80328 9.71593C2.95372 9.6013 3.17336 9.42577 3.43922 9.18945C3.97153 8.71629 4.68548 8.00269 5.4 7.05C5.44908 6.98456 5.50775 6.92855 5.57323 6.88325C5.60277 6.86281 5.63392 6.84439 5.66653 6.82822C5.76902 6.77734 5.88299 6.74998 6.00004 6.75C6.01973 6.75 6.03934 6.75078 6.05884 6.75232C6.26336 6.7684 6.4506 6.86734 6.57896 7.02322C6.60572 7.05572 6.62992 7.0907 6.65119 7.12791C6.94281 7.63828 7.24296 8.07609 7.54579 8.45177C8.16042 9.21424 8.78608 9.72085 9.3739 10.0589C9.50316 10.1332 9.63152 10.1999 9.75858 10.2598C10.6025 10.657 11.3891 10.75 12 10.75C12.7029 10.75 13.6383 10.6269 14.6261 10.0589C15.5035 9.55431 16.4653 8.67412 17.3488 7.12791C17.4723 6.91177 17.6949 6.7712 17.9426 6.7522C17.9617 6.75074 17.9808 6.75 18 6.75ZM6.75 9.82781V15.7501H8.25V11.1268C7.74364 10.7917 7.2392 10.3656 6.75 9.82781ZM9.75 15.7501V11.8751C10.2852 12.0627 10.7928 12.1627 11.25 12.2111V15.7501H9.75ZM12.75 15.7501V12.2111C13.2072 12.1627 13.7148 12.0628 14.25 11.8752V15.7501H12.75ZM15.75 15.7501V11.1269C16.2564 10.7918 16.7608 10.3656 17.25 9.82787V15.7501H15.75Z" fill="currentColor"></path></svg>
                    $1
                  </a>
                  <div className='class11'>
                    <button className='class12'>
                      <div className='class13 warning'></div>
                    </button>
                    <div>
                      <div className='class14'>
                      { currentAccount ? <p>{currentAccount.slice(0, 6)}...{currentAccount.slice(-2)} </p> :
                        <button className='con-btn' onClick={connectWallet }>
                          <div className='class15'>
                            <div className='class16'>Connect Wallet</div>
                          </div>
                        </button>}
                      </div>
                    </div>
                  </div>
                  <div className='jss1499'>
                    <Hamburger className="" fill="#fff" onMenuClick={() => activeMenu(!isMenuActive)} />
                    <SideMenu iscurrentAccount={currentAccount} isMenuActive={isMenuActive} onOverLayClick={() => activeMenu(!isMenuActive)}/>
                    </div>
                </div>
              </div>
            </div>
            <div className='mobile-header'></div>
          </header>
        </div>
        <div className='class2'>
          <div className='class17'>
            <div className='class19'>
              <div className='class20'>
                <div className='class21'>
                  <div className=''>
                  Poll on incentiviing testnet going on now. Discuss on
                  <a target="_blank" rel="noreferrer" className='class23' href="https://t.me/maddyprotocol"> Telegram </a>
                  and vote
                  <a target="_blank" rel="noreferrer" className='class23' href="https://t.me/maddyprotocol"> Telegram Poll </a>
                  </div>
                </div>
                <svg class="class22" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
              </div>
            </div>
          </div>
          <div className='class18'>
            <div className='class24'>
              <div className='class25'>
                <div className='class26'>
                  <div className='class28'>
                  Portfolio
                  </div>
                  <div className='class29'>
                    <div className='class32'>
                    <div class="class33">Deposited</div>
                      <div class="class34">
                          <span>${balvault * 1}</span>
                      </div>
                    </div>
                    <div className='class32'>
                    <div class="class33">Monthly yield</div>
                      <div class="class34">
                          <span>1.18</span>
                      </div>
                    </div>
                    <div className='class32'>
                    <div class="class33">Daily yield</div>
                      <div class="class34">
                          <span>0.03%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='class27'>
                  <div className='class30'>Platform</div>
                  <div className='class31'>
                    <div className='class35'>
                      <div className='class36'>
                        <div className='class33'>TVL</div>
                      </div>
                      <div className='class37'>
                        <span>${tvl * 10}</span>
                      </div>
                    </div>
                    <div className='class35'>
                      <div className='class36'>
                        <div className='class33'>VAULTS</div>
                      </div>
                      <div className='class37'>
                        <span>1</span>
                      </div>
                    </div>
                    <div className='class35 m0'>
                      <div className='class36'>
                        <div className='class33'>DAILY BUYBACK</div>
                      </div>
                      <div className='class37'>
                        <span>$1000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='class3'>
          <div className='class38'>
            <div className='class38a none'>
              <button className='class38a-btn display-null2' title='Ethereumpow' href='#'>
              <svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" clip-rule="evenodd" viewBox="0 0 255 255" class="jss336" width="24" height="24"><circle cx="127.5" cy="127.5" r="127.5" class="bg" fill="#627ee9"></circle><path fill="#fdfdfe" fill-rule="nonzero" d="m127.475 37.7-54.98 91.235 54.98-24.988V37.7Z" class="fg"></path><path fill="#bfcaf5" fill-rule="nonzero" d="m127.475 103.947-54.98 24.988 54.98 32.507v-57.495Zm54.989 24.988L127.475 37.7v66.247l54.989 24.988Z" class="fg"></path><path fill="#8197ed" fill-rule="nonzero" d="m127.475 161.442 54.989-32.507-54.989-24.988v57.495Z" class="fg"></path><path fill="#fdfdfe" fill-rule="nonzero" d="m72.495 139.367 54.98 77.483v-44.996l-54.98-32.487Z" class="fg"></path><path fill="#bfcaf5" fill-rule="nonzero" d="M127.475 171.854v44.996l55.02-77.483-55.02 32.487Z" class="fg"></path></svg>
              </button>
              <button className='class38a-btn display-null2' title='Polygon'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 564.33 564.14" class="jss336" width="24" height="24"><path fill="#8247e4" d="M303.77 564.14h-43.93a24.14 24.14 0 0 0-3.57-1.11c-10.67-1.67-21.44-2.81-32-5C73.9 527.39-25.22 377.2 5.63 227 38.15 68.75 192.74-29.7 349.45 8.07c111.39 26.85 196.3 120.78 212.09 234.59.83 6 1.85 12 2.79 18v43.93c-1.09 7-2.15 13.93-3.26 20.89C541.3 449 445.73 543 321.22 561.43c-5.83.86-11.64 1.8-17.45 2.71ZM260 236.19c13.81-8 26.54-15.48 39.4-22.72 2.75-1.54 3.53-3.37 3.48-6.35-.16-9.82-.5-19.66 0-29.45.79-14.16-5.52-23.52-17.49-30.4-27.38-15.75-54.41-32.12-81.81-47.83-10.91-6.25-22.67-6.22-33.59 0-29.56 17-58.89 34.32-88.31 51.54-8.6 5-13 12.41-13 22.54.09 33.78.34 67.56-.11 101.33-.18 13.42 5.47 22.33 16.72 28.78q42.2 24.19 84.12 48.82c11.07 6.53 21.59 6.29 32.48-.05q80.18-46.67 160.41-93.24c10.21-5.95 20.25-5.53 30.24.22 14.85 8.54 29.59 17.25 44.45 25.77 9.85 5.65 14.67 14 14.63 25.37-.06 17.47-.16 34.95 0 52.41.12 11.8-4.87 20.35-14.95 26.27-14.05 8.25-28.1 16.51-42 25.06-10.93 6.73-21.62 6.43-32.47.11-13.36-7.79-26.47-16-40.15-23.22-13.05-6.89-18.86-17.15-18.12-31.88.48-9.73.09-19.51.09-29.71a17.65 17.65 0 0 0-2.43.83c-12.53 7.22-25.11 14.36-37.49 21.84-1.52.92-2.65 3.69-2.71 5.63-.26 10.14 0 20.3-.16 30.45-.22 12.17 5.1 21 15.5 27q43.8 25.4 87.59 50.77c1.7 1 3.63 2.13 5.49 2.19 9.91.37 19.39.46 28.73-5.24 26.95-16.46 54.49-32 81.83-47.78 10.09-5.83 15.19-14.16 15.11-26.08q-.36-51.68 0-103.33c.07-11.78-5.15-20-15-25.68-28.46-16.55-57-32.88-85.37-49.65-11.61-6.88-22.5-6.3-33.82.34Q280.87 258 200.29 305c-9.86 5.76-19.75 5.36-29.35-.29-15.48-9.1-30.79-18.48-46.14-27.81-7.73-4.7-12.84-11.52-13-20.63-.44-19.94-.41-39.89-.15-59.84.12-9.73 5.24-17.07 13.48-22 15.29-9.09 30.73-17.94 46.11-26.87 10.22-5.93 20.39-5.22 30.28.66 14.72 8.75 29.24 17.83 44 26.56 10 5.88 14.84 14.27 14.64 25.88-.28 11.44-.16 22.89-.16 35.53Z" class="bg"></path><path fill="#fdfdfe" d="M260 236.19c0-12.64-.16-24.09 0-35.53.2-11.61-4.69-20-14.64-25.88-14.74-8.73-29.26-17.81-44-26.56-9.89-5.88-20.06-6.59-30.28-.66-15.38 8.93-30.82 17.78-46.11 26.87-8.24 4.89-13.36 12.23-13.48 22-.26 20-.29 39.9.15 59.84.21 9.11 5.32 15.93 13 20.63 15.35 9.33 30.66 18.71 46.14 27.81 9.6 5.65 19.49 6.05 29.35.29q80.52-47 161-94.08c11.32-6.64 22.21-7.22 33.82-.34 28.32 16.77 56.91 33.1 85.37 49.65 9.81 5.71 15 13.9 15 25.68q-.35 51.66 0 103.33c.08 11.92-5 20.25-15.11 26.08-27.21 15.78-54.72 31.28-81.67 47.74-9.34 5.7-18.82 5.61-28.73 5.24-1.86-.06-3.79-1.2-5.49-2.19q-43.81-25.33-87.59-50.77c-10.4-6-15.72-14.86-15.5-27 .18-10.15-.1-20.31.16-30.45.06-1.94 1.19-4.71 2.71-5.63 12.38-7.48 25-14.62 37.49-21.84a17.65 17.65 0 0 1 2.43-.83c0 10.2.39 20-.09 29.71-.74 14.75 5.09 25 18.31 31.92 13.68 7.18 26.79 15.43 40.15 23.22 10.85 6.32 21.54 6.62 32.47-.11 13.87-8.55 27.92-16.81 42-25.06 10.08-5.92 15.07-14.47 14.95-26.27-.2-17.46-.1-34.94 0-52.41 0-11.33-4.78-19.72-14.63-25.37-14.86-8.52-29.6-17.23-44.45-25.77-10-5.75-20-6.17-30.24-.22Q282.25 305.87 202 352.44c-10.89 6.34-21.41 6.58-32.48.05q-41.86-24.72-84.12-48.82c-11.25-6.45-16.9-15.36-16.72-28.78.45-33.77.2-67.55.11-101.33 0-10.13 4.36-17.51 13-22.54 29.42-17.22 58.75-34.58 88.31-51.54 10.92-6.26 22.68-6.29 33.59 0 27.4 15.71 54.43 32.08 81.81 47.83 12 6.88 18.28 16.24 17.49 30.4-.54 9.79-.2 19.63 0 29.45.05 3-.73 4.81-3.48 6.35-12.93 7.2-25.66 14.69-39.51 22.68Z" class="fg"></path></svg>
              </button>
              <button className='class38a-btn display-null2' title='Arbitrium'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 683.45 683.4" class="jss336" width="24" height="24"><path fill="#2d374b" d="M0 381.57v-79.1a19.63 19.63 0 0 0 1.23-3.6c.93-6.84 1.26-13.8 2.71-20.52 2.31-10.66 5.25-21.2 8.1-31.74 1.49-5.53 3.2-11 5.07-16.44 2.42-7 4.79-14.12 7.72-21 3.44-8 7.24-15.9 11.27-23.64 4.46-8.57 9-17.15 14.17-25.27 6.2-9.67 12.92-19.05 19.88-28.19 6-7.91 12.48-15.5 19.13-22.88 5.58-6.18 11.6-12 17.65-17.7 4.7-4.45 9.69-8.62 14.65-12.79 4.55-3.82 9.08-7.71 13.91-11.15 8.47-6 17-12 25.81-17.54 6.52-4.17 13.28-8 20.17-11.52 9.45-4.83 19-9.47 28.72-13.75 6.68-2.94 13.65-5.26 20.58-7.62 7.28-2.49 14.6-4.87 22-7 6.08-1.72 12.26-3.12 18.46-4.36C276.77 4.73 282.39 4 288 3.18c4.58-.69 9.18-1.24 13.75-1.95 1.71-.27 3.36-1.16 5-1.17C329.88 0 353 0 376.07 0a13.19 13.19 0 0 1 2.52.1c5.33 1 10.63 2.08 16 3.05 8.68 1.58 17.46 2.71 26 4.73 8.34 2 16.45 4.88 24.71 7.22 13.11 3.7 25.57 9 38 14.51A317.39 317.39 0 0 1 525 52.08c8.44 5.35 16.52 11.31 24.45 17.4 8.32 6.38 16.69 12.8 24.27 20 9.64 9.17 18.71 19 27.66 28.84a251.54 251.54 0 0 1 17.29 21.13 359.34 359.34 0 0 1 29.87 48.83c3.21 6.33 6.1 12.83 8.94 19.34 1.94 4.47 3.62 9.06 5.27 13.65 1.58 4.39 3 8.85 4.45 13.28 2.06 6.23 4.3 12.4 6.07 18.7 1.71 6.09 3 12.3 4.33 18.49 1 4.81 1.93 9.66 2.68 14.52.78 5.09 1.26 10.22 2 15.32.24 1.7 1.17 3.36 1.17 5q.12 35.43.05 70.87a14 14 0 0 1-.14 2.51c-1 5.11-2.11 10.19-3 15.32-1.2 6.89-1.87 13.88-3.41 20.68-1.64 7.25-4 14.34-6.11 21.47-1.6 5.38-3.13 10.79-5 16-3.94 10.78-7.64 21.69-12.34 32.15-4.4 9.8-9.71 19.22-15.06 28.55-8.24 14.36-17.32 28.2-28.1 40.81-8.71 10.2-17.43 20.41-26.63 30.16a224.91 224.91 0 0 1-18.82 17.13c-7.36 6.24-14.81 12.4-22.6 18.09-7.26 5.3-14.84 10.21-22.57 14.81-9.27 5.54-18.61 11.06-28.35 15.69-10.78 5.13-22 9.43-33.11 13.72-7.74 3-15.69 5.46-23.61 8-4.54 1.43-9.18 2.56-13.83 3.58-5.8 1.28-11.63 2.46-17.49 3.4-6.41 1-12.88 1.7-19.31 2.62a12.51 12.51 0 0 0-3 1.22h-79.1a27.45 27.45 0 0 0-4.23-1.23c-4.31-.54-8.7-.63-13-1.41-6.63-1.22-13.19-2.84-19.78-4.31-5.65-1.27-11.37-2.31-16.92-3.93-6.13-1.78-12.15-4-18.14-6.2-9.78-3.61-19.61-7.11-29.19-11.18-7.1-3-13.92-6.74-20.73-10.39s-13.78-7.17-20.15-11.53C147.94 625.13 136.26 616.8 125 608a258.71 258.71 0 0 1-26-23 413.33 413.33 0 0 1-29.26-33.6 379 379 0 0 1-24.24-35.65c-6.29-10.38-11.5-21.47-16.73-32.43-3.61-7.53-6.7-15.31-9.73-23.1-1.83-4.69-3.06-9.62-4.63-14.42-1.16-3.55-2.54-7-3.61-10.59-.73-2.44-1-5-1.65-7.47-1.08-4.15-2.67-8.19-3.37-12.39-1.71-10.24-3-20.55-4.56-30.82A13 13 0 0 0 0 381.57Zm144.42 24.13a.52.52 0 0 0-.49-.19c0-1.79-.11-3.58-.12-5.37q-.08-80.82-.21-161.64c0-7.54 3-12.7 9.5-16.47q89.45-51.78 178.78-103.75c6.11-3.55 12.08-3.51 18.21 0q89.39 51.6 178.84 103.06c6.8 3.9 9.72 9.3 9.72 16.95q-.1 85.88 0 171.76c0 1.26-.07 2.53-.1 3.79-.68-.93-1.4-1.82-2-2.79q-48.62-75.85-97.22-151.73c-.66-1-1.36-2-2.11-3.15a10.93 10.93 0 0 0-.85 1c-12 20.43-24.07 40.86-36 61.36a4.58 4.58 0 0 0 .33 3.85c5.64 9.4 11.44 18.69 17.19 28Q457.65 415 497.47 479.6l-18.38 10.64c-.2-.37-.38-.75-.61-1.1q-45.47-71.86-91-143.72a21.46 21.46 0 0 0-1.6-2c-.58.86-1 1.44-1.38 2.07Q364.26 380 344 414.41c-1.09 1.84-.9 3.11.21 4.83Q360 444 375.73 468.84q18.88 29.76 37.72 59.55c-1.06.68-2.09 1.4-3.18 2-20.13 11.71-40.3 23.34-60.37 35.15-5.65 3.32-10.82 3.32-16.51 0-24.3-14.18-48.7-28.17-73.08-42.2-1-.57-2.07-1-3.11-1.44.55-1.13 1-2.29 1.68-3.37q40.92-69.63 81.86-139.24c14.14-24.06 28.17-48.18 42.31-72.23q20.46-34.8 41.05-69.53c.49-.83.93-1.68 1.5-2.71-24.6 0-48.64 0-72.68.1-1.09 0-2.57 1.24-3.21 2.29q-21 34.56-41.94 69.22-25.26 41.8-50.53 83.59c-10.41 17.18-20.9 34.31-31.31 51.49Q208.71 470 191.57 498.5c-3.18 5.3-6.3 10.63-9.57 16.18 8.95 5.17 17.71 10.26 26.51 15.29 10.84 6.21 21.72 12.36 32.57 18.54.43.3.84.64 1.29.9 22 12.7 43.93 25.45 66 38 9 5.13 17.56 11.06 28.46 12.07 8.55.79 16.69-.15 24-4.3 23.09-13.09 46-26.54 68.93-39.86q52.19-30.3 104.36-60.63c6.46-3.76 13.32-7.05 19.16-11.62 11.75-9.2 17.08-22 17.1-36.72q.21-104.88 0-209.76a51.81 51.81 0 0 0-2-13.53 45.21 45.21 0 0 0-21.56-27.71c-16.55-9.68-33.2-19.18-49.8-28.76q-65.42-37.73-130.83-75.47c-14.31-8.28-29.15-9.65-44.33-3.09-6 2.57-11.43 6.29-17.07 9.56q-46.61 27-93.19 54.09-37.17 21.56-74.37 43.07c-16.34 9.44-25 23.52-25 42.43q-.15 84.48 0 169v49.59c-.06 5.68-.2 11.37-.1 17.06a3.71 3.71 0 0 0 1.77 2.46c7.69 4.54 15.45 9 23.18 13.45l25.19 14.57L329.12 235c-7.25-.32-14.06-.76-20.87-.91-13.94-.31-27.83-.1-41.24 4.46-12.11 4.13-22.28 10.74-29 22-3.17 5.3-6.66 10.41-10 15.6q-31.43 48.85-62.86 97.66c-6.87 10.66-13.82 21.26-20.73 31.89Z" class="bg"></path><path fill="#95bddb" d="M257.2 521.94c1 .48 2.12.87 3.11 1.44 24.38 14 48.78 28 73.08 42.2 5.69 3.31 10.86 3.31 16.51 0 20.07-11.81 40.24-23.44 60.37-35.15 1.09-.63 2.12-1.35 3.18-2 12.47-7.17 25-14.31 37.4-21.54 9.45-5.48 18.83-11.07 28.24-16.61l18.38-10.64c11.2-6.45 22.37-12.94 33.62-19.32a13.71 13.71 0 0 0 7.41-12.35c.16-11.35 0-22.7 0-34.06 0-1.26.1-2.53.1-3.79V238.36c0-7.65-2.92-13-9.72-16.95Q439.43 170 350.09 118.31c-6.13-3.54-12.1-3.58-18.21 0Q242.51 170.2 153.1 222c-6.53 3.77-9.53 8.93-9.5 16.47q.22 80.82.21 161.64c0 1.79.08 3.58.12 5.37l.34.81c-6.23 9.72-12.42 19.47-18.7 29.16-4.12 6.34-8.37 12.59-12.56 18.88l-.79-.11V237.13c0-18.91 8.66-33 25-42.43q37.2-21.51 74.37-43.07 46.59-27 93.19-54.09c5.64-3.27 11.11-7 17.07-9.56 15.18-6.56 30-5.19 44.33 3.09q65.36 37.87 130.82 75.55c16.6 9.58 33.25 19.08 49.8 28.76a45.21 45.21 0 0 1 21.56 27.71 51.81 51.81 0 0 1 2 13.53q.18 104.88 0 209.76c0 14.72-5.35 27.52-17.1 36.72-5.84 4.57-12.7 7.86-19.16 11.62q-52.1 30.35-104.34 60.63c-23 13.32-45.84 26.77-68.93 39.86-7.33 4.15-15.47 5.09-24 4.3-10.9-1-19.48-6.94-28.46-12.07-22.05-12.58-44-25.33-66-38-.45-.26-.86-.6-1.29-.9 4.36-7.44 8.69-14.9 13.08-22.31.89-1.53 2.02-2.87 3.04-4.29Z" class="fg"></path><path fill="#fefefe" d="M257.2 521.94c-1 1.42-2.15 2.76-3 4.26-4.39 7.41-8.72 14.87-13.08 22.31-10.85-6.18-21.73-12.33-32.57-18.54-8.8-5-17.56-10.12-26.51-15.29 3.27-5.55 6.39-10.88 9.57-16.18q17.16-28.49 34.36-56.95c10.41-17.18 20.9-34.31 31.31-51.49q25.31-41.78 50.53-83.59 20.94-34.62 41.94-69.22c.64-1.05 2.12-2.28 3.21-2.29 24-.13 48.08-.1 72.68-.1-.57 1-1 1.88-1.5 2.71q-20.52 34.76-41.05 69.53c-14.14 24-28.17 48.17-42.31 72.23q-40.94 69.67-81.9 139.24c-.64 1.08-1.13 2.24-1.68 3.37ZM113 454.36c4.19-6.29 8.44-12.54 12.56-18.88 6.28-9.69 12.47-19.44 18.7-29.16l.15-.62c6.91-10.63 13.86-21.23 20.73-31.89Q196.61 325 228 276.18c3.34-5.19 6.83-10.3 10-15.6 6.74-11.25 16.91-17.86 29-22 13.41-4.56 27.3-4.77 41.24-4.46 6.81.15 13.62.59 20.87.91L162.26 503.29l-25.19-14.57c-7.73-4.47-15.49-8.91-23.18-13.45a3.71 3.71 0 0 1-1.77-2.46c-.1-5.69 0-11.38.1-17.06Z" class="fg"></path><path fill="#289fef" d="M538.5 413.87c0 11.36.16 22.71 0 34.06a13.71 13.71 0 0 1-7.41 12.35c-11.25 6.38-22.42 12.87-33.62 19.32l-79.63-129.18c-5.75-9.33-11.55-18.62-17.19-28a4.58 4.58 0 0 1-.33-3.85c11.91-20.5 24-40.93 36-61.36a10.93 10.93 0 0 1 .85-1c.75 1.12 1.45 2.12 2.11 3.15q48.6 75.86 97.22 151.73c.6.96 1.32 1.85 2 2.78Zm-59.41 76.37c-9.41 5.54-18.79 11.13-28.24 16.61-12.44 7.23-24.93 14.37-37.4 21.54q-18.85-29.77-37.72-59.55Q360 444 344.16 419.24c-1.11-1.72-1.3-3-.21-4.83q20.37-34.41 40.59-68.91c.36-.63.8-1.21 1.38-2.07a21.46 21.46 0 0 1 1.6 2q45.5 71.85 91 143.72c.19.34.37.72.57 1.09Z" class="fg"></path><path fill="#718ea9" d="m113 454.36-.79 1.39v-1.5Z" class="fg"></path><path fill="#4d627a" d="m144.42 405.7-.15.62-.34-.81a.52.52 0 0 1 .49.19Z" class="fg"></path></svg>
              </button>
            </div>
            <div className='class38b wt none'>
              <button className='class38b-1'>All Vaults</button>
              <button className='class38b-1'>Eligible Vaults</button>
              <button className='class38b-1'>My Vaults</button>
            </div>
            <div className='class38c none'>
              <button className='class38c-1'>Boosted vaults</button>
              <button className='class38c-1'>Bonding vaults</button>
            </div>
            <div className='class38c none'>
              <button className='class38c-1'>coming soon</button>
              <button className='class38c-1'>coming soon</button>
            </div>
            <button className='jss1019'>
              <div className='jss1020'>
                <div className='jss1021'>Chain:</div>
                <div className='jss1022'>All</div>
                <svg class="jss1023" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></svg>
              </div>
            </button>
          </div>
          <div className='class39'> {/**jss164 */}
            <div className='class40'>
              <div className='class42'>
              <input placeholder="Search..." type="text" class="class42-search" value=""></input>
              <div className='class42-btn'>
                <svg class="class42-l1" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
              </div>
              </div>
              <div className='class43'>
                <button className='class44'>
                  Wallet
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 9" class="class44-svg"><path d="M2.463.199.097 2.827a.375.375 0 0 0 .279.626h5.066a.375.375 0 0 0 .278-.626L3.355.199a.6.6 0 0 0-.892 0Z"></path><path d="M3.355 8.208 5.72 5.579a.375.375 0 0 0-.278-.626H.376a.375.375 0 0 0-.279.626l2.366 2.629a.601.601 0 0 0 .892 0Z"></path></svg>
                </button>
                <button className='class44'>
                  Deposited
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 9" class="class44-svg"><path d="M2.463.199.097 2.827a.375.375 0 0 0 .279.626h5.066a.375.375 0 0 0 .278-.626L3.355.199a.6.6 0 0 0-.892 0Z"></path><path d="M3.355 8.208 5.72 5.579a.375.375 0 0 0-.278-.626H.376a.375.375 0 0 0-.279.626l2.366 2.629a.601.601 0 0 0 .892 0Z"></path></svg>
                </button>
                <button className='class44'>
                  APR
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 9" class="class44-svg"><path d="M2.463.199.097 2.827a.375.375 0 0 0 .279.626h5.066a.375.375 0 0 0 .278-.626L3.355.199a.6.6 0 0 0-.892 0Z"></path><path d="M3.355 8.208 5.72 5.579a.375.375 0 0 0-.278-.626H.376a.375.375 0 0 0-.279.626l2.366 2.629a.601.601 0 0 0 .892 0Z"></path></svg>
                </button>
                <button className='class44'>
                  DAILY
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 9" class="class44-svg"><path d="M2.463.199.097 2.827a.375.375 0 0 0 .279.626h5.066a.375.375 0 0 0 .278-.626L3.355.199a.6.6 0 0 0-.892 0Z"></path><path d="M3.355 8.208 5.72 5.579a.375.375 0 0 0-.278-.626H.376a.375.375 0 0 0-.279.626l2.366 2.629a.601.601 0 0 0 .892 0Z"></path></svg>
                </button>
                <button className='class44'>
                  TVL
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 9" class="class44-svg"><path d="M2.463.199.097 2.827a.375.375 0 0 0 .279.626h5.066a.375.375 0 0 0 .278-.626L3.355.199a.6.6 0 0 0-.892 0Z"></path><path d="M3.355 8.208 5.72 5.579a.375.375 0 0 0-.278-.626H.376a.375.375 0 0 0-.279.626l2.366 2.629a.601.601 0 0 0 .892 0Z"></path></svg>
                </button>
                <button className='class44'>
                  SAFETY
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 9" class="class44-svg"><path d="M2.463.199.097 2.827a.375.375 0 0 0 .279.626h5.066a.375.375 0 0 0 .278-.626L3.355.199a.6.6 0 0 0-.892 0Z"></path><path d="M3.355 8.208 5.72 5.579a.375.375 0 0 0-.278-.626H.376a.375.375 0 0 0-.279.626l2.366 2.629a.601.601 0 0 0 .892 0Z"></path></svg>
                </button>
              </div>
            </div>
            <div className='class41'>
              <div>
                <button className='class45 none' href="#">
                  <div className='class46 me'>
                    <div className='class47'>
                      <div className='class49'>
                          <img alt="Moonbeam" src="https://app.beefy.finance/static/media/moonbeam.aa1c3648.svg" width="24" height="24"></img>
                      </div>
                      <div className='jss199 class50' datacount="2">
                          <img src="https://app.beefy.finance/static/media/wstDOT.63d27f89.svg" alt="" role="presentation" class="jss200" width="48" height="48"></img>
                          <img src="https://app.beefy.finance/static/media/xcDOT.71eafc2f.png" alt="" role="presentation" class="jss200" width="48" height="48"></img>
                      </div>
                      <div className='class51'>
                        <div className='class51-l1'>Test GLP Token</div>
                        <div className='class51-l2'>
                        <div className="jss209">GMX</div>
                        <div class="class51-l3">🔥 Maddy Boost</div>
                        </div>
                      </div>
                    </div>
                    <div className='class48'>
                        <div className='class52'>
                            <div className='class53'>
                              <div>
                                <div className="jss601">
                                  <div className="jss602">WALLET</div>
                                </div>
                                <div>
                                  <div className='last54'>{balwallet * 1}</div>
                                </div>
                              </div>
                            </div>
                            <div className='class53'>
                              <div>
                              <div className="jss601">
                                  <div className="jss602">Deposited</div>
                                </div>
                                <div>
                                  <div className='last54'>{balvault * 1}</div>
                                </div>
                              </div>
                            </div>
                            <div className='class53'>
                              <div>
                              <div className="jss601">
                                  <div className="jss602">apy</div>
                                </div>
                                <div>
                                  <div className='last54'>14%</div>
                                </div>
                              </div>
                            </div>
                            <div className='class53'>
                              <div>
                              <div className="jss601">
                                  <div className="jss602">daily</div>
                                </div>
                                <div>
                                  <div className='last54'>0.03%</div>
                                </div>
                              </div>
                            </div>
                            <div className='class53'>
                              <div>
                              <div className="jss601">
                                  <div className="jss602">tvl</div>
                                </div>
                                <div>
                                  <div className='last54'>{tvl * 10}</div>
                                </div>
                              </div>
                            </div>
                            <div className='class53'>
                              <div>
                              <div className="jss601">
                                  <div className="jss602">safety</div>
                                </div>
                                <div>
                                  <div className='last54'>9.0</div>
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>
                  </div>
                </button>
              </div>
                <Accordion istvl={tvl * 10} isbalvault={balvault * 1} isbalwallet={balwallet * 1} isprice={price * 1} />
            </div>
          </div>
        </div>
        <div class="jss3">
        <ul class="jss5">
        <li class="jss6">
        <a href="#" target="_blank" rel="noopener" class="jss7">Proposals</a>
        </li>
        <li class="jss6">
        <a href="#" target="_blank" rel="noopener" class="jss7">Stats</a>
        </li>
        <li class="jss6">
        <a href="#" target="_blank" rel="noopener" class="jss7">News</a>
        </li>
        <li class="jss6">
        <a href="https://maddy-protocol.gitbook.io/maddy-protocol/" target="_blank" rel="noopener" class="jss7">Docs</a>
        </li>
        <li class="jss6">
        <a href="#" target="_blank" rel="noopener" class="jss7">Audit</a>
        </li>
        <li class="jss6">
          <a href="#" target="_blank" rel="noopener" class="jss7">Media Kit</a>
        </li>
        </ul>
        <ul class="jss5">
        <li class="jss6">
        <a href="#" target="_blank" rel="noopener" class="jss7" title="GitHub">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 .926C5.616.926.444 6.01.444 12.28c0 5.018 3.311 9.273 7.902 10.774.577.107.79-.245.79-.546 0-.27-.01-.985-.015-1.931-3.215.685-3.893-1.523-3.893-1.523-.525-1.311-1.285-1.662-1.285-1.662-1.047-.704.08-.69.08-.69 1.161.08 1.77 1.17 1.77 1.17 1.031 1.737 2.706 1.235 3.366.946.104-.735.402-1.235.732-1.519-2.566-.284-5.263-1.26-5.263-5.611 0-1.24.447-2.253 1.189-3.047-.13-.287-.52-1.442.1-3.005 0 0 .969-.305 3.179 1.164a11.28 11.28 0 0 1 2.889-.383c.982.005 1.964.13 2.889.383 2.195-1.469 3.163-1.164 3.163-1.164.62 1.563.23 2.718.115 3.005.737.794 1.185 1.808 1.185 3.047 0 4.362-2.701 5.322-5.272 5.601.404.341.78 1.038.78 2.102 0 1.52-.015 2.74-.015 3.109 0 .298.202.653.795.54 4.623-1.491 7.93-5.75 7.93-10.76C23.556 6.011 18.383.926 12 .926Z"></path></svg>
        </a>
        </li>
        <li class="jss6"><a href="https://t.me/maddyprotocol" target="_blank" rel="noopener" class="jss7" title="Telegram">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 23.555c6.384 0 11.556-5.172 11.556-11.555C23.556 5.616 18.384.444 12 .444 5.617.444.444 5.616.444 12c0 6.383 5.173 11.555 11.556 11.555ZM6.303 11.082l11.142-4.296c.517-.187.969.126.801.908h.001L16.35 16.63c-.14.634-.517.788-1.044.49l-2.889-2.13-1.393 1.343c-.154.154-.284.284-.583.284l.205-2.94L16 8.84c.233-.205-.052-.32-.359-.117L9.025 12.89 6.172 12c-.619-.196-.632-.619.131-.917Z"></path></svg>
        </a>
        </li>
        <li class="jss6"><a href="#" target="_blank" rel="noopener" class="jss7" title="Discord">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 .444C5.619.444.444 5.62.444 12 .444 18.38 5.62 23.555 12 23.555c6.381 0 11.556-5.174 11.556-11.555C23.556 5.619 18.38.444 12 .444Zm3.016 15.915s-.413-.468-.708-.876c1.428-.41 1.962-1.23 1.962-1.23-.468.295-.896.47-1.243.646-.533.235-1.067.35-1.6.468-2.527.41-3.945-.276-5.286-.82l-.458-.232s.534.82 1.905 1.23c-.36.41-.717.877-.717.877-2.44-.058-3.33-1.582-3.33-1.582 0-3.395 1.605-6.15 1.605-6.15 1.606-1.168 3.094-1.112 3.094-1.112l.12.118c-1.965.47-2.856 1.347-2.856 1.347s.239-.117.655-.295c2.646-1.04 5.536-.965 8.211.353 0 0-.892-.821-2.736-1.347l.163-.16c.255 0 1.604.048 3.047 1.104 0 0 1.615 2.759 1.615 6.15-.053-.066-1.002 1.458-3.443 1.511Z"></path><path d="M13.988 13.788c.623 0 1.13-.526 1.13-1.174 0-.644-.504-1.17-1.13-1.17v.003c-.62 0-1.128.524-1.13 1.173 0 .643.508 1.168 1.13 1.168Zm-4.045 0c.623 0 1.13-.526 1.13-1.174 0-.644-.504-1.17-1.126-1.17l-.004.003c-.623 0-1.13.524-1.13 1.173 0 .643.507 1.168 1.13 1.168Z"></path></svg>
        </a>
        </li>
        <li class="jss6"><a href="https://twitter.com/maddyprotocol" target="_blank" rel="noopener" class="jss7" title="Twitter">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 .926C5.616.926.444 6.01.444 12.28c0 5.018 3.311 9.273 7.902 10.774.577.107.79-.245.79-.546 0-.27-.01-.985-.015-1.931-3.215.685-3.893-1.523-3.893-1.523-.525-1.311-1.285-1.662-1.285-1.662-1.047-.704.08-.69.08-.69 1.161.08 1.77 1.17 1.77 1.17 1.031 1.737 2.706 1.235 3.366.946.104-.735.402-1.235.732-1.519-2.566-.284-5.263-1.26-5.263-5.611 0-1.24.447-2.253 1.189-3.047-.13-.287-.52-1.442.1-3.005 0 0 .969-.305 3.179 1.164a11.28 11.28 0 0 1 2.889-.383c.982.005 1.964.13 2.889.383 2.195-1.469 3.163-1.164 3.163-1.164.62 1.563.23 2.718.115 3.005.737.794 1.185 1.808 1.185 3.047 0 4.362-2.701 5.322-5.272 5.601.404.341.78 1.038.78 2.102 0 1.52-.015 2.74-.015 3.109 0 .298.202.653.795.54 4.623-1.491 7.93-5.75 7.93-10.76C23.556 6.011 18.383.926 12 .926Z"></path><path d="M12 .444C5.619.444.444 5.62.444 12 .444 18.38 5.62 23.555 12 23.555c6.381 0 11.556-5.174 11.556-11.555C23.556 5.619 18.38.444 12 .444Zm5.137 8.922c.005.113.008.227.008.342 0 3.503-2.666 7.542-7.542 7.542a7.503 7.503 0 0 1-4.063-1.19c.208.024.419.036.633.036a5.318 5.318 0 0 0 3.292-1.135 2.654 2.654 0 0 1-2.476-1.84 2.64 2.64 0 0 0 1.197-.046 2.651 2.651 0 0 1-2.126-2.632c.357.198.765.318 1.2.331a2.648 2.648 0 0 1-.82-3.539 7.525 7.525 0 0 0 5.463 2.77 2.651 2.651 0 0 1 4.517-2.417 5.316 5.316 0 0 0 1.683-.644 2.66 2.66 0 0 1-1.166 1.466 5.285 5.285 0 0 0 1.523-.417 5.385 5.385 0 0 1-1.323 1.373Z"></path></svg>
        </a>
        </li>
        <li class="jss6">
          <a href="#" target="_blank" rel="noopener" class="jss7" title="Reddit">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12S0 18.623 0 12 5.377 0 12 0Zm8 12c0-.968-.786-1.754-1.754-1.754-.477 0-.898.182-1.207.491-1.193-.856-2.849-1.418-4.674-1.488l.8-3.747 2.597.547a1.25 1.25 0 1 0 1.249-1.305c-.491 0-.912.281-1.109.702l-2.905-.618a.352.352 0 0 0-.239.042.34.34 0 0 0-.14.197l-.884 4.182c-1.867.056-3.537.604-4.744 1.488a1.77 1.77 0 0 0-1.207-.491c-.969 0-1.755.786-1.755 1.754 0 .716.421 1.319 1.039 1.6a3.298 3.298 0 0 0-.042.533c0 2.695 3.13 4.871 7.003 4.871 3.874 0 7.004-2.176 7.004-4.871 0-.182-.014-.35-.042-.519A1.816 1.816 0 0 0 20 12Zm-5.024 4.547c-.856.857-2.484.913-2.962.913-.477 0-2.119-.07-2.961-.913a.33.33 0 0 1 0-.463.33.33 0 0 1 .463 0c.533.534 1.684.73 2.512.73.828 0 1.965-.196 2.513-.73a.33.33 0 0 1 .463 0 .362.362 0 0 1-.028.463ZM8 13.249C8 12.561 8.562 12 9.249 12c.688 0 1.25.561 1.25 1.249 0 .688-.562 1.249-1.25 1.249A1.252 1.252 0 0 1 8 13.249Zm6.751 1.249a1.251 1.251 0 0 1-1.249-1.249c0-.688.561-1.249 1.249-1.249.688 0 1.249.561 1.249 1.249 0 .688-.561 1.249-1.249 1.249Z"></path>
          </svg>
          </a>
          </li>
          </ul>
        </div>
      </div>
    </div>
	);
}

export default App;
