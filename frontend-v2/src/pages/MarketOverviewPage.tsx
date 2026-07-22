import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
    TrendingUp,
    TrendingDown,
    Activity,
    RefreshCw,
} from "lucide-react";

import {
    getMarketOverview,
    MarketIndex,
} from "../services/marketOverview";

function StockList({
    title,
    stocks,
    }: {
    title: string;
    stocks: MarketIndex[];
    }) {
    return (
        <div className="premium-card p-6 rounded-xl">
        <h2 className="text-xl font-semibold text-white mb-5">
            {title}
        </h2>

        <div className="space-y-4">
            {stocks.map((stock) => {
            const positive = (stock.changePercent ?? 0) >= 0;

            return (
                <div
                key={stock.symbol}
                className="flex justify-between items-center border-b border-white/10 pb-3 last:border-0"
                >
                <div>
                    <div className="text-white font-medium">
                    {stock.name}
                    </div>

                    <div className="text-sm text-gray-400">
                    ₹{stock.price?.toLocaleString() ?? "--"}
                    </div>
                </div>

                <div
                    className={`font-semibold ${
                    positive
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                >
                    {stock.changePercent?.toFixed(2)}%
                </div>
                </div>
            );
            })}
        </div>
        </div>
    );
}

export function MarketOverviewPage() {
    const {
        data,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["market-overview"],
        queryFn: getMarketOverview,
        refetchInterval: 30000,
    });

    if (isLoading) {
        return (
        <div className="min-h-screen flex items-center justify-center">
            <RefreshCw className="animate-spin text-blue-500" size={40} />
        </div>
        );
    }

    if (error || !data) {
        return (
        <div className="min-h-screen flex items-center justify-center text-red-400">
            Failed to load market overview.
        </div>
        );
    }

    return (
        <div className="min-h-screen px-6 py-8 max-w-7xl mx-auto">

        <div className="mb-10">
            <h1 className="text-4xl font-bold text-white">
            Market Overview
            </h1>

            <p className="text-gray-400 mt-2">
            Live global market snapshot
            </p>
        </div>

        {/* Index Cards */}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            {data.indices.map((item: MarketIndex) => {

            const positive =
                (item.changePercent ?? 0) >= 0;

            return (
                <div
                key={item.symbol}
                className="premium-card p-6 rounded-xl"
                >
                <div className="flex justify-between items-center mb-4">

                    <h2 className="text-lg font-semibold text-white">
                    {item.name}
                    </h2>

                    {positive ? (
                    <TrendingUp
                        className="text-green-400"
                        size={22}
                    />
                    ) : (
                    <TrendingDown
                        className="text-red-400"
                        size={22}
                    />
                    )}
                </div>

                <div className="text-3xl font-bold text-white">
                    {item.price?.toLocaleString() ?? "--"}
                </div>

                <div
                    className={`mt-3 font-semibold ${
                    positive
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                >
                    {item.change?.toFixed(2)} (
                    {item.changePercent?.toFixed(2)}%)
                </div>

                <div className="mt-5 text-sm text-gray-400">

                    <div className="flex justify-between">
                    <span>High</span>
                    <span>{item.high ?? "--"}</span>
                    </div>

                    <div className="flex justify-between">
                    <span>Low</span>
                    <span>{item.low ?? "--"}</span>
                    </div>

                    <div className="flex justify-between">
                    <span>Volume</span>
                    <span>
                        {item.volume?.toLocaleString() ?? "--"}
                    </span>
                    </div>

                </div>

                </div>
            );
            })}
        </div>

      {/* Bottom Section */}

        <div className="grid lg:grid-cols-2 gap-8 mt-10">

            <div className="premium-card p-6 rounded-xl">

            <div className="flex items-center gap-2 mb-5">

                <Activity className="text-blue-400" />

                <h2 className="text-xl font-semibold text-white">
                Market Breadth
                </h2>

            </div>

            <div className="space-y-4">

                <div className="flex justify-between">
                <span className="text-gray-400">
                    Advancing
                </span>

                <span className="text-green-400 font-semibold">
                    {data.market_breadth.advancing}
                </span>
                </div>

                <div className="flex justify-between">
                <span className="text-gray-400">
                    Declining
                </span>

                <span className="text-red-400 font-semibold">
                    {data.market_breadth.declining}
                </span>
                </div>

                <div className="flex justify-between">
                <span className="text-gray-400">
                    Unchanged
                </span>

                <span className="text-white font-semibold">
                    {data.market_breadth.unchanged}
                </span>
                </div>

            </div>

            </div>

            <div className="premium-card p-6 rounded-xl">

            <h2 className="text-xl font-semibold text-white mb-5">
                Market Sentiment
            </h2>

            <div className="text-5xl font-bold text-green-400">
                {data.market_sentiment.status}
            </div>

            <div className="mt-4 text-lg text-gray-300">
                Score : {data.market_sentiment.score}%
            </div>

            <div className="mt-8 text-gray-500 text-sm">
                Updated :
                <br />
                {new Date(
                data.last_updated
                ).toLocaleString()}
            </div>

            </div>

        </div>
        {/* Top Gainers & Top Losers */}

        <div className="grid lg:grid-cols-2 gap-8 mt-10">

            <StockList
                title="📈 Top Gainers"
                stocks={data.top_gainers}
            />

            <StockList
                title="📉 Top Losers"
                stocks={data.top_losers}
            />

        </div>

        </div>
    );
}