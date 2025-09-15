import { useState } from 'react';
import { Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
          const address = accounts[0];
          setWalletAddress(address);
          setShowPasswordModal(true);
        }
      } catch (error) {
        toast({
          title: 'Connection Failed',
          description: 'Failed to connect to MetaMask. Please try again.',
          variant: 'destructive',
        });
      }
    } else {
      toast({
        title: 'MetaMask Not Found',
        description: 'Please install MetaMask to connect your wallet.',
        variant: 'destructive',
      });
    }
  };

  const handlePasswordSubmit = () => {
    if (password) {
      setIsConnected(true);
      setShowPasswordModal(false);
      toast({
        title: 'Wallet Connected',
        description: `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`,
      });
      setPassword('');
    }
  };

  const handleCancel = () => {
    setShowPasswordModal(false);
    setPassword('');
    setWalletAddress('');
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
    toast({
      title: 'Wallet Disconnected',
      description: 'Your wallet has been disconnected.',
    });
  };

  return (
    <>
      {isConnected ? (
        <Button
          variant="outline"
          className="gap-2 border-primary/50 hover:border-primary"
          onClick={disconnectWallet}
        >
          <Wallet className="h-4 w-4" />
          <span className="hidden sm:inline">
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </span>
        </Button>
      ) : (
        <Button
          className="gap-2 bg-gradient-primary hover:opacity-90"
          onClick={connectWallet}
        >
          <Wallet className="h-4 w-4" />
          <span className="hidden sm:inline">Connect Wallet</span>
        </Button>
      )}

      <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>Confirm Connection</DialogTitle>
            <DialogDescription>
              Wallet Address: {walletAddress.slice(0, 10)}...{walletAddress.slice(-8)}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background border-input"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              className="bg-gradient-primary"
              onClick={handlePasswordSubmit}
              disabled={!password}
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

declare global {
  interface Window {
    ethereum?: any;
  }
}
