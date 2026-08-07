import "../styles/globals.css";
import LayoutClient from "@/components/layout/LayoutClient";
export const metadata = {
  title: "Binjwa IT Solutions",
  description: "IT Solutions and Services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative">
          <LayoutClient>
            {children}
          </LayoutClient>
      </body>
    </html>
  );
}
