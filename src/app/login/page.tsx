"use client";
import CloseButton from "@/components/button/CloseButton";
import SocialLoginButton from "@/components/button/SocialLoginButton";
import SubmitButton from "@/components/button/SubmitButton";
import InputField from "@/components/input/InputField";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen gap-3">
      <CloseButton onClick={() => router.back()} />
      <h1 className="text-5xl gaegu mb-9 ">나랑노랑</h1>
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <InputField
          type="text"
          placeholder="아이디를 입력하세요."
          width="w-60"
        />
        <InputField
          type="password"
          placeholder="비밀번호를 입력하세요."
          width="w-60"
        />
        <SubmitButton width="w-60">로그인</SubmitButton>
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
