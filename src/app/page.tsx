import Navbar from "@/components/Navbar";
import Polls from "@/components/Polls";

export default function Home() {
  return (
    <div className="h-screen flex flex-col bg-navy font-sans overflow-hidden px-12 md:px-24">
      <Navbar />
      <main className="flex-1 overflow-y-auto  py-8">
        <Polls />
      </main>
    </div>
  );
}
