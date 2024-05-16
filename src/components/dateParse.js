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

export const compareDate = (a, b) => {
    if (new Date(a.start_time) < new Date(b.start_time)) {
        return 1
    }
    if (new Date(a.start_time) > new Date(b.start_time)) {
        return -1
    }
    return 0
}

export const compareForm = (a, b) => {
    if (new Date(a.start_time) < new Date(b.end_time)) {
        return 1
    }
    if (new Date(a.start_time) > new Date(b.end_time)) {
        return -1
    }
    return 0
}