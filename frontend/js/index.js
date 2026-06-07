const connectBtn =
document.getElementById("connectBtn");

let currentAccount = null;

async function connectWallet() {

    if (!window.ethereum) {

        alert("Install MetaMask");

        return;
    }

    try {

        const accounts =
            await window.ethereum.request({
                method: "eth_requestAccounts"
            });

        currentAccount = accounts[0];

        document.getElementById(
            "walletAddress"
        ).innerText = currentAccount;

        connectBtn.innerText =
            "Wallet Connected";

        console.log(
            "Connected:",
            currentAccount
        );

    } catch (err) {

        console.log(err);

        alert("MetaMask Connection Failed");
    }
}

connectBtn.addEventListener(
    "click",
    connectWallet
);

window.ethereum?.on(
    "accountsChanged",
    (accounts) => {

        if (accounts.length > 0) {

            currentAccount = accounts[0];

            document.getElementById(
                "walletAddress"
            ).innerText = currentAccount;
        }
    }
);