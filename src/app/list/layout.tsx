import MenuHeader from "@/components/menubar/MenuHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen overflow-y-auto modal-width">
      <MenuHeader title="약속 목록" />
      {children}
    </div>
  );
}
