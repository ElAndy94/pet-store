import AWS from 'aws-sdk';
import { RequestHandler } from 'express';
AWS.config.region = 'us-east-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-east-2:81d836e6-703a-4d1a-bec1-23f62fa3218c'
});
const dynamoDB = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const table = 'Pets';

interface Pet {
  PetID: string;
  PetType: string;
  PetBreed: string;
  info?: { age: number; description?: string };
}

export const getPets: RequestHandler = (req, res) => {
  let infoArray: Pet[] = [];
  const params = {
    TableName: table,
    ProjectionExpression: '#petID, PetBreed, PetType, info.age',
    ExpressionAttributeNames: {
      '#petID': 'PetID'
    }
  };
  dynamoDB.scan(params, (err, data) => {
    const items = data.Items;
    if (items) {
      items.map(pet => {
        infoArray.push(pet as Pet);
      });
      return res.status(201).json({ message: 'Scan Complete', infoArray });
      // return res.send(infoArray);
    } else {
      console.log(
        'Unable to scan the table. Error JSON:',
        JSON.stringify(err, null, 2)
      );
    }
  });
};

export const getPetById = (
  req: { params: { id: string } },
  res: { send: (arg0: AWS.DynamoDB.DocumentClient.GetItemOutput) => void }
) => {
  // Request example - http://localhost:8081/api/pets/lpaw41nwmjg4p5n3m5fadf
  const params = {
    TableName: table,
    Key: {
      PetID: req.params.id
    }
  };

  dynamoDB.get(params, (err, data) => {
    if (err) {
      console.log(
        'Unable to find item. Error JSON:',
        JSON.stringify(err, null, 2)
      );
    } else {
      return res.send(data);
    }
  });
};

export const updatePet = (
  req: { params: { id: string } },
  res: { send: (arg0: AWS.DynamoDB.DocumentClient.UpdateItemOutput) => void }
) => {
  const params = {
    TableName: table,
    Key: {
      PetID: req.params.id
    },
    UpdateExpression: 'set PetBreed=:a, PetType=:b, info.age=:r',
    ExpressionAttributeValues: {
      ':a': 'Chobie',
      ':b': 'Calm',
      ':r': 20
    },
    ReturnValues: 'UPDATED_NEW'
  };

  dynamoDB.update(params, (err, data) => {
    if (err) {
      console.error(
        'Unable to update item. Error JSON:',
        JSON.stringify(err, null, 2)
      );
    } else {
      return res.send(data);
    }
  });
};

export const insertPet: RequestHandler = (
  req,
  res: {
    send: (arg0: {
      PetID: string;
      PetType: string;
      PetBreed: string;
      info: { age: number; description: string };
    }) => void;
  }
) => {
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
  let petType = 'Dog';
  let petBreed = 'Pug';
  let age = Math.random() * 10;
  let description = 'Safe';
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
        'Unable to add item. Error JSON: ',
        JSON.stringify(err, null, 2)
      );
    } else {
      return res.send(params.Item);
      //console.log("Added Item:", JSON.stringify(data, null, 2));
    }
  });
};

export const deletePet = (
  req: { body: { id: string } },
  res: { send: (arg0: string) => void }
) => {
  const params = {
    TableName: table,
    Key: {
      PetID: req.body.id
    }
  };

  dynamoDB.delete(params, err => {
    if (err) {
      console.error(`Unable to delete ${req.body.id}`);
    } else {
      return res.send(`Deleted ${req.body.id}`);
    }
  });
};
