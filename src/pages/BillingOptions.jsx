import { useState } from "react";
import toast from "react-hot-toast";
import { CreditCard, Gift, CheckCircle2 } from "lucide-react";

const BillingOptions = () => {
  const [redeemCode, setRedeemCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRedeem = async () => {
    if (!redeemCode.trim()) {
      toast.error("Please enter a valid code.");
      return;
    }

    setIsLoading(true);

    try {
      // 🔁 Replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Credits added successfully!");
      setRedeemCode("");
    } catch (err) {
      toast.error("Invalid or expired code.");
    } finally {
      setIsLoading(false);
    }
  };

  const FeatureItem = ({ children }) => (
    <li className="flex items-start gap-2 text-gray-600 text-sm">
      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
      <span>{children}</span>
    </li>
  );

  return (
    <div className="max-w-4xl mx-auto px- py-10">
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">Billing & Subscriptions</h1>
        <p className="mt-2 text-gray-600 text-sm sm:text-base">Choose how you'd like to add credits to your account.</p>
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Buy Credits Card */}
        <div className="border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow bg-white md:min-h-[420px] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <CreditCard className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">Buy Credits</h2>
            </div>
            <p className="text-gray-600 mb-5">
              Use your card, UPI, or wallet to purchase credits and unlock premium features.
            </p>
            <ul className="mb-6 md:mb-10 space-y-4">
              <FeatureItem>Access to high-resolution image generations</FeatureItem>
              <FeatureItem>Priority queue during peak hours</FeatureItem>
              <FeatureItem>Early access to new AI models</FeatureItem>
              <FeatureItem>Custom prompt memory & history</FeatureItem>
            </ul>
          </div>
          <button className="mt-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 w-full">
            Upgrade Plan
          </button>
        </div>

        {/* Redeem Code Card */}
        <div className="border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow bg-white md:min-h-[420px] flex flex-col justify-between">
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
              <FeatureItem>Codes can unlock premium access too</FeatureItem>
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
      </div>
    </div>
  );
};

export default BillingOptions;
