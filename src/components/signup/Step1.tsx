import SubmitButton from "../button/SubmitButton";
import InputField from "../input/InputField";
import InputSection from "../input/InputSection";
import { useState } from "react";
import { UserType } from "@/types/userType";
import useValidation from "@/hooks/useValidation";

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
    validState,
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
            placeholder="영문 시작 4~20자 (숫자, 기호 _ . - 사용 가능)"
            value={tmpUser.username}
            onChange={(e) => {
              setTmpUser((current) => ({
                ...current,
                username: e.target.value,
              }));
            }}
            onBlur={() => handleValidUsername(tmpUser.username)}
            error={validState.username.valid === false}
            errorMessage={validState.username.message}
          />
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
            error={validState.confirmPassword.valid === false}
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
            error={validState.confirmPassword.valid === false}
            errorMessage={validState.confirmPassword.message}
          />
        </InputSection>
        <InputSection label="이름">
          <InputField
            required
            type="text"
            placeholder="이름을 입력하세요."
            value={tmpUser.name}
            onChange={(e) => {
              setTmpUser((current) => ({
                ...current,
                name: e.target.value,
              }));
            }}
          />
        </InputSection>
        <InputSection label="닉네임">
          <InputField
            required
            type="text"
            placeholder="영문, 한글, 숫자, _ 사용하여 2~20자"
            value={tmpUser.nickname}
            onChange={(e) => {
              setTmpUser((current) => ({
                ...current,
                nickname: e.target.value,
              }));
            }}
            onBlur={() => handleValidNickname(tmpUser.nickname)}
            error={validState.nickname.valid === false}
            errorMessage={validState.nickname.message}
          />
        </InputSection>
        <InputSection label="이메일 (선택)">
          <InputField
            type="email"
            placeholder="이메일을 입력하세요."
            value={tmpUser.email}
            onChange={(e) => {
              setTmpUser((current) => ({
                ...current,
                email: e.target.value,
              }));
            }}
          />
        </InputSection>
        <SubmitButton
          disabled={
            !validState.username.valid ||
            !validState.confirmPassword.valid ||
            !validState.nickname.valid ||
            tmpUser.name === ""
          }
        >
          가입하기
        </SubmitButton>
      </form>
    </>
  );
};

export default Step1;
