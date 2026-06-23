import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function test() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY not found.");
    return;
  }

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      }
    }
  });

  const finalName = "Leo";
  const finalAge = 6;
  const interests = "trains";
  const style = "calming bedtime";
  const length = "short";
  const wordCount = 300;
  const triggerInstruction = "";

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

  console.log("Sending structured story requests to gemini-3.5-flash...");
  const startTime = Date.now();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["title", "moral", "pages"],
          properties: {
            title: { type: Type.STRING },
            moral: { type: Type.STRING },
            pages: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["pageNumber", "text", "illustrationPrompt"],
                properties: {
                  pageNumber: { type: Type.INTEGER },
                  text: { type: Type.STRING },
                  illustrationPrompt: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });

    console.log(`COMPLETED in ${(Date.now() - startTime) / 1000}s!`);
    console.log("RESULT text:", response.text);
  } catch (error) {
    console.error("ERROR during story request:", error);
  }
}

test();
