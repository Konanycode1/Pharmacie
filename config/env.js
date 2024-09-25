const inProduction = process.NODE_ENV === "production";
const urlApi = inProduction ?'':"http://localhost:3000/";

module.exports = {
    inProduction,
    urlApi
}