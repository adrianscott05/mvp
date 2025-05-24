import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowDown, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Swap() {
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const { toast } = useToast();

  const handleSwap = () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      toast({
        title: 'Invalid Amount',
        description: 'Please enter a valid amount to swap',
        variant: 'destructive',
      });
      return;
    }

    // Simulate swap execution
    toast({
      title: 'Swap Executed',
      description: `Successfully swapped ${fromAmount} USDC for ${toAmount} REAL tokens`,
    });

    setFromAmount('');
    setToAmount('');
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    // Simulate conversion rate (1 USDC = 100 REAL)
    const converted = parseFloat(value) * 100;
    setToAmount(converted ? converted.toFixed(2) : '');
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Swap Tokens</h1>
        <p className="text-muted-foreground">
          Exchange your tokens for real estate backed assets
        </p>
      </div>

      <Card className="p-8 bg-gradient-card border-border/50 animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Trade</h2>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="p-6 bg-background/50 rounded-lg border border-border/50 space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="from">From</Label>
              <span className="text-sm text-muted-foreground">Balance: 1,000.00</span>
            </div>
            <div className="flex items-center gap-4">
              <Input
                id="from"
                type="number"
                placeholder="0.0"
                value={fromAmount}
                onChange={(e) => handleFromAmountChange(e.target.value)}
                className="text-2xl font-bold border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
              />
              <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
                <div className="w-6 h-6 bg-gradient-primary rounded-full" />
                <span className="font-semibold">USDC</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center -my-2 relative z-10">
            <div className="p-2 bg-card border-2 border-border rounded-lg">
              <ArrowDown className="h-5 w-5 text-primary" />
            </div>
          </div>

          <div className="p-6 bg-background/50 rounded-lg border border-border/50 space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="to">To</Label>
              <span className="text-sm text-muted-foreground">Balance: 0.00</span>
            </div>
            <div className="flex items-center gap-4">
              <Input
                id="to"
                type="number"
                placeholder="0.0"
                value={toAmount}
                readOnly
                className="text-2xl font-bold border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
              />
              <div className="flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-lg">
                <div className="w-6 h-6 bg-gradient-primary rounded-full" />
                <span className="font-semibold">REAL</span>
              </div>
            </div>
          </div>
        </div>

        {fromAmount && (
          <div className="mt-6 p-4 bg-background/50 rounded-lg border border-border/50 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Exchange Rate</span>
              <span className="font-medium">1 USDC = 100 REAL</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Network Fee</span>
              <span className="font-medium">~0.5 USDC</span>
            </div>
          </div>
        )}

        <Button
          className="w-full mt-6 bg-gradient-primary hover:opacity-90"
          size="lg"
          onClick={handleSwap}
          disabled={!fromAmount || parseFloat(fromAmount) <= 0}
        >
          Swap Tokens
        </Button>
      </Card>
    </div>
  );
}
