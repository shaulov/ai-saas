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
    const { prompt, amount = 1, resolution = "512x512" } = body;

    if (!userId) {
      return new NextResponse("Unauthoriazed", { status: 401 });
    }

    if (!apiKey) {
      return new NextResponse("API Key not configured", { status: 500 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }
    if (!amount) {
      return new NextResponse("Amount is required", { status: 400 });
    }
    if (!resolution) {
      return new NextResponse("Resolution is required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();

    if (!freeTrial) return new NextResponse("Free trial has expired", { status: 403 });

    const output = await replicate.run(
      "ai-forever/kandinsky-2.2:ea1addaab376f4dc227f5368bbd8eff901820fd1cc14ed8cad63b29249e9d463",
      {
        input: {
          prompt: `${prompt}, ${resolution}`,
          width: Number(resolution.split('x')[0]),
          height: Number(resolution.split('x')[1]),
          num_outputs: Number(amount),
        },
      },
    );

    await increaseApiLimit();
    
    return NextResponse.json(output);
  } catch (error) {
    console.log("[IMAGE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
