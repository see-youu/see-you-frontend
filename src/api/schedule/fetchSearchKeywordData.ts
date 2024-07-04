import axios from "axios";

export const fetchSearchKeywordData = async (searchPlace: string) => {
  try {
    const response = await axios.get(`/api/naver/search?query=${searchPlace}`);
    return response.data;
  } catch (error) {
    console.error("API 호출 중 에러 발생:", error);
  }
};
