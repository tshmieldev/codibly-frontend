"use client";

import React, { useState } from "react";
import { getOptimalChargingWindow, OptimalChargingWindow } from "../lib/api";
import { format } from "date-fns";
import { BatteryCharging, Clock, Zap, ArrowRight } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export function ChargingCalculator() {
    const [hours, setHours] = useState<number>(3);
    const [result, setResult] = useState<OptimalChargingWindow | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCalculate = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getOptimalChargingWindow(hours);
            setResult(data);
        } catch (err) {
            setError("Failed to calculate optimal window. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <BatteryCharging className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <CardTitle>Smart Charging Calculator</CardTitle>
                        <CardDescription>
                            Find the best time to charge your EV based on clean
                            energy availability.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Charging Duration
                        </label>
                        <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                            {hours} hours
                        </span>
                    </div>
                    <Slider
                        min={1}
                        max={6}
                        step={1}
                        value={[hours]}
                        onValueChange={(vals) => setHours(vals[0])}
                        className="py-4"
                    />
                    <p className="text-xs text-muted-foreground">
                        Select a duration between 1 and 6 hours.
                    </p>
                </div>

                <Button
                    onClick={handleCalculate}
                    disabled={loading}
                    className="w-full"
                    size="lg"
                >
                    {loading ? (
                        "Calculating..."
                    ) : (
                        <>
                            <Zap className="w-4 h-4 mr-2" />
                            Find Best Time
                        </>
                    )}
                </Button>

                {error && (
                    <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm font-medium">
                        {error}
                    </div>
                )}

                {result && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                        <Separator />
                        <div>
                            <h3 className="text-lg font-semibold mb-4">
                                Optimal Charging Window
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-muted/50 p-4 rounded-lg border border-border">
                                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                        <Clock className="w-4 h-4" />
                                        <span className="text-xs font-medium uppercase tracking-wider">
                                            Start
                                        </span>
                                    </div>
                                    <div className="font-semibold text-foreground">
                                        {format(
                                            new Date(result.startTime),
                                            "HH:mm",
                                        )}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {format(
                                            new Date(result.startTime),
                                            "MMM d",
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-center text-muted-foreground">
                                    <ArrowRight className="w-6 h-6" />
                                </div>

                                <div className="bg-muted/50 p-4 rounded-lg border border-border">
                                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                        <Clock className="w-4 h-4" />
                                        <span className="text-xs font-medium uppercase tracking-wider">
                                            End
                                        </span>
                                    </div>
                                    <div className="font-semibold text-foreground">
                                        {format(
                                            new Date(result.endTime),
                                            "HH:mm",
                                        )}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {format(
                                            new Date(result.endTime),
                                            "MMM d",
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-900/30 flex items-center justify-between">
                                <span className="text-green-800 dark:text-green-300 font-medium">
                                    Average Clean Energy
                                </span>
                                <Badge
                                    variant="outline"
                                    className="text-lg font-bold text-green-600 dark:text-green-400 bg-background border-green-200 dark:border-green-800 px-3 py-1"
                                >
                                    {result.cleanEnergyPerc}%
                                </Badge>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
