from datetime import datetime

from clients.yfinance_client import get_yfinance_client

MARKET_SYMBOLS = {
    # Indian Indices
    "NIFTY 50": "^NSEI",
    "SENSEX": "^BSESN",

    # Global
    "S&P 500": "^GSPC",
    "NASDAQ": "^IXIC",
    "Dow Jones": "^DJI",

    # Commodities
    "Gold": "GC=F",
    "Silver": "SI=F",
    "Crude Oil": "CL=F",

    # Crypto
    "Bitcoin": "BTC-USD",
    "Ethereum": "ETH-USD",
}

NSE_STOCKS = {
    "Reliance": "RELIANCE.NS",
    "TCS": "TCS.NS",
    "Infosys": "INFY.NS",
    "ICICI Bank": "ICICIBANK.NS",
    "HDFC Bank": "HDFCBANK.NS",
    "Axis Bank": "AXISBANK.NS",
    "SBI": "SBIN.NS",
    "ITC": "ITC.NS",
    "LT": "LT.NS",
    "Bharti Airtel": "BHARTIARTL.NS",
}


class MarketOverviewService:

    async def get_market_overview(self):
        client = get_yfinance_client()

        # Market indices
        snapshot = await client.get_market_snapshot(MARKET_SYMBOLS)

        # Stocks for gainers/losers
        stock_snapshot = await client.get_market_snapshot(NSE_STOCKS)

        # Remove stocks with valid changePercent
        stock_snapshot = [
            stock
            for stock in stock_snapshot
            if stock.get("changePercent") is not None
        ]

        # Market breadth (based on stocks)
        advancing = sum(
            1
            for stock in stock_snapshot
            if stock["changePercent"] > 0
        )

        declining = sum(
            1
            for stock in stock_snapshot
            if stock["changePercent"] < 0
        )

        unchanged = sum(
            1
            for stock in stock_snapshot
            if stock["changePercent"] == 0
        )

        total = len(stock_snapshot)

        score = round((advancing / total) * 100, 2) if total else 0

        if score >= 60:
            sentiment = "Bullish"
        elif score <= 40:
            sentiment = "Bearish"
        else:
            sentiment = "Neutral"

        # Top gainers
        top_gainers = sorted(
            stock_snapshot,
            key=lambda x: x["changePercent"],
            reverse=True,
        )[:5]

        # Top losers
        top_losers = sorted(
            stock_snapshot,
            key=lambda x: x["changePercent"],
        )[:5]

        return {
            "indices": snapshot,
            "top_gainers": top_gainers,
            "top_losers": top_losers,
            "market_breadth": {
                "advancing": advancing,
                "declining": declining,
                "unchanged": unchanged,
            },
            "market_sentiment": {
                "status": sentiment,
                "score": score,
            },
            "last_updated": datetime.utcnow().isoformat(),
        }


market_overview_service = MarketOverviewService()