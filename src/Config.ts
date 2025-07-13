import { LovelaceCardConfig } from "custom-card-helpers";

export interface Config extends LovelaceCardConfig {
    iso_formatted_time: string;
    electricity_price: string;
}