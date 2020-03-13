var AWS = require("aws-sdk");

AWS.config.region = "us-east-2"; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "us-east-2:81d836e6-703a-4d1a-bec1-23f62fa3218c"
});

var dynamoDB = new AWS.DynamoDB();

var params = {
  TableName: "Pets",
  KeySchema: [
    { AttributeName: "PetID", KeyType: "HASH" } //Partition key
  ],
  AttributeDefinitions: [{ AttributeName: "PetID", AttributeType: "N" }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};

dynamoDB.createTable(params, function(err, data) {
  if (err) {
    console.log(
      "Unable to create table. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log(
      "Table Created. Table description JSON:",
      JSON.stringify(data, null, 2)
    );
  }
});