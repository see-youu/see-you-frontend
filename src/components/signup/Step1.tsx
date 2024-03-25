import { validCheckNickname, validCheckUsername } from "@/api/validCheck";
import SubmitButton from "../button/SubmitButton";
import InputField from "../input/InputField";
import InputSection from "../input/InputSection";
import { useState } from "react";
import { UserType } from "@/types/userType";
import useValidation from "@/hooks/useValidation";

type ValidType = {
  username: boolean | null;
  confirmPassword: boolean | null;
  nickname: boolean | null;
};

type Step1Props = {
  onSubmit: () => void;
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
};

const Step1: React.FC<Step1Props> = ({ onSubmit, user, setUser }) => {
  const [tmpUser, setTmpUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    nickname: "",
    email: "",
  });
  const {
    valid,
    handleValidUsername,
    handleValidNickname,
    handleConfirmPassword,
  } = useValidation();

  return (
    <>
      <h2 className="text-lg">회원정보</h2>
      <form
        className="flex flex-col gap-3 w-80"
        onSubmit={(e) => {
          e.preventDefault();
          setUser({ ...tmpUser, phoneNumber: user.phoneNumber });
          onSubmit();
        }}
      >
        <InputSection label="아이디">
          <InputField
            required
            type="text"
            placeholder="아이디를 입력하세요."
            value={tmpUser.username}
            onChange={(e) => {
              setTmpUser((current) => ({
                ...current,
                username: e.target.value,
              }));
            }}
            onBlur={() => handleValidUsername(tmpUser.username)}
            error={valid.username === false}
          />
          {valid.username === false && (
            <span className="text-sm text-red-600">
              이미 사용중인 아이디입니다.
            </span>
          )}
        </InputSection>
        <InputSection label="비밀번호">
          <InputField
            required
            type="password"
            placeholder="비밀번호를 입력하세요."
            value={tmpUser.password}
            onChange={(e) => {
              setTmpUser((current) => ({
                ...current,
                password: e.target.value,
              }));
            }}
            onBlur={() =>
              handleConfirmPassword(tmpUser.password, tmpUser.confirmPassword)
            }
            error={valid.confirmPassword === false}
          />
          <InputField
            required
            type="password"
            placeholder="비밀번호를 한번 더 입력하세요."
            value={tmpUser.confirmPassword}
            onChange={(e) => {
              setTmpUser((current) => ({
                ...current,
                confirmPassword: e.target.value,
              }));
            }}
            onBlur={() =>
              handleConfirmPassword(tmpUser.password, tmpUser.confirmPassword)
            }
            error={valid.confirmPassword === false}
          />
          {valid.confirmPassword === false && (
            <span className="text-sm text-red-600">
              비밀번호가 일치하지 않습니다.
            </span>
          )}
        </InputSection>
        <InputSection label="이름">
          <InputField required type="text" placeholder="이름을 입력하세요." />
        </InputSection>
        <InputSection label="닉네임">
          <InputField
            required
            type="text"
            placeholder="닉네임을 입력하세요."
            value={tmpUser.nickname}
            onChange={(e) => {
              setTmpUser((current) => ({
                ...current,
                nickname: e.target.value,
              }));
            }}
            onBlur={() => handleValidNickname(tmpUser.nickname)}
            error={valid.nickname === false}
          />
          {valid.nickname === false && (
            <span className="text-sm text-red-600">
              이미 사용중인 닉네임입니다.
            </span>
          )}
        </InputSection>
        <InputSection label="이메일 (선택)">
          <InputField type="email" placeholder="이메일을 입력하세요." />
        </InputSection>
        <SubmitButton
          disabled={
            !valid.username || !valid.confirmPassword || !valid.nickname
          }
        >
          가입하기
        </SubmitButton>
      </form>
    </>
  );
};

export default Step1;
