async function main() {
  // Grab the contract factory 
  const MyNFT = await ethers.getContractFactory("ValentineNFT");

  const myNFT = await MyNFT.deploy(); // Instance of the contract 
  console.log("Contract deployed to address:", myNFT.target);
}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });