import apiClient from "./apiClient";

export interface MarketIndex {
    name: string;
    symbol: string;
    price: number | null;
    change: number | null;
    changePercent: number | null;
    high: number | null;
    low: number | null;
    volume: number | null;
}

export interface MarketOverviewResponse {
    indices: MarketIndex[];
    top_gainers: MarketIndex[];
    top_losers: MarketIndex[];

    market_breadth: {
        advancing: number;
        declining: number;
        unchanged: number;
    };

    market_sentiment: {
        status: string;
        score: number;
    };

    last_updated: string;
}

export function getMarketOverview() {
    return apiClient
        .get<MarketOverviewResponse>("/market-overview/")
        .then((r) => r.data);
}