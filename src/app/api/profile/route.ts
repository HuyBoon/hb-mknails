import { authOptions } from "@/libs/authOptions";

import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { UserType } from "@/types/interface";
import { dbConnect } from "@/libs/dbConnection";


export async function GET() {
    try {
        await dbConnect();

        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json(
                { error: "User not authenticated" },
                { status: 401 }
            );
        }

        // Fetch the user
        const user = await User.findOne({ email: session.user.email }).lean() as UserType | null;
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }


        const response: UserType = {
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            avatar: user.avatar || session.user.image || "/defaultAvatar.png",
            phone: user.phone || "",
            active: user.active,
            createdAt: user.createdAt
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
