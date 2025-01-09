import { LovelaceCardConfig } from "custom-card-helpers";

export interface Config extends LovelaceCardConfig {
    header: string;
    datetimeiso: string;
    electricityprice: string;
}