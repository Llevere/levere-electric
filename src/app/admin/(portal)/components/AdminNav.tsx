"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminNav() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <nav className="sticky top-0 z-20 bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <Link
            href="/"
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors mr-1"
            title="Back to website"
          >
            <ArrowLeft size={15} />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <span className="font-semibold text-gray-900 text-sm whitespace-nowrap hidden sm:block">
            {process.env.NEXT_PUBLIC_SITE_NAME} &mdash; Admin
          </span>
          <span className="font-semibold text-gray-900 text-sm sm:hidden">
            Admin
          </span>
          <Link
            href="/admin/posts"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Posts
          </Link>
        </div>

        <button
          onClick={logout}
          className="cursor-pointer text-sm text-gray-500 hover:text-red-600 transition-colors whitespace-nowrap"
        >
          Sign out
        </button>
      </div>
    </nav>
  );
}
