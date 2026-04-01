import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { accessToken, refreshToken } = body;

    if (!accessToken || !refreshToken) {
      return NextResponse.json(
        { error: "Missing tokens" },
        { status: 400 }
      );
    }

    // Calculate cookie expiration (7 days)
    const maxAge = 7 * 24 * 60 * 60;

    const response = NextResponse.json(
      { success: true },
      { status: 200 }
    );

    // Set cookies with HTTP-only flag for security
    // These will be sent to middleware on subsequent requests
    response.cookies.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge,
      path: "/",
    });

    response.cookies.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error setting cookies:", error);
    return NextResponse.json(
      { error: "Failed to set cookies" },
      { status: 500 }
    );
  }
}
