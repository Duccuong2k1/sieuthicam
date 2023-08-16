export const getDateFormString = (value: string) => {
  if (value !== "") {
    const date = value.split(" ")[0]; // Split by space and take the first part
    return date;
  }
};
