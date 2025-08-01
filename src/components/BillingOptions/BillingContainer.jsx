import BillingHeader from "./BillingHeader";
import BuyCreditsCard from "./BuyCreditsCard";
import RedeemCodeCard from "./RedeemCodeCard";

const BillingContainer = () => {
  return (
    <div className="max-w-4xl mx-auto px- py-10">
      <BillingHeader />

      <div className="grid sm:grid-cols-2 gap-6">
        <BuyCreditsCard />
        <RedeemCodeCard />
      </div>
    </div>
  );
};

export default BillingContainer;
