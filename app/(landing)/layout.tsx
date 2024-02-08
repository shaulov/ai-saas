export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-full bg-[#111827]">
      <div className="max-w-screen-xl w-full mx-auto">
        {children}
      </div>
    </main>
  );
}