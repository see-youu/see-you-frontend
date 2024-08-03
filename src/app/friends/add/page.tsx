"use client";
import { acceptFriendRequest, fetchFriendsRequestList } from "@/api/friends";
import { MemberType } from "@/types/scheduleType";
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
import ModalWrapper from "@/components/modal/ModalWrapper";
import AlertMessage from "@/components/modal/AlertMessage";
import Link from "next/link";

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
  const [requests, setRequests] = useState<RequestType[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<RequestType | null>(
    null
  );
  const [isAlert, setIsAlert] = useState<string | null>(null);

  const fetchRequests = async () => {
    const data = await fetchFriendsRequestList();
    setRequests(data);
  };

  const handleAcceptRequest = async (requestId: number) => {
    const data = await acceptFriendRequest(requestId);
    if (data) {
      setIsAlert("친구 요청을 수락하였습니다.");
      setSelectedRequest(null);
    } else setIsAlert("오류가 발생했습니다.");
    fetchRequests();
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <>
      <ul className="flex justify-center w-full gap-2 mt-4 text-xs">
        <Link
          href={"/friends/add/username"}
          className="flex flex-col items-center justify-center h-16 gap-2 text-gray-500 border border-gray-500 border-solid cursor-pointer w-28 rounded-xl"
        >
          <FontAwesomeIcon icon={faCircleUser} className="text-xl" />
          <span>ID로 검색</span>
        </Link>
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
              className="flex items-center justify-between my-3"
              key={request.requestId}
            >
              <div
                className="flex items-center gap-5 cursor-pointer"
                onClick={() => setSelectedRequest(request)}
              >
                <Image
                  src={emptyImg}
                  width={3 * 16} // 3rem
                  height={3 * 16} // 3rem
                  alt="profile"
                  className="block object-cover w-12 h-12 border border-gray-400 border-solid rounded-full"
                />
                <p>{request.sender.name}</p>
              </div>
              <div className="flex gap-2 text-sm">
                {/* {formatDate(request.createdDate)}{" "}
                  {formatTime(request.createdDate)} */}
                <button className="px-4 py-2 bg-white border border-gray-200 border-solid rounded-md">
                  거절
                </button>
                <button
                  className="px-4 py-2 rounded-md bg-customYellow"
                  onClick={() => handleAcceptRequest(request.requestId)}
                >
                  수락
                </button>
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
            <div
              className="relative flex flex-col items-center gap-4 px-20 py-8 border border-gray-200 border-solid rounded-md bg-gray-50"
              onClick={(e) => e.stopPropagation()}
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="absolute text-lg cursor-pointer right-3 top-3"
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
              <div className="flex justify-center w-full gap-4 text-sm">
                <button className="px-4 py-2 bg-white border border-gray-200 border-solid rounded-md">
                  거절
                </button>
                <button
                  className="px-4 py-2 rounded-md bg-customYellow"
                  onClick={() => handleAcceptRequest(selectedRequest.requestId)}
                >
                  수락
                </button>
              </div>
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
