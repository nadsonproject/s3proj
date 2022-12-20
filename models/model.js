const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER_NAME, process.env.DB_USER_PASSWORD, {
    dialect: "postgres"
});

let check = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

//
//first init version
const User = sequelize.define('User', {
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Age: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

const Document = sequelize.define('Document', {
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Link: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const UserDocument = sequelize.define('UserDocument', {
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    UserId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'Id' },
        allowNull: false
    },
    DocumentId: {
        type: Sequelize.INTEGER,
        references: { model: 'Documents', key: 'Id' },
        allowNull: false
    }
});

let getUsers = () => {
    return User.findAll()
}

let addUser = async (name, age) => {
    const result = await User.create({
        Name: name,
        Age: age
    })
    return result //.toJSON()
}

let addPicture = (documentName, link) =>{
    return Document.create({
        Name: documentName,
        Link: link
    })
}

let addUserPicture = (userId, documentId) => {
    return UserDocument.create({
        UserId: userId,
        DocumentId: documentId
    })
}


sequelize.sync()
    .then(result => { console.log(result) })
    .catch(err => console.log(err));


module.exports = { check, getUsers, addUser, addPicture, addUserPicture }

