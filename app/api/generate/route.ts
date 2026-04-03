import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const { sport, injuryHistory, currentComplaints, trainingIntensity, recoveryTime, physicalTherapy, equipment, ageCategory } = await req.json();

    if (!sport) {
      return NextResponse.json({ error: "Sport is required." }, { status: 400 });
    }

    const openai = new OpenAI({
      apiKey: process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY,
      baseURL: "https://api.deepseek.com/v1",
    });

    const systemPrompt = "You are an expert sports physical therapist and injury prevention specialist with deep knowledge of biomechanics, load management, return-to-play protocols, and sport-specific rehabilitation.";

    const userPrompt = `Create a comprehensive sport-specific injury prevention and rehabilitation plan based on:

- **Sport**: ${sport}
- **Injury History**: ${injuryHistory || "None reported"}
- **Current Complaints**: ${currentComplaints || "None"}
- **Training Intensity**: ${trainingIntensity || "Not specified"}
- **Recovery Time Available**: ${recoveryTime || "Not specified"}
- **Access to Physical Therapy**: ${physicalTherapy || "Not specified"}
- **Equipment Available**: ${equipment || "Not specified"}
- **Age Category**: ${ageCategory || "Adult"}

Please provide:

1. **Injury Risk Assessment** — Identify the most common and likely injuries for ${sport} at ${ageCategory || "adult"} level based on training intensity and injury history.
2. **Prehab Exercises** — Specific prehabilitation exercises targeting the highest-risk areas for ${sport}. Include sets, reps, hold times, and frequency.
3. **Mobility Protocol** — A structured mobility routine with specific stretches and joint mobility work for areas most vulnerable in ${sport}.
4. **Strengthening Plan** — Corrective and strengthening exercises to address current complaints: ${currentComplaints || "None"} and build resilience against prior injuries: ${injuryHistory || "None"}.
5. **Recovery Timeline** — Estimated timelines for returning to full training if currently injured, with phased progression stages.
6. **Return-to-Play Criteria** — Specific criteria that must be met before returning to full ${sport} participation (e.g., range of motion benchmarks, strength tests, functional movement screens).
7. **Warning Signs to Monitor** — Red flag symptoms that require immediate cessation of activity and medical evaluation vs. normal training soreness.
8. **Prevention Education** — Key principles the athlete should understand about load management, recovery, and injury prevention in ${sport}.
9. **Equipment & PT Modifications** — How to utilize available equipment (${equipment || "Not specified"}) and physical therapy access (${physicalTherapy || "Not specified"}) optimally.

Use specific exercise names, sets/reps, and timelines. Be clear about red flags vs. green lights.`;

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
    console.error("API error:", error?.message || error);
    return NextResponse.json({ error: "Failed to generate plan. Please try again." }, { status: 500 });
  }
}
