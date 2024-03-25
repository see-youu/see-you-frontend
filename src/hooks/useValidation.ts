import { validCheckNickname, validCheckUsername } from "@/api/validCheck";
import { ValidType } from "@/types/signupValidType";
import { useState } from "react";

const useValidation = () => {
  const [valid, setValid] = useState<ValidType>({
    username: null,
    confirmPassword: null,
    nickname: null,
    phoneNumber: null,
  });

  const handleValidUsername = async (username: string) => {
    const isValid = await validCheckUsername(username);
    setValid((current) => ({ ...current, username: isValid }));
  };

  const handleValidNickname = async (nickname: string) => {
    const isValid = await validCheckNickname(nickname);
    setValid((current) => ({ ...current, nickname: isValid }));
  };

  const handleConfirmPassword = (password: string, confirmPassword: string) => {
    !!confirmPassword && password === confirmPassword
      ? setValid((current) => ({
          ...current,
          confirmPassword: true,
        }))
      : setValid((current) => ({
          ...current,
          confirmPassword: false,
        }));
  };

  const handleValidPhoneNumber = (phoneNumber: string) => {
    const valid = phoneNumber === "1234";
    setValid((current) => ({ ...current, phoneNumber: valid }));
  };
  return {
    valid,
    handleValidUsername,
    handleValidNickname,
    handleConfirmPassword,
    handleValidPhoneNumber,
  };
};

export default useValidation;
