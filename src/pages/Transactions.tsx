import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const transactionData = [
  { date: 'Jan', volume: 1200000, count: 45 },
  { date: 'Feb', volume: 1800000, count: 62 },
  { date: 'Mar', volume: 2100000, count: 78 },
  { date: 'Apr', volume: 1900000, count: 69 },
  { date: 'May', volume: 2500000, count: 91 },
  { date: 'Jun', volume: 3200000, count: 112 },
];

const recentTransactions = [
  {
    id: '1',
    type: 'Purchase',
    property: 'Luxury Penthouse Downtown',
    amount: 2500000,
    date: '2025-01-20',
    status: 'completed',
  },
  {
    id: '2',
    type: 'Sale',
    property: 'Modern Villa Seaside',
    amount: 4200000,
    date: '2025-01-18',
    status: 'completed',
  },
  {
    id: '3',
    type: 'Purchase',
    property: 'Downtown Apartment',
    amount: 850000,
    date: '2025-01-15',
    status: 'pending',
  },
  {
    id: '4',
    type: 'Sale',
    property: 'Suburban Family House',
    amount: 650000,
    date: '2025-01-12',
    status: 'completed',
  },
];

export default function Transactions() {
  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Transaction History</h1>
        <p className="text-muted-foreground">Track your property transactions and market activity</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 bg-gradient-card border-border/50 animate-slide-up">
          <p className="text-sm text-muted-foreground mb-2">Total Volume</p>
          <p className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            $12.7M
          </p>
          <p className="text-sm text-green-400 mt-2">+24.5% from last month</p>
        </Card>

        <Card className="p-6 bg-gradient-card border-border/50 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <p className="text-sm text-muted-foreground mb-2">Total Transactions</p>
          <p className="text-3xl font-bold text-foreground">457</p>
          <p className="text-sm text-green-400 mt-2">+12.3% from last month</p>
        </Card>

        <Card className="p-6 bg-gradient-card border-border/50 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-sm text-muted-foreground mb-2">Avg Transaction</p>
          <p className="text-3xl font-bold text-foreground">$27,812</p>
          <p className="text-sm text-green-400 mt-2">+8.1% from last month</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6 bg-gradient-card border-border/50 animate-fade-in">
          <h2 className="text-xl font-bold mb-6">Transaction Volume</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={transactionData}>
              <defs>
                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(270 70% 60%)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(270 70% 60%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(270 30% 18%)" />
              <XAxis dataKey="date" stroke="hsl(270 20% 65%)" />
              <YAxis stroke="hsl(270 20% 65%)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(270 40% 8%)',
                  border: '1px solid hsl(270 30% 18%)',
                  borderRadius: '8px',
                }}
              />
              <Area
                type="monotone"
                dataKey="volume"
                stroke="hsl(270 70% 60%)"
                fillOpacity={1}
                fill="url(#colorVolume)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-gradient-card border-border/50 animate-fade-in">
          <h2 className="text-xl font-bold mb-6">Transaction Count</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={transactionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(270 30% 18%)" />
              <XAxis dataKey="date" stroke="hsl(270 20% 65%)" />
              <YAxis stroke="hsl(270 20% 65%)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(270 40% 8%)',
                  border: '1px solid hsl(270 30% 18%)',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="hsl(280 80% 55%)"
                strokeWidth={3}
                dot={{ fill: 'hsl(280 80% 55%)', r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-6 bg-gradient-card border-border/50 animate-fade-in">
        <h2 className="text-xl font-bold mb-6">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Type
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Property
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Amount
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Date
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx) => (
                <tr key={tx.id} className="border-b border-border/50 hover:bg-background/50">
                  <td className="py-4 px-4">
                    <Badge
                      variant={tx.type === 'Purchase' ? 'default' : 'secondary'}
                      className={
                        tx.type === 'Purchase'
                          ? 'bg-primary/20 text-primary hover:bg-primary/30'
                          : 'bg-accent/20 text-accent hover:bg-accent/30'
                      }
                    >
                      {tx.type}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 font-medium">{tx.property}</td>
                  <td className="py-4 px-4 font-semibold">
                    ${tx.amount.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">
                    {new Date(tx.date).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">
                    <Badge
                      variant={tx.status === 'completed' ? 'default' : 'secondary'}
                      className={
                        tx.status === 'completed'
                          ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                          : 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                      }
                    >
                      {tx.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
