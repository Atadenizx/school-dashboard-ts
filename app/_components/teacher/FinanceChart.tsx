"use client";

import { TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const description = "A school finance line chart";

const chartData = [
  { month: "January", income: 3000, expenses: 4500 },
  { month: "February", income: 5100, expenses: 7000 },
  { month: "March", income: 5200, expenses: 7500 },
  { month: "April", income: 5300, expenses: 5000 },
  { month: "May", income: 5400, expenses: 3500 },
  { month: "June", income: 5500, expenses: 3000 },
];

const chartConfig = {
  income: {
    label: "Income",
    color: "hsl(var(--chart-1))", // Update the color as needed
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-2))", // Update the color as needed
  },
} satisfies ChartConfig;

export function FinanceChart() {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggleChart = () => setIsOpen(!isOpen);

  return (
    <Card>
      <CardHeader>
        <div className="flex w-full justify-between items-center">
          <div>
            <CardTitle>School Expenses</CardTitle>
            <CardDescription>January - June 2025</CardDescription>
          </div>
          <Button variant="outline" size="icon" onClick={toggleChart}>
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      {isOpen && (
        <>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={chartData}
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
                  content={<ChartTooltipContent />}
                />
                <Line
                  dataKey="income"
                  type="monotone"
                  stroke="var(--color-income)" // Customize color
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="expenses"
                  type="monotone"
                  stroke="var(--color-expenses)" // Customize color
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Expenses will go up by 5% this month{" "}
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                  Showing total expenses for the last 6 months
                </div>
              </div>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
