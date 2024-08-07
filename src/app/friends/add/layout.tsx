"use client";
import Menubar from "@/components/menubar/Menubar";
import MenuHeader from "@/components/menubar/MenuHeader";
import FriendRequestModal from "@/components/modal/friend/FriendRequestModal";
import { FriendRequestProvider } from "@/context/friend/RequestProvider";
import { ModalState } from "@/store/modalSlice";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { selectedProfile, friendRequestModalOpen } = useSelector(
    (state: RootState) => state.modal as ModalState
  );

  return (
    <FriendRequestProvider>
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
      {friendRequestModalOpen && selectedProfile && <FriendRequestModal />}
    </FriendRequestProvider>
  );
}
