export const getDateStr = (createdAt) => {
    let date = new Date(createdAt)
    const [day, month, year] = [
        date.getDate(),
        date.getMonth(),
        date.getFullYear(),
    ];
    let str = ""
    str += (day < 10) ? "0" + day : day
    str += "."
    str += (month < 10) ? "0" + month : month
    str += "." + year
    return str
}

export const dataForm = (dateStr) => {
    let date = new Date(dateStr)
    const [day, month, year] = [
        date.getDate(),
        date.getMonth() + 1,
        date.getFullYear(),
    ];
    const dayStr = (day < 10) ? "0" + day : day
    const monthStr = (month < 10) ? "0" + month : month
    return  `${year}-${monthStr}-${dayStr}`
}