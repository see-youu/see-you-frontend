import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        SeeYoo MainPage
        <br />
        <Link href='/hello'>
          <button>go to hello page</button>
        </Link>
      </div>
    </main>
  );
}
