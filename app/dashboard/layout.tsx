import { Toaster } from "sonner";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <Toaster position="top-right" />
    </>
  );
}