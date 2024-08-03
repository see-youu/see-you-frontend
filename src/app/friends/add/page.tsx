"use client";
import {
  acceptFriendRequest,
  fetchFriendsRequestList,
  rejectFriendRequest,
} from "@/api/friends";
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

const ACCEPT = "accept";
const REJECT = "reject";
interface RequestType {
  requestId: number;
  sender: {
    memberId: number;
    name: string;
    profileImageUrl: string | null;
  };
  createdDate: Date;
}

interface checkModalType {
  target: RequestType | null;
  isOpen: boolean;
  type: string;
}

export default function () {
  const [requests, setRequests] = useState<RequestType[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<RequestType | null>(
    null
  );
  const [isAlert, setIsAlert] = useState<string | null>(null);
  const [checkAlertOpen, setCheckAlertOpen] = useState<checkModalType>({
    target: null,
    isOpen: false,
    type: "",
  });

  const fetchRequests = async () => {
    const data = await fetchFriendsRequestList();
    setRequests(data);
  };

  const handleAcceptRequest = async (requestId: number) => {
    const data = await acceptFriendRequest(requestId);
    if (data) {
      setIsAlert("친구 요청을 수락하였습니다.");
      setSelectedRequest(null);
      setCheckAlertOpen({ target: null, isOpen: false, type: "" });
    } else setIsAlert("오류가 발생했습니다.");
    fetchRequests();
  };

  const handleRejectRequest = async (requestId: number) => {
    const data = await rejectFriendRequest(requestId);
    if (data) {
      setIsAlert("친구 요청을 거절하였습니다.");
      setSelectedRequest(null);
      setCheckAlertOpen({ target: null, isOpen: false, type: "" });
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
                  src={request.sender.profileImageUrl || emptyImg}
                  width={3 * 16} // 3rem
                  height={3 * 16} // 3rem
                  alt="profile"
                  className="block object-cover w-12 h-12 border border-gray-400 border-solid rounded-full"
                />
                <p>{request.sender.name}</p>
              </div>
              <div className="flex gap-2 text-xs">
                {/* {formatDate(request.createdDate)}{" "}
                  {formatTime(request.createdDate)} */}
                <button
                  className="px-4 py-2 bg-white border border-gray-200 border-solid rounded-md"
                  onClick={() => {
                    setCheckAlertOpen({
                      target: request,
                      isOpen: true,
                      type: REJECT,
                    });
                  }}
                >
                  거절
                </button>
                <button
                  className="px-4 py-2 rounded-md bg-customYellow"
                  onClick={() => {
                    setCheckAlertOpen({
                      target: request,
                      isOpen: true,
                      type: ACCEPT,
                    });
                  }}
                >
                  수락
                </button>
              </div>
            </div>
          ))}
      </section>
      {!!selectedRequest && !checkAlertOpen.isOpen && (
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
                src={selectedRequest.sender.profileImageUrl || emptyImg}
                width={4 * 16} // 3rem
                height={4 * 16} // 3rem
                alt="profile"
                className="block object-cover w-16 h-16 border border-gray-400 border-solid rounded-full y"
              />
              <p>{selectedRequest.sender.name}</p>
              <div className="flex justify-center w-full gap-4 text-sm">
                <button
                  className="px-4 py-2 bg-white border border-gray-200 border-solid rounded-md"
                  onClick={() =>
                    setCheckAlertOpen({
                      target: selectedRequest,
                      isOpen: true,
                      type: REJECT,
                    })
                  }
                >
                  거절
                </button>
                <button
                  className="px-4 py-2 rounded-md bg-customYellow"
                  onClick={() =>
                    setCheckAlertOpen({
                      target: selectedRequest,
                      isOpen: true,
                      type: ACCEPT,
                    })
                  }
                >
                  수락
                </button>
              </div>
            </div>
          </div>
        </ModalWrapper>
      )}
      {checkAlertOpen.isOpen && checkAlertOpen.target && (
        <ModalWrapper backgroundColor="transparent">
          <div
            className="flex items-center justify-center w-full h-full text-sm"
            onClick={() =>
              setCheckAlertOpen({ target: null, isOpen: false, type: "" })
            }
          >
            <div
              className="relative flex flex-col items-center gap-4 px-10 py-8 border border-gray-200 border-solid rounded-md bg-gray-50"
              onClick={(e) => e.stopPropagation()}
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="absolute text-lg cursor-pointer right-3 top-3"
                onClick={() =>
                  setCheckAlertOpen({ target: null, isOpen: false, type: "" })
                }
              />

              <p>
                {`${checkAlertOpen.target.sender.name} 님을 친구 요청을 ${
                  checkAlertOpen.type === ACCEPT ? "수락" : "거절"
                }하시겠습니까?`}
              </p>
              <div className="flex justify-center w-full gap-4 text-xs">
                <button
                  className="px-4 py-2 bg-white border border-gray-200 border-solid rounded-md"
                  onClick={() =>
                    setCheckAlertOpen({ target: null, isOpen: false, type: "" })
                  }
                >
                  취소
                </button>
                <button
                  className="px-4 rounded-md py- bg-customYellow"
                  onClick={() => {
                    if (checkAlertOpen.target) {
                      checkAlertOpen.type === ACCEPT
                        ? handleAcceptRequest(checkAlertOpen.target.requestId)
                        : handleRejectRequest(checkAlertOpen.target.requestId);
                    }
                  }}
                >
                  확인
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
