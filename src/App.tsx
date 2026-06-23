import React, { useState, useEffect } from "react";
import { Story } from "./types";
import { SAMPLE_STORIES } from "./data";
import StarryBackground from "./components/StarryBackground";
import StoryReader from "./components/StoryReader";
import StoryCreator from "./components/StoryCreator";
import AboutUs from "./components/AboutUs";
import WhyUs from "./components/WhyUs";
import AboutAuthor from "./components/AboutAuthor";
import { 
  Sparkles, 
  Moon, 
  BookOpen, 
  HelpCircle, 
  ShieldCheck, 
  User, 
  Trash2, 
  Search, 
  Heart,
  Calendar,
  Compass,
  Star,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [currentHash, setCurrentHash] = useState<string>(() => {
    return window.location.hash || "#/";
  });

  const [savedStories, setSavedStories] = useState<Story[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("starry_stories");
        return stored ? JSON.parse(stored) : [];
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Sub-navigation listener for unique client-side URLs
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || "#/";
      setCurrentHash(hash);
      
      // If we change navigation tabs, exit active reading mode
      setActiveStory(null);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Update Page Metadata dynamically for genuine SEO compliance
  useEffect(() => {
    let title = "Autistic Children's Sensory Bedtime AI Storybook Creator | Glowtales";
    let desc = "A 100% free personalized storybook maker for neurodiverse kids. Weave autism special interests, ADHD routines, and safe triggers into cozy bedtime stories!";

    switch (currentHash) {
      case "#/":
        title = "Free Personalized AI Bedtime Stories for Autism & ADHD Kids | Glowtales";
        desc = "Personalize storybooks with your child's name, age, and special interests. Includes calming bedtimes and routines.";
        break;
      case "#/create":
        title = "Create a Sensory-Friendly Bedtime Story Online | Glowtales Constructor";
        desc = "Tailor custom 1000-word children books with hyperfixated passions. Optional trigger protection or peaceful desensitization.";
        break;
      case "#/about-us":
        title = "Autism-Affirming Therapeutic Bedtime Stories Mission | Glowtales About";
        desc = "How integrating high-passion interests and comforting routine anchors helps neurodiverse kids regulate and calm down.";
        break;
      case "#/why-us":
        title = "100% Free Children Books - No Sign Up, Private Storage | Glowtales Why Us";
        desc = "Completely free stories forever. No payment walls, no spam, and secure offline-first local browser persistence.";
        break;
      case "#/author":
        title = "Designed by Peter: A Father's Love for Neurodiverse Kids | Writer Story";
        desc = "Meet Peter, autistic dad of two incredible boys. Dedicating a safe place for family stories that avoid confusing language.";
        break;
    }

    document.title = title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", desc);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = desc;
      document.head.appendChild(meta);
    }
  }, [currentHash]);

  const handleStoryCreated = (newStory: Story) => {
    const updated = [newStory, ...savedStories];
    setSavedStories(updated);
    try {
      localStorage.setItem("starry_stories", JSON.stringify(updated));
    } catch (e) {
      console.error("Local storage save failed:", e);
    }

    // Instantly launch into cozy reading mode!
    setActiveStory(newStory);
  };

  const handleDeleteStory = (storyId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const confirmed = window.confirm("Would you like to remove this storybook from your local bookshelf?");
    if (!confirmed) return;

    const updated = savedStories.filter((s) => s.id !== storyId);
    setSavedStories(updated);
    try {
      localStorage.setItem("starry_stories", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  // Merge precomposed sample stories and user's custom created entries
  const allStories = [...savedStories, ...SAMPLE_STORIES];

  // Search/Filter matching child name or interests
  const filteredStories = allStories.filter((st) => {
    const query = searchQuery.toLowerCase();
    return (
      st.title.toLowerCase().includes(query) ||
      st.parameters.childName.toLowerCase().includes(query) ||
      st.parameters.interests.toLowerCase().includes(query) ||
      st.parameters.style.toLowerCase().includes(query)
    );
  });

  // Simple programmatic navigater
  const navigateTo = (hash: string) => {
    window.location.hash = hash;
  };

  return (
    <div className="min-h-screen text-slate-100 flex flex-col items-center justify-between font-sans selection:bg-indigo-500/30 selection:text-white relative bg-[#060919] overflow-x-hidden">
      
      {/* Calm Starry Sky canvas */}
      <StarryBackground />

      {/* Primary Glowing Header Nav bar */}
      <header className="w-full bg-slate-950/70 border-b border-indigo-500/10 backdrop-blur-md sticky top-0 z-50 transition-all select-none py-3">
        <div id="nav-container" className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col items-center gap-3">
          
          {/* Logo Branding */}
          <a
            href="#/"
            className="flex items-center gap-2 group hover:opacity-95 transition-all"
            id="brand-logo"
          >
            <div>
              <span className="text-xl md:text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-250 via-yellow-101 to-amber-305">
                Glowtales
              </span>
            </div>
          </a>

          {/* Desktop & Mobile responsive links - Fully justified left-to-right */}
          <nav className="flex items-center justify-between w-full text-xs md:text-sm gap-1 md:gap-4 select-none" id="main-navigation">
            <a
              href="#/"
              id="nav-home-link"
              className={`px-3 md:px-4 py-2 rounded-xl font-semibold transform hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 ${
                currentHash === "#/" || currentHash === ""
                  ? "bg-indigo-600/20 text-indigo-200 border border-indigo-500/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Bookshelf
            </a>
            
            <a
              href="#/create"
              id="nav-create-link"
              className={`px-3 md:px-4 py-2 rounded-xl font-bold transform hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 flex items-center gap-1.5 ${
                currentHash === "#/create"
                  ? "bg-amber-300 text-slate-950 shadow-md"
                  : "bg-indigo-950/40 text-slate-355 hover:bg-slate-800/80 hover:text-white border border-indigo-900/30"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              Create Story
            </a>

            <a
              href="#/about-us"
              id="nav-about-link"
              className={`px-2.5 md:px-3.5 py-2 rounded-xl font-semibold transform hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 ${
                currentHash === "#/about-us"
                  ? "bg-indigo-600/20 text-indigo-200 border border-indigo-500/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              About Mission
            </a>

            <a
              href="#/why-us"
              id="nav-why-link"
              className={`px-2.5 md:px-3.5 py-2 rounded-xl font-semibold transform hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 ${
                currentHash === "#/why-us"
                  ? "bg-indigo-600/20 text-indigo-200 border border-indigo-500/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Why Free
            </a>

            <a
              href="#/author"
              id="nav-author-link"
              className={`px-2.5 md:px-3.5 py-2 rounded-xl font-semibold transform hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 ${
                currentHash === "#/author"
                  ? "bg-indigo-600/20 text-indigo-200 border border-indigo-500/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Our Author
            </a>
          </nav>

        </div>
      </header>

      {/* Main Core Router Workspace */}
      <main id="main-workspace" className="flex-grow w-full max-w-6xl px-4 md:px-6 py-8 flex flex-col justify-center relative z-10">
        
        {/* If Story Reader is ACTIVE, we override rendering on that container instantly */}
        {activeStory ? (
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <StoryReader 
                story={activeStory} 
                onBack={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setActiveStory(null);
                }} 
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          <div id="views-parent">
            
            {/* HOME / BOOKSHELF VIEW */}
            {(currentHash === "#/" || currentHash === "") && (
              <div id="home-view" className="space-y-8">
                
                {/* Cozy Moon and Silver Clouds Header Accent */}
                <div className="w-full flex justify-center items-center gap-12 py-2 relative select-none">
                  {/* Left Silver Cloud */}
                  <motion.div 
                    animate={{ x: [-8, 8, -8], y: [-2, 2, -2] }} 
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="hidden md:flex items-center opacity-60"
                  >
                    <svg className="w-20 h-10 text-slate-300/70 filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)]" fill="currentColor" viewBox="0 0 100 50">
                      <path d="M20 40a15 15 0 0 1 1-29.9 18 18 0 0 1 33.7-4.1 15 15 0 0 1 25.3 12 15 15 0 0 1 5 22h-65z" />
                    </svg>
                  </motion.div>

                  {/* Cozy Glowy Moon in center */}
                  <motion.div 
                    animate={{ y: [-4, 4, -4], rotate: [-1, 1, -1] }} 
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="relative flex items-center justify-center"
                  >
                    {/* Soft ambient golden glow */}
                    <div className="absolute w-24 h-24 bg-amber-300/20 rounded-full blur-2xl animate-pulse" />
                    {/* Crescent Moon */}
                    <svg className="w-20 h-20 text-yellow-250 fill-yellow-200 filter drop-shadow-[0_0_15px_rgba(251,191,36,0.45)]" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.5">
                      <path d="M12.3 22H12c-5.5 0-10-4.5-10-10S6.5 2 12 2c.8 0 1.6.1 2.4.3-.7.7-1.1 1.6-1.1 2.7 0 2.2 1.8 4 4 4 1.1 0 2-.4 2.7-1.1.2.8.3 1.6.3 2.4 0 5.5-4.5 10-10 10z" />
                    </svg>
                    {/* Animated Cozy Zzzs */}
                    <motion.span 
                      animate={{ y: [-5, -20], x: [0, 5], opacity: [0, 1, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 0 }}
                      className="absolute top-2 right-1 text-yellow-300 font-bold text-xs select-none font-serif"
                    >
                      z
                    </motion.span>
                    <motion.span 
                      animate={{ y: [-5, -25], x: [0, 8], opacity: [0, 1, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 1.5 }}
                      className="absolute top-0 -right-2 text-yellow-405 font-bold text-sm select-none font-serif"
                    >
                      Z
                    </motion.span>
                  </motion.div>

                  {/* Right Silver Cloud */}
                  <motion.div 
                    animate={{ x: [8, -8, 8], y: [2, -2, 2] }} 
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="flex items-center opacity-75"
                  >
                    <svg className="w-24 h-12 text-slate-200/80 filter drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]" fill="currentColor" viewBox="0 0 100 50">
                      <path d="M20 40a15 15 0 0 1 1-29.9 18 18 0 0 1 33.7-4.1 15 15 0 0 1 25.3 12 15 15 0 0 1 5 22h-65z" />
                    </svg>
                  </motion.div>
                </div>

                {/* Hero Splash Area */}
                <div className="text-center max-w-3xl mx-auto py-4">
                  <div className="inline-flex items-center gap-1.5 bg-yellow-300/10 text-yellow-300 border border-yellow-500/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 animate-pulse">
                    <Star className="w-3.5 h-3.5 fill-yellow-300" />
                    Glowtales
                  </div>
                  
                  <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-sky-100 to-amber-300 leading-tight tracking-tight mb-4 font-serif">
                    Free AI Bedtime Stories for Autistic & ADHD Minds
                  </h1>
                  
                  <p className="text-slate-355 text-sm md:text-base max-w-2xl mx-auto text-slate-300 leading-relaxed">
                    Convert your child's passionate <strong>hyperfixation</strong> into therapeutic, sensory-safe stories. Quiet their thoughts with slow-paced rhythms, trigger-free settings, and soothing digital narration.
                  </p>

                  <div className="flex justify-center gap-4 mt-8 flex-wrap">
                    <button
                      onClick={() => navigateTo("#/create")}
                      id="hero-create-btn"
                      className="px-6 py-3 bg-gradient-to-r from-yellow-300 to-amber-400 text-slate-900 text-xs font-bold uppercase rounded-2xl tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                    >
                      <Sparkles className="w-4 h-4 fill-slate-900" />
                      Create a Storybook
                    </button>
                    
                    <a
                      href="#/why-us"
                      className="px-6 py-3 bg-indigo-950/80 hover:bg-indigo-900 text-indigo-250 text-xs font-bold uppercase rounded-2xl tracking-wider border border-indigo-800/40 transition-all flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      Completely Free & Private
                    </a>
                  </div>
                </div>

                {/* Search & Storage summary header */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/40 border border-indigo-500/10 p-4 rounded-2xl backdrop-blur-xs">
                  <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search child's name or interest..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-950/70 border border-indigo-950 rounded-xl pl-10 pr-4 py-2 text-slate-200 placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 transition-all"
                    />
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-400 font-mono select-none">
                    <span className="bg-slate-950 px-2.5 py-1 rounded-lg">
                      Books shelf counts: <strong>{allStories.length} stories</strong>
                    </span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      ● Offline Safe Browser Storage
                    </span>
                  </div>
                </div>

                {/* Bookshelf Shelf Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="shelf-books-grid">
                  {filteredStories.map((st) => {
                    const isCustom = !st.id.startsWith("sample-");
                    return (
                      <div
                        key={st.id}
                        onClick={() => {
                          window.scrollTo({ top: 120, behavior: "smooth" });
                          setActiveStory(st);
                        }}
                        id={`storybook-card-${st.id}`}
                        className="group relative rounded-2xl bg-slate-950/70 hover:bg-slate-900/60 transition-all duration-300 border border-indigo-950 hover:border-indigo-500/20 p-5 cursor-pointer flex flex-col justify-between min-h-[220px] overflow-hidden shadow-lg select-none"
                      >
                        {/* Dynamic Decorative Glow based on style */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors" />

                        <div>
                          {/* Banner Badge */}
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="text-[10px] uppercase font-mono tracking-widest bg-indigo-950 text-indigo-300 px-2.5 py-1 rounded-full border border-indigo-900/45">
                              {st.parameters.length} story
                            </span>

                            {isCustom ? (
                              <span className="text-[10px] uppercase font-mono font-bold tracking-widest bg-amber-500/10 text-amber-300 px-2.5 py-1 rounded-full border border-amber-500/20 flex items-center gap-1">
                                <Sparkles className="w-3 h-3 fill-amber-300/20" />
                                Custom Story
                              </span>
                            ) : (
                              <span className="text-[10px] uppercase font-mono tracking-widest bg-slate-800/50 text-slate-400 px-2 py-0.5 rounded-full">
                                Built-In Sample
                              </span>
                            )}
                          </div>

                          <h3 className="text-base font-bold font-serif text-slate-100 group-hover:text-amber-300 transition-colors leading-snug mb-2 pr-4">
                            {st.title}
                          </h3>

                          {/* Quick params breakdown */}
                          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                            Tailored for <strong className="text-slate-200">{st.parameters.childName}</strong> (age {st.parameters.childAge}) with the special interest of <em className="text-amber-200/90 NOT-italic font-medium">{st.parameters.interests}</em>.
                          </p>
                        </div>

                        {/* Shelf Card Footer controls */}
                        <div className="flex items-center justify-between border-t border-indigo-950/50 pt-3 mt-2 text-xs text-slate-500 font-mono">
                          <span className="flex items-center gap-1">
                            <Moon className="w-3.5 h-3.5 text-indigo-400" />
                            {st.parameters.style}
                          </span>

                          <div className="flex items-center gap-2">
                            {isCustom && (
                              <button
                                onClick={(e) => handleDeleteStory(st.id, e)}
                                title="Remove story from shelf"
                                className="p-1 text-slate-600 hover:text-rose-400 hover:bg-slate-900 rounded transition-all"
                                id={`delete-card-btn-${st.id}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                            <span className="text-indigo-400 group-hover:underline font-bold uppercase text-[10px] tracking-wider">
                              Read Book →
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Empty state shelf helper */}
                  {filteredStories.length === 0 && (
                    <div className="col-span-full py-12 text-center rounded-2xl bg-indigo-950/10 border border-dashed border-indigo-900/30">
                      <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                      <p className="text-slate-400 text-sm">No personalized books found matching "{searchQuery}".</p>
                      <button
                        onClick={() => {
                          setSearchQuery("");
                          navigateTo("#/create");
                        }}
                        className="text-amber-350 text-xs font-semibold hover:underline mt-2 inline-block"
                      >
                        Create a new personalized book instead!
                      </button>
                    </div>
                  )}
                </div>

                {/* Informative Help Card for bedtime */}
                <div className="bg-indigo-950/15 border border-indigo-500/10 p-6 rounded-2xl text-slate-300 md:flex items-center justify-between gap-6 relative overflow-hidden mt-10">
                  <div className="mb-4 md:mb-0 max-w-xl">
                    <h3 className="text-sm uppercase tracking-wider font-bold text-amber-200 flex items-center gap-1.5 mb-1.5">
                      <Info className="w-4 h-4 text-amber-300" />
                      Need Bedtime Inspiration?
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Neurodiverse children respond beautifully to consistent storytelling schedules. Try creating a story under <strong>"Gentle daily routine guide"</strong> style to help map out their sequence of toothbrushing, getting cozy, and turning off the bedside lights alongside their beloved heroes.
                    </p>
                  </div>
                  <button
                    onClick={() => navigateTo("#/create")}
                    className="shrink-0 px-5 py-2 px-6 py-2.5 bg-indigo-900/60 hover:bg-indigo-900 border border-indigo-700/30 text-xs font-semibold rounded-xl text-indigo-200 transition-all uppercase"
                  >
                    Open Storyboard Creator
                  </button>
                </div>

              </div>
            )}

            {/* CREATE STORY VIEW */}
            {currentHash === "#/create" && (
              <StoryCreator 
                onStoryCreated={handleStoryCreated}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            )}

            {/* ABOUT US VIEW */}
            {currentHash === "#/about-us" && <AboutUs />}

            {/* WHY US VIEW */}
            {currentHash === "#/why-us" && <WhyUs />}

            {/* ABOUT THE AUTHOR (PETER) VIEW */}
            {currentHash === "#/author" && <AboutAuthor />}

          </div>
        )}

      </main>

      {/* Primary Cozy Footer */}
      <footer className="w-full bg-slate-950/85 border-t border-indigo-500/10 py-8 select-none relative z-10 text-slate-500 text-xs text-center mt-12">
        <div className="max-w-6xl mx-auto px-4 space-y-3">
          
          <div className="flex items-center justify-center gap-1 text-slate-400">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span>by Peter for neurodiverse minds & families everywhere.</span>
          </div>
          
          <p className="max-w-md mx-auto text-slate-600 leading-relaxed">
            All user storybooks are kept strictly private inside this browser's secure cache. No cookies, tracking, or sign-ups required.
          </p>

          <p className="text-[10px] text-slate-600 font-mono pt-2">
            © {new Date().getFullYear()} Glowtales Storybook Studio. All rights reserved.
          </p>
          
        </div>
      </footer>

    </div>
  );
}
