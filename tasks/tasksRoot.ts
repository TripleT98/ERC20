let {approveTask} = require ("./approve.ts");
let {transferTask} = require ("./transfer.ts");
let {transferFromTask} = require ("./transferFrom.ts");
let {mintTask} = require ("./mint.ts");
let {balanceOfTask} = require ("./getBalance.ts");
let {allowanceTask} = require ("./allowance.ts");
let {decreaseAllowance} = require ("./decreaseAllowance.ts");
let {increaseAllowance} = require ("./increaseAllowance.ts");
let {burnTask} = require ("./burn.ts");


approveTask();
transferTask();
transferFromTask();
mintTask();
balanceOfTask();
allowanceTask();
decreaseAllowance();
increaseAllowance();
burnTask();

module.exports = {

}
