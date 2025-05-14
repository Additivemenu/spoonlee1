const createBaseDOM = (timezone, dateTimeText) => {
  const container = document.querySelector(".container");
  const clock = document.createElement("div");
  clock.classList.add("clock", `clock-${timezone}`);
  clock.innerHTML = `
                    <div class="clock-hand">
                      <div class="hand hour"></div>
                      <div class="hand minute"></div>
                      <div class="hand second"></div>
                    </div>
                    <div class="timezone-text">${timezone} ${dateTimeText}</div>
                  `;
  container.appendChild(clock);
  return clock;
};

const drawMarkers = (clockBase) => {
  const bigMarkerMap = {
    12: 0,
    3: 90,
    6: 180,
    9: 270,
  };

  Object.entries(bigMarkerMap).forEach(([key, value]) => {
    const marker = document.createElement("div");
    marker.classList.add("big-pointer"); // ! why cannot insert key number in the class name?
    marker.style.transform = `rotate(${value}deg) translate(-50%, 0)`;
    marker.style.transformOrigin = "0px 300px"; // ! crucial to define the origin of the rotation
    clockBase.appendChild(marker);
  });

  const smallMarkerMap = {
    5: 30,
    10: 60,
    20: 120,
    25: 150,
    35: 210,
    40: 240,
    50: 300,
    55: 330,
  };

  Object.entries(smallMarkerMap).forEach(([key, value]) => {
    const marker = document.createElement("div");
    marker.classList.add("small-pointer");
    marker.style.transform = `rotate(${value}deg) translate(-50%, 0)`;
    marker.style.transformOrigin = "0px 300px";
    clockBase.appendChild(marker);
  });
};

function getTimeComponents(timezone) {
  const date = new Date();
  const options = { timeZone: timezone };

  // Get each component individually
  const hour = new Intl.DateTimeFormat("en-US", {
    ...options,
    hour: "numeric",
    hour12: false,
  }).format(date);
  const minute = new Intl.DateTimeFormat("en-US", {
    ...options,
    minute: "numeric",
  }).format(date);
  const second = new Intl.DateTimeFormat("en-US", {
    ...options,
    second: "numeric",
  }).format(date);

  return {
    hours: parseInt(hour, 10),
    minutes: parseInt(minute, 10),
    seconds: parseInt(second, 10),
  };
}

const drawHands = (timezone, clockBase) => {
  // step1: get the current time as HH:MM:SS
  const { hours, minutes, seconds } = getTimeComponents(timezone);
  const dateTimeText = `${hours}:${minutes}:${seconds}`;
  const dateTimeTextElement = clockBase.querySelector(".timezone-text");
  dateTimeTextElement.textContent = timezone + " " + dateTimeText;

  // step2: parse the HH:MM:SS into angle information (in degrees)
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const secondAngle = seconds * 6;

  // step3: draw the hands
  const hourHand = clockBase.querySelector(".hand.hour");
  const minuteHand = clockBase.querySelector(".hand.minute");
  const secondHand = clockBase.querySelector(".hand.second");

  hourHand.style.transformOrigin = "top center";
  minuteHand.style.transformOrigin = "top center";
  secondHand.style.transformOrigin = "top center";

  hourHand.style.transform = `rotate(${hourAngle - 180}deg)`;
  minuteHand.style.transform = `rotate(${minuteAngle - 180}deg)`;
  secondHand.style.transform = `rotate(${secondAngle - 180}deg)`;
};

const generateClock = ({ timezone = "America/New_York" }) => {
  const { hours, minutes, seconds } = getTimeComponents(timezone);
  const dateTimeText = `${hours}:${minutes}:${seconds}`;

  const clock = createBaseDOM(timezone, dateTimeText);

  drawMarkers(clock);

  setInterval(() => {
    drawHands(timezone, clock);
  }, 1000);
};

generateClock({ timezone: "Australia/Sydney" });
generateClock({ timezone: "America/New_York" });
