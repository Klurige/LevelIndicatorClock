import { LovelaceCardConfig } from "custom-card-helpers";

export interface Config extends LovelaceCardConfig {
    header: string;
    iso_formatted_time: string;
    electricity_price: string;
}