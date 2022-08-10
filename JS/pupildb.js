
function delPupilsPage() {
  window.location.href="./deleted-pupils.html";
}

// DISPLAY PUPILS

const searchInput =document.querySelector("[data-search]")

let pupils = []
searchInput.addEventListener("input", x => {
  const value = x.target.value.toLowerCase();
  
  pupils.forEach(firstName => {
    if (firstName.toLowerCase() == value ) {
      document.getElementById(firstName).classList.remove("d-none");
    } 
    else {
      document.getElementById(firstName).classList.add("d-none");
    }
  })
})

// GET METHOD

var requestOptions = {
  method: 'GET',
};
  fetch("https://localhost:44332/api/CrudProject", requestOptions
  ).then(
    response => 
    {
      response.json().then(
        data => {
          var pupil = "";
          data.map((a) => {
            pupil += `<tr id="${a.firstName}" >`;
            pupil += `<td class="d-none"> ${a.id} </td>`;
            pupil += "<td>" + a.firstName + "</td>";
            pupil += "<td>" + a.lastName + "</td>";
            pupil += "<td>" + a.age + "</td>";
            pupil += "<td>" + a.subject + "</td>";
            pupil += 
            `<td>
              <button onclick="updateStudentModal('${a.id}', '${a.firstName}', '${a.lastName}', '${a.age}', '${a.subject}')" class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                Update
              </button>
            </td>`;
            pupil += 
            `<td>
              <button class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal3">
                Delete
              </button>
            </td>`;
            pupil += "</tr>"
            pupils.push(a.firstName);
          });
          document.getElementById("data").innerHTML += pupil;
        }
      )
    }
  );

// PUT METHOD

  function updateStudentModal(id, fname, lname, age, subj) {
    document.getElementById('inputIdUpdate').value = id;
    document.getElementById('inputFnameUpdate').value = fname;
    document.getElementById('inputLnameUpdate').value = lname;
    document.getElementById('inputAgeUpdate').value = age;
    document.getElementById('inputSubjectUpdate').value = subj;
  }

  const myUpdate = document.getElementById("myUpdate");

  myUpdate.addEventListener("submit", function (e) {
    e.preventDefault();

    var studentData = {};
    studentData["id"] = document.getElementById('inputIdUpdate').value;
    studentData["firstName"] = document.getElementById('inputFnameUpdate').value;
    studentData["lastName"] = document.getElementById('inputLnameUpdate').value;
    studentData["age"] = document.getElementById('inputAgeUpdate').value;
    studentData["subject"] = document.getElementById('inputSubjectUpdate').value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(`https://localhost:44332/api/CrudProject/${studentData.id}`, {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(studentData),
    })
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

    if(event === "update"){
    }else{
      window.location.reload();
    }
  });

/////////////////////////////////////////////////////////////////////////////////

// DELETE METHOD











// POST METHOD

  function readFormData() {
    var formData = {};
    formData["firstName"] = document.getElementById('inputFname').value;
    formData["lastName"] = document.getElementById('inputLname').value;
    formData["age"] = document.getElementById('inputAge').value;
    formData["subject"] = document.getElementById('inputSubject').value;
    return JSON.stringify(formData);
  }

  const myForm = document.getElementById("myForm");

  myForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch("https://localhost:44332/api/CrudProject", {
      method: 'POST',
      headers: myHeaders,
      body: readFormData(),
    }).then(function (response) {
      return response.text();
    }).then(function (text) {
      console.log(text);
      if(event === "update"){
      }else{
        window.location.reload();
      }
    }).catch(function (error) {
      console.error(error);
    })
  });








