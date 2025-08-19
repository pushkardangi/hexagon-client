import { useState } from "react";
import { Gift } from "lucide-react";
import toast from "react-hot-toast";
import FeatureItem from "../ui/FeatureItem";
import { redeemTheCode } from "../../api";

const RedeemCodeCard = () => {
  const [redeemCode, setRedeemCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRedeem = async () => {
    const code = redeemCode.trim();

    if (!code) {
      toast.error("Please enter a valid code.");
      return;
    }

    setIsLoading(true);

    const { data, success, error } = await redeemTheCode(code);

    if (data && success) {
      toast.success(`${data.creditsAdded} Credits added to your account`);
    } else if (error) {
      toast.error(error);
    }

    setRedeemCode("");
    setIsLoading(false);
  };

  return (
    <div className="border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-5">
          <Gift className="w-6 h-6 text-green-600" />
          <h2 className="text-lg font-semibold text-gray-800">Redeem Code</h2>
        </div>
        <p className="text-gray-600 mb-5">
          Got a gift or promo code? Redeem it to instantly add credits to your account.
        </p>
        <ul className="mb-6 md:mb-10 space-y-4">
          <FeatureItem>One-time use promo and event codes</FeatureItem>
          <FeatureItem>Instant credit addition on valid code</FeatureItem>
          <FeatureItem>No payment information required</FeatureItem>
          <FeatureItem>Unlocks all premium feature access</FeatureItem>
        </ul>
      </div>
      <div className="flex flex-wrap items-center justify-center sm:flex-nowrap gap-2">
        <input
          type="text"
          value={redeemCode}
          onChange={(e) => setRedeemCode(e.target.value)}
          placeholder="Enter code"
          className="flex-1 min-w-[150px] sm:min-w-0 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={isLoading}
        />
        <button
          onClick={handleRedeem}
          disabled={isLoading}
          className={`px-4 py-2 w-full sm:w-auto rounded-md text-white transition-colors whitespace-nowrap ${
            isLoading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-500"
          }`}
        >
          {isLoading ? "Redeeming..." : "Redeem"}
        </button>
      </div>
    </div>
  );
};

export default RedeemCodeCard;
