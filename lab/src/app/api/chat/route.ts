import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { reply: "Invalid request format." },
        { status: 400 }
      );
    }

    const messages = body.messages;

    // Gemini 2.5 (Free tier safe + Powerful)
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an AI Programming Teacher.

Rules:
- Explain simply.
- Give hints, not full code.
- Help debugging.
- Short student-friendly replies.

Conversation:
${messages.map((m: any) => `${m.role}: ${m.text}`).join("\n")}
`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("AI ERROR:", error);
    return NextResponse.json(
      { reply: "AI service is temporarily unavailable." },
      { status: 500 }
    );
  }
}
