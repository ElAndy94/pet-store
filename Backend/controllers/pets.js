const AWS = require("aws-sdk");

const GetDataFromDB = () => {
    AWS.config.region = 'us-east-2'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-2:81d836e6-703a-4d1a-bec1-23f62fa3218c',
    });

    var docClient = new AWS.DynamoDB.DocumentClient();
    var table = "Movies";

    var params = {
        TableName: table,
        ProjectionExpression: "#yr, title, info.rating",
        FilterExpression: "#yr between :start_yr and :end_yr",
        ExpressionAttributeNames: {
            "#yr": "year",
        },
        ExpressionAttributeValues: {
            ":start_yr": 2001,
            ":end_yr": 2020 
        }
    };

    docClient.scan(params, function(err, data) {
        if (err) {
            console.log("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        }
        else {
            var info = "";
            data.Items.forEach(function(movie) {
                info += (movie.year + ": " + movie.title + "- rating: " + movie.info.rating);
            });
            // console.log(info);
            res.send(JSON.stringify(info))
        }
    });
}

exports.getMovies = (req, res) => {
    GetDataFromDB(res);
}