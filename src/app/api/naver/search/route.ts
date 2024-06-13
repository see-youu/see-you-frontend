import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  const display = searchParams.get("display") || "5";
  const start = searchParams.get("start") || "1";
  const sort = searchParams.get("sort") || "comment";
  try {
    const headers: HeadersInit = {
      "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID!,
      "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET!,
    };

    const response = await fetch(
      `https://openapi.naver.com/v1/search/local.json?query=${query}&display=${display}&start=${start}&sort=${sort}`,
      { headers }
    );

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json(); // JSON 데이터 파싱
    console.log(data);
    return Response.json({ data });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Failed to fetch data:", message);
    return Response.json({ message });
  }
}
