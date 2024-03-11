"use client";
import Step0 from "@/components/signup/Step0";
import Step1 from "@/components/signup/Step1";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Signup = () => {
  const [step, setStep] = useState(0);
  const [numberCheck, setNumberCheck] = useState(true);

  const router = useRouter();

  const onStepBack = () => {
    console.log(step);
    if (step > 0) setStep((current) => current - 1);
    else router.back();
  };

  const onStepNext = () => {
    if (step == 0) {
      if (numberCheck) setStep(1);
    }
  };

  const onSubmit = () => {
    window.alert("가입이 완료되었습니다.");
    router.push("/login");
  };

  const onSendCode = () => {
    console.log("인증코드 전송");
  };

  const renderStep = () => {
    if (step == 0) {
      return <Step0 onNext={onStepNext} onSendCode={onSendCode} />;
    } else if (step == 1) {
      return <Step1 onSubmit={onSubmit} />;
    }
  };

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
