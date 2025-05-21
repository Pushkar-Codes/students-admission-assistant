import { connectDB } from "@/lib/db";
import Student from "@/models/StudentRegister";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      gender,
      schoolname,
      currentclass,
      phone,
      havewhatsapp,
      parentphone,
      parentwhatsapp,
    } = body;

    await connectDB();

    const existing = await Student.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { message: "You're already registered" },
        { status: 400 }
      );
    }

    const newStudent = await Student.create({
      name,
      email,
      gender,
      schoolname,
      currentclass,
      phone,
      havewhatsapp,
      parentphone,
      parentwhatsapp,
    });

    return NextResponse.json(
      {
        message: "Student registered successfully",
        student: newStudent,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Something went wrong --Internal error" }),
      { status: 500 }
    );
  }
}
