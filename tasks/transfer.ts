import {myContract, web3js, task, getSign, envParams} from "./tasks";

interface TransferArgs {
  to: string;
  amount: string;
  privatekey: string;
  gaslimit: string;
}

function transferTask():void{
  task("transfer", "tranfer some tokens").addParam("to", "recepient").addParam("amount", "amount of tokens").addParam("privatekey", "your private key").addParam("gaslimit", "Gas Limit").setAction(async(taskArgs: TransferArgs, hre):Promise<void>=>{
    try{
     let {to, amount, privatekey, gaslimit} = taskArgs;
     let data = myContract.methods.transfer(to, amount).encodeABI();
     let sign = await getSign({gaslimit, privatekey, data});
     let transaction = await web3js.eth.sendSignedTransaction(sign.rawTransaction);
     console.log("TransactionHash: ", transaction.transactionHash);
   }catch(e:any){
     console.log(e.message);
   }
  })
}

module.exports = {
  transferTask
}
