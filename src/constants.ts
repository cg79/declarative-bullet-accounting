const DEV = false;

const SETTINGS = {
  // SERVER_URL: "http://localhost:3001",

  //BULLET_KEY: "130bcd700342e122f80635d06ca2d52f",
  BULLET_USER: "claudiu9379@yahoo.com",
  BULLET_PASSWORD: "a1",
};

const BULLET_IO_URL = () => {
  return DEV ? "http://localhost:3002" : "https://fullsd.com";
};

export { SETTINGS, BULLET_IO_URL };
