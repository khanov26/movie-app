export const ratingDeclension = (ratingValue: number) => {
  if (ratingValue === 1) {
    return 'балл';
  }
  if (ratingValue >= 5) {
    return 'баллов';
  }

  return 'балла';
};

export const yearDeclension = (age: number): string => {
  const lastDigit = age % 10;
  const lastNumbers = age % 100;

  if (lastDigit === 1 && lastNumbers !== 11) {
    return 'год';
  }

  if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastNumbers)) {
    return 'года';
  }

  return 'лет';
};
