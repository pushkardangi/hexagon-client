import { CheckCircle, Bug, Sparkles } from "lucide-react";
import { Breadcrumbs, ShoutOutCard } from "../../components";

const WhatsNew = () => {
  const updates = [
    {
      date: "August 16, 2025",
      title: "Bug Reporting Added",
      type: "bug",
      items: [
        "Users can now submit bugs directly from the app.",
        "Categorize bugs by type and severity for faster fixes.",
      ],
    },
    {
      date: "August 12, 2025",
      title: "UI Enhancements",
      type: "improvement",
      items: ["Refined header layout for better navigation.", "Smaller paddings on mobile for more space."],
    },
    {
      date: "August 6, 2025",
      title: "Image Generation Upgrade",
      type: "feature",
      items: ["Improved AI prompts for better quality images.", "Gallery now loads faster with optimized queries."],
    },
  ];

  const iconMap = {
    feature: <Sparkles className="w-5 h-5 text-purple-500" />,
    improvement: <CheckCircle className="w-5 h-5 text-green-500" />,
    bug: <Bug className="w-5 h-5 text-red-500" />,
  };

  return (
    <main className="flex-1 p-2 md:px-5 pb-10 max-w-5xl space-y-8">
      {/* Breadcrumb */}
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "What's New" }]} />

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">What's New</h1>
        <p className="text-gray-600">
          Explore the latest updates with a sneak peek at new features, improvements, and fixes—while celebrating the
          valuable contributions of our contributors.
        </p>
      </div>

      {/* Updates List */}
      <div className="space-y-8">
        {updates.map((update, idx) => (
          <div key={idx} className="border rounded-2xl shadow-sm p-4 space-y-2">
            <div className="flex items-center space-x-2">
              {iconMap[update.type]}
              <h2 className="text-lg font-semibold">{update.title}</h2>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Contributor: Ram Prasad</span>
              <span className="text-sm text-gray-500">{update.date}</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {update.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <ShoutOutCard />
    </main>
  );
};

export default WhatsNew;
