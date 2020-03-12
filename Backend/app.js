const express = require('express');
const app = express();

const petRoutes = require('./routes/pets');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
});

app.use('/api/pets', petRoutes);

module.exports = app;


// function onScan(err, data) {
// 	if (err) {
// 		console.log("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         var info = "";

// 		data.Items.forEach(function(movie)
// 		{
// 			info += (movie.year + ": " + movie.title + "- rating: " + movie.info.rating);
//         });
//         console.log(info);
// 	}
// }