import { ethers } from "ethers";
import snNodes from "@/data/s2Nodes.json"; // 改
import abi from "@/data/nodeContractAbi.json";

const NODE_SEASON = 2 // 改
// const SEEDAO_NODE_ADDRESS = '0xB7b7A119246166e2A9360b693730476F0A5e0d37'; // Goerli
const SEEDAO_NODE_ADDRESS = '0x9d34D407D8586478b3e4c39BE633ED3D7be1c80C'; // Mainnet

function checkIsInWhitelist(address) {
    let isNode = false;
    if (address) {
        const index = snNodes.nodes.findIndex((info) => {
            return address.toLocaleLowerCase() === info.account.toLocaleLowerCase()
        })
        if(index >= 0) isNode = true;
    }
    return isNode;    
}

async function isAlreadyMinted(address) {
    if (address) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contact = new ethers.Contract(SEEDAO_NODE_ADDRESS,abi.abi, provider.getSigner());
        const status = await contact.balanceOf(address, NODE_SEASON)
        console.log('status::', status)
        console.log('status.toNumber()::', status.toNumber())
        if(status.toNumber() > 0){
            return true;
        }
    }
    return false;    
}



async function mintWhitelist(address) {
    return new Promise((resolve, reject) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        if (address) {
            address = address.toLocaleLowerCase();
            let proof = [];
            const index = snNodes.nodes.findIndex((info) => {
                return address.toLocaleLowerCase() === info.account.toLocaleLowerCase()
            })
            if (index >= 0) {
                proof = snNodes.nodes[index].proof;
            }
            let contact = new ethers.Contract(
                SEEDAO_NODE_ADDRESS,
                abi.abi,
                provider.getSigner()
            );
            contact.claim(NODE_SEASON, proof).then((tx) => {
                    resolve(tx);
            }).catch(({ error }) => {
                reject(error.message + ` (proof=${JSON.stringify(proof)})`);
            });
        }
    });
}

export { checkIsInWhitelist, mintWhitelist, isAlreadyMinted };
