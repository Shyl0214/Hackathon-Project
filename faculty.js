document.addEventListener("DOMContentLoaded", () => {
  const announcementForm = document.getElementById("announcement-form");
  const announcementsList = document.getElementById("announcements-list");

  announcementForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("announcement-title").value;
    const message = document.getElementById("announcement-message").value;

    // In a real application, you would send this data to a server
    // For now, we'll just add it to the list and local storage
    addAnnouncement(title, message);
    announcementForm.reset();
  });

  // Load existing announcements
  loadAnnouncements();
});

function addAnnouncement(title, message) {
  const announcement = { title, message, date: new Date().toISOString() };
  let announcements = JSON.parse(localStorage.getItem("announcements")) || [];
  announcements.unshift(announcement);
  localStorage.setItem("announcements", JSON.stringify(announcements));
  renderAnnouncement(announcement);
}

function loadAnnouncements() {
  const announcements = JSON.parse(localStorage.getItem("announcements")) || [];
  announcements.forEach(renderAnnouncement);
}

function renderAnnouncement(announcement) {
  const announcementElement = document.createElement("div");
  announcementElement.className = "announcement";
  announcementElement.innerHTML = `
        <h3>${announcement.title}</h3>
        <p>${announcement.message}</p>
        <small>${new Date(announcement.date).toLocaleString()}</small>
    `;
  document.getElementById("announcements-list").prepend(announcementElement);
}
