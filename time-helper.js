var moment = require('moment');
function format(date){
    return moment(date).format('YYYY-MM-DD hh:mm:ss a');
}
module.exports = format;