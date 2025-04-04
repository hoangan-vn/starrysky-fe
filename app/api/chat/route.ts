import OpenAI from 'openai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const client = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY']
  });
  const { messages } = await req.json();

  const response = await client.responses.create({
    model: 'gpt-4o',
    input: messages
  });

  return response.output_text;
}
