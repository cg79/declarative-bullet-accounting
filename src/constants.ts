const DEV = true;

const BULLET_IO_URL = () => {
  return DEV ? "http://localhost:3002" : "https://fullsd.com";
};

export { BULLET_IO_URL };
