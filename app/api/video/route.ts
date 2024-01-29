import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import Replicate from "replicate";

const apiKey = process.env.REPLICATE_API_TOKEN || '';
const replicate = new Replicate({
  auth: apiKey,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthoriazed", { status: 401 });
    }

    if (!apiKey) {
      return new NextResponse("API Key not configured", { status: 500 });
    }

    if (!prompt) {
      return new NextResponse("Music prompt are required", { status: 400 });
    }

    const output = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt,
        }
      }
    );
    
    return NextResponse.json(output);
  } catch (error) {
    console.log("[VIDEO_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
