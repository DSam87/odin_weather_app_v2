const app = (function () {
  let location = "";
  let locationLat;
  let locationLang;
  let map;

  function updateLocation(name) {
    location = name;
  }

  // get current location
  function getCurrentLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  // api search location

  async function apiSearch() {
    const request =
      await fetch(`http://api.weatherapi.com/v1/current.json?key=4b15ef2ee0bb4c44a9c203050231204&q=${location}&aqi=no
    `);
  }

  // update dom location

  // loader icon

  // clearDomContent

  // uploadDomContent

  // store location

  async function startApp() {
    const data = await getCurrentLocation();
    const request =
      await fetch(`http://api.weatherapi.com/v1/current.json?key=4b15ef2ee0bb4c44a9c203050231204&q=${data.coords.latitude},${data.coords.longitude}&aqi=no
    `);

    const requestJson = await request.json();
  }

  function sayHello() {
    console.log(locationLat);
  }

  return {
    startApp,
    sayHello,
    getCurrentLocation,
  };
})();

app.getCurrentLocation();
app.startApp();
app.getCurrentLocation();
