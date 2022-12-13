const fs = require("fs");


function cat(path, filename = undefined) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      process.exit(1);
    } else {
      if (filename) {
        fs.writeFile(filename, data, "utf8", (err) => {
          console.log(err);
          process.exit(1);
        });
      } else {
        console.log(data);
      }
    }
  });
}


async function webCat(url, filename = undefined) {
  const axios = require("axios");

  axios
    .get(url)
    .then((data) => {
      if (filename) {
        fs.writeFile(filename, data.data, "utf8", (err) => {
          console.log(err);
          process.exit(1);
        });
      } else {
        console.log(data.data);
      }
    })
    .catch((err) => console.log(err));
}


function is_url(str) {
  return str.substring(0, 8) === "https://" || str.substring(0, 7) === "http://" ? true : false;
}


if (process.argv.length === 5) {
  if (process.argv[2] === "--out") {
    if (is_url(process.argv[4])) {
      webCat(process.argv[4], process.argv[3]);
    } else {
      cat(process.argv[4], process.argv[3]);
    }
  } else {
    console.log("Invalid command: " + process.argv[2]);
  }
} else if (process.argv.length === 3) {
  if (is_url(process.argv[2])) {
    webCat(process.argv[2]);
  } else {
    cat(process.argv[2]);
  }
} else {
  console.log("Error: Invalid number of arguments.");
}