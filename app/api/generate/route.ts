import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const { sport, trainingVolume, niggles, history, goals } = await req.json();

    if (!sport) {
      return NextResponse.json({ error: "Sport is required." }, { status: 400 });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: "https://api.deepseek.com/v1",
    });

    const systemPrompt = "You are an expert sports physical therapist and injury prevention specialist. Provide detailed, evidence-based injury prevention and recovery plans.";

    const userPrompt = `Create a comprehensive sports injury prevention and recovery plan based on:

- Primary Sport / Activity: ${sport}
- Weekly Training Volume: ${trainingVolume || "Not specified"}
- Current Niggles or Areas of Concern: ${niggles || "None reported"}
- Injury History: ${history || "Not specified"}
- Training Goals: ${goals || "Not specified"}

Please provide:

1. **Injury Risk Assessment** — Identify the most common and likely injuries for ${sport} based on the described training volume and any niggles or history mentioned.
2. **Mobility & Flexibility Routine** — Specific mobility exercises targeting the most at-risk areas for ${sport} athletes. Include hold times, frequency, and progression.
3. **Strengthening Exercises** — Corrective and prehab exercises to build resilience in commonly weak/vulnerable areas for this sport.
4. **Load Management Guidelines** — How to structure weekly and monthly training volume (e.g., 10% rule, deload weeks) to avoid overuse injuries.
5. **Recovery Protocols** — Post-session recovery strategies including cool-down, sleep recommendations, and active recovery.
6. **Niggle Management** — Guidance on how to assess and respond to the specific niggles mentioned: ${niggles || "None"}.
7. **Return-to-Play Protocol** — If any prior injuries mentioned: ${history}, outline a safe return-to-sport progression.
8. **Red Flags** — Warning signs that require immediate medical attention vs. manageable soreness.

Format with clear sections and bullet points. Be specific about exercises, sets, and protocols.`;

    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 3000,
    });

    const output = completion.choices[0]?.message?.content || "No response generated.";

    return NextResponse.json({ output });
  } catch (error: any) {
    console.error("DeepSeek API error:", error?.message || error);
    return NextResponse.json(
      { error: "Failed to generate injury prevention plan. Please try again." },
      { status: 500 }
    );
  }
}
