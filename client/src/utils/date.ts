export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const calculateFullYearDiff = (
  date1: string | number,
  date2: string | number
): number => {
  const date1Obj = new Date(date1);
  const date2Obj = new Date(date2);

  let diffYears = date2Obj.getFullYear() - date1Obj.getFullYear();
  let diffMonths = date2Obj.getMonth() - date1Obj.getMonth();
  let diffDays = date2Obj.getDate() - date1Obj.getDate();

  if (diffDays < 0) {
    diffMonths--;
  }
  if (diffMonths < 0) {
    diffYears--;
  }

  return diffYears;
};

export const getRuntimeLabel = (mins: number): string => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;

  const labels = [];
  if (h) {
    labels.push(`${h}ч`);
  }
  if (m) {
    labels.push(`${m}мин`);
  }
  return labels.join(' ');
};
