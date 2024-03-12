"use client";
import { useEffect, useState } from "react";
import SubmitButton from "../button/SubmitButton";
import InputField from "../input/InputField";
import InputSection from "../input/InputSection";

const VALID_CODE = "1234";
const INITIAL_TIMER = 10;

type Step0Props = {
  onNext: () => void;
  onSendCode: () => void;
};

const Step0: React.FC<Step0Props> = ({ onNext, onSendCode }) => {
  const [timer, setTimer] = useState<number>(0);
  const [buttonText, setButtonText] = useState<string>("인증번호 전송");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [numberCode, setNumberCode] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (timer <= 0) {
      setButtonText("인증번호 전송");
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    if (timer > 0) {
      setButtonText(
        `재전송 (${minutes}:${seconds < 10 ? `0${seconds}` : seconds})`
      );
    }
  }, [timer]);

  const handleCheckCode = () => {
    if (numberCode === VALID_CODE) {
      onNext();
    } else setMessage("인증코드가 일치하지 않습니다.");
  };

  const handleSendCode = () => {
    onSendCode();
    setTimer(INITIAL_TIMER);
  };
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPhoneNumber(e.target.value)
            }
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
        />
        {!!message && (
          <span className="text-xs text-red-600">
            인증번호가 일치하지 않습니다.
          </span>
        )}
        <SubmitButton onClick={handleCheckCode}>확인</SubmitButton>
      </InputSection>
    </>
  );
};

export default Step0;
