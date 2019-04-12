function formateTime(time) {
    let myTime = new Date(time);
    let year = myTime.getFullYear();
    let month = myTime.getMonth() + 1;
    let hour = myTime.getHours();
    let date = myTime.getDate();
    let minutes = myTime.getMinutes();
    let seconds = myTime.getSeconds();
    return `${year}-${month}-${date} ${hour}:${minutes}:${seconds}`
}

module.exports = formateTime;