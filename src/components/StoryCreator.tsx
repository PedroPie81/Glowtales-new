import React, { useState, useEffect } from "react";
import { StoryParameters, Story } from "../types";
import { 
  Sparkles, 
  Moon, 
  Baby, 
  Heart, 
  Layers, 
  ShieldAlert, 
  AlertCircle,
  HelpCircle,
  Bookmark,
  Hourglass
} from "lucide-react";

interface StoryCreatorProps {
  onStoryCreated: (story: Story) => void;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
}

const STARRY_LOADER_PHRASES = [
  "Gathering glittering stardust and moonbeams...",
  "Consulting the wise sleepy owl Conductor...",
  "Whispering calming rhythms to the velvet wind...",
  "Placing your child's favorite things inside the cozy cabin...",
  "Building a safe, trigger-free haven of starlight...",
  "Checking with the friendly bedtime animals...",
  "Drafting a cozy promise to help close sleepy eyes..."
];

export default function StoryCreator({ onStoryCreated, isLoading, setIsLoading }: StoryCreatorProps) {
  const [params, setParams] = useState<StoryParameters>({
    childName: "",
    childAge: 6,
    interests: "",
    style: "calming bedtime",
    triggers: "",
    triggerOption: "do_not_mention",
    length: "short"
  });

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [errorText, setErrorText] = useState<string | null>(null);

  // Cycle bedtime phrases during story generation to keep children/parents relaxed
  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % STARRY_LOADER_PHRASES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!params.childName.trim()) {
      setErrorText("Please write your child's cozy name so they can be the hero!");
      return;
    }
    setErrorText(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/generate-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to contact stardust engines.");
      }

      const rawStory = await response.json();
      
      // Construct final Story object with local identifiers and metadata
      const finalStory: Story = {
        id: `story-${Date.now()}`,
        title: rawStory.title || `${params.childName}'s Starry Adventure`,
        moral: rawStory.moral || "You are loved, exact and true.",
        pages: rawStory.pages || [],
        createdAt: new Date().toISOString(),
        parameters: params
      };

      onStoryCreated(finalStory);

    } catch (err: any) {
      console.error(err);
      setErrorText(err?.message || "Our stardust connection went quiet momentarily. Please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto rounded-3xl bg-slate-900/60 backdrop-blur-md border border-indigo-500/20 p-6 md:p-8 text-white relative z-10 shadow-2xl overflow-hidden">
      
      {/* Decorative Glow elements */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" />

      {/* Loading Bedtime Spinner Container */}
      {isLoading ? (
        <div id="story-creator-loader" className="flex flex-col items-center justify-center py-16 text-center inset-0 z-20">
          <div className="relative mb-8">
            {/* Spinning decorative orbit moons */}
            <div className="w-20 h-20 rounded-full border-4 border-indigo-900/40 border-t-amber-300 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center text-amber-300">
              <Moon className="w-8 h-8 fill-amber-300/30 animate-pulse" />
            </div>
          </div>
          
          <h2 className="text-xl font-bold font-serif text-indigo-200 mb-3 animate-pulse">
            Weaving Your Magical Storybook...
          </h2>
          
          <p className="text-sm font-medium text-slate-300 italic max-w-md bg-indigo-950/45 px-6 py-3 rounded-2xl border border-indigo-900/40 min-h-[64px] flex items-center justify-center">
            "{STARRY_LOADER_PHRASES[phraseIndex]}"
          </p>

          <span className="text-xs text-slate-500 mt-6 block font-mono">
            This takes about 20-30 seconds. Perfect time to snuggle close!
          </span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} id="story-creator-form" className="space-y-6">
          
          {/* Section Header */}
          <div className="border-b border-indigo-950 pb-4 mb-2">
            <h2 className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-105 to-amber-300 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300/20" />
              Configure Custom Storybook
            </h2>
            <p className="text-indigo-300 text-xs mt-1">
              Craft a cozy tale customized with your child's special interest and routine preferences.
            </p>
          </div>

          {errorText && (
            <div className="p-4 bg-rose-950/60 border border-rose-500/30 text-rose-250 text-xs rounded-2xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorText}</span>
            </div>
          )}

          {/* Form Body Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Child's name */}
            <div>
              <label htmlFor="childName" className="block text-xs uppercase tracking-wider font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                <Baby className="w-4 h-4 text-indigo-400" />
                Child's Name
              </label>
              <input
                type="text"
                id="childName"
                placeholder="e.g. Leo, Mia, Aaron"
                value={params.childName}
                onChange={(e) => setParams({ ...params, childName: e.target.value })}
                className="w-full bg-slate-950/60 border border-indigo-950/80 rounded-2xl px-4 py-3 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-all font-medium"
                required
              />
            </div>

            {/* Child's age slider */}
            <div>
              <label htmlFor="childAge" className="block text-xs uppercase tracking-wider font-bold text-slate-300 mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Bookmark className="w-4 h-4 text-indigo-400" />
                  Child's Age
                </span>
                <span className="text-amber-300 font-mono text-xs">{params.childAge} Years Old</span>
              </label>
              <input
                type="range"
                id="childAge"
                min="2"
                max="14"
                value={params.childAge}
                onChange={(e) => setParams({ ...params, childAge: parseInt(e.target.value) })}
                className="w-full accent-amber-300 h-2 bg-slate-950/60 rounded-xl cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>Toddler (2)</span>
                <span>Calming (8)</span>
                <span>Teen (14)</span>
              </div>
            </div>

            {/* Special Interests */}
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="interests" className="block text-xs uppercase tracking-wider font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-indigo-400 fill-indigo-455/10" />
                Special Interest or Intense Passion (Neural Bridge)
              </label>
              <input
                type="text"
                id="interests"
                placeholder="e.g., steam trains, ring-shaped solar systems, glowing forest snails"
                value={params.interests}
                onChange={(e) => setParams({ ...params, interests: e.target.value })}
                className="w-full bg-slate-950/60 border border-indigo-950/80 rounded-2xl px-4 py-3 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-all font-medium"
              />
              <span className="text-[11px] text-slate-400 mt-1 block leading-relaxed">
                By entering their hyperfixation, the AI gracefully integrates this topic as a central, comforting hero motif of the story, producing instant safety.
              </span>
            </div>

            {/* Story Style Selection */}
            <div>
              <label htmlFor="style" className="block text-xs uppercase tracking-wider font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                <Moon className="w-4 h-4 text-indigo-400 fill-indigo-540/10" />
                Story Style / Theme
              </label>
              <select
                id="style"
                value={params.style}
                onChange={(e) => setParams({ ...params, style: e.target.value })}
                className="w-full bg-slate-950/60 border border-indigo-950/80 rounded-2xl px-4 py-3 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition-all font-medium"
              >
                <option value="calming bedtime font-medium">Bedtime Calming Dream (Sleepy, soft atmosphere)</option>
                <option value="magical adventure">Magical interest adventure (Focused exploration)</option>
                <option value="gentle routine guide">Gentle daily routine guide (Step-by-step calming actions)</option>
                <option value="reassuring social story">Reassuring social story (Emotions, safe boundaries)</option>
                <option value="outer space adventure">Outer space stardust flight (Deep visualization)</option>
              </select>
            </div>

            {/* Story Word Length */}
            <div>
              <label htmlFor="length" className="block text-xs uppercase tracking-wider font-bold text-slate-300 mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  Story Length
                </span>
                <span className="text-indigo-300 font-mono text-xs uppercase font-semibold">
                  {params.length === "short" ? "~300 words" : params.length === "medium" ? "~600 words" : "~1000 words"}
                </span>
              </label>
              <select
                id="length"
                value={params.length}
                onChange={(e) => setParams({ ...params, length: e.target.value as "short" | "medium" | "long" })}
                className="w-full bg-slate-950/60 border border-indigo-950/80 rounded-2xl px-4 py-3 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition-all font-medium"
              >
                <option value="short">Short story (Great for quick reads - ~300 words)</option>
                <option value="medium">Medium story (Balanced bedtime read - ~600 words)</option>
                <option value="long">Long story (Full immersive journey - ~1000 words)</option>
              </select>
            </div>

            {/* Sensory Triggers Field */}
            <div className="col-span-1 md:col-span-2 border-t border-indigo-950/65 pt-4 mt-2">
              <label htmlFor="triggers" className="block text-xs uppercase tracking-wider font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                Sensitive Triggers or Intense Fears (Optional)
              </label>
              <input
                type="text"
                id="triggers"
                placeholder="e.g. spiders, sudden loud vacuum noises, Doctors with needles"
                value={params.triggers}
                onChange={(e) => setParams({ ...params, triggers: e.target.value })}
                className="w-full bg-slate-950/60 border border-indigo-950/80 rounded-2xl px-4 py-3 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-all font-medium"
              />
              <span className="text-[11px] text-slate-400 mt-1 block leading-relaxed">
                Parents, specify any concept your child finds frightening or overstimulating. 
              </span>
            </div>

            {/* Trigger Mode Option selectors */}
            <div className="col-span-1 md:col-span-2 bg-slate-950/50 p-4 rounded-2xl border border-indigo-950">
              <span className="block text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-2 relative">
                How should the story handle these triggers?
              </span>
              <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex-1 flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="triggerOption"
                    checked={params.triggerOption === "do_not_mention"}
                    onChange={() => setParams({ ...params, triggerOption: "do_not_mention" })}
                    className="mt-1 accent-indigo-500 focus:outline-none"
                  />
                  <div>
                    <span className="block text-xs font-bold text-slate-200">Full Safe Sanctuary Shield</span>
                    <span className="block text-[10px] text-slate-400 leading-normal">
                      The AI will strictly avoid any mention, hint, or imagery resembling these fears. Guaranteed sanctuary.
                    </span>
                  </div>
                </label>
                
                <label className="flex-1 flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="triggerOption"
                    checked={params.triggerOption === "gently_mention"}
                    onChange={() => setParams({ ...params, triggerOption: "gently_mention" })}
                    className="mt-1 accent-indigo-500 focus:outline-none"
                  />
                  <div>
                    <span className="block text-xs font-bold text-slate-200">Gently & Safely Empower</span>
                    <span className="block text-[10px] text-slate-400 leading-normal">
                      Weave the fear gently in a positive, therapeutic way. Characters show how to take slow, quiet breaths to overcome it.
                    </span>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Form Create Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              id="draft-story-btn"
              disabled={isLoading}
              className="px-8 py-4 bg-gradient-to-r from-amber-250 via-yellow-300 to-amber-400 text-slate-950 font-bold tracking-wider text-xs rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all uppercase flex items-center justify-center gap-2 mx-auto"
            >
              <Sparkles className="w-4 h-4 fill-slate-950 animate-pulse" />
              Weave Starry Tale storybook
            </button>
          </div>

        </form>
      )}

    </div>
  );
}
