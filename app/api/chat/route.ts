import OpenAI from 'openai';
import { NextResponse } from 'next/server';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages must be an array' }, { status: 400 });
    }

    const response = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: messages
    });

    const outputText = response.choices[0]?.message?.content;

    if (!outputText) {
      return NextResponse.json({ error: 'No response from OpenAI' }, { status: 500 });
    }

    return NextResponse.json({ output: outputText });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
