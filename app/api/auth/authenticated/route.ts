import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/userModel";
import { handleError } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import {unstable_noStore as noStore} from "next/cache"
export async function GET() {
  noStore()
  try {
    console.log("Starting GET request handler");

    const { getUser } = getKindeServerSession();
    if (!getUser) {
      throw new Error("getKindeServerSession is not returning getUser function. Check environment variables.");
    }

    console.log("getKindeServerSession retrieved");

    const user = await getUser();
    console.log("User retrieved:", user);

    if (!user || user === null || !user.id) {
      console.error("User not authenticated:", user);
      throw new Error("User not logged in");
    }

    await connectToDatabase();
    console.log("Database connected");

    const existingUser = await User.findOne({ email: user.email });
    console.log("Existing user found:", existingUser);

    if (!existingUser) {
      await User.create({
        family_name: user.family_name ?? '',
        given_name: user.given_name ?? '',
        picture: user.picture ?? 'https://avatar.vercel.sh/rauchg',
        email: user.email ?? '',
        id: user.id,
      });
      console.log("New user created");
    }

    return NextResponse.redirect('https://whipevents.vercel.app');
  } catch (error) {;
    handleError(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
