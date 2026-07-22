from fastapi import APIRouter

from api.services.market_overview_service import (
    market_overview_service,
)

router = APIRouter(
    prefix="/market-overview",
    tags=["market-overview"],
)


@router.get("/")
async def get_market_overview():
    return await market_overview_service.get_market_overview()