"use client";
import Step0 from "@/components/signup/Step0";
import Step1 from "@/components/signup/Step1";
import { UserType } from "@/types/userType";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { ReactElement, useState } from "react";

const Signup = () => {
  const [step, setStep] = useState(0);

  const [user, setUser] = useState<UserType>({
    phoneNumber: "",
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    nickname: "",
    email: "",
  });

  const router = useRouter();

  const onStepBack = () => {
    console.log(step);
    if (step > 0) setStep((current) => current - 1);
    else router.back();
  };

  const onStepNext = () => {
    setStep((current) => current + 1);
  };

  const onSubmit = () => {
    window.alert("가입이 완료되었습니다.");
    router.push("/login");
  };

  const onSendCode = () => {
    console.log("인증코드 전송");
  };

  const stepComponents: { [key: number]: ReactElement } = {
    0: (
      <Step0
        onNext={onStepNext}
        onSendCode={onSendCode}
        user={user}
        setUser={setUser}
      />
    ),
    1: <Step1 onSubmit={onSubmit} user={user} setUser={setUser} />,
  };

  const renderStep = () => stepComponents[step] || <div>Invalid Step</div>;

  return (
    <div className="flex flex-col items-center min-h-screen gap-6">
      <header className="box-border relative flex justify-start w-full p-4 text-gray-500 cursor-pointer">
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="text-2xl"
          onClick={onStepBack}
          style={{ fontSize: "1.5rem" }}
        />
        <h1
          className="absolute left-2/4"
          style={{ transform: "translateX(-50%)" }}
        >
          회원가입
        </h1>
      </header>
      {renderStep()}
    </div>
  );
};

export default Signup;
