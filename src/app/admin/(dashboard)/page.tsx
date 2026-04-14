import type { Metadata } from "next";
import { AdminClientDashboard } from "@/components/admin-client-dashboard";

export const metadata: Metadata = {
  title: "Client Dashboard",
  description:
    "Admin preview: track client tax submissions, documents, and status.",
};

export default function AdminPage() {
  return <AdminClientDashboard />;
}
