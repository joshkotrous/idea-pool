import { NextResponse, NextRequest } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Access the request body
    const message = body.message;
    console.log(message);
    const openai = new OpenAI({
      apiKey: process.env.OPEN_AI_API_KEY!,
    });
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content:
            "Generate three responses for this prompt. Don't number the lines in the output and separate each one by a new line character. This is how I will parse this request after it is received: " +
            message,
        },
      ],
    });
    return NextResponse.json(chatCompletion);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
