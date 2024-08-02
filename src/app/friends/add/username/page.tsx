"use client";
import {
  acceptFriendRequest,
  fetchFriendsRequestList,
  fetchSearchFriendUsername,
  sendFriendRequest,
} from "@/api/friends";
import Menubar from "@/components/menubar/Menubar";
import MenuHeader from "@/components/menubar/MenuHeader";
import { MemberType } from "@/types/scheduleType";
import { formatDate, formatTime } from "@/utils/parseFormat";
import { faAddressBook } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleUser,
  faSearch,
  faSpellCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";
import emptyImg from "@/../public/emptyImg.png";
import BottomSheet from "@/components/modal/BottomSheet";
import ModalWrapper from "@/components/modal/ModalWrapper";
import AlertMessage from "@/components/modal/AlertMessage";
import Link from "next/link";
import { getMemberId } from "@/utils/jwtToken";

interface FriendType {
  memberId: number;
  name: string;
  profileImageUrl: string | null;
}
export default function () {
  const [searchUsername, setSearchUsername] = useState<string>("");
  const [searchResult, setSearchResult] = useState<FriendType | null>();
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [isAlert, setIsAlert] = useState<string | null>(null);

  const handleSearch = async (searchUsername: string) => {
    if (searchUsername) {
      const data = await fetchSearchFriendUsername(searchUsername);
      if (data) setSearchResult(data);
      else setSearchResult(null);
    } else console.log("");
  };

  const handleSendRequest = async (memberId: number) => {
    const data = await sendFriendRequest(memberId);
    if (data) {
      setIsDetailOpen(false);
      setIsAlert("친구 요청을 보냈습니다.");
    } else setIsAlert("오류가 발생했습니다.");
  };

  return (
    <>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(searchUsername);
        }}
        className="relative z-10 w-4/5 mt-4"
      >
        <input
          type="text"
          className="w-full h-12 pl-2 pr-12 border border-black border-solid rounded-md"
          value={searchUsername}
          placeholder="검색할 ID를 입력하세요."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchUsername(e.target.value)
          }
        />
        <button className="absolute -translate-y-1/2 right-4 top-1/2">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
      <section className="w-full my-1 px-screen-x">
        {!!searchResult ? (
          <>
            <div className="flex items-end justify-between text-sm text-gray-500">
              <p>검색 결과</p>
            </div>
            <div className="flex items-center justify-between my-3">
              <div
                className="flex items-center gap-5 cursor-pointer"
                onClick={() => setIsDetailOpen(true)}
              >
                <Image
                  src={searchResult.profileImageUrl || emptyImg}
                  width={3 * 16} // 3rem
                  height={3 * 16} // 3rem
                  alt="profile"
                  className="block object-cover w-12 h-12 border border-gray-400 border-solid rounded-full"
                />
                <p>{searchResult.name}</p>
              </div>

              {getMemberId() === searchResult.memberId ? (
                <button
                  className="px-4 py-2 text-sm rounded-md bg-customYellow"
                  onClick={() => setIsDetailOpen(true)}
                >
                  내 프로필 보기
                </button>
              ) : (
                <button
                  className="px-4 py-2 text-sm rounded-md bg-customYellow"
                  onClick={() => handleSendRequest(searchResult.memberId)}
                >
                  요청
                </button>
              )}
            </div>
          </>
        ) : (
          <p className="text-sm text-center text-gray-500">
            검색 결과가 없습니다.
          </p>
        )}
      </section>
      {isDetailOpen && searchResult && (
        <ModalWrapper backgroundColor="transparent">
          <div
            className="flex items-center justify-center w-full h-full"
            onClick={() => {
              setIsDetailOpen(false);
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
                  setIsDetailOpen(false);
                }}
              />
              <Image
                src={emptyImg}
                width={4 * 16} // 3rem
                height={4 * 16} // 3rem
                alt="profile"
                className="block object-cover w-16 h-16 border border-gray-400 border-solid rounded-full y"
              />
              <p>{searchResult.name}</p>
              {getMemberId() !== searchResult.memberId && (
                <button
                  className="px-4 py-2 text-sm rounded-md bg-customYellow"
                  onClick={() => handleSendRequest(searchResult.memberId)}
                >
                  요청
                </button>
              )}
            </div>
          </div>
        </ModalWrapper>
      )}
      {isAlert && (
        <AlertMessage message={isAlert} setClose={() => setIsAlert(null)} />
      )}
    </>
  );
}
