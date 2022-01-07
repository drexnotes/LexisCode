
var raw = JSON.stringify({
  query: {
    query_string: {
      query: "id:(37113)",
      default_field: "id",
    },
  },
});

const requestOptions = {
  method: "GET",
  headers: { "Content-Type": "application/json" },
 // body: raw,
};

const fetchByCaseExample = () => {
  fetch("http://localhost:3100/api/es/search", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

  return response;
};

export default fetchByCaseExample;
