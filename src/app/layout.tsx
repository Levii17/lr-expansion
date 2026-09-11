import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LR / Developments — Construction & Property Development",
  description:
    "LR is the construction and development partner for projects that need to work beautifully — on paper, on site and long after handover.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
