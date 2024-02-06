"use client";

import { Check, Zap } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { tools } from "@/const";

function ProModal() {
  const proModal = useProModal();

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <span className="flex items-center gap-x-2 py-1 font-bold">
              Upgrade to Genius
              <Badge className="py-1 uppercase text-sm" variant="premium">pro</Badge>
            </span>
          </DialogTitle>
          <DialogDescription className="pt-2 text-center font-medium text-zinc-900" asChild>
            <ul className="space-y-2">
              {tools.map(tool => (
                <li key={tool.label}>
                  <Card className="flex items-center gap-x-4 p-3 border-black/5">
                    <span className={cn("w-fit p-2 rounded-md", tool.bgColor)}>
                      <tool.icon className={cn("w-6 h-6", tool.color)} />
                    </span>
                    <h3 className="text-sm font-semibold">{tool.label}</h3>
                    <Check className="w-5 h-5 ml-auto text-primary" />
                  </Card>
                </li>
              ))}
            </ul>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button className="w-full" size="lg" variant="premium">
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ProModal;
