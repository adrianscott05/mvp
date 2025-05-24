import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileDown, TrendingUp, DollarSign, Home, Users } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const propertyTypeData = [
  { name: 'Apartments', value: 35, count: 28 },
  { name: 'Houses', value: 25, count: 20 },
  { name: 'Villas', value: 20, count: 16 },
  { name: 'Condos', value: 15, count: 12 },
  { name: 'Penthouses', value: 5, count: 4 },
];

const monthlyData = [
  { month: 'Jan', revenue: 1200, properties: 8 },
  { month: 'Feb', revenue: 1800, properties: 12 },
  { month: 'Mar', revenue: 2100, properties: 14 },
  { month: 'Apr', revenue: 1900, properties: 13 },
  { month: 'May', revenue: 2500, properties: 17 },
  { month: 'Jun', revenue: 3200, properties: 21 },
];

const COLORS = ['hsl(270 70% 60%)', 'hsl(280 80% 55%)', 'hsl(290 75% 50%)', 'hsl(260 65% 55%)', 'hsl(285 70% 58%)'];

export default function Reports() {
  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Analytics & Reports</h1>
          <p className="text-muted-foreground">Comprehensive insights into your portfolio performance</p>
        </div>
        <Button className="gap-2 bg-gradient-primary hover:opacity-90">
          <FileDown className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 bg-gradient-card border-border/50 animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
          </div>
          <p className="text-3xl font-bold">$12.7M</p>
          <p className="text-sm text-green-400 mt-2">↑ 24.5%</p>
        </Card>

        <Card className="p-6 bg-gradient-card border-border/50 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-accent/10 rounded-lg">
              <Home className="h-6 w-6 text-accent" />
            </div>
            <p className="text-sm text-muted-foreground">Properties Sold</p>
          </div>
          <p className="text-3xl font-bold">85</p>
          <p className="text-sm text-green-400 mt-2">↑ 12.3%</p>
        </Card>

        <Card className="p-6 bg-gradient-card border-border/50 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">Active Investors</p>
          </div>
          <p className="text-3xl font-bold">2,431</p>
          <p className="text-sm text-green-400 mt-2">↑ 18.7%</p>
        </Card>

        <Card className="p-6 bg-gradient-card border-border/50 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-accent/10 rounded-lg">
              <TrendingUp className="h-6 w-6 text-accent" />
            </div>
            <p className="text-sm text-muted-foreground">Avg ROI</p>
          </div>
          <p className="text-3xl font-bold">15.8%</p>
          <p className="text-sm text-green-400 mt-2">↑ 3.2%</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6 bg-gradient-card border-border/50 animate-fade-in">
          <h2 className="text-xl font-bold mb-6">Monthly Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(270 30% 18%)" />
              <XAxis dataKey="month" stroke="hsl(270 20% 65%)" />
              <YAxis stroke="hsl(270 20% 65%)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(270 40% 8%)',
                  border: '1px solid hsl(270 30% 18%)',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="revenue" fill="hsl(270 70% 60%)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-gradient-card border-border/50 animate-fade-in">
          <h2 className="text-xl font-bold mb-6">Property Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={propertyTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {propertyTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(270 40% 8%)',
                  border: '1px solid hsl(270 30% 18%)',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-6 bg-gradient-card border-border/50 animate-fade-in">
        <h2 className="text-xl font-bold mb-6">Property Type Breakdown</h2>
        <div className="space-y-4">
          {propertyTypeData.map((type, index) => (
            <div key={type.name} className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="font-medium">{type.name}</span>
              </div>
              <div className="flex items-center gap-8">
                <span className="text-muted-foreground">{type.count} properties</span>
                <div className="w-48 bg-background rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${type.value}%`,
                      backgroundColor: COLORS[index],
                    }}
                  />
                </div>
                <span className="font-semibold w-12 text-right">{type.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
