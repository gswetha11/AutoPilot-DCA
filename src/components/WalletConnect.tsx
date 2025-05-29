import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { WalletSelector } from '@aptos-labs/wallet-adapter-ant-design';

const WalletConnect: React.FC = () => {
  const { connected, account } = useWallet();

  return (
    <div className="flex items-center space-x-4">
      {connected && account && (
        <div className="text-neon-blue text-sm">
          {account.address.slice(0, 6)}...{account.address.slice(-4)}
        </div>
      )}
      <WalletSelector />
    </div>
  );
};