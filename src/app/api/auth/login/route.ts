import { scalekit } from "@/lib/scalekit";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const redirecturi = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`;
    const url = scalekit.getAuthorizationUrl(redirecturi);
    console.log(url)
    return NextResponse.redirect(url);
    
}