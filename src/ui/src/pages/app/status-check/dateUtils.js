import dayjs from "dayjs";

export const getToday = () => dayjs().format("YYYY-MM-DD");

export const getFormattedDate = (date) => dayjs(date).format("YYYY-MM-DD");

export const isToday = (date) =>
  dayjs(date).isSame(dayjs(), "day");