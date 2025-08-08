const { loadCarData } = require('./car_api_xml.j');

loadCarData((err, data) => {
  if (err) {
    console.error('Erro ao carregar dados:', err);
    return;
  }

  console.log(JSON.stringify(data, null, 2));
});
