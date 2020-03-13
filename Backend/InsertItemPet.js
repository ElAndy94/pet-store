var AWS = require("aws-sdk");

AWS.config.region = "us-east-2"; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "us-east-2:81d836e6-703a-4d1a-bec1-23f62fa3218c"
});

var docClient = new AWS.DynamoDB.DocumentClient();
var table = "Pets";

var petID = 2;
var petType = "Dog";
var petBreed = "Pitbull";
var age = 1;
var description = "Dangerous";

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
