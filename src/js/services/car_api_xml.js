const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

function loadCarData(callback) {
  const xmlPath = path.resolve(__dirname, '../../../data/data.xml');

  fs.readFile(xmlPath, (err, data) => {
    if (err) return callback(err);

    xml2js.parseString(data, { explicitArray: false }, (err, result) => {
      if (err) return callback(err);

      try {
        const brands = result.brands.brand;
        const brandList = Array.isArray(brands) ? brands : [brands];

        const output = brandList.map((brand) => {
          const models = Array.isArray(brand.models.model)
            ? brand.models.model
            : [brand.models.model];

          return {
            name: brand.name,
            id: brand.id,
            models: models.map((model) => {
              const generations = Array.isArray(model.generations.generation)
                ? model.generations.generation
                : [model.generations.generation];

              return {
                name: model.name,
                id: model.id,
                generations: generations.map((gen) => {
                  const images = Array.isArray(gen.images?.image)
                    ? gen.images.image
                    : gen.images?.image
                    ? [gen.images.image]
                    : [];

                  return {
                    name: gen.name,
                    modelYear: gen.modelYear,
                    id: gen.id,
                    images: images.map((img) => ({
                      small: img.small,
                      big: img.big,
                    })),
                  };
                }),
              };
            }),
          };
        });

        callback(null, output);
      } catch (e) {
        callback(e);
      }
    });
  });
}

module.exports = { loadCarData };
