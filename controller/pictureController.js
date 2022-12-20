const { addPicture, addUserPicture } = require('../models/model')

let addPictureController = (req, res) =>{
    const documentName = req.body.documentName;
    const link = req.body.link;
    addPicture(documentName, link)
    .then(result => res.send(`picture ${documentName} was add to bd`))
    .catch(err => console.log(err))
}

let addUserPictureController = (req, res) =>{
    const userId = req.body.userId;
    const documentId = req.body.documentId;
    addUserPicture(userId, documentId)
    .then(result =>res.send(`picture ${documentId}; user${userId}`))
    .catch( e => res.send(e))
}


module.exports = { addPictureController, addUserPictureController }