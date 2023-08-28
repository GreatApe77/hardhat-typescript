import "mocha";
import {assert, expect} from "chai";
import hardhatEnv from "hardhat";
import { Crud } from "../typechain-types";

describe("Testing The deletePhoto method in Crud Contract", () => {
	let crudContract:Crud;
    const imageUrl = "https://some-image.jpeg";
    const description = "Some Description";
    before(async()=>{
        let CrudFactory = await hardhatEnv.ethers.getContractFactory("Crud")
        crudContract = await CrudFactory.deploy()
    })
	it("Cria uma foto com a seguinte imagem e descricao {imageUrl:'https://some-image.jpeg', description:'Some Description'}", async () => {

		const response = await crudContract.createPhoto(imageUrl, description);
		assert(response, "Algo Errado");
	});
    it("Deve deletar a foto que acabou de ser postada",async ()=>{
        await crudContract.deletePhoto(1)

        const photoExist = await crudContract.photoExists(1)

        //a foto nao pode mais existir!
        expect(photoExist).to.equal(false)
    })
});
