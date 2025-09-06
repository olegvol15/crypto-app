import { cryptoAssets, cryptoData } from "./data";

function fakeFetchCrypto() {
  return new Promise(resove => {
    setTimeout(() => {
      resove(cryptoData);
    }, 1);
  });
}

function fetchAssets() {
  return new Promise(resove => {
    setTimeout(() => {
      resove(cryptoAssets);
    }, 2);
  });
}

export { fakeFetchCrypto, fetchAssets };