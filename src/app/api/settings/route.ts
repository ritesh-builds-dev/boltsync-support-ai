// to save all things od dashboard page to mogoDb server
import connectDB from "@/lib/db";
import settings from "@/model/settings.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { OwnerId, businessName, supportEmail, contactNumber, address, knowledge, } = await req.json();
        if (!OwnerId) {
            return NextResponse .json({ error: "ownerId is required" }, { status: 400 });
        }
        await connectDB()
        const updatesettings = await settings.findOneAndUpdate(
            { OwnerId },
            { $set: { 
                    businessName, 
                    supportEmail, 
                    contactNumber, 
                    address, 
                    knowledge 
                }},
            { new: true, upsert: true }
        )
        return NextResponse.json(updatesettings)
    } catch (error) {
         return NextResponse .json({message: `setting error ${error}` },
             { status: 500 });
    }
}

