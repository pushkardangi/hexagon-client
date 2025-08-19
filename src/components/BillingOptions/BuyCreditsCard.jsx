import { CreditCard } from "lucide-react";
import FeatureItem from "../ui/FeatureItem";

const BuyCreditsCard = () => {
  return (
    <div className="border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-5">
          <CreditCard className="w-6 h-6 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-800">Buy Credits</h2>
        </div>
        <p className="text-gray-600 mb-5">
          Use your card, UPI, or wallet to purchase credits and unlock premium features.
        </p>
        <ul className="mb-6 md:mb-10 space-y-4">
          <FeatureItem>Priority queue during peak hours</FeatureItem>
          <FeatureItem>Early access to new AI models</FeatureItem>
          <FeatureItem>Custom prompt memory & history</FeatureItem>
          <FeatureItem><strong>Coming soon </strong>- payments in progress</FeatureItem>
        </ul>
      </div>
      <button className="mt-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 w-full">
        Upgrade Plan
      </button>
    </div>
  );
};

export default BuyCreditsCard;
