// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;


/// @title A Crud Smart Contract
/// @author Mateus Navarro
/// @notice create remove(not delete) update and retrieve Photos

contract Crud{
    struct Photo{
        string imageUrl;
        string description;
        uint256 id;
        uint256 timestamp;
    }

    address public owner;
    uint256 public idCounter;
    mapping(uint256=>Photo) public idToPhoto;
    mapping(uint256=>bool) public photoExists;

    event PhotoCreated(string description,string imageUrl, uint256 id, uint256 timestamp);
    event PhotoUpdated(string description,string imageUrl);
    event PhotoDeleted(uint256 id);

    modifier onlyOwner(){
        require(msg.sender==owner);
        _;
    }

    modifier onlyExistentPhoto(uint256 id){
        require(photoExists[id],"Photo does not exist!");
        _;
    }

    constructor(){
        owner = msg.sender;
    }


    function createPhoto(string memory imageUrl,string memory description) external onlyOwner() {
        idCounter++;
        Photo memory newPhoto;
        newPhoto.imageUrl = imageUrl;
        newPhoto.description = description;
        newPhoto.id = idCounter;
        newPhoto.timestamp = block.timestamp;
        idToPhoto[idCounter] = newPhoto;
        photoExists[idCounter] = true;
        emit PhotoCreated(newPhoto.description, newPhoto.imageUrl, newPhoto.id, newPhoto.timestamp);
    }

    function updatePhoto(uint256 id,string memory imageUrl,string memory description) external onlyOwner() onlyExistentPhoto(id){
        
        idToPhoto[id].imageUrl = imageUrl;
        idToPhoto[id].description = description;
        emit PhotoUpdated(description, imageUrl);
    }

    function deletePhoto(uint256 id)external onlyExistentPhoto(id) onlyOwner(){
        idToPhoto[id].imageUrl = "";
        idToPhoto[id].description = "";
        idToPhoto[id].id = 0;
        idToPhoto[id].timestamp = 0;
        photoExists[id] =false;
        emit PhotoDeleted(id);
    }

    function getAllPhotos() external view returns(Photo[] memory){
        Photo[] memory allPhotos = new Photo[](idCounter);
        
        for (uint256 i = 0 ; i < idCounter;i++){
            if(photoExists[i+1]){

            allPhotos[i] = (idToPhoto[i+1]);
            }
        }

        return allPhotos;

    }
}