import hardatEnviroment from "hardhat";

async function main() {
	const CrudFactory = await  hardatEnviroment.ethers.getContractFactory("Crud")

  const crud = await CrudFactory.deploy()
  const tx = await crud.deploymentTransaction()
  console.log(`Transaction Hash: ${tx?.hash}`)
  console.log(`Crud Address: ${await crud.getAddress()}`)

  
}

main();
