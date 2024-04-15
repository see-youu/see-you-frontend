"use client";
import { signinUser } from "@/api/signin";
import CloseButton from "@/components/button/CloseButton";
import SocialLoginButton from "@/components/button/SocialLoginButton";
import SubmitButton from "@/components/button/SubmitButton";
import InputField from "@/components/input/InputField";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  // const [error, setError] = useState<string>("");
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const isSuccess = await signinUser(user);
      if (isSuccess) {
        router.push("/");
      } else window.alert("일치하는 회원정보가 없습니다.");
    } catch (err) {
      console.error(err);
      window.alert("일치하는 회원정보가 없습니다.");
    }
  };
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen gap-3">
      <CloseButton onClick={() => router.back()} />
      <h1 className="text-5xl gaegu mb-9 ">나랑노랑</h1>
      <form className="flex flex-col gap-2" onSubmit={onSubmit}>
        <InputField
          type="text"
          placeholder="아이디를 입력하세요."
          width="w-60"
          value={user.username}
          onChange={(e) =>
            setUser((current) => ({ ...current, username: e.target.value }))
          }
        />
        <InputField
          type="password"
          placeholder="비밀번호를 입력하세요."
          width="w-60"
          value={user.password}
          onChange={(e) =>
            setUser((current) => ({ ...current, password: e.target.value }))
          }
        />
        <SubmitButton width="w-60">로그인</SubmitButton>
        {/* {error && (
          <span className="text-sm text-center text-red-600">{error}</span>
        )} */}
      </form>
      <p className="flex my-2 text-xs divide-x divide-solid ">
        <span className="px-2 cursor-pointer">비밀번호 찾기</span>
        <Link href={"/signup"} className="px-2 cursor-pointer">
          회원가입
        </Link>
      </p>
      <section className="flex flex-col gap-1 my-2 text-sm">
        <SocialLoginButton bgColor="bg-yellow-300" textColor="text-black">
          카카오톡 로그인
        </SocialLoginButton>
        <SocialLoginButton bgColor="bg-green-500">
          네이버 로그인
        </SocialLoginButton>
        <SocialLoginButton bgColor="bg-black">애플 로그인</SocialLoginButton>
      </section>
    </div>
  );
}
