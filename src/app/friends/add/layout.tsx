import Menubar from "@/components/menubar/Menubar";
import MenuHeader from "@/components/menubar/MenuHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen overflow-y-auto modal-width">
      <MenuHeader title="친구 추가" />
      <div
        className="flex flex-col items-center gap-5 overflow-y-auto"
        style={{
          height: `calc(100vh - var(--menuheader-height))`,
          paddingBottom: `var(--menubar-height)`,
        }}
      >
        {children}
      </div>
      <Menubar />
    </div>
  );
}
