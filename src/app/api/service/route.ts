// api/service/route.ts
import { authOptions } from "@/libs/authOptions";
import { dbConnect } from "@/libs/dbConnection";
import { Service } from "@/models/Service";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);
        const category = searchParams.get("category");

        if (category) {

            const service = await Service.findOne({ key: category });
            if (!service) {
                return NextResponse.json(
                    { success: false, message: `Không tìm thấy danh mục ${category}` },
                    { status: 404 }
                );
            }
            return NextResponse.json({ success: true, data: service }, { status: 200 });
        }


        const services = await Service.find({});
        return NextResponse.json({ success: true, data: services }, { status: 200 });
    } catch (error: any) {
        console.error("GET error:", error);
        return NextResponse.json(
            { success: false, message: "Không thể tải dữ liệu dịch vụ. Vui lòng thử lại sau." },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Không được phép truy cập" }, { status: 401 });
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
            { success: false, message: error.message || "Không thể tạo dịch vụ mới. Vui lòng thử lại." },
            { status: 400 }
        );
    }
}