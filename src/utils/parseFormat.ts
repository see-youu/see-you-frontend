export const phoneNumberParse = (phoneNumber: string) => {
  if (phoneNumber.length === 4 && phoneNumber[3] !== "-")
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 4)}`;
  else if (phoneNumber.length === 9 && phoneNumber[8] !== "-")
    return `${phoneNumber.slice(0, 8)}-${phoneNumber.slice(8, 9)}`;
  else return phoneNumber;
};

export const formatDate = (dateString: Date) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  return `${year}-${formattedMonth}-${formattedDay}`;
};

export const formatTime = (dateString: Date) => {
  const date = new Date(dateString);
  const hour = date.getHours();
  const minute = date.getMinutes();

  const formattedHour = hour < 10 ? `0${hour}` : hour;
  const formattedMinute = minute < 10 ? `0${minute}` : minute;

  return `${formattedHour}:${formattedMinute}:00`;
};

export const differenceInDays = (start: Date, end: Date): number => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const differenceInMilliseconds = endDate.getTime() - startDate.getTime(); // 두 날짜의 차이를 밀리초 단위로 계산
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24); // 밀리초를 일수로 변환

  return differenceInDays + 1;
};
