import "./globals.css";
import PageWrapper from "@/components/PageWrapper";

export const metadata = {
  title: "Student Admission Assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PageWrapper>{children}</PageWrapper>
      </body>
    </html>
  );
}
