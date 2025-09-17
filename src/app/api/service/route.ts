import { authOptions } from "@/libs/authOptions";
import { dbConnect } from "@/libs/dbConnection";
import { Service } from "@/models/Service";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();
        const services = await Service.find({});
        return NextResponse.json({ success: true, data: services }, { status: 200 });
    } catch (error: any) {
        console.error("GET error:", error);
        return NextResponse.json(
            { success: false, message: "Lỗi server" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        await dbConnect();
        const body = await request.json();
        const service = new Service(body);
        await service.save();
        return NextResponse.json({ success: true, data: service }, { status: 201 });
    } catch (error: any) {
        console.error("POST error:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Lỗi khi tạo service" },
            { status: 400 }
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
        const services = await Service.findOneAndUpdate(
            {},
            { $set: body },
            { new: true, runValidators: true, upsert: true }
        );
        return NextResponse.json({ success: true, data: services }, { status: 200 });
    } catch (error: any) {
        console.error("PUT error:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Lỗi khi cập nhật services" },
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
        await Service.deleteMany({});
        return NextResponse.json(
            { success: true, message: "Xóa tất cả services thành công" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("DELETE error:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Lỗi khi xóa services" },
            { status: 400 }
        );
    }
}