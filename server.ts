import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

async function startServer() {
  const app = express();
  // Port 3000 is the ONLY externally accessible port in AI Studio's environment.
  // The reverse proxy maps external traffic exclusively to port 3000.
  const PORT = 3000;

  app.use(express.json());

  // Logging middleware for diagnostic troubleshooting
  app.use((req, res, next) => {
    console.log(`[Diagnostic Log] ${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  // Diagnostic GET endpoint to verify routing health
  app.get("/api/generate-story", (req, res) => {
    res.json({
      status: "active",
      message: "The stardust story composer endpoint is healthy and ready to receive POST requests.",
      timestamp: new Date().toISOString()
    });
  });

  app.post("/api/generate-story", async (req, res) => {
    try {
      const currentApiKey = process.env.GEMINI_API_KEY;
      if (!currentApiKey) {
        return res.status(500).json({
          error: "Gemini API key is not configured. Please add your GEMINI_API_KEY in the Secrets panel."
        });
      }

      const { name, childName, age, childAge, interests, style, triggers, triggerOption, length } = req.body;

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

      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
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

      const textOutput = response.text;
      if (!textOutput) {
        throw new Error("Empty text returned from generative model.");
      }

      const parsedData = JSON.parse(textOutput.trim());
      res.json(parsedData);

    } catch (error: any) {
      console.error("Story generation failed:", error);
      res.status(500).json({ error: error?.message || "Something went wrong while composing your magical story." });
    }
  });

  // Serve static UI assets and wire up server
  const isCjs = typeof __filename !== "undefined";
  let isProduction = process.env.NODE_ENV === "production" || (isCjs && __filename.endsWith(".cjs")) || !fs.existsSync(path.join(process.cwd(), "server.ts"));
  
  if (!isProduction) {
    try {
      const { createServer } = await import("vite");
      const vite = await createServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
      console.log("Vite dev middleware mounted successfully.");
    } catch (viteError) {
      console.warn("Could not load Vite dev server middleware, falling back to static production serving:", viteError);
      isProduction = true;
    }
  }

  if (isProduction) {
    let distPath = path.join(process.cwd(), "dist");
    
    if (typeof __dirname !== "undefined") {
      if (fs.existsSync(path.join(__dirname, "index.html"))) {
        distPath = __dirname;
      } else if (fs.existsSync(path.join(__dirname, "dist", "index.html"))) {
        distPath = path.join(__dirname, "dist");
      }
    }
    
    console.log(`Production mode: serving static files from ${distPath}`);
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
