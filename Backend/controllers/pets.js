const AWS = require("aws-sdk");
AWS.config.region = "us-east-2"; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "us-east-2:81d836e6-703a-4d1a-bec1-23f62fa3218c"
});
const dynamoDB = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
const table = "Pets";

exports.getPets = (req, res) => {
  let infoArray = [];
  const params = {
    TableName: table,
    ProjectionExpression: "#petID, PetBreed, PetType, info.age",
    // FilterExpression: "#PetBreed between :start_yr and :end_yr",
    ExpressionAttributeNames: {
      "#petID": "PetID"
    }
    // ExpressionAttributeValues: {
    //   ":start_yr": 2001,
    //   ":end_yr": 2020
    // }
  };
  dynamoDB.scan(params, (err, data) => {
    if (err) {
      console.log(
        "Unable to scan the table. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      data.Items.map(pet => {
        // info = {
        //   PetID: pet.PetID,
        //   PetBreed: pet.PetBreed,
        //   PetType: pet.PetType,
        //   InfoAge: pet.info.age
        // };
        infoArray.push(pet);
      });
      res.send(infoArray);
    }
  });
};

exports.insertPet = (req, res) => {
  let petID =
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15);
  let petType = "Dog";
  let petBreed = "Pug";
  let age = Math.random() * 10;
  let description = "Safe";
  let params = {
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

  dynamoDB.put(params, err => {
    if (err) {
      console.error(
        "Unable to add item. Error JSON: ",
        JSON.stringify(err, null, 2)
      );
    } else {
      return res.send(params.Item);
      //console.log("Added Item:", JSON.stringify(data, null, 2));
    }
  });
};

exports.deletePet = (req, res) => {
  // let petID = "7ys93f1tjutuq404a3qhtp8u38bz97sv7kb79wrhbo6n";
  let petID = req.body.id;
  params = {
    TableName: table,
    Key: {
      PetID: petID
    }
  };

  dynamoDB.delete(params, err => {
    if (err) {
      console.error(`Unable to delete ${petID}`);
    } else {
      return res.send(`Deleted ${petID}`);
    }
  });
};
