import MenuHeader from "@/components/menubar/MenuHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen overflow-y-auto modal-width">
      <MenuHeader title="새 약속 만들기" />
      {children}
    </div>
  );
}
