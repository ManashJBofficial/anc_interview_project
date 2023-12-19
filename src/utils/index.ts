// utils
export const getBirthYear = (birthYear: string) => {
  if (birthYear === "unknown") {
    return "unknown";
  }
  const matches = birthYear.match(/^(\d+)BBY$/);
  return matches ? parseInt(matches[1]) : 0;
};
