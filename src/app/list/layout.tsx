import Menubar from "@/components/menubar/Menubar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen overflow-y-auto modal-width">
      {children}
      <Menubar />
    </div>
  );
}
