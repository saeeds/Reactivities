export const combineDateAndTime = (date: Date, time: Date) => {
  const timeString = time.getHours() + ':' + time.getMinutes + ':00';

  const yaer = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dateString = `${yaer}-${month}-${day}`;

  return new Date(dateString + ' ' + timeString);
};
