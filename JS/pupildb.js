// DISPLAY PUPILS

const searchInput =document.querySelector("[data-search]")

var call_type = null;

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
  fetch("https://localhost:44332/api/CrudProject", requestOptions).then(
    response => 
    {
      response.json().then(
        data => {
          var pupil = "";
          data.map((a) => {
            pupil += `<tr id="${a.firstName}" >`;
            pupil += "<td>" + a.firstName + "</td>";
            pupil += "<td>" + a.lastName + "</td>";
            pupil += "<td>" + a.age + "</td>";
            pupil += "<td>" + a.subject + "</td>";
            pupil += 
            `<td><button onClick="onUpdate(event)" id="${a.id}" class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Update
            </button></td>`;
            pupil += 
            `<td><button onClick="onDelete(event)" id="${a.id}" class="btn btn-danger btn-sm">
              Delete
            </button></td>`;
            pupil += "</tr>"
            pupils.push(a.firstName);
          });
          document.getElementById("data").innerHTML += pupil;
        }
      )
    }
  );



  /////////////////////////////////////////////////////////////////////////////////

// PUT METHOD

  function onUpdate(event) {
    let button = document.getElementById("process");
    button.setAttribute("event", "update")
  }

  var raw = "";

  var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

  fetch("https://localhost:44332/api/CrudProject", {
    method: 'PUT',
    headers: myHeaders,
  })
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));





  /////////////////////////////////////////////////////////////////////////////////

// DELETE METHOD

  // function onDelete(td) {
  //   alert("Welcme")
  // }

  // var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");

  // fetch("https://localhost:44332/api/CrudProject/id", {
  //   method: 'DELETE',
  //   headers: myHeaders,
  // })
  //   .then(response => response.text())
  //   .then(result => console.log(result))
  //   .catch(error => console.log('error', error));





/////////////////////////////////////////////////////////////////////////////////

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
    let button = document.getElementById("process");
    let event = button.getAttribute("event");
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








