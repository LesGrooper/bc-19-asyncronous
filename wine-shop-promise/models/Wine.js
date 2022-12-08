const fs = require("fs");
const WineController = "../controllers/WineController.js";
const WineView = "../views/WineView";

class Wine {
  constructor(id, name, year, type, createdAt) {
    this.id = id;
    this.name = name;
    this.year = year;
    this.type = type;
    this, (createdAt = createdAt);
  }

  static readData() {
    return new Promise((res, rej) => {
      fs.readFile("./wines.json", "utf-8", (err, data) => {
        if (err) {
          rej(err);
        } else {
          let wines = JSON.parse(data);
          wines = wines.map((wine) => {
            const { id, name, year, type, createdAt } = wine;
            return new Wine(id, name, year, type, createdAt);
          });
          res(wines);
        }
      });
    });
  }
// sebelum di balik model -> controller
  static wines() {
    let wines = this.readData();
    return wines;
  }

  static add(wine_name) {
    return new Promise((res, rej) => {
      this.readData()
        .then((wines) => {
          // wines = data;
          wine_name = wine_name[0].split("/");
          let createdAt = new Date();
          const [name, year, type] = wine_name;
          let id = wines[wines.length - 1].id + 1;

          wines.push(new Wine(id, name, year, type, createdAt));
          this.saveWine(wines);
          res(`${name} added`);
        })
        .catch((err) => {
          rej(err);
        });
    });
  }
// sesudah di balik controller -> model
  static sell(wine) {
    WineController.sell(wine)
      .then((res) => {
        WineView.message(res);
      })
      .catch((err) => {
        WineView.error(err);
      });

    this.readData((err, data) => {
      if (err) {
        cb(err, null);
      } else {
      }
    });
  }

  static rename(wine) {
    WineController.rename(wine, (err, data) => {
      if (err) {
        WineView.error(err);
      } else {
        WineView.message(data);
      }
    });
  }

  static findById(params) {
    let wines = this.readData();
    let id = +params[0];
    let temp = "";
    wines.forEach((wine) => {
      if (wine.id === id) {
        temp = `${wine.name} is a ${wine.type} wine, with age of
        ${2021 - wine.year} years old!`;
      }
    });
    return temp;
  }

  static wineFormatter(wine_name) {
    let formattedWine = wine_name.split("/");
    const [name, year, type] = formattedWine;
    let tempArray = [name, +year, type];

    if (type === "R" || type === "r") {
      return [name, +year, "Red"];
    } else if (type === "W" || type === "w") {
      return [name, +year, "White"];
    } else {
      return [name, +year, "Other"];
    }
  }

  static saveWine(wines) {
    fs.writeFileSync("./wines.json", JSON.stringify(wines, null, 3));
  }
}

module.exports = Wine;
