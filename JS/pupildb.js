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


var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};
  fetch("https://localhost:44332/api/CrudProject", requestOptions).then(
    response => 
    {
      response.json().then(
        data => {
          // console.log(data);
          var pupil = "";
          data.map((a) => {
            pupil += `<tr id="${a.firstName}" >`;
            pupil += "<td>" + a.firstName + "</td>";
            pupil += "<td>" + a.lastName + "</td>";
            pupil += "<td>" + a.age + "</td>";
            pupil += "<td>" + a.subject + "</td>";
            pupil += 
            `<td><button type="submit" class="btn btn-success btn-sm>
              <i class="bi bi-trash"></i> Edit
            </button></td>`;
            pupil += 
            `<td><button type="submit" class="btn btn-danger btn-sm>
              <i class="bi bi-trash"></i> Delete
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

  function readFormData() {
    var formData = {};
    formData["firstName"] = document.getElementById('inputFname').value;
    formData["lastName"] = document.getElementById('inputLname').value;
    formData["age"] = document.getElementById('inputAge').value;
    formData["subject"] = document.getElementById('inputSubject').value;
    return formData;
  }





////////////////////////////////////////////////////////////////////////////////

  const myForm = document.getElementById("myForm");

  myForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // let formData = new FormData();
    // let fname = document.getElementById('inputFname').value;
    // let lname = document.getElementById('inputLname').value;
    // let age = document.getElementById('inputAge').value;
    // let subj = document.getElementById('inputSubject').value;

    // formData.append('FirstName', fname);
    // formData.append('LastName', lname);
    // formData.append('Age', age);
    // formData.append('Subject', subj);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // var raw = JSON.stringify({
    //   "firstName": document.getElementById('inputFname').value,
    //   "lastName": document.getElementById('inputLname').value,
    //   "age": document.getElementById('inputAge').value,
    //   "subject": document.getElementById('inputSubject').value
    // });

    fetch("https://localhost:44332/api/CrudProject", {
      method: 'POST',
      headers: myHeaders,
      body: readFormData(),
      // redirect: 'follow'
    }).then(function (response) {
      return response.text();
    }).then(function (text) {
      console.log(text);
      window.location.reload();
    }).catch(function (error) {
      console.error(error);
    })
  });









