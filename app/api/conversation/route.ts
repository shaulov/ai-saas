import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import Replicate from "replicate";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";

const apiKey = process.env.REPLICATE_API_TOKEN || '';
const replicate = new Replicate({
  auth: apiKey,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { message } = body;

    if (!userId) {
      return new NextResponse("Unauthoriazed", { status: 401 });
    }

    if (!apiKey) {
      return new NextResponse("API Key not configured", { status: 500 });
    }

    if (!message) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();

    if (!freeTrial) return new NextResponse("Free trial has expired", { status: 403 });

    const output = await replicate.run(
      "sharaddition/paraphrase-gpt:3a66bc6c1327de5459cb18b2f10550693bc69662a5e29c67a971776f8574f1b1",
      {
        input: {
          prompt: message,
        },
      }
    );

    await increaseApiLimit();
    
    return NextResponse.json(output);
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
