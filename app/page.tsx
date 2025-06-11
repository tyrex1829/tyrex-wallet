import CreateWallet from "@/components/CreateWallet";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <div className="max-w-screen px-40 pt-6 flex flex-col gap-20">
      <NavBar />
      <CreateWallet />
      <Footer />
    </div>
  );
}
