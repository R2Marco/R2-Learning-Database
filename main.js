document.addEventListener('DOMContentLoaded', function () {
    const addCourseBtn = document.getElementById('addCourseBtn');
    const courseList = document.getElementById('courseList');
    const exportBtn = document.getElementById('exportBtn');
    const importInput = document.getElementById('importInput');

    let courses = [];

    function renderCourses() {
        courseList.innerHTML = '';
        courses.forEach((course, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `${course.name} <button class="deleteBtn" data-index="${index}">Eliminar</button>`;
            courseList.appendChild(listItem);
        });

        // Add event listener to delete buttons
        const deleteBtns = document.querySelectorAll('.deleteBtn');
        deleteBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                courses.splice(index, 1);
                renderCourses();
            });
        });
    }

    addCourseBtn.addEventListener('click', function () {
        const courseName = prompt('Ingrese el nombre del curso:');
        if (courseName) {
            courses.push({ name: courseName });
            renderCourses();
        }
    });

    exportBtn.addEventListener('click', function () {
        const jsonData = JSON.stringify({ identifier: 'user123', courses });
        const blob = new Blob([jsonData], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'learning_data.json';
        a.click();
    });

    importInput.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const data = JSON.parse(e.target.result);
                if (data && data.identifier === 'user123' && data.courses) {
                    courses = data.courses;
                    renderCourses();
                } else {
                    alert('Formato de archivo no válido');
                }
            };
            reader.readAsText(file);
        }
    });
});
