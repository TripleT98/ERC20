import {web3js, myContract, task} from "./tasks";

function transferFromTask() {
  task("approve", "sen approve method").setAction(async()=>{
    console.log("approve");
  })
}

module.exports = {
  transferFromTask
}
