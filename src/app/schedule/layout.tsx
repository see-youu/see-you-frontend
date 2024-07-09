import MenuHeader from "@/components/menubar/MenuHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen overflow-y-auto modal-width">
      <MenuHeader title="새 약속 만들기" />
      {children}
      <div className="fixed bottom-0 left-0 flex items-center w-full h-20 gap-4 px-8 bg-white border-t border-gray-400 border-solid modal-width">
        <div className="w-1/3 py-1 text-center border border-gray-500 border-solid cursor-pointer rounded-xl">
          취소
        </div>
        <div className="w-2/3 py-1 text-center border border-gray-500 border-solid cursor-pointer rounded-xl bg-customYellow ">
          약속 만들기
        </div>
      </div>
    </div>
  );
}
