import { UserButton } from "@clerk/nextjs";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import MobileSidebar from "@/components/mobile-sidebar";

async function Navbar() {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  return (
    <div className="flex items-center p-4">
      <MobileSidebar apiLimitCount={apiLimitCount} isPro={isPro} />
      <div className="flex justify-end w-full">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}

export default Navbar;
