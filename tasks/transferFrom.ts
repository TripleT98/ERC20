import {myContract, web3js, task, getSign, envParams} from "./tasks";

interface TransferFromTaskArgs {
  from: string;
  to: string;
  amount: string;
  gaslimit: string;
  privatekey: string;
}

function transferFromTask():void{
  task("transferFrom", "tranfer some tokens from owner's address").addParam("to", "recepient").addParam("amount", "amount of tokens").addParam("from", "owner's address").addParam("gaslimit", "Gas Limit").addParam("privatekey", "Your private key to sign transaction").setAction(async(taskArgs: TransferFromTaskArgs, hre):Promise<void>=>{
    let {to, amount, from, gaslimit, privatekey} = taskArgs;
    try{
    let data = await myContract.methods.transferFrom(from, to, amount).encodeABI();
    let sign = await getSign({data, gaslimit, privatekey});
    let transaction = await web3js.eth.sendSignedTransaction(sign.rawTransaction);
    console.log("Success transaction! Hash: ", transaction.transactionHash )
  }catch(e:any){
    console.log(e.message);
  }
  })
}

module.exports = {
  transferFromTask
}
