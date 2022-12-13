function cat(path) {
    const fs = require('fs');

    fs.readFile(path, 'utf8', (err, data) => {
        if(err) {
            console.log(err);
            process.exit(1);
        } else {
            console.log(data);
        }
    });
}

cat(process.argv[2]);