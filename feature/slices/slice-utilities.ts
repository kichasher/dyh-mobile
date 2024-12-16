export const updateArrayItem = <T>(array: T[], index: number, data: T) => {
  const newArray = [...array];
  newArray[index] = { ...newArray[index], ...data };
  return newArray;
};
