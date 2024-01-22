import Image from "next/image";

interface EmptyProps {
  label: string;
}

function Empty({ label }: EmptyProps) {
  return (
    <div className="grid items-center justify-center h-full px-20 py-14">
      <div className="relative h-72 w-72">
        <Image src="/empty.png" fill alt="Empty image" />
      </div>
      <p className="text-muted-foreground text-sm text-center">{label}</p>
    </div>
  );
}

export default Empty;
