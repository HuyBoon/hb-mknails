import { dbConnect } from "@/libs/dbConnection";
import { Promotion } from "@/models/Promotion";
import Error from "next/error";
import { NextResponse } from "next/server";



export async function GET() {
    try {
        await dbConnect();
        const promotion = await Promotion.findOne();
        return NextResponse.json({ success: true, data: promotion || null }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const existingPromotion = await Promotion.findOne();
        if (existingPromotion) {
            return NextResponse.json(
                { success: false, error: "Only one promotion is allowed" },
                { status: 400 }
            );
        }
        const body = await request.json();
        const promotion = await Promotion.create(body);
        return NextResponse.json({ success: true, data: promotion }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error },
            { status: 400 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const updateData = {
            title: body.title,
            items: body.items,
        };

        const promotion = await Promotion.findOneAndUpdate(
            {},
            { $set: updateData },
            { new: true, runValidators: true, upsert: true }
        );

        return NextResponse.json({ success: true, data: promotion }, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { success: false, error },
            { status: 400 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        await dbConnect();
        await Promotion.deleteMany({});
        return NextResponse.json(
            { success: true, message: "Promotion deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error },
            { status: 400 }
        );
    }
}