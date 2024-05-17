export const fetchData = (callback: any) => {
  setTimeout(() => {
    callback("data");
  }, 1000);
};
