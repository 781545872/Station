var moment = require('moment');
function format(date){
    return moment(date).format('YYYY-MM-DD h:mm:ss');
}
module.exports = format;