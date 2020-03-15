import AWS from "aws-sdk";

AWS.config.region = "us-east-2"; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "us-east-2:81d836e6-703a-4d1a-bec1-23f62fa3218c"
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const table = "Pets";

const petID = 2;
const petType = "Dog";
const petBreed = "Pitbull";
const age = 1;
const description = "Dangerous";

const params = {
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

dynamoDB.put(params, (err, data) => {
  if (err) {
    console.error(
      "Unable to add item. Error JSON: ",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log("Added Item:", JSON.stringify(data, null, 2));
  }
});
