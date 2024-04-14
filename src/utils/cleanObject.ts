import { UserType } from "@/types/userType";

export function cleanObject(obj: UserType): UserType {
  const cleaned: Partial<UserType> = {};
  Object.keys(obj).forEach((key) => {
    const value = obj[key as keyof UserType];
    if (value !== "" && value !== null && value !== undefined) {
      cleaned[key as keyof UserType] = value;
    }
  });
  return cleaned as UserType;
}
