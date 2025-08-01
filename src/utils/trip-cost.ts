import { VehicleType } from "./enums/vehicleType.enum.js";

const tripRates = {
    'Al Shamal': {
      'Al Daayen': 15,
      'Umm Salal': 15,
      'Doha': 15,
      'Al Rayyan': 15,
      'Al Wakrah': 35,
      'Al Shamal': 12,
      'Al Shahaniya': 12,
      'Al Khor': 12,
      'Al Thakira': 12,
    },
    'Al Shahaniya': {
      'Al Daayen': 15,
      'Umm Salal': 15,
      'Doha': 15,
      'Al Rayyan': 15,
      'Al Wakrah': 35,
      'Al Shamal': 12,
      'Al Shahaniya': 12,
      'Al Khor': 12,
      'Al Thakira': 12,
    },
    'Al Khor': {
      'Al Daayen': 15,
      'Umm Salal': 15,
      'Doha': 15,
      'Al Rayyan': 15,
      'Al Wakrah': 35,
      'Al Shamal': 12,
      'Al Shahaniya': 12,
      'Al Khor': 12,
      'Al Thakira': 12,
    },
    'Al Daayen': {
      'Al Rayyan': 15,
      'Al Wakrah': 15,
      'Al Shamal': 15,
      'Al Shahaniya': 15,
      'Al Khor': 15,
      'Al Thakira': 15,
      'Umm Salal': 12,
      'Doha': 12,
    },
    'Umm Salal': {
      'Al Rayyan': 15,
      'Al Wakrah': 15,
      'Al Shamal': 15,
      'Al Shahaniya': 15,
      'Al Khor': 15,
      'Al Thakira': 15,
      'Al Daayen': 12,
      'Doha': 12,
    },
    'Doha': {
      'Al Rayyan': 15,
      'Al Wakrah': 15,
      'Al Shamal': 25,
      'Al Shahaniya': 25,
      'Al Khor': 25,
      'Al Thakira': 25,
      'Al Daayen': 15,
      'Umm Salal': 15,
    },
    'Al Rayyan': {
      'Al Daayen': 12,
      'Umm Salal': 12,
      'Doha': 15,
      'Al Wakrah': 15,
      'Al Shamal': 25,
      'Al Shahaniya': 25,
      'Al Khor': 25,
      'Al Thakira': 25,
    },
    'Al Wakrah': {
      'Al Daayen': 15,
      'Umm Salal': 15,
      'Doha': 15,
      'Al Rayyan': 15,
      'Al Shamal': 35,
      'Al Shahaniya': 35,
      'Al Khor': 35,
      'Al Thakira': 35,
    },
    'Al Thakira': {
      'Al Daayen': 15,
      'Umm Salal': 15,
      'Doha': 15,
      'Al Rayyan': 15,
      'Al Wakrah': 35,
      'Al Shamal': 12,
      'Al Shahaniya': 12,
      'Al Khor': 12,
    },
  };

export function getTripCost(fromCity: string, toCity: string): number {
  if (!tripRates[fromCity] || tripRates[fromCity][toCity] == null) {
    throw new Error(`No rate found from ${fromCity} to ${toCity}`);
  }
  return tripRates[fromCity][toCity];
}

export function getTripCostBasedOnKm(distance: number, vehicleType: VehicleType): number {
  if (typeof distance !== 'number' || distance < 0) {
    throw new Error('Distance must be a positive number');
  }
  switch (vehicleType) {
    case VehicleType.SEDAN_CAR :
    case VehicleType.MOTORCYCLE:
      if (distance > 0 && distance <= 10) {
        return 13; // Base cost for short trips
      } else if (distance > 10 && distance <= 20) {
        return 15; // Cost for medium trips
      } else if (distance > 20 && distance <= 30) {
        return 25; // Cost for longer trips
      } else {
        return Math.ceil(distance); // Cost for very long trips
      }
    case VehicleType.VAN:
    case VehicleType.PANEL_VAN:
      if (distance > 0 && distance <= 10) return 35; // Base cost for short trips
      else if (distance > 10) return Math.ceil(35 + (distance - 10) * 3); // Cost for medium and long trips
    
    case VehicleType.CHILLER_VAN:
      if (distance > 0 && distance <= 10) return 125; // Base cost for short trips
      else if (distance > 10 && distance <= 20) return 145;
      else if (distance > 20 && distance <= 30) return 205; // Cost for longer trips
      else return Math.ceil(200 + (distance - 30) * 6); // Cost for very long trips
    
    case VehicleType.FREEZER_VAN:
      if (distance > 0 && distance <= 10) return 125; // Base cost for short trips
      else if (distance > 10 && distance <= 20) return 155;
      else if (distance > 20 && distance <= 30) return 225; // Cost for longer trips
      else return Math.ceil(220 + (distance - 30) * 8); // Cost for very long trips
    
    case VehicleType.PICKUP_TRUCK_TWO_TONS:
      if (distance > 0 && distance <= 30) return 130; // Base cost for short trips
      else if (distance > 30 && distance <= 50) return 230;
      else return Math.ceil(230 + (distance - 50) * 4); // Cost for longer trips

    case VehicleType.PICKUP_TRUCK_THREE_TONS:
      if (distance > 0 && distance <= 30) return 160; // Base
      else if (distance > 30 && distance <= 50) return 260;
      else return Math.ceil(260 + (distance - 50) * 4); // Cost for longer trips
}
}
  