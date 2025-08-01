import { LovelaceCardConfig } from "custom-card-helpers";

export interface Config extends LovelaceCardConfig {
    electricity_price: string;
    date_time_iso: string;
}