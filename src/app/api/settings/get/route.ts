// check ower id found or not from mongoDb server
import connectDB from "@/lib/db";
import settings from "@/model/settings.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const {OwnerId} = await req.json();
          if (!OwnerId) {
                    return NextResponse .json({ error: "ownerId is required" }, { status: 400 });
                }
                await connectDB()
                const updatesettings = await settings.findOne(
                    { OwnerId },
                )
                return NextResponse.json(updatesettings, { status: 200 });
    } catch (error) {
        return NextResponse.json(
      { message: ` get setting error ${error}` }, 
      { status: 500 }
        )
    }
}