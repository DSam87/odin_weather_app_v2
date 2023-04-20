const searchForm = document.querySelector(".app-form");
const cityNameContainer = document.querySelector(".city-name-container h2");
const appDisplayContainer = document.querySelector(".app-display-container");
const appDisplayLogo = document.querySelector(".app-display-logo");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  app.setLocationName(e.target["city-input"].value);
  app.apiSearch(e.target["city-input"].value);
  e.target["city-input"].value = "";
  app.updateDomContent();
});

const app = (function () {
  let location = "";
  let locationLat;
  let locationLang;
  let currentJsonData;
  let backgroundUrl;

  function setLocationName(locationName) {
    updateLocation(
      locationName.charAt(0).toUpperCase() + locationName.slice(1).toLowerCase()
    );
    updateDomLocation();
  }

  function updateDomLocation() {
    cityNameContainer.innerHTML = location;
  }

  function updateLocation(locationName) {
    location = locationName;
  }

  function getCurrentLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  // api search location
  async function apiSearch(location) {
    console.log(location);
    const request =
      await fetch(`http://api.weatherapi.com/v1/current.json?key=4b15ef2ee0bb4c44a9c203050231204&q=${location}&aqi=no
    `);

    currentJsonData = await request.json();
    await updateDomContent();
    setLocationName(currentJsonData.location.name);
  }

  // clearDomContent
  function clearDomContent() {
    console.log("clearDomContent");
  }

  // uploadDomContent
  async function updateDomContent() {
    appDisplayLogo.classList.add("active");
    appDisplayLogo.classList.add("loading");
    await new Promise((resolve, reject) => {
      appDisplayLogo.style.backgroundImage = `url(${"./imgs/loading-gif.gif"})`;
      setTimeout(() => {
        resolve();
      }, 1500);
    });
    appDisplayLogo.classList.remove("active");
    appDisplayLogo.classList.remove("loading");
    console.log(currentJsonData.current.condition.icon);
    appDisplayLogo.style.backgroundImage = `url(${currentJsonData.current.condition.icon})`;
  }

  async function startApp() {
    const data = await getCurrentLocation();
    const request =
      await fetch(`http://api.weatherapi.com/v1/current.json?key=4b15ef2ee0bb4c44a9c203050231204&q=${data.coords.latitude},${data.coords.longitude}&aqi=no
    `);

    currentJsonData = await request.json();
    updateDomContent();
    setLocationName(currentJsonData.location.name);
  }

  return {
    startApp,
    getCurrentLocation,
    setLocationName,
    updateDomContent,
    apiSearch,
  };
})();

app.getCurrentLocation();
app.startApp();
