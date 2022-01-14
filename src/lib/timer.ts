export const sleep = async (wait: number = 5000) => {
  return new Promise((res, rej) => {
    setTimeout(() => res(true), 5000);
  });
};
