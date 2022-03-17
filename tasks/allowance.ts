import {myContract, web3js, task, getSign, envParams} from "./tasks";

interface AllowanceArgs {
  from: string,
  to: string;
  privatekey: string;
  gaslimit: string;
}

function allowanceTask():void{
  task("allowance", "check out allowance").addParam("to", "spender").addParam("from", "owner").setAction(async(taskArgs: AllowanceArgs, hre):Promise<void>=>{
    let {from ,to} = taskArgs;
    try{
     await myContract.methods.allowance(from, to).call().then(console.log);
   }catch(e:any){
     console.log(e.message)
   }
  })
}

module.exports = {
  allowanceTask
}
