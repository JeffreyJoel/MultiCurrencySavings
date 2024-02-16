// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
import "./IERC20.sol";

//Custom Errors
error ZERO_VALUE();
error ZERO_ADDRESS();
error INSUFFICIENT_BALANCE();
error NO_BALANCE();
error NOT_OWNER();
error FAILED_DEPOSIT();

event DepositSuccess(address _depositor, uint256 _amount);
event WithdrawSuccess(address _withdrawer, uint256 _amount);

contract Savings {
    mapping(address => uint256) tokenSavings;
    mapping(address => uint256) etherSavings;
    address owner;
    address savingsToken;

    constructor(address _savingsToken) {
        owner = msg.sender;
        savingsToken = _savingsToken;
    }

    function depositEther() external payable {
        if (msg.value == 0) {
            revert ZERO_VALUE();
        }
        if (msg.sender == address(0)) {
            revert ZERO_VALUE();
        }
        etherSavings[msg.sender] = etherSavings[msg.sender] + msg.value;

        emit DepositSuccess(msg.sender, msg.value);
        //emit an successful event
    }

    function depositToken(uint256 _amount) external {
         require(msg.sender != address(0), "address zero detected");
        require(_amount > 0, "can't save zero value");
        require(
            IERC20(savingsToken).balanceOf(msg.sender) >= _amount,
            "not enough token"
        );

        require(
            IERC20(savingsToken).transferFrom(
                msg.sender,
                address(this),
                _amount
            ),
            "failed to transfer"
        );

        tokenSavings[msg.sender] += _amount;
        emit DepositSuccess(msg.sender, _amount);
        // emit SavingSuccessful(msg.sender, _amount);
    }

    function withdrawEther() external {
        //check for zero value
     
        if (msg.sender == address(0)) {
            revert ZERO_ADDRESS();
        }
        uint256 _etherBalance = etherSavings[msg.sender];
        if (_etherBalance < 1) {
            revert NO_BALANCE();
        }
        etherSavings[msg.sender] = etherSavings[msg.sender] - etherSavings[msg.sender];
        payable(msg.sender).transfer(_etherBalance);
         emit WithdrawSuccess(msg.sender, _etherBalance);
    }

    function withdrawToken(uint256 _amount) external {
    if (msg.sender == address(0)) {
            revert ZERO_ADDRESS();
        }
          if (_amount == 0) {
            revert ZERO_VALUE();
        }
        if(tokenSavings[msg.sender]< _amount){
            revert INSUFFICIENT_BALANCE();
        }
    
          if(IERC20(savingsToken).transfer(msg.sender, _amount)) {
            revert FAILED_DEPOSIT();
        }
        emit WithdrawSuccess(msg.sender, _amount);

    }

    function getEtherBalance() external view returns(uint256) {
        return etherSavings[msg.sender];
    }

    function getTokenBalance(address _user) external view returns(uint256) {
        return tokenSavings[_user];
    }
}
