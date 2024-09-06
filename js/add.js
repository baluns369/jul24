document.getElementById('addStudentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const rollNumber = document.getElementById('rollNumber').value;
    const chemistry = document.getElementById('chemistry').value;
    const physics = document.getElementById('physics').value;
    const maths = document.getElementById('maths').value;

    let students = JSON.parse(localStorage.getItem('students')) || [];

    const isDuplicate = students.some(student => student.rollNumber === rollNumber);

    if (isDuplicate) {
      document.getElementById('duplicateAlert').style.display = 'block';
    } else {
      students.push({ name, rollNumber, chemistry, physics, maths });

      localStorage.setItem('students', JSON.stringify(students));

      window.location.href = '../index.html';
    }
  });