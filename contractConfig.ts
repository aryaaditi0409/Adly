export const CONTRACT_ADDRESS = "0x9e0a3814744Df45c339c96962eAEFe39F408E4A6";

export const CONTRACT_ABI = [
  {
    "inputs": [],
    "name": "watchAd",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [],
    "name": "withdrawEarnings",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_name", "type": "string" },
      { "internalType": "string", "name": "_website", "type": "string" },
      { "internalType": "string", "name": "_demoVideo", "type": "string" },
    ],
    "name": "registerCompany",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_name", "type": "string" },
      { "internalType": "string", "name": "_demoVideo", "type": "string" },
    ],
    "name": "addProduct",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [
      { "internalType": "address", "name": "_company", "type": "address" },
      { "internalType": "uint256", "name": "_productIndex", "type": "uint256" },
      { "internalType": "uint256", "name": "_rating", "type": "uint256" },
    ],
    "name": "rateProduct",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_newReward", "type": "uint256" }],
    "name": "updateReward",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [{ "internalType": "address", "name": "_company", "type": "address" }],
    "name": "getCompanyProducts",
    "outputs": [
      {
        "components": [
          { "internalType": "string", "name": "name", "type": "string" },
          { "internalType": "string", "name": "demoVideo", "type": "string" },
          { "internalType": "uint256", "name": "rating", "type": "uint256" },
        ],
        "internalType": "struct AdReviewPlatform.Product[]",
        "name": "",
        "type": "tuple[]",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [],
    "name": "getCompanyList",
    "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }],
    "stateMutability": "view",
    "type": "function",
  },
];