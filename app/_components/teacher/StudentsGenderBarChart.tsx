"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// The updated chart data
const chartData = [
  { year: "19/20", boys: 421, girls: 514 }, // 45% boys, 55% girls
  { year: "20/21", boys: 553, girls: 426 },
  { year: "21/22", boys: 335, girls: 400 },
  { year: "22/23", boys: 443, girls: 610 },
  { year: "23/24", boys: 378, girls: 350 },
  { year: "24/25", boys: 448, girls: 567 },
];

const chartConfig = {
  boys: {
    label: "Boys",
    color: "blue", // Blue color
  },
  girls: {
    label: "Girls",
    color: "pink", // Pink color
  },
} satisfies ChartConfig;

export function StudentsGenderBarChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Students Gender Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="boys"
              stackId="a"
              fill="var(--color-boys)" // Use blue color for boys
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="girls"
              stackId="a"
              fill="var(--color-girls)" // Use pink color for girls
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total student gender distribution for the last 6 years
        </div>
      </CardFooter>
    </Card>
  );
}
