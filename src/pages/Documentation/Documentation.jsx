import { useState } from "react";
import { motion } from "framer-motion";
import { Rocket, Sparkles, HelpCircle, Brain, CreditCard, Shield, Lightbulb } from "lucide-react";
import { Breadcrumbs } from "../../components";

const sections = [
  { id: "getting-started", title: "Getting Started", icon: Rocket },
  { id: "features", title: "How to Use Features", icon: Sparkles },
  { id: "faq", title: "FAQ", icon: HelpCircle },
  { id: "guide", title: "Image Generation Guide", icon: Brain },
  { id: "pricing", title: "Plans & Pricing", icon: CreditCard },
  { id: "privacy", title: "Privacy & Data Handling", icon: Shield },
  { id: "feedback", title: "Feedback & Suggestions", icon: Lightbulb },
];

const Documentation = () => {
  const [active, setActive] = useState("getting-started");

  const handleScroll = (id) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex w-full md:h-[calc(100vh-10rem)] md:pl-5">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-72 shrink-0 pr-6 border-r border-gray-200">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Documentation" }]} />

        <nav className="flex flex-col mt-6 space-y-2">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => handleScroll(s.id)}
                className={`flex items-center gap-2 text-left px-3 py-2 rounded-lg transition-all ${
                  active === s.id ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className="h-5 w-5" />
                {s.title}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-2 md:px-8 overflow-y-auto space-y-12 scrollbar-hide">
        <motion.section id="getting-started" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
            <Rocket className="h-7 w-7 text-indigo-600" />
            Getting Started
          </h1>
          <ul className="list-disc pl-6 space-y-2">
            <li>Sign up / Login with your email.</li>
            <li>Enter your prompt, choose model, quality, size, and style.</li>
            <li>Generate your image and save it to your gallery.</li>
            <li>Download images (only saved ones can be downloaded).</li>
          </ul>
        </motion.section>

        <section id="features">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-indigo-600" />
            How to Use Features
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Prompt Input:</strong> Type what you want the AI to generate.
            </li>
            <li>
              <strong>Image Specs:</strong> Choose size, quality, and style.
            </li>
            <li>
              <strong>Save Image:</strong> Store images in your gallery.
            </li>
            <li>
              <strong>Download Image:</strong> Available only after saving.
            </li>
            <li>
              <strong>Gallery:</strong> View all saved images in one place.
            </li>
          </ul>
        </section>

        <section id="faq">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-indigo-600" />
            FAQ
          </h2>
          <ol className="space-y-2 pl-6 list-decimal">
            <li>
              <strong>How many images can I generate?</strong> Depends on your credits. Redeem or recharge for more.
            </li>
            <li>
              <strong>Where are saved images stored?</strong> In your gallery (accessible from the header).
            </li>
            <li>
              <strong>Is my data shared?</strong> No, your prompts and images are private.
            </li>
          </ol>
        </section>

        <section id="guide">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Brain className="h-6 w-6 text-indigo-600" />
            Image Generation Guide
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use descriptive prompts (e.g., "a medieval knight on a dragon").</li>
            <li>Add art styles (e.g., "in Pixar style").</li>
            <li>Experiment with lighting, mood, or medium (e.g., "cinematic lighting").</li>
            <li>Avoid vague prompts for better results.</li>
          </ul>
        </section>

        <section id="pricing">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-indigo-600" />
            Plans & Pricing
          </h2>
          <p>
            <strong>Free Plan:</strong> Redeem a code to get credits and generate images.
          </p>
          <p>
            <strong>Pro Plan:</strong> Unlimited images (coming soon with payment integration).
          </p>
        </section>

        <section id="privacy">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Shield className="h-6 w-6 text-indigo-600" />
            Privacy & Data Handling
          </h2>
          <p>We store prompts and saved images securely in our backend database.</p>
          <p>Your data is never shared or sold. Privacy is our top priority.</p>
        </section>

        <section id="feedback">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-indigo-600" />
            Feedback & Suggestions
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Found a bug? Use the <em>Report a Bug</em> feature in settings.
            </li>
            <li>
              Have an idea? Submit it through <em>Feature Request</em>.
            </li>
            <li>Your input helps shape Hexagon’s future roadmap.</li>
          </ul>
        </section>

        <footer className="pt-12 text-center text-gray-500">
          Thanks for using <span className="font-bold text-indigo-600">Hexagon ✨</span>
        </footer>
      </main>
    </div>
  );
};

export default Documentation;
