//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelincontracts\tokenERC721ERC721.sol";

contract DynamicNFT is ERC721 {
    // The name of the NFT
    string public name = "Dynamic NFT";
    // The symbol of the NFT
    string public symbol = "DYNAMIC";

    // A mapping from token ID to data for the token
    mapping(uint256 => string) public tokenData;

    constructor() public {
        // Set the name and symbol for the ERC721 contract
        _setupToken(name, symbol);
    }

    // Function to mint a new NFT
    function mint(string memory _data) public {
        // Generate a new token ID
        uint256 newTokenId = _totalSupply() + 1;

        // Mint the new NFT
        _mint(msg.sender, newTokenId);

        // Set the data for the new NFT
        tokenData[newTokenId] = _data;
    }

    // Function to update the data for an existing NFT
    function updateData(uint256 _tokenId, string memory _data) public {
        // Only the owner of the NFT can update the data
        require(
            _ownerOf(_tokenId) == msg.sender,
            "Only the owner can update the data for an NFT"
        );

        // Update the data for the NFT
        tokenData[_tokenId] = _data;
    }

    // View function to get the data for an NFT
    function getData(uint256 _tokenId) public view returns (string memory) {
        // Return the data for the given token ID
        return tokenData[_tokenId];
    }

    // View function to get the owner of an NFT
    function getOwner(uint256 _tokenId) public view returns (address) {
        // Return the owner of the given token ID
        return _ownerOf(_tokenId);
    }
}
