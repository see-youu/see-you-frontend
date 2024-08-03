"use client";
import { fetchFriendList, fetchFriendsRequestList } from "@/api/friends";
import Menubar from "@/components/menubar/Menubar";
import LoadingSpinner from "@/components/spinner/LoadingSpinner";
import {
  faChevronDown,
  faChevronUp,
  faCircleMinus,
  faSearch,
  faUserPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import emptyImg from "@/../public/emptyImg.png";
import ModalWrapper from "@/components/modal/ModalWrapper";
import AlertMessage from "@/components/modal/AlertMessage";
interface FriendType {
  memberId: number;
  name: string;
  profileImageUrl: string | null;
}

export default function () {
  const [isLoading, setIsLoading] = useState(true);
  const [searchFriend, setSearchFriend] = useState("");
  const [closeStarFriends, setCloseStarFriends] = useState(false);
  const [closeFriends, setCloseFriends] = useState(false);
  const [friends, setFriends] = useState<FriendType[] | null>(null);
  const [profileDetailOpen, setProfileDetailOpen] = useState<boolean>(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState<boolean>(false);
  const [selectedFriend, setSelectedFriend] = useState<FriendType | null>(null);
  const [isAlert, setIsAlert] = useState<string | null>(null);

  const starMembers = [
    {
      id: 106,
      name: "유승호",
      image:
        "data:image/jpeg;base64,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",
    },
  ];
  const [requestCount, setRequestCount] = useState(0);
  const handleSearch = () => {
    console.log("search");
  };

  const handleDeleteFriend = (memberId: number) => {
    console.log("delete ", memberId);
    const data = true;
    if (data) {
      setIsAlert("친구 목록에서 삭제되었습니다.");
      setDeleteAlertOpen(false);
    } else setIsAlert("오류가 발생했습니다.");
  };

  useEffect(() => {
    const fetchFriends = async () => {
      const friendsData = await fetchFriendList();
      setFriends(friendsData);
    };
    const fetchRequests = async () => {
      const data = await fetchFriendsRequestList();
      setRequestCount(data.length);
    };
    fetchFriends();
    fetchRequests();
    setIsLoading(false);
  }, []);

  if (isLoading)
    return (
      <div className="w-full h-screen">
        <LoadingSpinner />
      </div>
    );
  return (
    <>
      <nav
        className="relative flex items-center justify-center w-full px-3 text-xl border-b-2 border-solid font-mediums border-b-gray-300"
        style={{ minHeight: "var(--menuheader-height)" }}
      >
        친구 목록
        <Link href={"/friends/add"} className="absolute text-sm right-4">
          <FontAwesomeIcon icon={faUserPlus} className="text-sm" />
        </Link>
        {requestCount !== 0 && (
          <div className="absolute w-1 h-1 bg-red-600 rounded-full top-4 right-3"></div>
        )}
      </nav>
      <div
        className="flex flex-col items-center gap-3 overflow-y-auto"
        style={{
          height: `calc(100vh - var(--menuheader-height))`,
          paddingBottom: `var(--menubar-height)`,
        }}
      >
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className={`my-4 relative w-4/5`}
        >
          <input
            type="text"
            className="w-full h-12 pl-2 pr-12 border border-black border-solid rounded-md"
            value={searchFriend}
            placeholder="친구 이름으로 검색"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchFriend(e.target.value)
            }
          />
          <button className="absolute -translate-y-1/2 right-4 top-1/2">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
        <section className="w-full my-1 px-screen-x">
          <div className="flex items-end justify-between text-sm text-gray-500">
            <p>즐겨찾기</p>
            <FontAwesomeIcon
              onClick={() => setCloseStarFriends((prev) => !prev)}
              icon={closeStarFriends ? faChevronDown : faChevronUp}
              className="cursor-pointer"
            />
          </div>
          {!closeStarFriends &&
            starMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-5 my-3 cursor-pointer"
              >
                <Image
                  src={member.image}
                  width={3 * 16} // 3rem
                  height={3 * 16} // 3rem
                  alt="profile"
                  className="block object-cover w-12 h-12 border border-gray-400 border-solid rounded-full"
                />
                <p>{member.name}</p>
              </div>
            ))}
        </section>
        <section className="w-full my-1 px-screen-x">
          <div className="flex items-end justify-between text-sm text-gray-500">
            <p>친구 {friends && friends.length}</p>
            <FontAwesomeIcon
              onClick={() => setCloseFriends((prev) => !prev)}
              icon={closeFriends ? faChevronDown : faChevronUp}
              className="cursor-pointer"
            />
          </div>
          {!closeFriends &&
            !!friends &&
            friends.map((friend) => (
              <div
                key={friend.memberId}
                className="flex items-center gap-5 my-3 cursor-pointer"
                onClick={() => {
                  setSelectedFriend(friend);
                  setProfileDetailOpen(true);
                }}
              >
                <Image
                  src={friend.profileImageUrl || emptyImg}
                  width={3 * 16} // 3rem
                  height={3 * 16} // 3rem
                  alt="profile"
                  className="block object-cover w-12 h-12 border border-gray-400 border-solid rounded-full"
                />
                <p>{friend.name}</p>
              </div>
            ))}
        </section>
      </div>
      {profileDetailOpen && selectedFriend && (
        <ModalWrapper backgroundColor="transparent">
          <div
            className="flex items-center justify-center w-full h-full"
            onClick={() => {
              setProfileDetailOpen(false);
              setSelectedFriend(null);
            }}
          >
            <div
              className="relative flex flex-col items-center gap-4 px-20 py-8 border border-gray-200 border-solid rounded-md bg-gray-50"
              onClick={(e) => e.stopPropagation()}
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="absolute text-lg cursor-pointer right-3 top-3"
                onClick={() => {
                  setProfileDetailOpen(false);
                  setSelectedFriend(null);
                }}
              />
              <Image
                src={emptyImg}
                width={4 * 16} // 3rem
                height={4 * 16} // 3rem
                alt="profile"
                className="block object-cover w-16 h-16 border border-gray-400 border-solid rounded-full y"
              />
              <div className="flex items-center gap-2">
                <p>{selectedFriend.name}</p>
                <FontAwesomeIcon
                  icon={faCircleMinus}
                  className="text-sm text-red-500 cursor-pointer"
                  onClick={() => {
                    setDeleteAlertOpen(true);
                    setProfileDetailOpen(false);
                  }}
                />
              </div>

              <button className="flex items-center gap-1 px-4 py-2 text-sm bg-gray-200 rounded-md">
                <span>공개된 약속</span>
                <span className="text-xs text-gray-500">2</span>
              </button>
            </div>
          </div>
        </ModalWrapper>
      )}
      {deleteAlertOpen && selectedFriend && (
        <ModalWrapper backgroundColor="transparent">
          <div
            className="flex items-center justify-center w-full h-full text-sm"
            onClick={() => {
              setDeleteAlertOpen(false);
              setProfileDetailOpen(true);
            }}
          >
            <div
              className="relative flex flex-col items-center gap-4 px-10 py-8 border border-gray-200 border-solid rounded-md bg-gray-50"
              onClick={(e) => e.stopPropagation()}
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="absolute text-lg cursor-pointer right-3 top-3"
                onClick={() => {
                  setDeleteAlertOpen(false);
                  setProfileDetailOpen(true);
                }}
              />

              <p>{selectedFriend.name} 님을 친구 목록에서 삭제하시겠습니까?</p>
              <div className="flex justify-center w-full gap-4 text-xs">
                <button
                  className="px-4 py-2 bg-white border border-gray-200 border-solid rounded-md"
                  onClick={() => {
                    setDeleteAlertOpen(false);
                    setProfileDetailOpen(true);
                  }}
                >
                  취소
                </button>
                <button
                  className="px-4 rounded-md py- bg-customYellow"
                  onClick={() => handleDeleteFriend(selectedFriend.memberId)}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        </ModalWrapper>
      )}
      {isAlert && (
        <AlertMessage message={isAlert} setClose={() => setIsAlert(null)} />
      )}
      <Menubar />
    </>
  );
}
