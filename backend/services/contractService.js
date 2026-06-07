const ethers = require("ethers");
require("dotenv").config();

const provider =
new ethers.JsonRpcProvider(
  process.env.RPC_URL
);

const wallet =
new ethers.Wallet(
  process.env.PRIVATE_KEY,
  provider
);

const abi = [

  "function logStatus(bool _isUp) public",

  "function totalChecks() view returns(uint256)",

  "function successfulChecks() view returns(uint256)",
   "function getUptimePercentage() view returns(uint256)",

  "function getDowntimeCount() view returns(uint256)",

  "function getContractBalance() view returns(uint256)",

  "function penaltyPaid() view returns(bool)"
];

const contract =
new ethers.Contract(

  process.env.CONTRACT_ADDRESS,

  abi,

  wallet
);

module.exports = {
  contract,
  provider
};
