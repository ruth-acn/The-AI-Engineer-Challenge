import type { Metadata } from "next";
import "./theme.css";

export const metadata: Metadata = {
  title: "Mindful Coach",
  description: "A supportive mental coach chat app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
