import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

interface ImageProps {
  name: string;
  id: string;
  url: string;
}
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      {
        message: "You are not authenticated!",
      },
      { status: 401 }
    );
  }

  const body: ImageProps = await req.json();

  if (typeof body.name !== "string") {
    return NextResponse.json(
      {
        message: "name type must be a string",
      },
      { status: 400 }
    );
  }
  if (typeof body.id !== "string") {
    return NextResponse.json(
      {
        message: "id type must be a string",
      },
      { status: 400 }
    );
  }
  if (typeof body.url !== "string") {
    return NextResponse.json(
      {
        message: "url type must be a string",
      },
      { status: 400 }
    );
  }
  try {
    const replicate = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      body: JSON.stringify({
        version:
          "9283608cc6b7be6b65a8e44983db012355fde4132009bf99d976b2f0896856a3",
        //   "a01b0512004918ca55d02e554914a9eca63909fa83a29ff0f115c78a7045574f",
        input: { img: body.url, version: "v1.4", scale: 2 },
        // input: { image: body.url, task: "real_sr" },
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + process.env.REPLICATE_API_TOKEN,
      },
    });

    const jsonReplicateResponse = await replicate.json();
    const replicateUrl = jsonReplicateResponse.urls.get;
    let restoredImage: string | null = null;
    while (!restoredImage) {
      // Loop in 1s intervals until the alt text is ready
      console.log("waiting for result...");
      let finalResponse = await fetch(replicateUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + process.env.REPLICATE_API_TOKEN,
        },
      });
      let jsonFinalResponse = await finalResponse.json();

      if (jsonFinalResponse.status === "succeeded") {
        restoredImage = jsonFinalResponse.output;
      } else if (jsonFinalResponse.status === "failed") {
        return NextResponse.json(
          {
            message: "Failled to enhance the image",
          },
          { status: 400 }
        );
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    const createEnhance = await prisma.enhancement.create({
      data: {
        image: restoredImage,
        imageId: body.id,
        userId: session.user.id,
      },
    });

    if (createEnhance) {
      await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          remaining: {
            decrement: 1,
          },
        },
      });
    }

    return NextResponse.json(
      {
        result: restoredImage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Something went wrong!",
      },
      { status: 500 }
    );
  }
}
