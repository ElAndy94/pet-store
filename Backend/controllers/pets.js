const AWS = require("aws-sdk");
AWS.config.region = "us-east-2"; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "us-east-2:81d836e6-703a-4d1a-bec1-23f62fa3218c"
});

const docClient = new AWS.DynamoDB.DocumentClient();

exports.getMovies = (req, res) => {
  const table = "Movies";
  let infoArray = [];

  const params = {
    TableName: table,
    ProjectionExpression: "#yr, title, info.rating",
    FilterExpression: "#yr between :start_yr and :end_yr",
    ExpressionAttributeNames: {
      "#yr": "year"
    },
    ExpressionAttributeValues: {
      ":start_yr": 2001,
      ":end_yr": 2020
    }
  };

  docClient.scan(params, (err, data) => {
    if (err) {
      console.log(
        "Unable to scan the table. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      data.Items.forEach(movie => {
        // Template literals - By setting a string with ` ` you can add variables to the string with ${ variableName }.
        info = {
          Year: movie.year,
          Title: movie.title,
          Rating: movie.info.rating
        };
        infoArray.push(info);
        infoArray.push(info);
      });
      res.send(infoArray);
    }
  });
};
