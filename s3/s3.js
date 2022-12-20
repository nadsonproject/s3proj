const EasyYandexS3 = require('easy-yandex-s3');
const path = require('path');


var s3 = new EasyYandexS3({
        auth: {
            accessKeyId: process.env.S3_ACCESSKEYID,
            secretAccessKey:process.env.S3_SECRETACCESSKEY,
        },
        Bucket: process.env.S3_BUCKET, //  "my-storage",
        debug: true, 
    });

let uploadDoc = async (id) => {
        var upload = await s3.Upload(
            {
                path: path.resolve(__dirname, `./${id}.jpeg`),
            },
            '/downloads/'
        );
        return upload
    }

module.exports = {uploadDoc}

