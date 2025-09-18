import { authOptions } from "@/libs/authOptions";
import { dbConnect } from "@/libs/dbConnection";
import { Service } from "@/models/Service";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        await dbConnect();
        const service = await Service.findOne({ key: id });
        if (!service) {
            return NextResponse.json(
                { success: false, message: "Không tìm thấy service" },
                { status: 404 }
            );
        }
        return NextResponse.json({ success: true, data: service }, { status: 200 });
    } catch (error: any) {
        console.error("GET error:", error);
        return NextResponse.json(
            { success: false, message: "Lỗi server" },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {

    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        await dbConnect();
        const { id } = await context.params;
        const body = await req.json();
        const service = await Service.findOneAndUpdate(
            { key: id },
            { $set: body },
            { new: true, runValidators: true }
        );
        if (!service) {
            return NextResponse.json(
                { success: false, message: "Không tìm thấy service" },
                { status: 404 }
            );
        }
        return NextResponse.json({ success: true, data: service }, { status: 200 });
    } catch (error: any) {
        console.error("PUT error:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Lỗi khi cập nhật service" },
            { status: 400 }
        );
    }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await context.params;
        await dbConnect();
        const service = await Service.findOneAndDelete({ key: id });
        if (!service) {
            return NextResponse.json(
                { success: false, message: "Không tìm thấy service" },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { success: true, message: "Xóa service thành công" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("DELETE error:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Lỗi khi xóa service" },
            { status: 400 }
        );
    }
}