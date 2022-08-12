let retrievedID = 0;



function pupilsPage() {
  window.location.href="./pupildb.html";
}

// SEARCH PUPIL IN THE SEARCH BOX
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
};
  fetch("https://localhost:44332/api/CrudProject", requestOptions
  ).then(
    response => 
    {
      response.json().then(
        data => {
          var pupil = "";
          data.filter((a) => a.isActive === false)
          .map((a) => {
            pupil += `<tr id="${a.firstName}" >`;
            pupil += `<td class="d-none"> ${a.id} </td>`;
            pupil += "<td>" + a.firstName + "</td>";
            pupil += "<td>" + a.lastName + "</td>";
            pupil += "<td>" + a.age + "</td>";
            pupil += "<td>" + a.subject + "</td>";
            pupil += `<td class=""> ${a.isActive} </td>`;
            pupil += 
            `<td>
              <button onclick="retrievedID = ${a.id}"
                class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal3">
                  Restore
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

// RESTORE METHOD

function retrieveStudentData() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  fetch(`https://localhost:44332/api/CrudProject/${retrievedID}`, {
    method: 'POST',
    headers: myHeaders
  })
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  window.location.reload();
}

































