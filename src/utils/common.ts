export const ToUpperCaseFirstLetter = (str: string): string => {
  if (!str) return "";
  return `${str[0].toUpperCase()}${str.slice(1)}`;
};

// number la gia tri nhan vao, string la gia tri tra ve
export const ChangeColorMark = (mark: number): string => {
  if (mark >= 8) return 'green'; 
  if (mark >= 5) return 'goldenrod';
  return 'red';  
}
