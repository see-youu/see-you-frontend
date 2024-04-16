import {
  validCheckNickname,
  validCheckPhoneNumber,
  validCheckUsername,
} from "@/api/validCheck";
import { ValidationState } from "@/types/signupValidType";
import { useState } from "react";

const useValidation = () => {
  const [validState, setValidState] = useState<ValidationState>({
    username: { valid: null, message: "", loading: false },
    nickname: { valid: null, message: "", loading: false },
    password: { valid: null, message: "", loading: false },
    confirmPassword: { valid: null, message: "" },
    phoneNumber: { valid: null, message: "" },
    phoneCode: { valid: null, message: "" },
  });

  const handleValidUsername = async (username: string) => {
    const pattern = /^[A-Za-z][A-Za-z0-9._-]{3,19}$/;
    setValidState((current) => ({
      ...current,
      username: { ...current.username, loading: true },
    }));
    const isPattern = pattern.test(username);
    setValidState((current) => ({
      ...current,
      username: {
        valid: isPattern,
        message: isPattern ? "" : "아이디 형식에 일치하지 않습니다.",
        loading: false,
      },
    }));
    if (isPattern) {
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
    }
  };

  const handleValidNickname = async (nickname: string) => {
    const pattern = /^[A-Za-z0-9_\uAC00-\uD7A3]{2,20}$/;
    setValidState((current) => ({
      ...current,
      nickname: { ...current.nickname, loading: true },
    }));
    const isPattern = pattern.test(nickname);
    setValidState((current) => ({
      ...current,
      nickname: {
        valid: isPattern,
        message: isPattern ? "" : "닉네임 형식에 일치하지 않습니다.",
        loading: false,
      },
    }));
    if (isPattern) {
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
    }
  };

  const handleValidPassword = async (password: string) => {
    const pattern = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W).{8,}$/;
    setValidState((current) => ({
      ...current,
      password: { ...current.password, laoding: true },
    }));
    const isPattern = pattern.test(password);
    setValidState((current) => ({
      ...current,
      password: {
        valid: isPattern,
        message: isPattern ? "" : "비밀번호 형식에 일치하지 않습니다.",
        loading: false,
      },
    }));
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

  const handleValidPhoneNumber = async (phoneNumber: string) => {
    const pattern = /^\d{3}-\d{3,4}-\d{4}$/;
    setValidState((current) => ({
      ...current,
      phoneNumber: { ...current.phoneNumber, loading: true },
    }));
    const isPattern = pattern.test(phoneNumber);
    setValidState((current) => ({
      ...current,
      phoneNumber: {
        valid: isPattern,
        message: isPattern ? "" : "전화번호 형식에 일치하지 않습니다.",
        loading: false,
      },
    }));
    if (isPattern) {
      try {
        const isValid = await validCheckPhoneNumber(phoneNumber);
        setValidState((current) => ({
          ...current,
          phoneNumber: {
            valid: isValid,
            message: isValid ? "" : "이미 등록된 전화번호입니다.",
            loading: false,
          },
        }));
      } catch (error) {
        setValidState((current) => ({
          ...current,
          phoneNumber: {
            valid: false,
            message: "사용 불가능한 전화번호입니다.",
            loading: false,
          },
        }));
      }
    }
  };

  const handleValidPhoneCode = (code: string) => {
    const isValid = code === "1234";
    setValidState((current) => ({
      ...current,
      phoneCode: {
        valid: isValid,
        message: isValid ? "" : "인증코드가 일치하지 않습니다.",
      },
    }));
  };

  return {
    validState,
    handleValidUsername,
    handleValidNickname,
    handleValidPassword,
    handleConfirmPassword,
    handleValidPhoneNumber,
    handleValidPhoneCode,
  };
};

export default useValidation;
