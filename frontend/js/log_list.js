// Get logs list from server and show
fetch("/api/logs")
    .then(response => response.json())
    .then(logs => {
        console.log(logs);

        let log_list = document.getElementById("log-list");
        for (let log of logs) {

            log_list.innerHTML += `
            <tr class="log-li">
                <td>${log.changeLogID}</td>
                <td>${formatDate(log.dateCreated)}</td>
                <td>${formatDate(log.dateChanged)}</td>
                <td>${log.bookTitle}</td>
                <td>${log.username} (${log.accessRights})</td>
            </tr>
            `
        }
    })
// Change Date format: Date => yyyy-mm-dd HH:MM:SS
function formatDate(time) {
    if (time == null) {
        return "First created";
    }
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