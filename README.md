# Diffusion NFT

---

To create NFTs using stable diffusion images and NFT.storage, you will need to follow these steps:

- Create a stable diffusion image using Replicate (An AI tools service).
- Upload the stable diffusion image to the NFT.storage platform. (Had the idea of what to do but was not able to carry it out. Will surely complete this in coming days)
- Use the NFT.storage platform to mint a new NFT from the stable diffusion image. (Have written the smart contract but still NFT.storage was still left, got stuck in fixing some errors which a lot more time then was expected).

Frontend Snap-
![image](https://user-images.githubusercontent.com/76066586/205475883-a59e8f6a-22e2-493a-974e-527d29c7ab2e.png)


Exposed APIs -

- /api/generate - Generates and queues the given prompt to generate images
- /api/check - checks the status of the queues and returns the image urls once generated

NFT Contract - [Link](packages/backend/contracts/DiffusionNFT.sol)


Was not able to create a live app but will surely complete it. Thanks for the amazing Hackathon.
