// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract FundMe {
    uint256 public minimumAmount = 50 * 10 ** 18;
    people[] public funds;
    mapping(address => uint256) public funder;

    address public immutable owner;
    AggregatorV3Interface public priceFeed;

    constructor(address pricefeedaddress) {
        owner = msg.sender;
        priceFeed = AggregatorV3Interface(pricefeedaddress);
    }

    struct people {
        address user;
        uint256 amount;
    }

    function fund() public payable {
        require(
            conversion(msg.value) >= minimumAmount,
            "You need to send more ETH"
        );
        funds.push(people(msg.sender, msg.value));
        funder[msg.sender] += msg.value;
    }

    function withdraw() public Owneronly {
        for (uint256 i = 0; i < funds.length; i++) {
            address fu = funds[i].user;
            funder[fu] = 0;
            delete funds;
        }

        (bool callsuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callsuccess, "Transfer Unsuccessful");
    }

    function pricefeed() public view returns (int256) {
        (, int256 price, , , ) = priceFeed.latestRoundData();
        return price * 10000000000;
    }

    function conversion(uint256 amount) public view returns (uint256) {
        return (uint256(pricefeed()) * amount) / 1000000000000000000;
    }

    modifier Owneronly() {
        require(msg.sender == owner, "You be theif!");
        _;
    }

    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }
}
