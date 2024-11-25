import contractAddresses from '../../../back/ignition/deployments/chain-31337/deployed_addresses.json';
import contractInfo from '../../../back/ignition/deployments/chain-31337/artifacts/VotingModule#Voting.json';

export const CONTRACT_ADDRESS = contractAddresses["VotingModule#Voting"];
export const CONTRACT_ABI = contractInfo["abi"];