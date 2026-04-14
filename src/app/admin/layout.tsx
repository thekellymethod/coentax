export default function AdminRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-200 text-neutral-900">
      {children}
    </div>
  );
}
