import { connect } from "@/dbConfig/dobConfig";
import User from "@/models/userModel"; // Import the User model
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
const secret = process.env.JWT_SECRET;
connect();

export async function POST(request: NextResponse) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }

    // Check if password is valid
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // Create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

    const response = NextResponse.json({
      Message: "Login Successful",
      success: true,
    });
    
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    console.error("Server Error:", error); 
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
