"use client";
import React, { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import NaverMap from "../map/NaverMap";
import axios from "axios";

interface InsertModalProps {
  handleClose: React.MouseEventHandler<HTMLDivElement>;
}

const InsertLocationModal: React.FC<InsertModalProps> = ({ handleClose }) => {
  const [data, setData] = useState(null);
  const [searchPlace, setSearchPlace] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/api/naver/search?query=${searchPlace}`
      );
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("API 호출 중 에러 발생:", error);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchPlace);
    fetchData();
  };

  return (
    <ModalWrapper handleClose={handleClose}>
      <div
        className="flex flex-col items-center gap-2 p-3 bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <span>장소 추가하기</span>
        <form action="" onSubmit={handleSearch}>
          <input
            type="text"
            className="h-8 border border-black border-solid rounded-md"
            value={searchPlace}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchPlace(e.target.value)
            }
          />
          <button>검색</button>
        </form>
        <NaverMap />
      </div>
    </ModalWrapper>
  );
};

export default InsertLocationModal;
