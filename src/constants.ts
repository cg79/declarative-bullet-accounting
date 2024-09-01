// const DEV = window.location.href.indexOf("localhost") > -1;

const BULLET_IO_URL = () => {
  // return DEV ? "http://localhost:3002" : "https://quickconta.ro";
  // return "http://localhost:3002";
  return 'https://quickconta.ro';
};

const SCREEN = {
  POPUP: 480,
  SMALL: 320,
  MOBILE: 600,
  TABLET: 1024,
  DESKTOP: 1280,
};

export { BULLET_IO_URL, SCREEN };
