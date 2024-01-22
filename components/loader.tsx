import Image from "next/image";

function Loader() {
  return (
    <div className="grid items-center justify-center gap-y-4 h-full">
      <div className="justify-self-center relative w-10 h-10 animate-spin">
        <Image src="/logo.png" fill sizes="100%" alt="Loader image" />
      </div>
      <p className="text-muted-foreground text-sm text-center">
        Genius is thinking...
      </p>
    </div>
  );
}

export default Loader;
