import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = registerSchema.parse(body);

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    return NextResponse.json({
      success: true,
      uid: userCredential.user.uid,
      email: userCredential.user.email,
    });
  } catch (err: any) {
    console.error("Registration error:", err);
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: err.errors[0].message },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { success: false, error: err.message || "Failed to register" },
      { status: 400 },
    );
  }
}
