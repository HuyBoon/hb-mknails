import { authOptions } from "@/libs/authOptions";
import { dbConnect } from "@/libs/dbConnection";
import { Promotion } from "@/models/Promotion";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();
        const promotion = await Promotion.findOne();
        return NextResponse.json({ success: true, data: promotion || null }, { status: 200 });
    } catch (error: any) {
        console.error("GET error:", error);
        return NextResponse.json(
            { success: false, message: "Lỗi server" },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

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
    } catch (error: any) {
        console.error("PUT error:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Lỗi khi lưu promotion" },
            { status: 400 }
        );
    }
}

export async function PATCH(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        await dbConnect();
        const { itemIndex } = await request.json();

        if (typeof itemIndex !== "number" || itemIndex < 0) {
            return NextResponse.json(
                { success: false, message: "Chỉ số item không hợp lệ" },
                { status: 400 }
            );
        }

        const promotion = await Promotion.findOne();
        if (!promotion) {
            return NextResponse.json(
                { success: false, message: "Không tìm thấy promotion" },
                { status: 404 }
            );
        }

        if (itemIndex >= promotion.items.length) {
            return NextResponse.json(
                { success: false, message: "Chỉ số item vượt quá giới hạn" },
                { status: 400 }
            );
        }

        promotion.items.splice(itemIndex, 1);
        await promotion.save();

        return NextResponse.json(
            { success: true, data: promotion },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("PATCH error:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Lỗi khi xóa item" },
            { status: 400 }
        );
    }
}

export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        await dbConnect();
        await Promotion.deleteMany({});
        return NextResponse.json(
            { success: true, message: "Xóa promotion thành công" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("DELETE error:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Lỗi khi xóa promotion" },
            { status: 400 }
        );
    }
}