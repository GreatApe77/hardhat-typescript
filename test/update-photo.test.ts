import "mocha";
import {assert, expect} from "chai";
import hardhatEnv from "hardhat";
import { Crud } from "../typechain-types";

describe("Testando o metodo update photo no Crud", () => {
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
        const currentId = await crudContract.idCounter()
        const foto = await crudContract.idToPhoto(currentId.toString())

        assert(foto.id===1n && foto.imageUrl === imageUrl && foto.description ===description,"Dados nao chegaram corretamente")

    })
    it("Deve atualizar a foto de id=1 com os seguintes parametros {imageurl:'https://linkdeimagem.jpg',description:'Algum link de imagem'}",async ()=>{
        const newDescription = "Algum link de imagem"
        const newImageUrl = "https://linkdeimagem.jpg"
        const currentId = await crudContract.idCounter()
        //(i.e. 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn)

        //0x4c0452ef9fa901526ee01eae1d81dfcd82bd09e7b6774e6540a7995f028f389e

        const tx = await crudContract.updatePhoto(currentId.toString(),newImageUrl,newDescription)
        
        assert(Boolean(tx.hash),"Nao Atualizou a foto")

    })
    it("Deve ler a foto atualizada e checar se os valores modificados sao os mesmos",async ()=>{
        const expectedDescription = "Algum link de imagem"
        const expectedImageUrl = "https://linkdeimagem.jpg"
        const currentId = await crudContract.idCounter()
        const fotoAtualizada = await crudContract.idToPhoto(currentId.toString())
        assert(fotoAtualizada.id===currentId && fotoAtualizada.imageUrl === expectedImageUrl && fotoAtualizada.description ===expectedDescription,"Dados nao chegaram corretamente")
    })
});
