import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <>
      <p>Landing Page</p>
      <Button asChild>
        <Link href="/sign-in">Login</Link>
      </Button>
      <Button asChild>
        <Link href="/sign-up">Register</Link>
      </Button>
    </>
  );
}
