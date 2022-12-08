const Wine = require("../models/Wine.js");
const WineView = require("../views/WineView.js");

class WineController {
  static help() {
    WineView.help();
  }
// sebelum di balik model -> controller
  static wines() {
    // const wines = Wine.wines();
    // WineView.wines(wines);
    Wine.readData()
      .then((wines) => {
        WineView.wines(wines);
      })
      .catch((err) => {
        WineView.error(err);
      });
  }

  static add(wine_name) {
    Wine.add(wine_name)
      .then((result) => {
        WineView.message(result);
      })
      .catch((err) => {
        WineView.error(err);
      });
  }
// sesudah di balik controller -> model
  static sell(wine) {
    // const feedback = Wine.sell(params);
    // WineView.message(feedback);
    return new Promise((res, rej) => {
      Wine.readData()
        .then((wines) => {
          let [id] = wine;
          wines = wines.filter((wine) => wine.id !== Number(id));
          Wine.saveWine(wines);

          res(`"${wine}" solded!`);
        })
        .catch((err) => {
          rej(err);
        });
    });
  }

  static rename(wine, cb) {
    // const feedback = Wine.rename(params);
    // WineView.message(feedback);
    Wine.readData((err, data) => {
      if (err) {
        cb(err, null);
      } else {
        let wines = data;
        let [wine_id, wine_name] = wine;
        wine_name = wine_name.split("/");

        const [name, year, type] = wine_name;

        wines = wines.map((wine) => {
          if (wine.id === Number(wine_id)) {
            wine.name = name;
            wine.year = year;
            wine.type = type;
            return wine;
          } else {
            return wine;
          }
        });
        Wine.saveWine(wines);
        return null, `Wine number ${wine_id} renamed.`;
      }
    });
  }

  static findById(params) {
    const feedback = Wine.findById(params);
    WineView.message(feedback);
  }

  static message(msg) {
    WineView.message(msg);
  }
}

module.exports = WineController;
