import { validCheckNickname, validCheckUsername } from "@/api/validCheck";
import { ValidationState } from "@/types/signupValidType";
import { useState } from "react";

const useValidation = () => {
  const [validState, setValidState] = useState<ValidationState>({
    username: { valid: null, message: "", loading: false },
    nickname: { valid: null, message: "", loading: false },
    confirmPassword: { valid: null, message: "" },
    phoneNumber: { valid: null, message: "" },
  });

  const handleValidUsername = async (username: string) => {
    setValidState((current) => ({
      ...current,
      username: { ...current.username, loading: true },
    }));
    try {
      const isValid = await validCheckUsername(username);
      setValidState((current) => ({
        ...current,
        username: {
          valid: isValid,
          message: isValid ? "" : "이미 사용중인 아이디입니다.",
          loading: false,
        },
      }));
    } catch (error) {
      setValidState((current) => ({
        ...current,
        username: {
          valid: false,
          message: "사용 불가능한 아이디입니다.",
          loading: false,
        },
      }));
    }
  };

  const handleValidNickname = async (nickname: string) => {
    try {
      const isValid = await validCheckNickname(nickname);
      setValidState((current) => ({
        ...current,
        nickname: {
          valid: isValid,
          message: isValid ? "" : "이미 사용중인 닉네임입니다.",
          loading: false,
        },
      }));
    } catch (error) {
      setValidState((current) => ({
        ...current,
        nickname: {
          valid: false,
          message: "사용 불가능한 닉네임입니다.",
          loading: false,
        },
      }));
    }
  };

  const handleConfirmPassword = (password: string, confirmPassword: string) => {
    const isValid = !!confirmPassword && password === confirmPassword;
    setValidState((current) => ({
      ...current,
      confirmPassword: {
        valid: isValid,
        message: isValid ? "" : "비밀번호가 일치하지 않습니다.",
      },
    }));
  };

  const handleValidPhoneNumber = (phoneNumber: string) => {
    const isValid = phoneNumber === "1234";
    setValidState((current) => ({
      ...current,
      phoneNumber: {
        valid: isValid,
        message: isValid ? "" : "전화번호가 유효하지 않습니다.",
      },
    }));
  };
  return {
    validState,
    handleValidUsername,
    handleValidNickname,
    handleConfirmPassword,
    handleValidPhoneNumber,
  };
};

export default useValidation;
