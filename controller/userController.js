const {addUser, getUsers} = require('../models/model')


let addUserController = (req, res) =>{
    const userName = req.params.userName;
    const userAge = req.params.userAge;
    addUser(userName, userAge)
    .then(result => {
        console.log(`User: ${userName}, ${userAge} add to bd`);
        res.send('User add to db')})
        .catch(err => console.log(err))
}

let addUserControllerForBody = async (req, res) =>{
        const userName = req.body.userName;
        const userAge = req.body.userAge;
        const result = await addUser(userName, userAge);
        const json_result = await res.json(result);
        console.log(json_result)
    
    }

let getUsersController = (req, res) => {
    getUsers()
    .then(result => res.send(result))
    .catch(err => console.log(err))
}


module.exports = {getUsersController, addUserController, addUserControllerForBody}