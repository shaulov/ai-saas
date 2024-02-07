import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import GigaChat from "gigachat-node";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const apiKey = process.env.GIGACHAT_CLIENT_ID_SECRET || '';
const client = new GigaChat(
  apiKey,
  true,
  true,
  true
);
const instructionMessage = {
  role: "system",
  content: "Ты генератор кода. Ты должен отвечать только с помощью снипетов кода. Используй комментарии кода для объяснения.",
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

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired", { status: 403 });
    }

    await client.createToken();

    const response = await await client.completion({
      model: "GigaChat:latest",
      messages: [instructionMessage, ...messages],
    });

    if (!isPro) await increaseApiLimit();
    
    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
