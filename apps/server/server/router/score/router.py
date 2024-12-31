from fastapi import APIRouter

router = APIRouter(
    prefix="/score",
    tags=["score", "companies"],
    responses={404: {"description": "Method Not found"}},
)

@router.get("/")
async def read_items():
    return {"message": "Running"}