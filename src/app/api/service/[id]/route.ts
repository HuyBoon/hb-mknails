import { authOptions } from "@/libs/authOptions";
import { dbConnect } from "@/libs/dbConnection";
import { Service } from "@/models/Service";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const service = await Service.findOne({ key: params.id });
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

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        await dbConnect();
        const body = await request.json();
        const service = await Service.findOneAndUpdate(
            { key: params.id },
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

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        await dbConnect();
        const service = await Service.findOneAndDelete({ key: params.id });
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