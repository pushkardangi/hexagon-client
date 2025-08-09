import { CheckCircle2 } from "lucide-react";

const FeatureItem = ({ children }) => (
  <li className="flex items-start gap-2 text-gray-600 text-sm">
    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
    <span>{children}</span>
  </li>
);

export default FeatureItem;
