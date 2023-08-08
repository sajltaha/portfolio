const fs = require('fs')

function usersDB() {
    fs.access('users/users.json', fs.constants.R_OK, (err, data) => {
        if (err) {
            fs.writeFile('users/users.json', '{}', () => {
                return
            })
        }
        else {
            fs.readFile('users/users.json', (err, data) => {
                if (JSON.stringify(data) == '{"type":"Buffer","data":[]}') {
                    fs.writeFile('users/users.json', '{}', () => {
                        return
                    })
                }
            })
        }
    })
}

module.exports = {
    usersDB: usersDB
}