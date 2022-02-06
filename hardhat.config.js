require("@nomiclabs/hardhat-waffle");

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("check-greeting", "Print current greeting", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  const Greeter = await hre.ethers.getContractFactory('Greeter');
  const greeter = await Greeter.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3");
  const greeting = await greeter.greet();
  console.log(greeting);
});

task("set-greeting", "Print current greeting", async (taskArgs, hre) => {
  const newGreeting = await new Promise(function(resolve) {
    rl.question("Please enter some words for greeting: ", function(greeting) {
      rl.close();
      resolve(greeting);
    })
  });
  const accounts = await hre.ethers.getSigners();
  const Greeter = await hre.ethers.getContractFactory('Greeter');
  const greeter = await Greeter.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3");
  await greeter.setGreeting(newGreeting.toString());
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
};
