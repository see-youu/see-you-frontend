"use client";
import { fetchFriendsRequestList } from "@/api/friends";
import Menubar from "@/components/menubar/Menubar";
import MenuHeader from "@/components/menubar/MenuHeader";
import { MemberType } from "@/types/scheduleType";
import { formatDate, formatTime } from "@/utils/parseFormat";
import { faAddressBook } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleUser,
  faSpellCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";
import emptyImg from "@/../public/emptyImg.png";
import BottomSheet from "@/components/modal/BottomSheet";
import ModalWrapper from "@/components/modal/ModalWrapper";

interface RequestType {
  requestId: number;
  sender: {
    memberId: number;
    name: string;
    profileImageUrl: string | null;
  };
  createdDate: Date;
}
export default function () {
  const [searchFriend, setSearchFriend] = useState("");
  const [foundFriend, setFoundFriend] = useState<MemberType[]>([]);
  const [requests, setRequests] = useState<RequestType[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<RequestType | null>(
    null
  );
  useEffect(() => {
    const fetchRequests = async () => {
      const data = await fetchFriendsRequestList();
      setRequests(data);
    };
    fetchRequests();
  }, []);
  return (
    <>
      <MenuHeader title="친구 추가" />
      <div
        className="flex flex-col items-center gap-5 overflow-y-auto"
        style={{
          height: `calc(100vh - var(--menuheader-height))`,
          paddingBottom: `var(--menubar-height)`,
        }}
      >
        <ul className="flex justify-center w-full gap-2 mt-4 text-xs">
          <li className="flex flex-col items-center justify-center h-16 gap-2 text-gray-500 border border-gray-500 border-solid cursor-pointer w-28 rounded-xl">
            <FontAwesomeIcon icon={faCircleUser} className="text-xl" />
            <span>ID로 검색</span>
          </li>
          <li className="flex flex-col items-center justify-center h-16 gap-2 text-gray-500 border border-gray-500 border-solid cursor-pointer w-28 rounded-xl">
            <FontAwesomeIcon icon={faAddressBook} className="text-xl" />
            <span>연락처로 검색</span>
          </li>
          <li className="flex flex-col items-center justify-center h-16 gap-2 text-gray-500 border border-gray-500 border-solid cursor-pointer w-28 rounded-xl">
            <FontAwesomeIcon icon={faSpellCheck} className="text-xl" />
            <span>닉네임으로 검색</span>
          </li>
        </ul>
        <section className="w-full my-1 px-screen-x">
          <div className="flex items-end justify-between text-sm text-gray-500">
            <p>대기중인 친구 요청 {requests.length}</p>
          </div>
          {!!requests &&
            requests.map((request) => (
              <div
                className="flex items-center justify-between my-3 cursor-pointer"
                key={request.requestId}
                onClick={() => setSelectedRequest(request)}
              >
                <div className="flex items-center gap-5">
                  <Image
                    src={emptyImg}
                    width={3 * 16} // 3rem
                    height={3 * 16} // 3rem
                    alt="profile"
                    className="block object-cover w-12 h-12 border border-gray-400 border-solid rounded-full"
                  />
                  <p>{request.sender.name}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {formatDate(request.createdDate)}{" "}
                  {formatTime(request.createdDate)}
                </div>
              </div>
            ))}
        </section>
        {!!selectedRequest && (
          <ModalWrapper backgroundColor="transparent">
            <div
              className="flex items-center justify-center w-full h-full"
              onClick={() => {
                setSelectedRequest(null);
              }}
            >
              <div className="relative flex flex-col items-center gap-8 py-10 border border-gray-200 border-solid rounded-sm bg-gray-50 px-14" onClick={(e)=>e.stopPropagation()}>
                <FontAwesomeIcon
                  icon={faXmark}
                  className="absolute right-2 top-2"
                  onClick={() => {
                    setSelectedRequest(null);
                  }}
                />
                <Image
                  src={emptyImg}
                  width={4 * 16} // 3rem
                  height={4 * 16} // 3rem
                  alt="profile"
                  className="block object-cover w-16 h-16 border border-gray-400 border-solid rounded-full y"
                />
                <p>{selectedRequest.sender.name}</p>
                <div className="flex justify-center w-full gap-4">
                  <button className="px-4 py-2 bg-white border border-gray-200 border-solid">
                    거절하기
                  </button>
                  <button className="px-4 py-2 bg-customYellow">
                    수락하기
                  </button>
                </div>
              </div>
            </div>
          </ModalWrapper>
        )}
      </div>
      {/* <div
        className="flex flex-col items-center gap-3 overflow-y-auto"
        style={{
          height: `calc(100vh - var(--menuheader-height))`,
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
            <p>검색 결과</p>
          </div>
          {foundFriend.map((member) => (
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
      </div> */}

      <Menubar />
    </>
  );
}
