const fs = require('fs')

function writeIn(allData, emailOfUser) {
    const stringData = JSON.stringify(allData)
    fs.writeFile(`users/${emailOfUser}.json`, stringData, () => {
        return true
    })
}

module.exports = {
    writeIn: writeIn
}