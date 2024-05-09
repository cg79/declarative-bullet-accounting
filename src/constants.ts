const DEV = false;

const BULLET_IO_URL = () => {
  return DEV ? "http://localhost:3002" : "https://quickconta.ro";
};

export { BULLET_IO_URL };
