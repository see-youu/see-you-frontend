"use client";
import { useEffect, useState } from "react";
import SubmitButton from "../../components/button/SubmitButton";
import InputField from "../../components/input/InputField";
import InputSection from "../../components/input/InputSection";
import { UserType } from "@/types/userType";
import useValidation from "@/hooks/useValidation";
import useTimer from "@/hooks/useTimer";
import { phoneNumberParse } from "@/utils/parseFormat";

const INITIAL_TIMER = 10;

type Step0Props = {
  onNext: () => void;
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
};

const Step0: React.FC<Step0Props> = ({ onNext, user, setUser }) => {
  const [timer, setTimer] = useTimer();
  const [buttonText, setButtonText] = useState<string>("인증번호 전송");
  const [phoneNumber, setPhoneNumber] = useState<string>(user.phone);
  const [numberCode, setNumberCode] = useState<string>("");

  const { validState, handleValidPhoneNumber, handleValidPhoneCode } =
    useValidation();

  const onStepNext = () => {
    if (validState.phoneNumber) onNext();
  };

  const onSendCode = () => {
    console.log("인증코드 전송");
  };

  const handleCheckCode = () => {
    if (validState.phoneCode.valid) {
      setUser((current: UserType) => ({
        ...current,
        phone: phoneNumber,
      }));
      onStepNext();
    }
  };

  const handleSendCode = () => {
    if (validState.phoneNumber.valid) {
      onSendCode();
      setTimer(INITIAL_TIMER);
    }
  };

  useEffect(() => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    if (timer === 0) setButtonText("인증번호 전송");
    else if (timer > 0) {
      setButtonText(
        `재전송 (${minutes}:${seconds < 10 ? `0${seconds}` : seconds})`
      );
    }
  }, [timer]);
  return (
    <>
      <h2 className="text-lg">전화번호 인증</h2>
      <InputSection label="전화번호" className="gap-2">
        <div className="flex gap-2">
          <InputField
            type="text"
            placeholder="전화번호를 입력하세요."
            width="w-60"
            value={phoneNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const withHypenNumber = phoneNumberParse(e.target.value);
              setPhoneNumber(withHypenNumber);
            }}
            onBlur={() => handleValidPhoneNumber(phoneNumber)}
            error={validState.phoneNumber.valid === false}
            errorMessage={validState.phoneNumber.message}
          />
          <SubmitButton
            width="w-28"
            disabled={buttonText !== "인증번호 전송" || phoneNumber === ""}
            onClick={handleSendCode}
          >
            {buttonText}
          </SubmitButton>
        </div>
        <InputField
          type="text"
          placeholder="인증코드를 입력하세요. (현재 코드는 1234)"
          value={numberCode}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNumberCode(e.target.value)
          }
          onBlur={() => handleValidPhoneCode(numberCode)}
          error={validState.phoneCode.valid === false}
          errorMessage={validState.phoneCode.message}
        />
        <SubmitButton
          onClick={handleCheckCode}
          disabled={!validState.phoneNumber.valid || numberCode === ""}
        >
          확인
        </SubmitButton>
      </InputSection>
    </>
  );
};

export default Step0;
