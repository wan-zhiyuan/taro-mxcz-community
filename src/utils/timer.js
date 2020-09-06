/**
 * 通过时间戳得到正确格式的时间
 */
export function getDateType(time) {
    const times = new Date(Number(time) * 1000);
    const year = times.getFullYear();
    const month = times.getMonth() + 1;
    const date = times.getDate();
    return `${year}.${month}.${date}`;
}
/**
 * 通过时间戳得到正确格式的时间(到分 年-月-日 时)
 */
export function getDateTypeHours(time) {
    const times = new Date(Number(time) * 1000);
    const year = times.getFullYear();
    let month;
    let date;
    let hours;
    if (times.getMonth() + 1 < 10) {
        month = `0${times.getMonth() + 1}`;
    } else {
        month = times.getMonth() + 1;
    }
    if (times.getDate() < 10) {
        date = `0${times.getDate()}`;
    } else {
        date = times.getDate();
    }
    if (times.getHours() < 10) {
        hours = `0${times.getHours()}`;
    } else {
        hours = times.getHours();
    }
    return `${year}.${month}.${date} ${hours}:00`;
}

/**
 * 通过时间戳得到正确格式的时间(到分 年-月-日 时：分)
 */
export function getDateTypeMinutes(time) {
    const times = new Date(Number(time) * 1000);
    const year = times.getFullYear();
    let month;
    let date;
    let hours;
    let minutes;
    if (times.getMonth() + 1 < 10) {
        month = `0${times.getMonth() + 1}`;
    } else {
        month = times.getMonth() + 1;
    }
    if (times.getDate() < 10) {
        date = `0${times.getDate()}`;
    } else {
        date = times.getDate();
    }
    if (times.getHours() < 10) {
        hours = `0${times.getHours()}`;
    } else {
        hours = times.getHours();
    }
    if (times.getMinutes() < 10) {
        minutes = `0${times.getMinutes()}`;
    } else {
        minutes = times.getMinutes();
    }
    return `${year}-${month}-${date}  ${hours}:${minutes}`;
}

/**
 * 通过时间戳得到正确格式的时间(到秒 年-月-日 时：分：秒)
 */
export function getDateTypeSeconds(time) {
    const times = new Date(Number(time) * 1000);
    const year = times.getFullYear();
    let month;
    let date;
    let hours;
    let minutes;
    let seconds;
    if (times.getMonth() + 1 < 10) {
        month = `0${times.getMonth() + 1}`;
    } else {
        month = times.getMonth() + 1;
    }
    if (times.getDate() < 10) {
        date = `0${times.getDate()}`;
    } else {
        date = times.getDate();
    }
    if (times.getHours() < 10) {
        hours = `0${times.getHours()}`;
    } else {
        hours = times.getHours();
    }
    if (times.getMinutes() < 10) {
        minutes = `0${times.getMinutes()}`;
    } else {
        minutes = times.getMinutes();
    }
    if (times.getSeconds() < 10) {
        seconds = `0${times.getSeconds()}`;
    } else {
        seconds = times.getSeconds();
    }
    return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
}


/**
 * 通过时间戳得到正确格式的时间(到分 年.月.日 时：分)
 */
export function getDateTypeMinutes2(time) {
    const times = new Date(Number(time) * 1000);
    const year = times.getFullYear();
    let month;
    let date;
    let hours;
    let minutes;
    if (times.getMonth() + 1 < 10) {
        month = `0${times.getMonth() + 1}`;
    } else {
        month = times.getMonth() + 1;
    }
    if (times.getDate() < 10) {
        date = `0${times.getDate()}`;
    } else {
        date = times.getDate();
    }
    if (times.getHours() < 10) {
        hours = `0${times.getHours()}`;
    } else {
        hours = times.getHours();
    }
    if (times.getMinutes() < 10) {
        minutes = `0${times.getMinutes()}`;
    } else {
        minutes = times.getMinutes();
    }
    return `${year}.${month}.${date} ${hours}:${minutes}`;
}

/**
 * 通过时间戳得到正确格式的时间(到分 年.月.日 时：分：秒)
 */
export function getDateTypeSeconds2(time) {
    const times = new Date(Number(time) * 1000);
    const year = times.getFullYear();
    let month;
    let date;
    let hours;
    let minutes;
    let seconds;
    if (times.getMonth() + 1 < 10) {
        month = `0${times.getMonth() + 1}`;
    } else {
        month = times.getMonth() + 1;
    }
    if (times.getDate() < 10) {
        date = `0${times.getDate()}`;
    } else {
        date = times.getDate();
    }
    if (times.getHours() < 10) {
        hours = `0${times.getHours()}`;
    } else {
        hours = times.getHours();
    }
    if (times.getMinutes() < 10) {
        minutes = `0${times.getMinutes()}`;
    } else {
        minutes = times.getMinutes();
    }
    if (times.getSeconds() < 10) {
        seconds = `0${times.getSeconds()}`;
    } else {
        seconds = times.getSeconds();
    }
    return `${year}.${month}.${date} ${hours}:${minutes}:${seconds}`;
}


/**
 * 拿到有效期限 start_time-end_time
 */
export function getTerm(start_time, end_time) {
    return (`${getDateType(start_time)}-${getDateType(end_time)}`);
}

/**
 * ISO 8601
 * @param timestr
 * @returns {*}
 */
// export function parseTimeString(timestr, zone = '+08:00') {
//     let time = timestr;
//     if (isDateString(time)) {
//         if (time.indexOf('T') < 0) {
//             time = time.replace(' ', 'T');
//         }
//         if (time.length < 25) {
//             time = `${time}${zone}`;
//         }
//     }
//     return time;
// }

/**
 * 通过字符串的时间格式得到正确格式的时间
 */
export function getDateTypeStr(str) {
    const time = parseTimeString(str);

    const times = new Date(time);
    const year = times.getFullYear();
    const month = times.getMonth() + 1;
    const date = times.getDate();

    let hours;
    let minutes;
    let seconds;


    if (times.getHours() < 10) {
        hours = `0${times.getHours()}`;
    } else {
        hours = times.getHours();
    }
    if (times.getMinutes() < 10) {
        minutes = `0${times.getMinutes()}`;
    } else {
        minutes = times.getMinutes();
    }
    if (times.getSeconds() < 10) {
        seconds = `0${times.getSeconds()}`;
    } else {
        seconds = times.getSeconds();
    }
    if (year >= 9999) { return '永久有效'; }
    return `${year}.${month}.${date}`;
}

/**
 * 通过字符串的时间格式得到正确格式的时间
 */
export function getDateTimeStr(str) {
    const time = parseTimeString(str);

    const times = new Date(time);
    const year = times.getFullYear();
    const month = times.getMonth() + 1;
    const date = times.getDate();

    let hours;
    let minutes;
    let seconds;

    if (times.getHours() < 10) {
        hours = `0${times.getHours()}`;
    } else {
        hours = times.getHours();
    }
    if (times.getMinutes() < 10) {
        minutes = `0${times.getMinutes()}`;
    } else {
        minutes = times.getMinutes();
    }
    if (times.getSeconds() < 10) {
        seconds = `0${times.getSeconds()}`;
    } else {
        seconds = times.getSeconds();
    }
    if (year >= 9999) { return '永久有效'; }
    return `${year}.${month}.${date} ${hours}:${minutes}`;
}
