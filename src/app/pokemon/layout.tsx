import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={[inter.className, "bg-slate-800"].join(" ")}>
      {children}
    </div>
  );
}
