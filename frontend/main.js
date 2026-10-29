import { setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { submitCallTx } from '@midnight-ntwrk/midnight-js-contracts';
import { getConfig } from '../src/config.js';
import { MidnightWalletProvider, syncWallet } from '../src/wallet.js';
import { buildProviders } from '../src/providers.js';
import { CompiledHelloWorldContract, ledger, zkConfigPath } from '../contracts/index.js';

const CONTRACT_ADDRESS = 'b96b821f75a25b2dde9bdfdff4970304415565d9cc58747f985f66207c840d0a';
const PRIVATE_STATE_ID = 'AlicePrivateHWState';
const ALICE_SEED = '0000000000000000000000000000000000000000000000000000000000000001';

const stateEl = document.getElementById('state');
const netEl = document.getElementById('net');

async function runCircuit(circuitId, args = []) {
  const config = getConfig();
  setNetworkId(config.networkId);
  const wallet = await MidnightWalletProvider.build(console, {
    walletNetworkId: config.networkId, networkId: config.networkId,
    node: config.node, nodeWS: config.nodeWS, faucet: config.faucet, proofServer: config.proofServer,
  }, { kind: 'seed', value: ALICE_SEED });
  await wallet.start();
  await syncWallet(console, wallet.wallet, 10 * 60_000);
  const providers = buildProviders(wallet, zkConfigPath, config);
  await submitCallTx(providers, {
    compiledContract: CompiledHelloWorldContract,
    contractAddress: CONTRACT_ADDRESS,
    privateStateId: PRIVATE_STATE_ID,
    circuitId,
    args,
  });
  const st = await providers.publicDataProvider.queryContractState(CONTRACT_ADDRESS);
  stateEl.textContent = JSON.stringify(ledger(st.data), null, 2);
  await wallet.stop();
}

document.getElementById('create').onclick = () => runCircuit('createEscrow');
document.getElementById('release').onclick = () => runCircuit('releaseEscrow');
document.getElementById('refund').onclick = () => runCircuit('refundEscrow');
document.getElementById('store').onclick = () => runCircuit('storeMessage', ['Hello World!']);

netEl.textContent = 'local';
stateEl.textContent = 'Ready. Click a button to invoke a circuit.';
