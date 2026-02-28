import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { registerSchema } from "@/lib/validations/auth";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = registerSchema.parse(body);

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      validatedData.email,
      validatedData.password,
    );

    return NextResponse.json({
      success: true,
      data: {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      },
    });
  } catch (error: any) {
    console.error("Registration Error:", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: error.errors.map((e: any) => ({
            path: e.path.join("."),
            message: e.message,
          })),
        },
        { status: 400 },
      );
    }

    // Firebase Error Mapping
    let errorMessage = "Failed to create account";
    let statusCode = 400;

    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage = "This email is already registered";
        break;
      case "auth/invalid-email":
        errorMessage = "Invalid email address";
        break;
      case "auth/operation-not-allowed":
        errorMessage = "Email/password registration is not enabled";
        statusCode = 403;
        break;
      case "auth/weak-password":
        errorMessage = "The password is too weak";
        break;
      default:
        errorMessage = error.message || "An unexpected error occurred";
    }

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: statusCode },
    );
  }
}
