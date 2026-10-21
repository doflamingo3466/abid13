
let students = [];
let editId = null;

function addStudent() {
    let name = document.getElementById("name").value.trim();
    let age = document.getElementById("age").value;
    let course = document.getElementById("course").value.trim();
    let message = document.getElementById("message");

    if (!name || !age || age < 1 || !course) {
        message.innerText = "Please fill all fields correctly!";
        return;
    }

    message.innerText = "";
    let student = {name, age, course};

    if (editId === null) students.push(student);
    else students[editId] = student;

    editId = null;
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("course").value = "";
    document.getElementById("formTitle").innerText = "Add a Student";
    document.getElementById("submitBtn").innerText = "+ Add Student";
    document.getElementById("cancelBtn").hidden = true;
    showStudents();
}

function showStudents() {
    let output = "";

    students.forEach(function(s, i) {
        output += `<div class="student">
            <b>${s.name}</b><p>Age: ${s.age} | Course: ${s.course}</p>
            <button class="btn btn-primary btn-sm" onclick="editStudent(${i})">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteStudent(${i})">Delete</button>
        </div>`;
    });

    document.getElementById("studentList").innerHTML = output || "<p class='empty'>No students added yet.</p>";
    document.getElementById("totalStudents").innerText = students.length;
}

function editStudent(i) {
    let s = students.find(function(s, index) { return index === i; });

    document.getElementById("name").value = s.name;
    document.getElementById("age").value = s.age;
    document.getElementById("course").value = s.course;
    document.getElementById("formTitle").innerText = "Edit Student";
    document.getElementById("submitBtn").innerText = "Update Details";
    document.getElementById("cancelBtn").hidden = false;
    editId = i;
}

function deleteStudent(i) {
    students.splice(i, 1);
    if (editId === i) cancelEdit();
    else if (editId > i) editId--;
    showStudents();
}

function cancelEdit() {
    editId = null;
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("course").value = "";
    document.getElementById("formTitle").innerText = "Add a Student";
    document.getElementById("submitBtn").innerText = "+ Add Student";
    document.getElementById("cancelBtn").hidden = true;
}

showStudents();
document.addEventListener("keydown", function(e) {
    if (e.key === "Enter") addStudent();
});