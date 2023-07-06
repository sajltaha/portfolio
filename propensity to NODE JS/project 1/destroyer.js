const fs = require('fs')

function deleteFile(file) {
    fs.unlink(`users/${file}`, (err, data) => {
        if (err) {
            return
        }
    })
}

module.exports = {
    deleteFile: deleteFile
}