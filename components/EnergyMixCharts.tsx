"use client";

import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip as RechartsTooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { DailyEnergyMix } from "../lib/api";
import { format } from "date-fns";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip } from "@/components/ui/tooltip";

interface Props {
    data: DailyEnergyMix[];
}

const COLORS: Record<string, string> = {
    biomass: "#4ade80", // green-400
    coal: "#1f2937", // gray-800
    imports: "#a78bfa", // violet-400
    gas: "#f87171", // red-400
    nuclear: "#2dd4bf", // teal-400
    other: "#9ca3af", // gray-400
    hydro: "#60a5fa", // blue-400
    solar: "#facc15", // yellow-400
    wind: "#818cf8", // indigo-400
};

const DEFAULT_COLOR = "var(--muted)";

const CustomTooltip = ({
    active,
    payload,
}: {
    active?: boolean;
    payload?: {
        name: string;
        value: number;
    }[];
}) => {
    if (active && payload && payload.length) {
        const data = payload[0];
        return (
            <Tooltip className="flex items-center gap-2">
                <div
                    className="w-2 h-2 rounded-full"
                    style={{
                        backgroundColor: COLORS[data.name] || DEFAULT_COLOR,
                    }}
                />
                <span className="font-medium capitalize">{data.name}</span>
                <span className="font-bold">{data.value}%</span>
            </Tooltip>
        );
    }
    return null;
};

export function EnergyMixCharts({ data }: Props) {
    if (!data || data.length === 0) {
        return (
            <div className="text-center p-4 text-muted-foreground">
                No data available
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
            {data.map((dayData) => {
                const chartData = Object.entries(dayData.mix)
                    .map(([name, value]) => ({
                        name,
                        value,
                    }))
                    .filter((item) => item.value > 0)
                    .sort((a, b) => b.value - a.value);

                return (
                    <Card key={dayData.date} className="flex flex-col">
                        <CardHeader className="items-center pb-2">
                            <CardTitle>
                                {format(new Date(dayData.date), "EEEE")}
                            </CardTitle>
                            <CardDescription>
                                {format(new Date(dayData.date), "MMMM d, yyyy")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col items-center pb-6">
                            <Badge
                                variant="outline"
                                className="mb-6 px-4 py-1 text-sm font-medium text-green-600 border-green-600/20 bg-green-50 dark:bg-green-900/20 dark:text-green-400 dark:border-green-400/30"
                            >
                                Clean Energy:{" "}
                                <span className="ml-1 font-bold">
                                    {dayData.cleanEnergyPerc}%
                                </span>
                            </Badge>

                            <div className="w-full h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={chartData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={2}
                                            dataKey="value"
                                        >
                                            {chartData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={
                                                        COLORS[entry.name] ||
                                                        DEFAULT_COLOR
                                                    }
                                                    strokeWidth={0}
                                                />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip
                                            content={<CustomTooltip />}
                                            cursor={false}
                                        />
                                        <Legend
                                            layout="horizontal"
                                            verticalAlign="bottom"
                                            align="center"
                                            wrapperStyle={{
                                                fontSize: "12px",
                                                paddingTop: "20px",
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
