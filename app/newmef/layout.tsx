import NavBar from "@/components/newmef/NavBar";
import Footer from "@/components/Footer";

export default function NewMefLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}
