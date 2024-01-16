import { UserButton } from "@clerk/nextjs";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

function Navbar() {
  return (
    <div className="flex items-center p-4">
      <Button className="md:hidden" variant="ghost" size="icon">
        <MenuIcon /> 
        <span className="sr-only">Menu</span>
      </Button>
      <div className="flex justify-end w-full">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}

export default Navbar;