const env = require('dotenv');
env.config();

const express = require('express');
const app = express();

const fetch = require('node-fetch');
var bodyParser = require('body-parser');
const path = require('path');
const upload_to_s3 = require('./s3/s3')
const { check,  addPicture, addUserPicture } = require('./models/model')
const { addUserController, addUserControllerForBody, getUsersController } = require('./controller/userController.js')
const { addUserPictureController, addPictureController } = require('./controller/pictureController')

var jsonParser = bodyParser.json()

check()

const userRouter = express.Router();
const pictureRouter = express.Router();

userRouter.use('/adduser/username=:userName&userage=:userAge', addUserController);
userRouter.post('/adduser/body', jsonParser, addUserControllerForBody);
userRouter.get('/getusers', getUsersController);
app.use('/user', userRouter);


pictureRouter.use('/addpicture', jsonParser ,addPictureController);
pictureRouter.post('/adduserpicture', jsonParser, addUserPictureController)
app.use('/picture', pictureRouter)




app.get('/getinfo', (req, res) => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(result => result.json())
        .then(json_result => res.send(json_result))
        .catch(err => console.log(err))
});

app.get('/download/picture/:id&:userId', (req, res) => {
    const id = req.params.id;
    const userId = req.params.userId;
    upload_to_s3.uploadDoc(id)
    .then(result => {
        res.sendFile(path.resolve(__dirname, 'images', 'picture.html'))
        console.log(result.Location)
        addPicture(id, result.Location).then(result => addUserPicture(userId,result.dataValues.Id))
    }).catch(err => console.log(err))
});


app.listen(process.env.PORT, () => console.log('Start server'));

console.log(process.env.LOG_LEVEL)

module.exports = { check }
