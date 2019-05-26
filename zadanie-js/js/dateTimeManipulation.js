export const currentDateAndTime = () => {
  const today = new Date();
  const date = `${today.getDate()}.${today.getMonth() +
    1}.${today.getFullYear()}`;
  const hours =
    today.getHours() < 10 ? "0" + today.getHours() : today.getHours();
  const minutes =
    today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
  const formattedTime = `${hours}:${minutes}`;
  const formattedDateTime = `${date} ${formattedTime}`;
  return formattedDateTime;
};

export const convertToDateTime = timestamp => {
  const date = new Date(timestamp * 1000);
  const day = date.getDate() < 10 ? "0" + (date.getDate() + 1) : date.getDate();
  const month =
    date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth();
  let formattedDate = `${day}.${month}.${date.getFullYear()}`;
  const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const formattedTime = `${hours}:${minutes}`;
  formattedDate = `${formattedDate} ${formattedTime}`;
  return formattedDate;
};

export const convertToTimestamp = date => {
  const splitDateAndTime = date.split(" ");
  const splitDate = splitDateAndTime[0].split(".");
  const toValidDateString = splitDate.reverse().join(".");
  const validDateAndTime = `${toValidDateString} ${splitDateAndTime[1]}`;
  const timestamp = Date.parse(validDateAndTime) / 1000;
  return timestamp;
};
