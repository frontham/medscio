import { NextResponse, type NextRequest } from "next/server";
import data from "@/data/terminologies.json";
import { filterTerminologies, MAX_RESULTS } from "@/lib/search";
import type {
  TerminologiesResponse,
  TerminologySearchResponse,
} from "@/lib/types";

const terminologies = (data as TerminologiesResponse).terminologies;

export async function GET(
  request: NextRequest,
): Promise<NextResponse<TerminologySearchResponse>> {
  const query = request.nextUrl.searchParams.get("q") ?? "";
  const matches = filterTerminologies(terminologies, query);

  return NextResponse.json({
    query,
    results: matches.slice(0, MAX_RESULTS),
    total: matches.length,
  });
}
