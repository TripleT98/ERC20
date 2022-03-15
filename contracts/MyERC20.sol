//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyERC20{

  string name = "MyERC20";
  string symbol = "MRC";
  uint decimals = 18;
  uint totalSuply;

  mapping (address => uint) private _balances;
  mapping (address => mapping(address => uint)) private _allowances;

  event Transfer(address indexed _from, address indexed _to, uint _value);
  event Approval(address indexed _owner, address indexed _spender, uint _value);

  modifier Overflow256(uint _value1, uint _value2){
    require(_value1 > _value2);
    _;
  }

  function mint(address _to, uint _value) public Overflow256(totalSuply + _value, totalSuply) Overflow256(_balances[_to] + _value, _balances[_to]){
    totalSuply += _value;
    _balances[_to] += _value;
  }

  function burn(address _owner, uint _value) public {
    totalSuply -= _value;
    _balances[_owner] -= _value;
  }

  function balanceOf(address _owner) public view returns(uint){
    uint balance = _balances[_owner];
    return balance;
  }

  function transfer(address _to, uint _value) external returns(bool){
    require(_balances[msg.sender] >= _value, "You have not enough MyERC20 tokens to transfer!");
    _balances[msg.sender] -= _value;
    _balances[_to] += _value;
    emit Transfer(msg.sender, _to, _value);
    return true;
  }

 function transferFrom(address _from, address _to, uint _value) public returns(bool){
    require(_allowances[_from][_to] >= _value && _balances[_from] >= _value, "You have not allowances to withdraw this amount of tokens!");
    _allowances[_from][_to] -= _value;
    _balances[_from] -= _value;
    _balances[_to] += _value;
    emit Transfer(_from, _to, _value);
    return true;
 }

  function approve(address _to, uint _value) public returns(bool){
    require(_balances[msg.sender] >= _value, "You have not enough MyERC20 tokens to approve!");
    _allowances[msg.sender][_to] += _value;
    emit Approval(msg.sender, _to, _value);
    return true;
  }

 function allowance(address _owner, address _to) public view returns(uint){
   uint remaining = _allowances[_owner][_to];
   return remaining;
 }

}
