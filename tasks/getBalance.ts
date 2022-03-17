import {myContract, web3js, task, getSign, envParams} from "./tasks";

interface GetBalanceTaskArgs{
  from: string;
}

//test address: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
//test address: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92267

function  balanceOfTask():void{
  task("balanceof", "get someone's balance of tokens").addParam("from", "the address whose balance you'd like to know").setAction(async(taskArgs: GetBalanceTaskArgs, hre):Promise<void>=>{
    let {from} = taskArgs;
    try{
    await myContract.methods.balanceOf(from).call().then(console.log);
  }catch(e:any){
    console.log(e.message);
  }
  })
}


module.exports = {
  balanceOfTask
}
