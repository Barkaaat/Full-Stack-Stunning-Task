import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize the client pointing to Groq's servers
const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
  try {
    const { idea } = await req.json();

    if (!idea) {
      return NextResponse.json({ error: "Idea is required" }, { status: 400 });
    }

    const completion = await client.chat.completions.create({
      // UPDATED MODEL: Replaced deprecated model with the latest stable version
      model: "llama-3.3-70b-versatile", 
      messages: [
        {
          role: "system",
          content: `You are an expert Senior Product Designer.
          User will give you a rough website idea. You must convert it into a structured Project Brief.
          
          Output Format (Markdown):
          ## 🚀 Project Brief: [Project Name]
          
          ### 1. Core Concept
          [Refined value proposition]
          
          ### 2. Visual Direction (The Vibe)
          - **Palette:** [Specific Hex Colors]
          - **Typography:** [Font pairings]
          - **Mood:** [Adjectives]
          
          ### 3. Key Components
          - [ ] [Feature 1]
          - [ ] [Feature 2]
          
          ### 4. Technical Stack
          - [Frameworks/Libraries]
          
          Do not include conversational filler. Just the Markdown.`
        },
        {
          role: "user",
          content: idea
        }
      ],
      temperature: 0.7,
      max_tokens: 1024,
    });

    const improvedIdea = completion.choices[0]?.message?.content || "Failed to generate.";

    return NextResponse.json({ enhanced: improvedIdea });

  } catch (error) {
    console.error("Groq API Error:", error);
    return NextResponse.json(
      { error: "Failed to process request" }, 
      { status: 500 }
    );
  }
}