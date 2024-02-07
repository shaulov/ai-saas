import { Settings } from "lucide-react";
import { checkSubscription } from "@/lib/subscription";
import Heading from "@/components/heading";
import SubscriptionButton from "@/components/subscription-button";

export default async function SettingsPage() {
  const isPro = await checkSubscription();

  return (
    <section>
      <Heading
        title="Settings"
        description="Manage account settings"
        icon={Settings}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
        <p className="text-sm text-muted-foreground">
          {`You are currently on a ${isPro ? "PRO" : "Free"} Plan`}
        </p>
        <SubscriptionButton isPro={isPro} />
      </div>
    </section>
  );
}
