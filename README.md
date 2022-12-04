# Diffusion NFT

---

To create NFTs using stable diffusion images and NFT.storage, you will need to follow these steps:

- Create a stable diffusion image using Replicate (An AI tools service).
- Upload the stable diffusion image to the NFT.storage platform. (Had the idea of what to do but was not able to carry it out. Will surely complete this in coming days)
- Use the NFT.storage platform to mint a new NFT from the stable diffusion image. (Have written the smart contract but still NFT.storage was still left, got stuck in fixing some errors which a lot more time then was expected).

Frontend Snap-
![image](https://user-images.githubusercontent.com/76066586/205475810-84f81591-4c19-4b92-a69d-73dfb36a2629.png)

Exposed APIs -

- /api/generate - Generates and queues the given prompt to generate images
- /api/check - checks the status of the queues and returns the image urls once generated

NFT Contract - [Link](packages/backend/contracts/DiffusionNFT.sol)
