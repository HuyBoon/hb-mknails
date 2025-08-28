
import { dbConnect } from "@/libs/dbConnection";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,
    context: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await context.params;

        const user = await User.findById(id).lean();
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json(user);
    } catch (error) {
        console.error("Error fetching user profile by ID:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest,
    context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;

        const body = await req.json();
        await dbConnect();
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true, runValidators: true }
        ).lean();
        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Error updating user profile:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest,
    context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;

    try {
        await dbConnect();
        const deletedUser = await User.findByIdAndDelete(id).lean();
        if (!deletedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "User deleted successfully", deletedUser });
    } catch (error) {
        console.error("Error deleting user profile:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
