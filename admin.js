document.addEventListener("DOMContentLoaded", () => {
  loadUsers();
  loadCourses();
  loadSchedule();
  loadAnnouncements();

  document
    .getElementById("add-user-btn")
    .addEventListener("click", () => openModal("Add User", createUserForm));
  document
    .getElementById("add-course-btn")
    .addEventListener("click", () => openModal("Add Course", createCourseForm));
  document
    .getElementById("generate-schedule-btn")
    .addEventListener("click", generateSchedule);
  document
    .getElementById("add-announcement-btn")
    .addEventListener("click", () =>
      openModal("Add Announcement", createAnnouncementForm)
    );

  document.querySelector(".close").addEventListener("click", closeModal);
  document.getElementById("logout-btn").addEventListener("click", logout);
});

function openModal(title, formCreator) {
  document.getElementById("modal-title").textContent = title;
  document.getElementById("modal-form").innerHTML = "";
  formCreator();
  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function createUserForm() {
  const form = document.getElementById("modal-form");
  form.innerHTML = `
        <input type="text" id="user-name" placeholder="User Name" required>
        <input type="email" id="user-email" placeholder="Email" required>
        <select id="user-role">
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
        </select>
        <button type="submit">Add User</button>
    `;
  form.onsubmit = addUser;
}

function createCourseForm() {
  const form = document.getElementById("modal-form");
  form.innerHTML = `
        <input type="text" id="course-name" placeholder="Course Name" required>
        <input type="text" id="course-code" placeholder="Course Code" required>
        <input type="text" id="course-instructor" placeholder="Instructor" required>
        <button type="submit">Add Course</button>
    `;
  form.onsubmit = addCourse;
}

function createAnnouncementForm() {
  const form = document.getElementById("modal-form");
  form.innerHTML = `
        <input type="text" id="announcement-title" placeholder="Announcement Title" required>
        <textarea id="announcement-message" placeholder="Announcement Message" required></textarea>
        <button type="submit">Add Announcement</button>
    `;
  form.onsubmit = addAnnouncement;
}

function addUser(e) {
  e.preventDefault();
  const user = {
    name: document.getElementById("user-name").value,
    email: document.getElementById("user-email").value,
    role: document.getElementById("user-role").value,
  };
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  loadUsers();
  closeModal();
}

function addCourse(e) {
  e.preventDefault();
  const course = {
    name: document.getElementById("course-name").value,
    code: document.getElementById("course-code").value,
    instructor: document.getElementById("course-instructor").value,
  };
  let courses = JSON.parse(localStorage.getItem("courses")) || [];
  courses.push(course);
  localStorage.setItem("courses", JSON.stringify(courses));
  loadCourses();
  closeModal();
}

function addAnnouncement(e) {
  e.preventDefault();
  const announcement = {
    title: document.getElementById("announcement-title").value,
    message: document.getElementById("announcement-message").value,
    date: new Date().toISOString(),
  };
  let announcements = JSON.parse(localStorage.getItem("announcements")) || [];
  announcements.push(announcement);
  localStorage.setItem("announcements", JSON.stringify(announcements));
  loadAnnouncements();
  closeModal();
}

function loadUsers() {
  const userList = document.getElementById("user-list");
  const users = JSON.parse(localStorage.getItem("users")) || [];
  userList.innerHTML = users
    .map(
      (user) => `
        <div class="user-item">
            <span>${user.name} (${user.role})</span>
            <button onclick="editUser('${user.email}')">Edit</button>
            <button onclick="deleteUser('${user.email}')">Delete</button>
        </div>
    `
    )
    .join("");
}

function loadCourses() {
  const courseList = document.getElementById("course-list");
  const courses = JSON.parse(localStorage.getItem("courses")) || [];
  courseList.innerHTML = courses
    .map(
      (course) => `
        <div class="course-item">
            <span>${course.name} (${course.code})</span>
            <button onclick="editCourse('${course.code}')">Edit</button>
            <button onclick="deleteCourse('${course.code}')">Delete</button>
        </div>
    `
    )
    .join("");
}

function loadSchedule() {
  const scheduleList = document.getElementById("schedule-list");
  const schedule = JSON.parse(localStorage.getItem("schedule")) || [];
  scheduleList.innerHTML = schedule
    .map(
      (item) => `
        <div class="schedule-item">
            <span>${item.course} - ${item.time}</span>
            <button onclick="editScheduleItem('${item.id}')">Edit</button>
            <button onclick="deleteScheduleItem('${item.id}')">Delete</button>
        </div>
    `
    )
    .join("");
}

function loadAnnouncements() {
  const announcementsList = document.getElementById("admin-announcements-list");
  const announcements = JSON.parse(localStorage.getItem("announcements")) || [];
  announcementsList.innerHTML = announcements
    .map(
      (announcement) => `
        <div class="announcement-item">
            <h3>${announcement.title}</h3>
            <p>${announcement.message}</p>
            <span>${new Date(announcement.date).toLocaleString()}</span>
            <button onclick="editAnnouncement('${
              announcement.date
            }')">Edit</button>
            <button onclick="deleteAnnouncement('${
              announcement.date
            }')">Delete</button>
        </div>
    `
    )
    .join("");
}

function editUser(email) {
  // Implement user editing functionality
}

function deleteUser(email) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users = users.filter((user) => user.email !== email);
  localStorage.setItem("users", JSON.stringify(users));
  loadUsers();
}

function editCourse(code) {
  // Implement course editing functionality
}

function deleteCourse(code) {
  let courses = JSON.parse(localStorage.getItem("courses")) || [];
  courses = courses.filter((course) => course.code !== code);
  localStorage.setItem("courses", JSON.stringify(courses));
  loadCourses();
}

function editScheduleItem(id) {
  // Implement schedule item editing functionality
}

function deleteScheduleItem(id) {
  let schedule = JSON.parse(localStorage.getItem("schedule")) || [];
  schedule = schedule.filter((item) => item.id !== id);
  localStorage.setItem("schedule", JSON.stringify(schedule));
  loadSchedule();
}

function editAnnouncement(date) {
  // Implement announcement editing functionality
}

function deleteAnnouncement(date) {
  let announcements = JSON.parse(localStorage.getItem("announcements")) || [];
  announcements = announcements.filter(
    (announcement) => announcement.date !== date
  );
  localStorage.setItem("announcements", JSON.stringify(announcements));
  loadAnnouncements();
}

function generateSchedule() {
  // Implement schedule generation algorithm
  alert("Schedule generation feature not implemented yet.");
}

function logout() {
  // Implement logout functionality
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}
