import Link from "next/link";

export default function () {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3"
      style={{ height: `calc(100vh - var(--menubar-height))` }}
    >
      <Link
        className="w-48 px-5 py-5 text-lg text-center rounded-md cursor-pointer bg-customYellow"
        href="/schedule/korea"
      >
        국내 약속
      </Link>
      <Link
        className="w-48 px-5 py-5 text-lg text-center text-white rounded-md cursor-pointer bg-customBrown"
        href="/schedule/abroad"
      >
        해외 약속
      </Link>
    </div>
  );
}
