import React from 'react';
import StatCard from './_components/StatCard';
import RevenueGrossProfitChart from './_components/RevenueGrossProfitChart';
import ProgressCircle from './_components/ProgressCircle';
import { BarChart2, DollarSign, TrendingUp, Percent, CreditCard } from 'lucide-react';

const Home = () => {

const data = [
  { month: "January", revenue: 186, grossProfit: 80 },
  { month: "February", revenue: 305, grossProfit: 200 },
  { month: "March", revenue: 237, grossProfit: 120 },
  { month: "April", revenue: 73, grossProfit: 190 },
  { month: "May", revenue: 209, grossProfit: 130 },
  { month: "June", revenue: 214, grossProfit: 140 },
]

const series = [
  {
    key: 'revenue',
    label: 'Revenue',
    color: '#1e40af' 
  },
  {
    key: 'grossProfit',
    label: 'Gross Profit',
    color: '#fbbf24' 
  }
];
  return (
    <div className="p-6 space-y-6">

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Revenue Card */}
        <StatCard
          title="Revenue"
          value="$85,704"
          change="+9.76%"
          changeType="increase"
          icon={<BarChart2 className="w-5 h-5" />}
        />

        {/* Gross Profit Card */}
        <StatCard
          title="Gross Profit"
          value="$23,950"
          change="+17.0%"
          changeType="increase"
          icon={<DollarSign className="w-5 h-5" />}
        />

        {/* EBIT Card */}
        <StatCard
          title="EBIT"
          value="$20,357"
          change="-1.4%"
          changeType="decrease"
          icon={<TrendingUp className="w-5 h-5" />}
        />

        {/* Net Profit Card */}
        <StatCard
          title="Net Profit"
          value="$23,950"
          change="+18.4%"
          changeType="increase"
          icon={<DollarSign className="w-5 h-5" />}
        />

        {/* Net Profit Margin Card */}
        <StatCard
          title="Net Profit Margin"
          value="27.9%"
          change="+31.1%"
          changeType="increase"
          icon={<Percent className="w-5 h-5" />}
        />

        {/* Expenses Card */}
        <StatCard
          title="Expenses"
          value="$61,754"
          change="-10.9%"
          changeType="decrease"
          icon={<CreditCard className="w-5 h-5" />}
        />
      </div>

      {/* Charts and Progress Circles Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue vs Gross Profit Chart */}
        <div className="lg:col-span-2">
          <RevenueGrossProfitChart
              title="Revenue vs Gross Profit"
              description="Monthly revenue and gross profit comparison"
              data={data}
              series={series}
              trendPercentage={8.5}
              dateRange="January - May 2024"
            />
        </div>

        {/* Progress Circles */}
        <div className="flex flex-col gap-6">
          <ProgressCircle title="% of Revenue Target" percentage={90} color="#fbbf24" />
          <ProgressCircle title="% of Gross Profit Target" percentage={87} color="#1e40af" />
        </div>
      </div>
    </div>
  );
};

export default Home;
