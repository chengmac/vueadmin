// 返回年-月-日
const getYearMonthDay = date => {
    date = new Date(date);
    let year = date.getFullYear();
    let month = date.getMonth() < 10 ? (date.getMonth()+ 1) : date.getMonth();
    let day = date.getDate();
    return `${year}-${month}-${day}`;
}

export { getYearMonthDay }