import React, { useEffect, useState } from 'react';
import {ethers} from "ethers";
import contractAbi from '../../utils/Maddyvault.json';
import ERC20Abi from '../../utils/Erc20faucet.json';

const CONTRACT_ADDRESS = '0x674de548F003506d5B2001413517e2d1ad00348b';//vault
const ERC20 = '0x0aC8F437A5A2454B7A7cdfF3606a1198a35374CD';


const SecondTab = () => {

  const [currentAccount, setCurrentAccount] = useState('')
  const [value, setValue] = useState('')

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
  return (
    <div className="relative flex flex-row w-full rounded border border-grey3 bg-grey3 h15">
      <div className="flex items-center">
        <div className="dropdown inline-block relative w-max">
          <div className="pointer-events-none lg:pointer-events-auto">
          <div slot="label" className="flex flex-row space-x-4 items-center pl-4 pr-6 py-4 rounded border border-grey3 bg-grey3">
            <img src="https://gmx.io/static/media/ic_glp_custom.11dd75db.svg" className="h-12 w-12" alt="Selected Token yvDAI"></img>
             <p>▾</p>
          </div>
          </div>
        </div>
      </div>
        <div className="flex flex-col lg:flex-row justify-end rounded border w-full border-grey3 bg-grey3">
          <div className="relative w-full">
            <p className="absolute text-xs lg:text-sm p-2 left-2 pointer-events-none text-lightgrey10">Available:0.0 GLP</p> 
            <input placeholder="0.00" className="rounded appearance-none text-xl w-full text-right h-full p-4 bg-grey3 inherit border-none" inputfilter="t=>/^\d*[.,]?\d*$/.test(t)" onChange={e => setValue(e.target.value)}></input>
          </div>
        <div className="hidden lg:flex flex-col w-max">
          <button className="border-0 border-grey5 rounded px-3 py-1 select-none font-alcxFlow overflow-ellipsis h-10 w-full text-lightgrey10 text-opacity-80 text-xs  bg-grey3 hover:bg-grey1 hover:cursor-pointer hover:text-opacity-100 disabled:opacity-50 transition-all undefined " onClick={Withdraw}>
            <span className="flex flex-row justify-center">
              <p className="">WITHDRAW</p>
            </span>
          </button>
          <button className="border-0 border-grey5 rounded px-3 py-1 select-none font-alcxFlow overflow-ellipsis h-10 w-full text-lightgrey10 text-opacity-80 text-xs  bg-grey3 hover:bg-grey1 hover:cursor-pointer hover:text-opacity-100 disabled:opacity-50 transition-all undefined">
            <span className="flex flex-row justify-center">
              <p className="">CLEAR</p>
            </span>
          </button>
        </div>
        <div className="lg:hidden flex flex-row w-full">
          <button className="border-0 border-grey5 rounded px-3 py-1 select-none font-alcxFlow overflow-ellipsis h-10 w-full text-lightgrey10 text-opacity-80 text-xs  bg-grey3 hover:bg-grey1 hover:cursor-pointer hover:text-opacity-100 disabled:opacity-50 transition-all undefined" onClick={Withdraw}>
            <span className="flex flex-row justify-center">
              <p className="">WITHDRAW</p>
            </span>
          </button>
          <button className="border-0 border-grey5 rounded px-3 py-1 select-none font-alcxFlow overflow-ellipsis h-10 w-full text-lightgrey10 text-opacity-80 text-xs  bg-grey3 hover:bg-grey1 hover:cursor-pointer hover:text-opacity-100 disabled:opacity-50 transition-all undefined">
            <span className="flex flex-row justify-center">
              <p class="">CLEAR</p>
            </span>
          </button>
        </div>
        </div>
      </div>
  );
};
export default SecondTab;