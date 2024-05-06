"use client";
import { RootState } from "@/store/store";
import styles from "./page.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Home() {
  // console.log(useSelector((state: RootState) => state.userInfo.nickname));
  return (
    <main className={styles.main}>
      <div>
        SeeYoo MainPage
        <br />
        <Link href="/hello">
          <button>go to hello page</button>
        </Link>
        <Link href="/signin">
          <button
            type="button"
            className="block rounded bg-yellow-300 text-sm px-6 pb-2 pt-2.5 font-medium uppercase s text-whit"
          >
            로그인
          </button>
        </Link>
        <Link href="/signup">
          <button
            type="button"
            className="block rounded bg-yellow-500 text-sm px-6 pb-2 pt-2.5 font-medium uppercase s text-whit"
          >
            회원가입
          </button>
        </Link>
      </div>
    </main>
  );
}
