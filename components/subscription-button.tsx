"use client";

import { useState } from "react";
import axios from "axios";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface SubscriptionButtonProps {
  isPro: boolean;
}

function SubscriptionButton({ isPro }: SubscriptionButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button 
      variant={isPro ? "default" : "premium"}
      onClick={handleClick}
      disabled={loading}
    >
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
}

export default SubscriptionButton;
