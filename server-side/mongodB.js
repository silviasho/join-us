const mongoos = require('mongoose')

const URI = 'mongodb+srv://joinUs2020:sisi2624@cluster0.oaqd6.mongodb.net/joinUsDb?retryWrites=true&w=majority'

const conectDb = async () => {
    await mongoos.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true })
}

module.exports = conectDb;
