import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

export default async function handler(req: any, res: any) {
  // Support both GET (for diagnostics) and POST (for generation)
  if (req.method === "GET") {
    const envKeys = Object.keys(process.env);
    return res.json({
      status: "active",
      message: "The stardust story composer endpoint is healthy and ready to receive POST requests.",
      timestamp: new Date().toISOString(),
      debugInfo: {
        envKeys: envKeys,
        hasGeminiKey: envKeys.some(k => k.toUpperCase() === "GEMINI_API_KEY"),
        nodeEnv: process.env.NODE_ENV,
        cwd: process.cwd(),
        hasEnvFile: fs.existsSync(path.join(process.cwd(), ".env"))
      }
    });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const envKeys = Object.keys(process.env);
    console.log("[Diagnostic Keys] Available environment variables:", envKeys);
    
    // In some environments, the key might be in lowercase or have space prefixes
    let currentApiKey = process.env.GEMINI_API_KEY;
    if (!currentApiKey) {
      // Let's do a case-insensitive lookup
      const foundKey = envKeys.find(k => k.toUpperCase() === "GEMINI_API_KEY");
      if (foundKey) {
        currentApiKey = process.env[foundKey];
        console.log(`[Diagnostic] Found Gemini API Key via case-insensitive match: ${foundKey}`);
      }
    }

    if (!currentApiKey) {
      return res.status(500).json({
        error: "Gemini API key is not configured. Please add your GEMINI_API_KEY in the Secrets panel.",
        debugInfo: {
          envKeys: envKeys,
          hasEnvFile: fs.existsSync(path.join(process.cwd(), ".env")),
          nodeEnv: process.env.NODE_ENV,
          cwd: process.cwd()
        }
      });
    }

    const { name, childName, age, childAge, interests, style, triggers, triggerOption, length } = req.body || {};

    const finalName = name || childName;
    const finalAge = age || childAge;

    // Validate inputs
    if (!finalName || !finalAge) {
      return res.status(400).json({ error: "Name and age are required parameters." });
    }

    const ai = new GoogleGenAI({
      apiKey: currentApiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        }
      }
    });

    // Options of short, medium and long stories of 1000 words are required.
    // short: ~300 words, medium: ~600 words, long: ~1050 words
    let wordCount = 300;
    if (length === "medium") {
      wordCount = 600;
    } else if (length === "long") {
      wordCount = 1000;
    }

    // Special triggers handling instructions for neurodiversity
    let triggerInstruction = "";
    if (triggers && triggers.trim() !== "") {
      if (triggerOption === "gently_mention") {
        triggerInstruction = `The child has a special trigger/sensitivity or fear of: "${triggers}". Please GENTLY and supportively mention this trigger in the story in a very reassuring, non-threatening, and empowering scenario. Show characters modeling calming, positive coping techniques (like breathing, holding a safe toy, or talking with a friend) to help rewrite their fearful association into a peaceful, secure one. Keep it highly therapeutic and optional.`;
      } else {
        triggerInstruction = `CRITICAL DE-ESCALATION REQUIREMENT: The child has a trigger or fear of: "${triggers}". You MUST NOT mention, reference, or imply this concept ("${triggers}") anywhere in the story. Ensure a completely safe, positive space free from anything associated with "${triggers}".`;
      }
    }

    const prompt = `Write a personalized, sensory-friendly, comforting digital storybook content for a child named ${finalName}, who is ${finalAge} years old.
Child's Special Interests to weave into the theme: "${interests || "stars, soft clouds, and cozy lights"}".
Story Style/Tone: "${style || "calming bedtime"}".
Total Length Requirement: This should be a ${length || "short"} story of approximately ${wordCount} words.

${triggerInstruction}

Story Structure and Guidance for Neurodiverse Children (such as Autism, ADHD, sensory sensitivities):
1. Keep the language comforting, rhythmic, reassuring, and highly literal (avoiding scary or confusing figurative metaphors).
2. Segment the story into exactly 5 or 6 page panels (pages). This makes it highly digestible page-by-page.
3. Distribute the total ${wordCount} words evenly across all page panels. (A short story gets ~50 words per page, medium ~100, long ~160-200. Ensure the total story is exactly around the ${wordCount} word requested).
4. Integrate the child's special interest ("${interests}") as a comforting element in the story (e.g., as a helper, a magical companion, or a special skill they use).
5. Ensure a super warm, soothing resolution (a sense of quiet accomplishment or peaceful sleepy bedtime rest).

Provide the output strictly in the following JSON format:
{
  "title": "A wonderful title tailored to their special interest",
  "moral": "A beautiful concluding peaceful thought or comforting bedtime reminder",
  "pages": [
    {
      "pageNumber": 1,
      "text": "The beautifully structured reassuring story text for this page panel.",
      "illustrationPrompt": "A highly detailed, gorgeous watercolor prompt for this frame (e.g., 'A cozy sleeping child on a soft moon cloud, cute watercolor painting, children illustration, pastel shades, starry sky background')"
    }
  ]
}`;

    console.log(`Requesting story generation for ${finalName} (${finalAge}yo), interests: ${interests}, style: ${style}, length: ${length} (${wordCount} words)`);

    const modelsToTry = ["gemini-3.5-flash", "gemini-3.1-flash-lite"];
    let responseText = "";
    let lastError: any = null;

    for (const currentModel of modelsToTry) {
      console.log(`[Story generation] Attempting with model: ${currentModel}`);
      let delay = 1000;
      const maxRetries = 2; // 2 retries per model
      
      for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
        try {
          const response = await ai.models.generateContent({
            model: currentModel,
            contents: prompt,
            config: {
              responseMimeType: "application/json",
              responseSchema: {
                type: "OBJECT",
                required: ["title", "moral", "pages"],
                properties: {
                  title: { type: "STRING" },
                  moral: { type: "STRING" },
                  pages: {
                    type: "ARRAY",
                    items: {
                      type: "OBJECT",
                      required: ["pageNumber", "text", "illustrationPrompt"],
                      properties: {
                        pageNumber: { type: "INTEGER" },
                        text: { type: "STRING" },
                        illustrationPrompt: { type: "STRING" }
                      }
                    }
                  }
                }
              }
            }
          });

          if (response.text) {
            responseText = response.text;
            console.log(`[Story generation] Successfully generated story using model: ${currentModel}`);
            break; // Successful! Escape the retry loop
          }
        } catch (error: any) {
          lastError = error;
          console.warn(`[Story generation] Model ${currentModel} - Attempt ${attempt} failed:`, error?.message || error);
          
          const isTransient = error?.message?.includes("503") || 
                              error?.status === "UNAVAILABLE" || 
                              JSON.stringify(error)?.includes("503") ||
                              JSON.stringify(error)?.includes("UNAVAILABLE") ||
                              error?.message?.includes("high demand") ||
                              error?.message?.includes("temporary");
          
          if (isTransient && attempt <= maxRetries) {
            console.log(`[Story generation] Transient error. Retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            delay *= 1.5;
          } else {
            break; // Break the retry loop to try the fallback model or bubble up
          }
        }
      }

      if (responseText) {
        break; // Successfully got response from a model! Escape the model loop
      }
    }

    if (!responseText) {
      throw lastError || new Error("Failed to generate story after trying multiple models and retries. Please wait a brief moment and try again.");
    }

    const parsedData = JSON.parse(responseText.trim());
    return res.json(parsedData);

  } catch (error: any) {
    console.error("Story generation failed:", error);
    return res.status(500).json({ error: error?.message || "Something went wrong while composing your magical story." });
  }
}
