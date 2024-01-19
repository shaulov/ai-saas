import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeadingProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
}

function Heading({
  title,
  description,
  icon: Icon,
  iconColor,
  bgColor,
}: HeadingProps) {
  return (
    <header className="flex items-center gap-x-3 mb-8 px-4 lg:px-8">
      <div className={cn("w-fit p-2 rounded-md", bgColor)}>
        <Icon className={cn("w-10 h-10", iconColor)} />
      </div>
      <div>
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </header>
  );
}

export default Heading;
