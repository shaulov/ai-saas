import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import GigaChat from "gigachat-node";

const apiKey = process.env.GIGACHAT_CLIENT_ID_SECRET || '';
const client = new GigaChat(
  apiKey,
  true,
  true,
  true
);
const instructionMessage = {
  role: "system",
  content: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.",
}

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthoriazed", { status: 401 });
    }

    if (!apiKey) {
      return new NextResponse("API Key not configured", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    await client.createToken();

    const response = await await client.completion({
      model: "GigaChat:latest",
      messages: [instructionMessage, ...messages],
    });
    
    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
