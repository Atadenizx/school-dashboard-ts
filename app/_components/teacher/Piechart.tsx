"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

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

// Updated chart data with grades instead of browsers
const chartData = [
  { grade: "5th Grade", students: 275, fill: "var(--color-grade5)" },
  { grade: "6th Grade", students: 200, fill: "var(--color-grade6)" },
  { grade: "7th Grade", students: 287, fill: "var(--color-grade7)" },
  { grade: "8th Grade", students: 173, fill: "var(--color-grade8)" },
];

// Updated chart config
const chartConfig = {
  students: {
    label: "Students",
  },
  grade5: {
    label: "5th Grade",
    color: "hsl(var(--chart-1))",
  },
  grade6: {
    label: "6th Grade",
    color: "hsl(var(--chart-2))",
  },
  grade7: {
    label: "7th Grade",
    color: "hsl(var(--chart-3))",
  },
  grade8: {
    label: "8th Grade",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function Piechart() {
  const [isOpen, setIsOpen] = React.useState<boolean>(true);

  const totalStudents = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.students, 0);
  }, []);

  const toggleChart = () => setIsOpen(!isOpen);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <div className="flex w-full justify-between items-center mb-5">
          <div>
            <CardTitle>Total Students</CardTitle>
            <CardDescription>September 2024 - June 2025</CardDescription>
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
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="students"
                nameKey="grade" // Updated nameKey to use 'grade' instead of 'browser'
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalStudents.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Students
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      )}
    </Card>
  );
}
