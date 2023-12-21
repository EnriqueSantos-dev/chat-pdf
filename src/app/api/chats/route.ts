import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = auth();

  try {
    if (!userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const chatsFromDB = await db
      .select()
      .from(chats)
      .where(eq(chats.userId, userId));

    return NextResponse.json(chatsFromDB);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
