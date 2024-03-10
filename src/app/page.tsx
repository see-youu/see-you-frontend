import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        SeeYoo MainPage
        <br />
        <Link href="/hello">
          <button>go to hello page</button>
        </Link>
        <Link href="/login">
          <button
            type="button"
            className="block rounded bg-yellow-300 text-sm px-6 pb-2 pt-2.5 font-medium uppercase s text-whit"
          >
            로그인
          </button>
        </Link>
      </div>
    </main>
  );
}
