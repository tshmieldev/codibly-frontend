import { getEnergyMix, DailyEnergyMix } from "../lib/api";
import { EnergyMixCharts } from "../components/EnergyMixCharts";
import { ChargingCalculator } from "../components/ChargingCalculator";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";

export default async function Home() {
    let energyData: DailyEnergyMix[] = [];
    try {
        energyData = await getEnergyMix();
    } catch (error) {
        console.error("Failed to fetch initial data:", error);
    }

    return (
        <main className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 relative">
            <div
                className={cn(
                    "absolute inset-0",
                    "[background-size:20px_20px]",
                    "[background-image:radial-gradient(#a4a4a4_1px,transparent_1px)]",
                    "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
                )}
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)] dark:bg-black"></div>
            <div className="absolute z-1 top-4 right-4 md:top-8 md:right-8">
                <ModeToggle />
            </div>
            <div className="max-w-7xl mx-auto space-y-12 relative">
                <div className="text-center space-y-4">
                    <h1 className="mb-16 text-3xl font-bold text-foreground tracking-tight sm:text-4xl">
                        {"Wojciech's  UK Energy Mix Dashboard"}
                    </h1>
                </div>

                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-foreground">
                            Energy Generation Forecast
                        </h2>
                        <Badge
                            variant="secondary"
                            className="text-sm font-normal"
                        >
                            Next 3 Days
                        </Badge>
                    </div>
                    <EnergyMixCharts data={energyData} />
                </section>

                <Separator className="my-8" />

                <section>
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-foreground mb-2">
                            EV Charging Optimizer
                        </h2>
                        <p className="text-foreground">
                            Find the best time to charge your vehicle based on
                            clean energy availability.
                        </p>
                    </div>
                    <ChargingCalculator />
                </section>

                <footer className="text-center text-muted-foreground text-sm pt-12 pb-6">
                    <p>Data provided by Carbon Intensity API</p>
                    <p className="mt-2">
                        (c) {new Date().getFullYear()} Wojciech Rok
                    </p>
                </footer>
            </div>
        </main>
    );
}
