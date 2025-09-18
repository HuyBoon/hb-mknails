import { dbConnect } from "@/libs/dbConnection";
import { Service } from "@/models/Service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await context.params;
        await dbConnect();
        const service = await Service.findOne({ key: slug });
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