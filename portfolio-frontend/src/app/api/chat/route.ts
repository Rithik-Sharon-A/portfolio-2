import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  await req.json();

  const reply =
    "Thanks for your question! Rithik Sharon A is a Full Stack Developer from Chennai specializing in the MERN stack, RESTful APIs, and AI integration. He has built projects like a MERN Movie Management Dashboard and an Agentic AI Digital Twin. Feel free to check out his work or contact him at rithiksharon.a@gmail.com";

  return NextResponse.json({ reply });
}
