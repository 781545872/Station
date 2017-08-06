var moment = require('moment');
moment.locale('zh-cn');
function format(date){
    // return moment(date).format('YYYY-MM-DD hh:mm:ss a');
    return moment(date).fromNow().replace(' ','');
}
module.exports = format;