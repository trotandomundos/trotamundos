function searchCitiesforCountry(country) {

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(country),
  };

  let url = `https://restcountries.eu/rest/v2/name/${country}`;
  return fetch(url, options)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        return Promise.reject(new Error("Error al buscar ciudades"));
      }
    })
    .then((data) => {
      return data.map((city) => ({
        name: city.name,
        country: city.country,
      }));
    })
    .catch((error) => {
      console.log(error);
    });
}


