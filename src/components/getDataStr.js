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