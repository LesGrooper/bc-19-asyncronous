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

  static readData(cb) {
    fs.readFile("./wines.json", "utf-8", (err, data) => {
      if (err) {
        cb(err, null);
      } else {
        let wines = JSON.parse(data);
        wines = wines.map((wine) => {
          const { id, name, year, type, createdAt } = wine;
          return new Wine(id, name, year, type, createdAt);
        });
        cb(null, wines);
      }
    });
  }

  static wines() {
    let wines = this.readData();
    return wines;
  }

  static add(wine_name, cb) {
    this.readData((err, data) => {
      if (err) {
        cb(err, null);
      } else {
        let wines = data;
        wine_name = wine_name[0].split("/");
        let createdAt = new Date();
        const [name, year, type] = wine_name;
        let id = wines[wines.length - 1].id + 1;

        wines.push(new Wine(id, name, year, type, createdAt));
        this.saveWine(wines);
        cb(null, `${name} added`);
      }
    });
  }

  static sell(wine, cb) {
    this.readData((err, data) => {
      if (err) {
        cb(err, null);
      } else {
        let wines = data;
        let [id] = wine;

        wines = wines.filter((wine) => wine.id !== Number(id));
        this.saveWine(wines);

        cb(null, `"${wine}" solded!`);
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
