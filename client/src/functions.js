export const roundDate = (nearestDate) => {
  nearestDate = Date.parse(nearestDate);
  nearestDate = nearestDate + 86400000;
  nearestDate = new Date(nearestDate);
  nearestDate = nearestDate.toISOString("en-US", { timeZone: "GMT" });
  nearestDate = nearestDate.split("T");
  nearestDate = nearestDate[0];
  return nearestDate;
};

export const roundHour = (nearestDate, time) => {
  let timeArray = time.split(":").map(Number);
  if (timeArray[1] >= 30 && timeArray[0] === 23) {
    timeArray[0] = 0;
    const response = roundDate(nearestDate);
    nearestDate = response;
  } else if (timeArray[1] >= +30 && timeArray[0] !== 23) {
    timeArray[0] = timeArray[0] + 1;
  }
  return [timeArray[0], nearestDate];
};
