import fetch from "node-fetch";

const run = async () => {
  const latitude = 39.98148953734068;
  const longitude = -75.15437782420149;

  const apiPointsRes = await (
    await fetch(`https://api.weather.gov/points/${latitude},${longitude}`)
  ).json();
  const apiForecastRes = await (
    await fetch(apiPointsRes.properties.forecast)
  ).json();

  console.info(`${"Period".padEnd(16)} | Temp | Forecast`);
  console.info("-".repeat(50));

  const isFirstForecastForTonight =
    apiForecastRes.properties.periods[0].name.toUpperCase() === "TONIGHT";
  apiForecastRes.properties.periods
    .slice(0, 5 + !isFirstForecastForTonight)
    .map((forecast) =>
      console.info(
        `${forecast.name.padEnd(16)} | ${String(forecast.temperature).padStart(
          2
        )}°  | ${forecast.shortForecast}`
      )
    );
};

run();
