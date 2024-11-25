import contractAddresses from '../../../back/ignition/deployments/chain-31337/deployed_addresses.json';
import contractInfo from '../../../back/ignition/deployments/chain-31337/artifacts/VotingModule#Voting.json';

// import contractAddresses from '../../../back/ignition/deployments/chain-17000/deployed_addresses.json';
// import contractInfo from '../../../back/ignition/deployments/chain-17000/artifacts/VotingModule#Voting.json';


export const CONTRACT_ADDRESS = contractAddresses["VotingModule#Voting"];
export const CONTRACT_ABI = contractInfo["abi"];
export const CONTRACT_BLOCKNUMBER = 0; // ${DEPLOYMENT_PATH}/journal.jsonl
// export const CONTRACT_BLOCKNUMBER = 2811129; // ${DEPLOYMENT_PATH}/journal.jsonl
