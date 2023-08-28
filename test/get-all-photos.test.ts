import "mocha";
import {assert} from "chai";
import hardhatEnv from "hardhat";
import { Crud } from "../typechain-types";

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
    it("Deve postar outra foto identica",async ()=>{
        const response = await crudContract.createPhoto(imageUrl, description);
		assert(response, "Algo Errado");

    })
    it("Deve utilizar o metodo getAllPhotos e ler as duas fotos postadas",async ()=>{
        const fotos = await crudContract.getAllPhotos()

        const existemDuasFotos = (fotos.length ===2)
        const osIdsForamIncrementados = (((Number(fotos[0].id)+1)===(Number(fotos[1].id))))
        const mesmosLinksDeImagem = (fotos[0].imageUrl===fotos[1].imageUrl)
        const mesmasDescricoes = (fotos[0].description===fotos[1].description)
        assert(existemDuasFotos && osIdsForamIncrementados && mesmosLinksDeImagem && mesmasDescricoes,"Alguma informacao nao deu certo")
    })
});
