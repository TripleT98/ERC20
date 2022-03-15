import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { Signer, Contract, ContractFactory, BigNumber } from "ethers";

type ObjWthValProp = Object & {valuue: string};


  describe("Testing MyERC20 contract", async()=>{


  let MyERC20_Factory: ContractFactory, myERC20_contract: Contract, contractAddress: string, owner: SignerWithAddress, user1: SignerWithAddress, user2: SignerWithAddress, user3: SignerWithAddress;

  let donationValue: number = 10**18;
  let k:number = 0.2;

  beforeEach(async ()=>{
    [owner, user1, user2, user3] = await ethers.getSigners();
    MyERC20_Factory = await ethers.getContractFactory("MyERC20");
    myERC20_contract = await MyERC20_Factory.connect(owner).deploy();
    await myERC20_contract.deployed();
    contractAddress = myERC20_contract.address;
  })

 it("Check name, symbol, decemals, totalSuply", async ()=>{
   let name: string = await myERC20_contract.name();
   let symbol: string = await myERC20_contract.symbol();
   let decemals: ObjWthValProp = await myERC20_contract.decimals();
   let totalSuply: ObjWthValProp = await myERC20_contract.totalSuply();
   let owner: string = await myERC20_contract.owner();
   console.log(owner);
   expect(name).to.equal("MyERC20");
   expect(symbol).to.equal("MRC");
   expect(Number(decemals)).to.equal(18);
   expect(Number(totalSuply)).to.equal(0);
 })

 it("Gonna send a mint function with some value for user1. And then I will check his balance of tokens!", async ()=>{
   await myERC20_contract.mint(user1.address, String(donationValue));
   let balanceOfowner1 = await myERC20_contract.balanceOf(user1.address);
   expect(donationValue).to.equal(Number(balanceOfowner1) + 1);
 })

 it("I will create some tokens for user1. After it i'm gonna burn some and check the balance!", async ()=>{
    await myERC20_contract.mint(user1.address, String(donationValue));
    let balanceOfowner1: number = await myERC20_contract.balanceOf(user1.address);
    expect(donationValue).to.equal(Number(balanceOfowner1));
    await myERC20_contract.burn(user1.address, String(k*donationValue));
    balanceOfowner1 = await myERC20_contract.balanceOf(user1.address);
    expect((1 - k)*donationValue).to.equal(Number(balanceOfowner1));
 })

 it("As always I'll call a mint function for user1. I'll transfer some tokens from user1 to user2. Then will look at theirs balances!",async ()=>{
   await myERC20_contract.mint(user1.address, String(donationValue));
   await myERC20_contract.connect(user1).transfer(user2.address, String(k*donationValue));
   let balanceOfowner1: number = await myERC20_contract.balanceOf(user1.address);
   let balanceOfowner2: number = await myERC20_contract.balanceOf(user2.address);
   expect((1 - k)*donationValue).to.equal(Number(balanceOfowner1));
   expect(k*donationValue).to.equal(Number(balanceOfowner2));
 })

 describe("Checking approve, allowance and transferFrom functions",async ()=>{
   type AsyncFuncType = () => Promise<any>;
   let f:AsyncFuncType;
   it("Checking approve, allowance functions. Allowance function should return amount of tokens appoved by owner to spender!", async ()=>{
     f = async function():Promise<any>{
     await myERC20_contract.mint(user1.address, String(donationValue));
     await myERC20_contract.connect(user1).approve(user2.address, String(k*donationValue));
     let allowVal = await myERC20_contract.allowance(user1.address, user2.address);
     expect(k*donationValue).to.equal(Number(allowVal));
   };
   await f();
    })
    it("Checking transferFrom function. Gonna transfer allowance amount of tokens from one to another address. After it i'm gonna check the balances of both addresses!", async ()=>{
      await f();
      await myERC20_contract.transferFrom(user1.address, user2.address, String(k*donationValue));
      let balanceOfowner1: number = await myERC20_contract.balanceOf(user1.address);
      let balanceOfowner2: number = await myERC20_contract.balanceOf(user2.address);
      expect(k*donationValue).to.equal(Number(balanceOfowner2));
      expect((1 - k)*donationValue).to.equal(Number(balanceOfowner1));
    })
  })

  describe("Gonna check what is gonna be if i'll send wrong data to methods", async ()=>{
    it("Mint function should revert with error if msg.sender isn't owner", async ()=>{
      await expect(myERC20_contract.connect(user1).mint(user1.address, String(donationValue))).to.revertedWith("Only owner has access to this method!");
    })
  })
})
