import { getEnergyMix, DailyEnergyMix } from "../lib/api";
import { EnergyMixCharts } from "../components/EnergyMixCharts";
import { ChargingCalculator } from "../components/ChargingCalculator";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/mode-toggle";

export default async function Home() {
    let energyData: DailyEnergyMix[] = [];
    try {
        energyData = await getEnergyMix();
    } catch (error) {
        console.error("Failed to fetch initial data:", error);
    }

    return (
        <main className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 relative">
            <div className="absolute top-4 right-4 md:top-8 md:right-8">
                <ModeToggle />
            </div>
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-foreground tracking-tight sm:text-5xl">
                        UK Energy Mix Dashboard
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Monitor the current energy generation sources and
                        optimize your EV charging schedule for the greenest
                        energy usage.
                    </p>
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
                        <p className="text-muted-foreground">
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
