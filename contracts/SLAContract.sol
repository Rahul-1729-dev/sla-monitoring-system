// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

contract SLAContract {

    address public provider;

    address public client;

    uint256 public penaltyAmount;

    uint256 public totalChecks;

    uint256 public downtimeCount;

    uint256 public totalPenaltyPaid;

    event StatusLogged(
        bool status,
        uint256 timestamp
    );

    event PenaltyTransferred(
        address indexed client,
        uint256 amount,
        uint256 timestamp
    );

    constructor(
        address _client,
        uint256 _penaltyAmount
    ) payable {

        provider = msg.sender;

        client = _client;

        penaltyAmount = _penaltyAmount;
    }

    // CONTRACT FUNDING
    function deposit() public payable {}

    // CONTRACT BALANCE
    function getContractBalance()
    public
    view
    returns(uint256){

        return address(this).balance;
    }

    // WEBSITE STATUS
    function logStatus(
        bool isUp
    ) public {

        totalChecks++;

        emit StatusLogged(
            isUp,
            block.timestamp
        );

        // ONLY WHEN WEBSITE DOWN
        if(!isUp){

            downtimeCount++;

            require(
                address(this).balance
                >= penaltyAmount,
                "Insufficient contract balance"
            );

            // TRANSFER PENALTY
            payable(client).transfer(
                penaltyAmount
            );

            totalPenaltyPaid +=
            penaltyAmount;

            emit PenaltyTransferred(
                client,
                penaltyAmount,
                block.timestamp
            );
        }
    }

    function getUptimePercentage()
    public
    view
    returns(uint256){

        if(totalChecks == 0){

            return 100;
        }

        return
        ((totalChecks - downtimeCount) * 100)
        / totalChecks;
    }

    receive() external payable {}
}