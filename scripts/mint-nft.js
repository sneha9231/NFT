require('dotenv').config();
const ethers = require('ethers');

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const provider = new ethers.AlchemyProvider('sepolia', API_KEY)


const contractAddress = '0x30988E5D30d49094d0eC99df5F23812FBE6E60A2'

const contract = require("../nftABI.json");
const abi = contract.abi

const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY
const signer = new ethers.Wallet(privateKey, provider)

// instasiated the contract
const myNftContract = new ethers.Contract(contractAddress, abi, signer)
// above this we have instasiated the contract that is deployed on the blockchain


const tokenUri = "https://gateway.pinata.cloud/ipfs/QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP"


const mintNFT = async () => {
    let nftTxn = await myNftContract.mintNFT(signer.address, tokenUri)
    await nftTxn.wait()
    console.log(`NFT Minted! Check it out at: https://sepolia.etherscan.io/tx/${nftTxn.hash}`)
}

mintNFT()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
});
