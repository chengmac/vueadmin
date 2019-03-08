// 返回年-月-日
const getYearMonthDay = date => {
    date = new Date(date);
    let year = date.getFullYear();
    let month = date.getMonth() < 10 ? (date.getMonth()+ 1) : date.getMonth();
    let day = date.getDate();
    return `${year}-${month}-${day}`;
}

// 生成select数据
const createSelectData = arr => {
    let array = [];
    if(arr) {
        arr.forEach(element => {
            array.push({
                label: element.name,
                value: element.name
            })
        });
    }
    return array;
}

export { getYearMonthDay, createSelectData }