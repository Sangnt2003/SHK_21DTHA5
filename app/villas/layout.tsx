// Ví dụ: /app/page.tsx (trang chủ)
"use client";

import AppLayout from "@/components/AppLayout";

export default function HomePage({ children }: { children: React.ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}
