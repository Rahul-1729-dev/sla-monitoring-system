const cron = require("node-cron");

const axios = require("axios");

const { ethers } = require("ethers");

const Log = require("../models/Log");

const abi = [
    "function logStatus(bool isUp) public",
    "function getUptimePercentage() public view returns(uint)"
];

module.exports = function startMonitoring(){

    cron.schedule("* * * * *", async()=>{

        try{

            console.log("Checking Website...");

            const start = Date.now();

            const response = await axios.get(
                process.env.WEBSITE_URL,
                {
                    timeout:10000,
                    headers:{
                        "User-Agent":"Mozilla/5.0"
                    }
                }
            );

            const responseTime =
                Date.now() - start;

            const isUp =
                response.status === 200;

            const status =
                isUp ? "UP" : "DOWN";

            console.log(`Website ${status}`);

            await Log.create({

                status,

                responseTime,

                timestamp:new Date()

            });

            // ONLY UPDATE BLOCKCHAIN
            // IF WEBSITE IS DOWN

            if(!isUp){

                console.log(
                    "Downtime detected"
                );

                const provider =
                new ethers.JsonRpcProvider(
                    process.env.RPC_URL
                );

                const wallet =
                new ethers.Wallet(
                    process.env.PRIVATE_KEY,
                    provider
                );

                const contract =
                new ethers.Contract(
                    process.env.CONTRACT_ADDRESS,
                    abi,
                    wallet
                );

               const tx =
await contract.logStatus(false, {

    gasLimit: 300000

});
                await tx.wait();

                console.log(
                    "Penalty transaction success"
                );

            }else{

                console.log(
                    "Website UP -> no transaction"
                );
            }

        }catch(err){

            console.log(
                "Website DOWN"
            );

            try{

                await Log.create({

                    status:"DOWN",

                    responseTime:0,

                    timestamp:new Date()

                });

                const provider =
                new ethers.JsonRpcProvider(
                    process.env.RPC_URL
                );

                const wallet =
                new ethers.Wallet(
                    process.env.PRIVATE_KEY,
                    provider
                );

                const contract =
                new ethers.Contract(
                    process.env.CONTRACT_ADDRESS,
                    abi,
                    wallet
                );

                const tx =
                await contract.logStatus(false);

                await tx.wait();

                console.log(
                    "Penalty transferred"
                );

            }catch(error){

                console.log(error);
            }
        }

    });

};