import type { ReactNode } from "react";
import AdminNav from "./components/AdminNav";

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AdminNav />
      <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
    </>
  );
}
