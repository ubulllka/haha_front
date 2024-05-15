export const dateCard = (dateStr) => {
    let date = new Date(dateStr)
    const [day, month, year] = [
        date.getDate(),
        date.getMonth() + 1,
        date.getFullYear(),
    ];
    const dayStr = (day < 10) ? "0" + day : day
    const monthStr = (month < 10) ? "0" + month : month
    return `${dayStr}.${monthStr}.${year}`
}
