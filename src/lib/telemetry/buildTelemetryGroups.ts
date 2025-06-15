import { TelemetryKeys } from "@/app/config/constants";
import { TelemetrySnapshot } from "@/app/config/types";

export const buildTelemetryGroups = (selectedSnap: TelemetrySnapshot | null) => ({
  lapAndTiming: {
    [TelemetryKeys.LAP]: selectedSnap?.[TelemetryKeys.LAP] ?? '',
    [TelemetryKeys.TIME]: selectedSnap?.[TelemetryKeys.TIME] ?? '',
    [TelemetryKeys.LAP_TIME]: selectedSnap?.[TelemetryKeys.LAP_TIME] ?? '',
    [TelemetryKeys.LAP_DELTA]: selectedSnap?.[TelemetryKeys.LAP_DELTA] ?? '',
    [TelemetryKeys.SECTOR_1_TIME_S]: selectedSnap?.[TelemetryKeys.SECTOR_1_TIME_S] ?? '',
    [TelemetryKeys.SECTOR_2_TIME_S]: selectedSnap?.[TelemetryKeys.SECTOR_2_TIME_S] ?? '',
    [TelemetryKeys.SECTOR_3_TIME_S]: selectedSnap?.[TelemetryKeys.SECTOR_3_TIME_S] ?? '',
    [TelemetryKeys.TOP_SPEED_KMH]: selectedSnap?.[TelemetryKeys.TOP_SPEED_KMH] ?? '',
    [TelemetryKeys.DRIVER]: selectedSnap?.[TelemetryKeys.DRIVER] ?? '',
  },

  tirePressures: {
    [TelemetryKeys.TIRE_PRESSURE_PSI]: selectedSnap?.[TelemetryKeys.TIRE_PRESSURE_PSI] ?? '',
    [TelemetryKeys.TIRE_PRESSURE_FL]: selectedSnap?.[TelemetryKeys.TIRE_PRESSURE_FL] ?? '',
    [TelemetryKeys.TIRE_PRESSURE_FR]: selectedSnap?.[TelemetryKeys.TIRE_PRESSURE_FR] ?? '',
    [TelemetryKeys.TIRE_PRESSURE_RL]: selectedSnap?.[TelemetryKeys.TIRE_PRESSURE_RL] ?? '',
    [TelemetryKeys.TIRE_PRESSURE_RR]: selectedSnap?.[TelemetryKeys.TIRE_PRESSURE_RR] ?? '',
  },

  tireTemperatures: {
    [TelemetryKeys.TIRE_TEMP_INNER_FL]: selectedSnap?.[TelemetryKeys.TIRE_TEMP_INNER_FL] ?? '',
    [TelemetryKeys.TIRE_TEMP_MID_FL]: selectedSnap?.[TelemetryKeys.TIRE_TEMP_MID_FL] ?? '',
    [TelemetryKeys.TIRE_TEMP_OUTER_FL]: selectedSnap?.[TelemetryKeys.TIRE_TEMP_OUTER_FL] ?? '',
    [TelemetryKeys.TIRE_TEMP_INNER_FR]: selectedSnap?.[TelemetryKeys.TIRE_TEMP_INNER_FR] ?? '',
    [TelemetryKeys.TIRE_TEMP_MID_FR]: selectedSnap?.[TelemetryKeys.TIRE_TEMP_MID_FR] ?? '',
    [TelemetryKeys.TIRE_TEMP_OUTER_FR]: selectedSnap?.[TelemetryKeys.TIRE_TEMP_OUTER_FR] ?? '',
    [TelemetryKeys.TIRE_TEMP_INNER_RL]: selectedSnap?.[TelemetryKeys.TIRE_TEMP_INNER_RL] ?? '',
    [TelemetryKeys.TIRE_TEMP_MID_RL]: selectedSnap?.[TelemetryKeys.TIRE_TEMP_MID_RL] ?? '',
    [TelemetryKeys.TIRE_TEMP_OUTER_RL]: selectedSnap?.[TelemetryKeys.TIRE_TEMP_OUTER_RL] ?? '',
    [TelemetryKeys.TIRE_TEMP_INNER_RR]: selectedSnap?.[TelemetryKeys.TIRE_TEMP_INNER_RR] ?? '',
    [TelemetryKeys.TIRE_TEMP_MID_RR]: selectedSnap?.[TelemetryKeys.TIRE_TEMP_MID_RR] ?? '',
    [TelemetryKeys.TIRE_TEMP_OUTER_RR]: selectedSnap?.[TelemetryKeys.TIRE_TEMP_OUTER_RR] ?? '',
  },

  tireWear: {
    [TelemetryKeys.TIRE_WEAR_FL]: selectedSnap?.[TelemetryKeys.TIRE_WEAR_FL] ?? '',
    [TelemetryKeys.TIRE_WEAR_FR]: selectedSnap?.[TelemetryKeys.TIRE_WEAR_FR] ?? '',
    [TelemetryKeys.TIRE_WEAR_RL]: selectedSnap?.[TelemetryKeys.TIRE_WEAR_RL] ?? '',
    [TelemetryKeys.TIRE_WEAR_RR]: selectedSnap?.[TelemetryKeys.TIRE_WEAR_RR] ?? '',
  },

  brakes: {
    [TelemetryKeys.BRAKE_TEMP_FRONT]: selectedSnap?.[TelemetryKeys.BRAKE_TEMP_FRONT] ?? '',
    [TelemetryKeys.BRAKE_TEMP_REAR]: selectedSnap?.[TelemetryKeys.BRAKE_TEMP_REAR] ?? '',
    [TelemetryKeys.BRAKE_PRESSURE_FRONT]: selectedSnap?.[TelemetryKeys.BRAKE_PRESSURE_FRONT] ?? '',
    [TelemetryKeys.BRAKE_PRESSURE_REAR]: selectedSnap?.[TelemetryKeys.BRAKE_PRESSURE_REAR] ?? '',
    [TelemetryKeys.BRAKE_BIAS]: selectedSnap?.[TelemetryKeys.BRAKE_BIAS] ?? '',
  },

  powerUnitAndERS: {
    [TelemetryKeys.ENGINE_MAP_MODE]: selectedSnap?.[TelemetryKeys.ENGINE_MAP_MODE] ?? '',
    [TelemetryKeys.THROTTLE_MAP]: selectedSnap?.[TelemetryKeys.THROTTLE_MAP] ?? '',
    [TelemetryKeys.OIL_TEMP]: selectedSnap?.[TelemetryKeys.OIL_TEMP] ?? '',
    [TelemetryKeys.WATER_TEMP]: selectedSnap?.[TelemetryKeys.WATER_TEMP] ?? '',
    [TelemetryKeys.ERS_STATE_OF_CHARGE]: selectedSnap?.[TelemetryKeys.ERS_STATE_OF_CHARGE] ?? '',
    [TelemetryKeys.ERS_BATTERY_TEMP]: selectedSnap?.[TelemetryKeys.ERS_BATTERY_TEMP] ?? '',
    [TelemetryKeys.ERS_DEPLOY_MODE]: selectedSnap?.[TelemetryKeys.ERS_DEPLOY_MODE] ?? '',
  },

  fuelAndEfficiency: {
    [TelemetryKeys.FUEL_LEVEL_PERCENT]: selectedSnap?.[TelemetryKeys.FUEL_LEVEL_PERCENT] ?? '',
    [TelemetryKeys.FUEL_BURN_PER_LAP]: selectedSnap?.[TelemetryKeys.FUEL_BURN_PER_LAP] ?? '',
  },

  driverInput: {
    [TelemetryKeys.THROTTLE_PERCENT]: selectedSnap?.[TelemetryKeys.THROTTLE_PERCENT] ?? '',
    [TelemetryKeys.BRAKE_PERCENT]: selectedSnap?.[TelemetryKeys.BRAKE_PERCENT] ?? '',
    [TelemetryKeys.STEERING_ANGLE]: selectedSnap?.[TelemetryKeys.STEERING_ANGLE] ?? '',
    [TelemetryKeys.STEERING_CORRECTION]: selectedSnap?.[TelemetryKeys.STEERING_CORRECTION] ?? '',
  },

  pitInfo: {
    [TelemetryKeys.PIT_STOP]: selectedSnap?.[TelemetryKeys.PIT_STOP] ?? '',
    [TelemetryKeys.PIT_TIME_SEC]: selectedSnap?.[TelemetryKeys.PIT_TIME_SEC] ?? '',
    [TelemetryKeys.TIRE_TYPE]: selectedSnap?.[TelemetryKeys.TIRE_TYPE] ?? '',
  },
});
