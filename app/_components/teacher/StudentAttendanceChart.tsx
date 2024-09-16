"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export const description = "A student attendance chart";

const chartData = [
  { day: "Mon", attendance: 890 },
  { day: "Tue", attendance: 900 },
  { day: "Wed", attendance: 735 },
  { day: "Thu", attendance: 910 },
  { day: "Fri", attendance: 915 },
];

const chartConfig = {
  attendance: {
    label: "Attendance",
    color: "hsl(var(--chart-3))", // Update the color to match your theme
  },
} satisfies ChartConfig;

export function StudentAttendanceChart() {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggleChart = () => setIsOpen(!isOpen);

  return (
    <Card>
      <CardHeader>
        <div className="flex w-full justify-between items-center">
          <div>
            <CardTitle>Line Chart - Student Attendance</CardTitle>
            <CardDescription>Attendance for the Week</CardDescription>
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
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="attendance"
                type="linear"
                stroke="var(--color-attendance)" // Customize color
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      )}
    </Card>
  );
}
