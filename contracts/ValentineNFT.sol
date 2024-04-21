// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ValentineNFT is ERC721URIStorage{
    // using Counters for Counters.Counter;
    // Counters.Counter private _tokenIds;
    uint256 private _tokenIds;

    constructor() ERC721("ValentineNFT", "FEB") {}

    function mintNFT(address recipient, string memory tokenURI)
        public
        returns (uint256)
    {
        // _tokenIds.increment();
        _tokenIds += 1;

        // uint256 newItemId = _tokenIds.current();
        _mint(recipient, _tokenIds);
        _setTokenURI(_tokenIds, tokenURI);

        return _tokenIds;
    }
}
