document.addEventListener('DOMContentLoaded', function () {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    const studentTableBody = document.getElementById('studentTableBody');

    students.forEach(function (student, index) {
      let row = `<tr id="row-${index}">
        <td id="name-${index}">${student.name}</td>
        <td id="rollNumber-${index}">${student.rollNumber}</td>
        <td id="chemistry-${index}">${student.chemistry}</td>
        <td id="physics-${index}">${student.physics}</td>
        <td id="maths-${index}">${student.maths}</td>
        <td>
          <button class="btn btn-warning action-btn" id="edit-btn-${index}" onclick="editStudent(${index})">Edit</button>
          <button class="btn btn-danger action-btn" onclick="deleteStudent(${index})">Delete</button>
        </td>
      </tr>`;
      studentTableBody.insertAdjacentHTML('beforeend', row);
    });
  });

  function editStudent(index) {
    // Convert table row data into editable fields
    let nameField = document.getElementById(`name-${index}`);
    let rollNumberField = document.getElementById(`rollNumber-${index}`);
    let chemistryField = document.getElementById(`chemistry-${index}`);
    let physicsField = document.getElementById(`physics-${index}`);
    let mathsField = document.getElementById(`maths-${index}`);

    nameField.innerHTML = `<input type="text" id="edit-name-${index}" value="${nameField.textContent}" class="form-control">`;
    rollNumberField.innerHTML = `<input type="number" id="edit-rollNumber-${index}" value="${rollNumberField.textContent}" class="form-control" readonly>`;
    chemistryField.innerHTML = `<input type="number" id="edit-chemistry-${index}" value="${chemistryField.textContent}" class="form-control">`;
    physicsField.innerHTML = `<input type="number" id="edit-physics-${index}" value="${physicsField.textContent}" class="form-control">`;
    mathsField.innerHTML = `<input type="number" id="edit-maths-${index}" value="${mathsField.textContent}" class="form-control">`;

    // Change the "Edit" button to a "Save" button
    let editButton = document.getElementById(`edit-btn-${index}`);
    editButton.textContent = "Save";
    editButton.classList.remove('btn-warning');
    editButton.classList.add('btn-success');
    editButton.setAttribute('onclick', `saveStudent(${index})`);
  }

  function saveStudent(index) {
    // Get updated values from the input fields
    let updatedName = document.getElementById(`edit-name-${index}`).value;
    let updatedChemistry = document.getElementById(`edit-chemistry-${index}`).value;
    let updatedPhysics = document.getElementById(`edit-physics-${index}`).value;
    let updatedMaths = document.getElementById(`edit-maths-${index}`).value;

    // Fetch students from localStorage
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // Update student details in the array
    students[index].name = updatedName;
    students[index].chemistry = updatedChemistry;
    students[index].physics = updatedPhysics;
    students[index].maths = updatedMaths;

    // Save the updated array back to localStorage
    localStorage.setItem('students', JSON.stringify(students));

    // Reload the page to reflect the changes
    location.reload();
  }

  function deleteStudent(index) {
    if (confirm('Are you sure you want to delete this student?')) {
      let students = JSON.parse(localStorage.getItem('students')) || [];
      students.splice(index, 1);
      localStorage.setItem('students', JSON.stringify(students));
      location.reload();
    }
  }