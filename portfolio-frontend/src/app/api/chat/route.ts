import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { message, history } = await req.json();

  try {
    const res = await fetch('http://localhost:8000/chat/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
    });

    if (!res.ok) {
      throw new Error('FastAPI error');
    }

    const data = await res.json();
    return NextResponse.json({ reply: data.reply });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({
      reply: "I'm having trouble connecting right now. Please reach out to Rithik directly at rithiksharon.a@gmail.com"
    });
  }
}
