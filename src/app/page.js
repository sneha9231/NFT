'use client';
require('dotenv').config();
import { ToastContainer, toast } from 'react-toastify';
import ReactConfetti from "react-confetti";
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
const ethers = require('ethers');

export default function Home() {
  const [opposite, setOpposite] = useState('Yes');
  const [buttonText, setButtonText] = useState('No');
  const [hashCode, setHashCode] = useState('');
  const [alreadySaidYes, setAlreadySaidYes] = useState(false);
  const [minted, setMinted] = useState(false);
  const [Confetti, setConfetti] = useState(false);
  // const [windowDimensions, setDimensions] = useState({width: window.innerWidth, height: window.innerHeight});

  //   const detectSize = () => {
   
  //       setDimensions({width: window.innerWidth, height: window.innerHeight});
  //   }

  //   useEffect(() => {
      
  //       window.addEventListener('resize', detectSize);
  //       return () => window.removeEventListener('resize', detectSize);
      
  //   }, [windowDimensions]);



  const changeYesToNo = () => {
    if(!alreadySaidYes) {
      if(buttonText === 'Yes') {
        notifyYes();
        setAlreadySaidYes(true);
      } else{
        setButtonText(buttonText === 'Yes' ? 'No' : 'Yes');
        setOpposite("No");
        notifyNo();
      }
    } else{
      notifyAlreadySaidYes();
      setConfetti(true);
    }
  };

  const handleOpposite = () => {
    if(!alreadySaidYes) {
      if(opposite === 'No') {
        notifyNo();
        setButtonText("No");
        setOpposite("Yes");
      } else{
        notifyYes();
        setAlreadySaidYes(true);
      }
    } else{
      notifyAlreadySaidYes();
      setConfetti(true);
    }

  }


  const notifyAlreadySaidYes = () => {
    toast('You already said, Yes ❤️', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      style: {
        background: "pink",
        color: "black",
        fontSize: "16px",
      }
    });
  }

  const notifyNo = () => {
    toast.error('You can not say that, please say Yes 🫣', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      style: {
        background: "pink",
        color: "black",
        fontSize: "16px",
      }
    });
  };

  const notifyYes = () => 
  toast.promise(
    mintNFT,
    {
      pending: {
        render(){
          return "Wait, i want to show you something..."
        },
        icon: "🟢",
      },
      success: {
        render(){
          setConfetti(true);
          return "For your Yes!, I have a NFT for you ❤️❤️";
        },
        icon: "🟢",
      },
      error: {
        render({data}){
          return "Error: " + data;
        }
      }
    },
    {
      position: "top-right",
      autoClose: 6000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      style: {
        background: "pink",
        color: "black",
        fontSize: "16px",
      }
    });

  // mintNFT start here

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const provider = new ethers.AlchemyProvider('sepolia', API_KEY)


  const contractAddress = '0x13D2CE6ae311657D8B3FEf153bf79126DFd626B3'

  const contract = require("../../nftABI.json");
  const abi = contract.abi

  const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY
  const signer = new ethers.Wallet(privateKey, provider)

  // instasiated the contract
  const myNftContract = new ethers.Contract(contractAddress, abi, signer)
  // above this we have instasiated the contract that is deployed on the blockchain


  const tokenUri = "https://gateway.pinata.cloud/ipfs/QmYZzquzW2FZQu3E1DbT5tGNEj9k3xy3NFJkiYdYNxvUax"

  const mintNFT = async () => {
      let nftTxn = await myNftContract.mintNFT(signer.address, tokenUri)
      await nftTxn.wait()
      setHashCode(nftTxn.hash);
      setMinted(true);
  }

  // mintNFT end here

  console.log("gulshanprr");

  return (
    <div className='pt-16 font-bold text-center min-h-screen bg-gradient-to-r from-pink-300 to-red-300 from-rose-300 to-pink-300'>
      <ToastContainer />
      {Confetti && (
          <ReactConfetti
            width={window.innerWidth}
            height={window.innerHeight}
            tweenDuration={1000}
          />
        )}
      <h1 className='text-6xl lg:text-8xl font-custom2'>Hii, How you doing?</h1>
      <h2 className='pt-6 text-5xl lg:text-7xl font-custom2'>Will you be mine Valentine??</h2>
      <div className='pt-16'>
      <button onClick={handleOpposite} className="mt-12 mx-4 py-2 px-4 text-lg lg:text-2xl bg-transparent text-black hover:bg-black font-semibold hover:text-white border hover:border-transparent rounded">{opposite}</button>
      <button onClick={changeYesToNo} className="mx-4 text-lg lg:text-2xl bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded">{buttonText}</button>
      <div className='pt-24'>
      {minted ? (
        <a href={`https://sepolia.etherscan.io/tx/${hashCode}`} target="_blank" rel="noopener noreferrer" className="text-black hover:text-sky- underline visited:text-purple-800 text-base lg:text-xl font-custom4">
          See, What i got for you ❤️!
        </a>
      ) : "❤️❤️❤️❤️"}
      </div>
      </div>
    </div>
  );
}