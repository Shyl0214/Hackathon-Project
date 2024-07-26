// Simulated data - In a real application, this would come from a server
const timetableData = [
  {
    day: "Monday",
    slots: ["CD 9:00 AM", "BDA 11:00 AM", "SEO 2:00 PM"],
  },
  { day: "Tuesday", slots: ["FCL 10:00 AM", "SS 1:00 PM"] },
  {
    day: "Wednesday",
    slots: ["CD 9:00 AM", "CP3 11:00 AM", "BDA 2:00 PM"],
  },
  { day: "Thursday", slots: ["CD 10:00 AM", "BDA 1:00 PM"] },
  {
    day: "Friday",
    slots: ["FCL 9:00 AM", "SEO 11:00 AM", "CP3 2:00 PM"],
  },
];

const notificationsData = [
  {
    title: "Exam Schedule Posted",
    message:
      "The final exam schedule has been posted. Please check your student portal for details.",
  },
  {
    title: "Library Hours Extended",
    message:
      "The library will have extended hours during the exam period. Open until midnight starting next week.",
  },
  {
    title: "Guest Lecture: AI in Education",
    message:
      "Don't miss the guest lecture on AI in Education this Friday at 3 PM in the main auditorium.",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  renderTimetable();
  renderNotifications();
  setupLogout();
});

function renderTimetable() {
  const timetableContainer = document.getElementById("timetable-container");
  timetableContainer.innerHTML = timetableData
    .map(
      (day) => `
        <div class="timetable-day">
            <h3>${day.day}</h3>
            ${day.slots
              .map((slot) => `<div class="timetable-slot">${slot}</div>`)
              .join("")}
        </div>
    `
    )
    .join("");
}

function renderNotifications() {
  const notificationsContainer = document.getElementById(
    "notifications-container"
  );
  const announcements = JSON.parse(localStorage.getItem("announcements")) || [];
  notificationsContainer.innerHTML = announcements
    .map(
      (announcement) => `
        <div class="notification">
            <h4>${announcement.title}</h4>
            <p>${announcement.message}</p>
            <small>${new Date(announcement.date).toLocaleString()}</small>
        </div>
    `
    )
    .join("");
}

function setupLogout() {
  const logoutBtn = document.getElementById("logout-btn");
  logoutBtn.addEventListener("click", () => {
    // In a real application, you would implement proper logout functionality here
    alert("Logout functionality would be implemented here.");
    // Redirect to login page or perform other logout actions
  });
}
