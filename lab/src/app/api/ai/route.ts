import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
function cleanCode(text: string) {
  if (!text) return "";

  let t = text.trim();

  // Remove markdown fences but keep content
  t = t.replace(/^```[a-z]*\n?/i, "").replace(/```$/i, "");

  // Remove leading language words only if they are ALONE on a line
  t = t.replace(/^\s*(java|javascript|python|c\+\+|cpp|c|php|js)\s*\n/i, "");

  return t.trim();
}

export async function POST(req: NextRequest) {
  try {
    const { language, code } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are a programming SYNTAX CORRECTOR.

Rules:
- Fix ONLY syntax errors.
- Do NOT complete logic.
- Do NOT add new features.
-Do NOT send language of code
- Do NOT rewrite code.
- Keep code structure same.

Language: ${language}

Code:
${code}

Return ONLY corrected code. No explanation.
`;

    const result = await model.generateContent(prompt);
    const raw = result.response.text();

    const fixedCode = cleanCode(raw);

    return NextResponse.json({ code: fixedCode });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
