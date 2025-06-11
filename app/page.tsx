import CreateWallet from "@/components/CreateWallet";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <div className="max-w-screen px-40 pt-6 flex flex-col gap-36">
      <NavBar />
      <CreateWallet />
    </div>
  );
}
