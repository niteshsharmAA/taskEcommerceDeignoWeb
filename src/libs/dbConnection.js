const mongoose=require('mongoose')
mongoose.set('strictQuery',true)

module.exports=(length)=>{
    const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } = process.env
    let connectionURI = `${DB_HOST}:${DB_PORT}`
    if (DB_PASS && DB_USER) {
        connectionURI = `${DB_USER}:${escape(DB_PASS)}@${DB_HOST}:${DB_PORT}`
    }
    const status = `DB Connected [${DB_NAME}] - ${DB_HOST}:${DB_PORT}`
    mongoose.connect(`mongodb://${connectionURI}/${DB_NAME}`).then(() => {
        console.log(`${"|" + status.padEnd(parseInt((length - (length - status.length) / 2)) - 1, " ").padStart(length - 2, " ") + "|"}\n${"".padEnd(length, "-")}`)
    }).catch((error) => {
        console.log(`Error - DB connection failed  \n${error}`)
    })
}