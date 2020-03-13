const AWS = require("aws-sdk");
AWS.config.region = "us-east-2"; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "us-east-2:81d836e6-703a-4d1a-bec1-23f62fa3218c"
});

const docClient = new AWS.DynamoDB.DocumentClient();

exports.getMovies = (req, res) => {
  const table = "Movies";
  let info = "";

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
        info += `${movie.year} : ${movie.title} - rating: ${movie.info.rating}`;
      });

      res.send(JSON.stringify(info));
    }
  });
};

exports.insertPet = (req, res) => {
  var table = "Pets";

  var petID = 3;
  var petType = "Cat";
  var petBreed = "Generic";
  var age = 1;
  var description = "Dont F*** with me";

  var params = {
    TableName: table,
    Item: {
      PetID: petID,
      PetType: petType,
      PetBreed: petBreed,
      info: {
        age: age,
        description: description
      }
    }
  };

  docClient.put(params, function(err, data) {
    if (err) {
      console.error(
        "Unable to add item. Error JSON: ",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("Added Item:", JSON.stringify(data, null, 2));
    }
  });
};
