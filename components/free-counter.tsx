"use client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { MAX_FREE_COUTNS } from "@/const";

interface FreeCounterProps {
  apiLimitCount: number;
}

function FreeCounter({ apiLimitCount }: FreeCounterProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="mb-4 space-y-2 text-center text-sm text-white">
            <p>{apiLimitCount} / {MAX_FREE_COUTNS} Free Generations</p>
            <Progress className="h-3" value={(apiLimitCount / MAX_FREE_COUTNS) * 100} />
          </div>
          <Button className="w-full" variant="premium">
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default FreeCounter;