import {myContract, web3js, task, getSign, envParams} from "./tasks";

interface MintTaskArgs{
  to: string;
  amount: string;
  privatekey: string;
  gaslimit: string;
}

//test address: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
//test address: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92267

function  mintTask():void{
  task("mint", "approve tokens withdraw to somebody ").addParam("privatekey", "Your private key to sign transaction").addParam("gaslimit", "Gas Limit").addParam("to", "minted address").addParam("amount", "amount of minted tokens").setAction(async(taskArgs: MintTaskArgs, hre):Promise<void>=>{
    let {to, amount, gaslimit, privatekey} = taskArgs;
    try{
    let data = await myContract.methods.mint(to, amount).encodeABI();
    let sign = await getSign({gaslimit, privatekey, data});
    let transaction = await web3js.eth.sendSignedTransaction(sign.rawTransaction);
    console.log("Success transaction! Hash: ", transaction.transactionHash )
  }catch(e:any){
    console.log(e.message);
  }
  })
}


module.exports = {
  mintTask
}
