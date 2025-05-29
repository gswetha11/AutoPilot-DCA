import { 
  Aptos, 
  Network, 
  Account,
  Ed25519PrivateKey 
} from '@aptos-labs/ts-sdk';

// ✅ Correct usage of Network
const client = new Aptos(Network.TESTNET);

const MODULE_ADDRESS = '0x1234...'; // Replace with your deployed contract address
const MODULE_NAME = 'autopilot_dca';

export const TOKENS = {
  APT: {
    symbol: 'APT',
    name: 'Aptos Coin',
    color: '#2DD6A0',
    address: '0x1::aptos_coin::AptosCoin'
  },
  USDC: {
    symbol: 'USDC',
    name: 'USD Coin',
    color: '#2775CA',
    address: '0x123...::usdc::USDC' // Replace with testnet USDC address
  },
  stAPT: {
    symbol: 'stAPT',
    name: 'Staked APT',
    color: '#00FFA3',
    address: '0x456...::stapt::StakedAPT' // Replace with testnet stAPT address
  }
};

export async function executeDCA(
  wallet: any,
  fromToken: string,
  toToken: string,
  amount: number
) {
  try {
    const payload = {
      function: `${MODULE_ADDRESS}::${MODULE_NAME}::execute_dca`,
      type_arguments: [fromToken, toToken],
      arguments: [amount]
    };

    const transaction = await wallet.signAndSubmitTransaction(payload);
    return transaction;
  } catch (error) {
    console.error('DCA execution failed:', error);
    throw error;
  }
}

export async function getTokenBalance(
  address: string,
  tokenAddress: string
): Promise<string> {
  try {
    const resource = await client.getAccountResource(
      address,
      `0x1::coin::CoinStore<${tokenAddress}>`
    );
    return resource.data.coin.value;
  } catch (error) {
    console.error('Failed to fetch token balance:', error);
    return '0';
  }
}
