import { scalekit } from "@/lib/scalekit";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const cokkieStore = await cookies()
    cokkieStore.delete("access_token")
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`);
}