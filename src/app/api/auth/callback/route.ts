// for Authentication aur Login process from scalekit

// import scale kit and add login auth process toh web
import { scalekit } from "@/lib/scalekit";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code"); 
    const redirecturi = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`;
    if (!code) {
        return NextResponse.json({ error: 'Authorization code not found' }, { status: 400 });
    }
    const session = await scalekit.authenticateWithCode (code, redirecturi);
   const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`);

//    Store the access token in a secure browser cookie for session management.
    response.cookies.set("access_token", session.accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60*1000,
        secure: true,  
        path: '/' 
        });
    return response;
  
}