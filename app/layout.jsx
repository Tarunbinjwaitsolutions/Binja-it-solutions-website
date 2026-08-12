import "../styles/globals.css";
import LayoutClient from "@/components/layout/LayoutClient";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
export const metadata = {
  title: "Binjwa IT Solutions",
  description: "IT Solutions and Services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative">
        <SmoothScrollProvider>
          <LayoutClient>
            {children}
          </LayoutClient>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
