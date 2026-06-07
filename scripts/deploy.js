require("dotenv").config();

async function main() {

    const [deployer] =
    await ethers.getSigners();

    console.log(
        "Deploying with:",
        deployer.address
    );

    const SLA =
    await ethers.getContractFactory(
        "SLAContract"
    );

    const penaltyAmount =
    ethers.parseEther("0.00001");

    const contract =
    await SLA.deploy(

        process.env.CLIENT_ADDRESS,

        penaltyAmount,

        {
            value:
            ethers.parseEther("0.001")
        }

    );

    await contract.waitForDeployment();

    const address =
    await contract.getAddress();

    console.log(
        "Contract deployed:",
        address
    );

    console.log(
        "Initial balance funded"
    );
}

main().catch((error)=>{

    console.error(error);

    process.exitCode = 1;
});