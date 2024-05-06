import SubmitButton from "../button/SubmitButton";
import InputField from "../input/InputField";
import InputSection from "../input/InputSection";
import { useState } from "react";
import { UserType } from "@/types/userType";
import useValidation from "@/hooks/useValidation";
import { signupUser } from "@/api/signup";
import { useRouter } from "next/navigation";

type Step1Props = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
};

const Step1: React.FC<Step1Props> = ({ user, setUser }) => {
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
    handleValidPassword,
    handleConfirmPassword,
  } = useValidation();

  const router = useRouter();

  const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { confirmPassword, ...restOfTmpUser } = tmpUser;
    setUser({ ...restOfTmpUser, phone: user.phone });
    // const cleanedUser = cleanObject({ ...restOfTmpUser, phone: user.phone });
    const isSuccess = await signupUser({ ...restOfTmpUser, phone: user.phone });
    if (isSuccess) {
      router.push("/signin");
    }
  };

  return (
    <>
      <h2 className="text-lg">회원정보</h2>
      <form className="flex flex-col gap-3 w-80" onSubmit={onSignup}>
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
          <span className="text-xs text-gray-600">
            * 영문 시작 4~20자 (숫자, 기호 _ . - 사용 가능)
          </span>
        </InputSection>
        <InputSection label="비밀번호">
          <InputField
            required
            type="password"
            placeholder="문자, 숫자, 기호를 포함한 최소 8자 이상"
            value={tmpUser.password}
            onChange={(e) => {
              setTmpUser((current) => ({
                ...current,
                password: e.target.value,
              }));
            }}
            onBlur={() => handleValidPassword(tmpUser.password)}
            error={validState.password.valid === false}
            errorMessage={validState.password.message}
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
          <span className="text-xs text-gray-600">
            * 문자, 숫자, 기호를 포함한 최소 8자 이상
          </span>
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
          <span className="text-xs text-gray-600">
            * 영문, 한글, 숫자, _ 사용하여 2~20자
          </span>
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
            !validState.nickname.valid
          }
        >
          가입하기
        </SubmitButton>
      </form>
    </>
  );
};

export default Step1;
