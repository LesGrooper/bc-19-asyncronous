const Wine = require("../models/Wine.js");
const WineView = require("../views/WineView.js");

class WineController {
  static help() {
    WineView.help();
  }

  static wines() {
    // const wines = Wine.wines();
    // WineView.wines(wines);
    Wine.readData((err, data) => {
      if (err) {
        WineView.error(err);
      } else {
        WineView.wines(data);
      }
    });
  }

  static add(wine_name) {
    // const feedback = Wine.add(params);
    // WineView.message(feedback);
    Wine.add(wine_name, (err, data) => {
      if (err) {
        WineView.error(err);
      } else {
        WineView.message(data);
      }
    });
  }

  static sell(wine) {
    // const feedback = Wine.sell(params);
    // WineView.message(feedback);
    Wine.sell(wine, (err, data) => {
      if (err) {
        WineView.error(err);
      } else {
        WineView.message(data);
      }
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
        return (null, `Wine number ${wine_id} renamed.`);
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
