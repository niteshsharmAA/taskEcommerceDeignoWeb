const connecDb=require('./src/libs/dbConnection')
const{CronJob}=require('cron')
require('dotenv').config();

const status = `|    cron started - ${Date()}    |`
console.log(`${"".padStart(status.length, "-")}\n${status}`)

new CronJob("*/10 * * * * *",require('./src/cron/event'),null,true)

connecDb(status.length)