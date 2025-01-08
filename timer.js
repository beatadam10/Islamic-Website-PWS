const prayerTimes = [
    { name: "Fajr", time: "06:42" },
    { name: "Dhuhr", time: "12:46" },
    { name: "Asr", time: "14:30" },
    { name: "Maghrib", time: "16:43" },
    { name: "Isha", time: "18:50" }
];

const getNextPrayer = () => {
    const now = new Date();
    for (let i = 0; i < prayerTimes.length; i++) {
        const [hours, minutes] = prayerTimes[i].time.split(":").map(Number);
        const prayerDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            hours,
            minutes
        );
        
        if (prayerDate > now) {
            return { time: prayerDate, name: prayerTimes[i].name };
        }
    }

    const [hours, minutes] = prayerTimes[0].time.split(":").map(Number);
    const nextFajrDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1, 
        hours,
        minutes
    );
    return { time: nextFajrDate, name: prayerTimes[0].name };
};

const countdown = () => {
    const nextPrayerName = document.getElementById("next-prayer-name");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    const { time: nextPrayerTime, name: nextPrayer } = getNextPrayer();

    nextPrayerName.textContent = nextPrayer;

    const now = new Date();
    const timeDifference = nextPrayerTime - now;

    if (timeDifference <= 0) {
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";
        return;
    }

    const remainingHours = Math.floor(timeDifference / (1000 * 60 * 60));
    const remainingMinutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const remainingSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    hoursElement.textContent = String(remainingHours).padStart(2, "0");
    minutesElement.textContent = String(remainingMinutes).padStart(2, "0");
    secondsElement.textContent = String(remainingSeconds).padStart(2, "0");
};

setInterval(countdown, 1000);

countdown();
