"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface ChartDataPoint {
  month: string;
  [key: string]: string | number;
}

interface ChartSeries {
  key: string;
  label: string;
  color: string; // Hex color code
}

interface RevenueGrossProfitChartProps {
  title: string;
  description?: string;
  data: ChartDataPoint[];
  series: ChartSeries[];
  trendPercentage?: number;
  dateRange?: string;
}

// Example usage:
/*
const data = [
  { month: 'Jan', revenue: 5000, grossProfit: 2000 },
  { month: 'Feb', revenue: 10000, grossProfit: 4000 },
];

const series = [
  {
    key: 'revenue',
    label: 'Revenue',
    color: '#2563eb' // Blue
  },
  {
    key: 'grossProfit',
    label: 'Gross Profit',
    color: '#7c3aed' // Purple
  }
];
*/

const RevenueGrossProfitChart = ({
  title,
  description = "Monthly data comparison",
  data,
  series,
  trendPercentage = 0,
  dateRange = "January - May 2024"
}: RevenueGrossProfitChartProps) => {
  const chartConfig = series.reduce((acc, { key, label, color }) => ({
    ...acc,
    [key]: {
      label,
      color,
    },
  }), {} as ChartConfig);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <defs>
              {series.map(({ key, color }) => (
                <linearGradient key={key} id={`fill${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={color}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={color}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              ))}
            </defs>
            {series.map(({ key, color }) => (
              <Area
                key={key}
                dataKey={key}
                type="natural"
                fill={`url(#fill${key})`}
                fillOpacity={0.4}
                stroke={color}
                stackId="a"
              />
            ))}
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              {trendPercentage > 0 ? 'Trending up' : 'Trending down'} by {Math.abs(trendPercentage)}% this month 
              <TrendingUp className={`h-4 w-4 ${trendPercentage < 0 ? 'rotate-180' : ''}`} />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              {dateRange}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RevenueGrossProfitChart; 