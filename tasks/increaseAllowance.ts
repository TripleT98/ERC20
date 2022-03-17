import {myContract, web3js, task, getSign, envParams} from "./tasks";

interface IncreaseAllowanceArgs{
  spender: string;
  amount: string;
  privatekey: string;
  gaslimit: string;
}

//test address: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
//test address: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92267

function  increaseAllowance():void{
  task("incallowance", "incease allowance").addParam("privatekey", "Your private key to sign transaction").addParam("gaslimit", "Gas Limit").addParam("spender", "spender").addParam("amount", "increased value").setAction(async(taskArgs: IncreaseAllowanceArgs, hre):Promise<void>=>{
    let {spender, amount, gaslimit, privatekey} = taskArgs;
    try{
    let data = await myContract.methods.increaseAllowance(spender, amount).encodeABI();
    let sign = await getSign({gaslimit, privatekey, data});
    let transaction = await web3js.eth.sendSignedTransaction(sign.rawTransaction);
    console.log("Success transaction! Hash: ", transaction.transactionHash )
  }catch(e:any){
    console.log(e.message);
  }
  })
}


module.exports = {
  increaseAllowance
}
