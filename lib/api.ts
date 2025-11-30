export interface DailyEnergyMix {
  date: string;
  cleanEnergyPerc: number;
  mix: Record<string, number>;
}

export interface OptimalChargingWindow {
  startTime: string;
  endTime: string;
  cleanEnergyPerc: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function getEnergyMix(): Promise<DailyEnergyMix[]> {
  const response = await fetch(`${API_BASE_URL}/energy-mix`);
  if (!response.ok) {
    throw new Error('Failed to fetch energy mix');
  }
  return response.json();
}

export async function getOptimalChargingWindow(hours: number): Promise<OptimalChargingWindow> {
  const response = await fetch(`${API_BASE_URL}/optimal-charging?hours=${hours}`);
  if (!response.ok) {
    throw new Error('Failed to fetch optimal charging window');
  }
  return response.json();
}