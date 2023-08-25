import hardatEnviroment from "hardhat";

async function main() {
	const simpleStorageFactory = await  hardatEnviroment.ethers.getContractFactory("SimpleStorage")

  const SimpleStorage = await simpleStorageFactory.deploy()
  const tx = await SimpleStorage.deploymentTransaction()
  console.log(`Transaction Hash: ${tx?.hash}`)
  console.log(`SimpleStorage Address: ${await SimpleStorage.getAddress()}`)
  await SimpleStorage.setSomeNumber(777)
  const currentNumber  = await SimpleStorage.someNumber()
  console.log(`Current Number is ${currentNumber}`)
}

main();
