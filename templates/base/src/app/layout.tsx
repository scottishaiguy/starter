import type { Metadata } from "next";
import "./globals.css";
import { AssistantSlot } from "@/components/assistant/AssistantSlot";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "{{PROJECT_NAME}}",
  description: "A practical {{PROJECT_TYPE}} built with the Scottish AI Guy stack."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body>
        <Providers>
          {children}
          <AssistantSlot />
        </Providers>
      </body>
    </html>
  );
}
