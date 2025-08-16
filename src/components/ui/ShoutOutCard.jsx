import { Bug } from "lucide-react";
import { Link } from "react-router-dom";

const ShoutOutCard = ({
  title = "Report a Bug, Earn a Shout-Out!",
  description = "Found a bug or have feedback? Help us improve by reporting it — and you might get a special mention in our upcoming updates.",
  ctaText = "Report a Bug →",
  ctaLink = "/report-bug",
}) => {
  return (
    <div className="p-6 border rounded-2xl shadow-sm mb-8 bg-black/5">
      <div className="flex items-center gap-2 mb-3">
        <Bug className="text-red-500" size={20} />
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link
        to={ctaLink}
        className="inline-block px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
      >
        {ctaText}
      </Link>
    </div>
  );
};

export default ShoutOutCard;
