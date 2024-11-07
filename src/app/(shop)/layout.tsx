import { Footer, SideBar, TopMenu } from "@/components";

export default function shopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen ">
      <TopMenu />
      <SideBar />
      <div className="px-0 sm:px-10">{children}</div>
      <Footer />
    </main>
  );
}
