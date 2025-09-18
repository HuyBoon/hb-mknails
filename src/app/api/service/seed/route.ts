
import { authOptions } from "@/libs/authOptions";
import { dbConnect } from "@/libs/dbConnection";
import { Service } from "@/models/Service";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { servicesData } from "@/utils/data/servicesData";

export async function POST() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        await dbConnect();
        const existingServices = await Service.countDocuments();
        if (existingServices > 0) {
            return NextResponse.json(
                { success: false, message: "Database already contains services. Seeding skipped." },
                { status: 400 }
            );
        }

        const serviceArray = Object.values(servicesData);
        await Service.insertMany(serviceArray);

        return NextResponse.json(
            { success: true, message: "Database seeded successfully with services data" },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Seed error:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Error seeding database" },
            { status: 500 }
        );
    }
}