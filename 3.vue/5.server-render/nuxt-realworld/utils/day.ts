import dayjs from "dayjs"

function dateFormat(date: dayjs.ConfigType, fmt = "YYYY-MM-DD") {
    return dayjs(date).format(fmt)
}

export { dateFormat }
