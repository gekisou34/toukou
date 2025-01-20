const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
const holidays = {
  "2025-01-01":"元旦",
  "2025-01-08":"成人の日",
  "2025-02-11": "建国記念の日",
  "2025-03-20": "春分の日",
  "2025-04-29": "昭和の日",
  "2025-05-03": "憲法記念日",
  "2025-05-04": "みどりの日",
  "2025-05-05": "こどもの日",
  "2025-07-15": "海の日",
  "2025-08-11": "山の日",
  "2025-09-16": "敬老の日",
  "2025-09-23": "秋分の日",
  "2025-10-14": "体育の日",
  "2025-11-03": "文化の日",
  "2025-11-23": "勤労感謝の日",
  "2025-12-23": "天皇誕生日"
};
let selectedDate = null;

const events = {};

const renderCalendar = (year, month) => {
  const datesDiv = document.getElementById("dates");
  const weekdaysDiv = document.getElementById("weekdays");
  const monthYearDiv = document.getElementById("month-year");

  datesDiv.innerHTML = "";
  weekdaysDiv.innerHTML = "";
  weekdays.forEach(day => {
    weekdaysDiv.innerHTML += `<div>${day}</div>`;
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    datesDiv.innerHTML += `<div></div>`;
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const isToday = new Date(year, month, day).toDateString() === today.toDateString();
    const dateClass = isToday ? "today" : "";
    const weekday = new Date(year, month, day).getDay();
    const extraClass = weekday === 0 ? "sunday" : weekday === 6 ? "saturday" : "";
    const isHoliday = holidays[dateStr] ? "holiday" : "";
    const holidayLabel = holidays[dateStr] ? `<div class="holiday-label">${holidays[dateStr]}</div>` : "";
    const eventText = events[dateStr] ? `<div class="events">${events[dateStr]}</div>` : "";

    datesDiv.innerHTML += `
      <div class="${dateClass} ${extraClass} ${isHoliday}" data-date="${dateStr}">
        <div>${day}</div>
        ${holidayLabel}
        ${eventText}
      </div>`;
  }

  monthYearDiv.innerText = `${year}年 ${month + 1}月`;
};

const goToToday = () => {
  currentMonth = today.getMonth();
  currentYear = today.getFullYear();
  renderCalendar(currentYear, currentMonth);
};

const saveEvent = () => {
  if (!selectedDate) return alert("日付を選択してください");
  const eventText = document.getElementById("event-input").value.trim();
  const eventTime = document.getElementById("event-time").value;
  if (!eventText || !eventTime) return alert("予定と時間を入力してください");
  events[selectedDate] = `${eventTime} ${eventText}`;
  renderCalendar(currentYear, currentMonth);
};

const deleteEvent = () => {
  if (!selectedDate) return alert("日付を選択してください");
  delete events[selectedDate];
  renderCalendar(currentYear, currentMonth);
};

const goToSelectedMonth = () => {
  const yearMonthInput = document.getElementById("year-month-input").value;
  if (!yearMonthInput) return alert("年月を入力してください");

  const [year, month] = yearMonthInput.split("-").map(Number);
  currentYear = year;
  currentMonth = month - 1; // JavaScript の月は 0 から始まる
  renderCalendar(currentYear, currentMonth);
};

document.getElementById("dates").addEventListener("click", e => {
  if (!e.target.closest("[data-date]")) return;
  selectedDate = e.target.closest("[data-date]").dataset.date;
  document.getElementById("selected-date").innerText = selectedDate;
});

document.getElementById("prev-month").addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentYear, currentMonth);
});

document.getElementById("next-month").addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentYear, currentMonth);
});

document.getElementById("save-event").addEventListener("click", saveEvent);
document.getElementById("delete-event").addEventListener("click", deleteEvent);
document.getElementById("go-today").addEventListener("click", goToToday);
document.getElementById("go-to-month").addEventListener("click", goToSelectedMonth);

goToToday();
