const SmoothClock = false
const accurateMinutesClock = true

function getTimeWithTimeZone(timeZone) {
    return new Date(new Date().toLocaleString('en-US', {timeZone}))
}

date = getTimeWithTimeZone('Europe/Moscow')

let hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds();

if (hours > 12) {
    hours -= 12;
}


let secondsStartDegree, minutesStartDegree, hoursStartDegree

if (accurateMinutesClock) {//точность
    secondsStartDegree = 360 / 60 * seconds,
    minutesStartDegree = 360 / 60 * minutes + 6 / 60 * seconds,
    hoursStartDegree = 360 / 12 * hours + 30 / 60 * minutes + 0.5 / 60 * seconds;
} else {
    secondsStartDegree = 360 / 60 * seconds,
    minutesStartDegree = 360 / 60 * minutes,
    hoursStartDegree = 360 / 12 * hours + 30 / 60 * minutes + 0.5 / 60 * seconds;
}

const style = document.createElement('style');

if (SmoothClock) {
//плавно
    style.innerHTML = '\
        @keyframes clock-hand-rotate--hour {\
            from {transform: rotate(' + hoursStartDegree + 'deg)}\
            to {transform: rotate(' + (hoursStartDegree + 360) + 'deg)}\
        }\
        @keyframes clock-hand-rotate--minute {\
            from {transform: rotate(' + minutesStartDegree + 'deg)}\
            to {transform: rotate(' + (minutesStartDegree + 360) + 'deg)}\
        }\
        @keyframes clock-hand-rotate--second {\
            from {transform: rotate(' + secondsStartDegree + 'deg)}\
            to {transform: rotate(' + (secondsStartDegree + 360) + 'deg)}\
        }\
        .clock__hand--hour {\
            animation: clock-hand-rotate--hour 43200s linear infinite;\
        }\
        .clock__hand--minute {\
            animation: clock-hand-rotate--minute 3600s linear infinite;\
        }\
        .clock__hand--second {\
            animation: clock-hand-rotate--second 60s linear infinite;\
        }';
} else {
//по секундно
style.innerHTML = '\
        @keyframes clock-hand-rotate--hour {\
            from {transform: rotate(' + hoursStartDegree + 'deg)}\
            to {transform: rotate(' + (hoursStartDegree + 360) + 'deg)}\
        }\
        @keyframes clock-hand-rotate--minute {\
            from {transform: rotate(' + minutesStartDegree + 'deg)}\
            to {transform: rotate(' + (minutesStartDegree + 360) + 'deg)}\
        }\
        @keyframes clock-hand-rotate--second {\
            from {transform: rotate(' + secondsStartDegree + 'deg)}\
            to {transform: rotate(' + (secondsStartDegree + 360) + 'deg)}\
        }\
        .clock__hand--hour {\
            animation: clock-hand-rotate--hour 43200s linear infinite;\
        }\
        .clock__hand--minute {\
            animation: clock-hand-rotate--minute 3600s linear infinite;\
        }\
        .clock__hand--second {\
            animation: clock-hand-rotate--second 60s steps(60) infinite;\
        }';
}

document.getElementsByTagName('head')[0].appendChild(style);