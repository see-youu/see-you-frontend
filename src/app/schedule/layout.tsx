import MenuHeader from "@/components/menubar/MenuHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <MenuHeader title="새 약속 만들기" />
      {children}
    </div>
  );
}
