// return current time => yyyy-mm-dd H:M:S
function currentTime() {
    let date = new Date();
    let S = String(date.getSeconds()).padStart(2, '0');
    let M = String(date.getMinutes()).padStart(2, '0');
    let H = String(date.getHours()).padStart(2, '0');
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = date.getFullYear();
    date = yyyy + '-' + mm + '-' + dd + ' ' + H + ':' + M + ':' + S;
    return date;
};
// Change Date format: Date => yyyy-mm-dd H:M:S
function formatDate(time) {
    let date = new Date(time);
    let S = String(date.getSeconds()).padStart(2, '0');
    let M = String(date.getMinutes()).padStart(2, '0');
    let H = String(date.getHours()).padStart(2, '0');
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = date.getFullYear();
    date = yyyy + '-' + mm + '-' + dd + ' ' + H + ':' + M + ':' + S;
    return date;
};

module.exports = {
    currentTime,
    formatDate
};