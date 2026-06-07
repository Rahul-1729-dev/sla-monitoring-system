const Log = require("../models/Log");

const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider(
    process.env.RPC_URL
);

exports.getStats = async (req, res) => {

    try {

        const logs = await Log.find();

        const totalChecks = logs.length;

        const uptimeCount = logs.filter(
            log => log.status === "UP"
        ).length;

        const downtimeCount = logs.filter(
            log => log.status === "DOWN"
        ).length;

        const uptimePercentage =
            totalChecks === 0
                ? 0
                : (
                    (uptimeCount / totalChecks) * 100
                ).toFixed(2);

        const providerAddress =
            process.env.PROVIDER_ADDRESS;

        const clientAddress =
            process.env.CLIENT_ADDRESS;

        const contractAddress =
            process.env.CONTRACT_ADDRESS;

        let providerBalance = "0";
        let clientBalance = "0";
        let contractBalance = "0";

        // PROVIDER BALANCE
        if (providerAddress) {

            const balance =
                await provider.getBalance(
                    providerAddress
                );

            providerBalance =
                ethers.formatEther(balance);
        }

        // CLIENT BALANCE
        if (clientAddress) {

            const balance =
                await provider.getBalance(
                    clientAddress
                );

            clientBalance =
                ethers.formatEther(balance);
        }

        // CONTRACT BALANCE
        if (contractAddress) {

            const balance =
                await provider.getBalance(
                    contractAddress
                );

            contractBalance =
                ethers.formatEther(balance);
        }

        res.json({

            currentStatus:
                logs.length > 0
                    ? logs[logs.length - 1].status
                    : "UNKNOWN",

            totalChecks,

            uptimeCount,

            downtimeCount,

            uptimePercentage,

            website:
                process.env.WEBSITE_URL,

            provider:
                providerAddress,

            client:
                clientAddress,

            penaltyAmount:
                "0.00001",

            penaltyPaid:
                uptimePercentage < 95,

            providerBalance,

            clientBalance,

            contractBalance

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: err.message
        });

    }

};

exports.getLogs = async (req, res) => {

    try {

        const logs = await Log.find()
            .sort({ createdAt: -1 });

        res.json(logs);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: err.message
        });

    }

};