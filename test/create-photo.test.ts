import "mocha";
import {assert} from "chai";
import hardhatEnv from "hardhat";
import { Crud } from "../typechain-types";
//se esse arquivo estiver dando erro de tipagem execute o comando 'npx hardhat typechain no terminal'
describe("Testing Create Photo Function in Crud", () => {
	let crudContract:Crud;
    const imageUrl = "https://some-image.jpeg";
    const description = "Some Description";
    before(async()=>{
        let CrudFactory = await hardhatEnv.ethers.getContractFactory("Crud")
        crudContract = await CrudFactory.deploy()
    })
	it("Should Post a foto using the following parameters {imageUrl:'https://some-image.jpeg', description:'Some Description'}", async () => {

		const response = await crudContract.createPhoto(imageUrl, description);
		assert(response, "Algo Errado");
	});
    it("Deve ler a foto postada e verificar o conteudo",async ()=>{
        const foto = await crudContract.idToPhoto(1)

        assert(foto.id===1n && foto.imageUrl === imageUrl && foto.description ===description,"Dados nao chegaram corretamente")

    })
});
