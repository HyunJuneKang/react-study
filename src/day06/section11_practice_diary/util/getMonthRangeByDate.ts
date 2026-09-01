export const getMonthRangeByDate = (date: Date) => {
  const beginTimeStamp = new Date(
    date.getFullYear(),
    date.getMonth(),
    1,
  ).getTime();
  const endTimeStamp = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
    23,
    59,
    59,
  ).getTime();
  return { beginTimeStamp, endTimeStamp };
};
