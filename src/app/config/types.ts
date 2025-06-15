import { TelemetryKeys } from './constants';

export type TelemetrySnapshot = {
	[key in TelemetryKeys]: string
}