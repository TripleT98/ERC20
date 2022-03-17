import Web3 from "web3";
import * as dotenv from "dotenv";
import {task} from "hardhat/config";
dotenv.config();
let {abi} = require("./../artifacts/contracts/MyERC20.sol/MyERC20.json");

let provider = new Web3.providers.HttpProvider(`${process.env.META_MASK_PROVIDER_URL}`);
let web3js: Web3 = new Web3(provider);
let myContract = new web3js.eth.Contract(abi, `${process.env.RINKEBY_CONTRACT_ADDRESS}`);

interface SignType {
  gaslimit: string;
  privatekey: string;
  data: string;
}

async function getSign(obj:SignType):Promise<any>{
  //Создаю объект необходимый для подписи транзакций
  return await web3js.eth.accounts.signTransaction({
    to:process.env.RINKEBY_CONTRACT_ADDRESS,//Адрес контракта, к которому нужно обратиться
    //value: web3js.utils.toWei(obj.value || "0", "wei") || null,//Велечина эфира, которую вы хотите отправить на контракт
    gas: Number(obj.gaslimit),//Лимит газа, максимально допустимый газ, который вы допускаете использовать при выполнении транзакции.Чем больше лимит газа, тем более сложные операции можно провести при выполнении транзакции
    data: obj.data//Бинарный код транзакции, которую вы хотите выполнить
  }, obj.privatekey)
};

let envParams = process.env

export {myContract, web3js, task, getSign, envParams};
