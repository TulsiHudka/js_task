let d = new Date();
d.setDate(d.getDate() - 1);
document.getElementById("date").max = d.toISOString().split("T")[0];

const getradiovalue = () => {
  let radiobtn = document.getElementsByName("gender");
  let selected = Array.from(radiobtn).find((radio) => radio.checked);
  return selected.value;
};

const setupdatedradiovalue = (gender) => {
  document.getElementById(gender).checked = true;
};

let formTag = document.getElementById("formTag");
formTag.addEventListener("submit", (e) => e.preventDefault());

// Validate form inputs before submiting data
function validateForm() {
  let name = document.getElementById("name").value;
  let address = document.getElementById("address").value;
  let emailaddress = document.getElementById("emailaddress").value;
  let gender = document.getElementsByName("gender");
  let date = document.getElementById("date").value;

  let valid = true;
  if (name == "") {
    alert("Name is reruired");
    valid = false;
  } else if (name.length <= 2 || name.length > 20) {
    alert("Name should be in the length between 2-20 characters");
    valid = false;
  } else if (!/[a-zA-Z][a-zA-Z ]{2,}/.test(name)) {
    alert("name should not contain numbers");
    valid = false;
  }
  if (address == "") {
    alert("address is reruired");
    valid = false;
  }
  if (emailaddress == "") {
    alert("Email is reruired");
    valid = false;
  } else if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      emailaddress
    )
  ) {
    alert("Invalid email address");
    valid = false;
  }
  if (!(gender[0].checked || gender[1].checked)) {
    alert("gender is required");
    valid = false;
  }
  if (date == "") {
    alert("date is reruired");
    valid = false;
  }
  return valid;
}

// function to show data from local storage
function showData() {
  let peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }
  for (let i = 0; i < peopleList.length; i++) {
    document.getElementById("tbody").innerHTML += `<tr> 
    <td>${i + 1}</td>
    <td>${peopleList[i].name}</td> 
    <td>${peopleList[i].address}</td> 
    <td>${peopleList[i].emailaddress}</td> 
    <td>${peopleList[i].gender}</td> 
    <td>${peopleList[i].date}</td> 
    <td> 
    <button class="btn btn-warning btn-sm edit" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="updateData(${i})">Edit</button> <button class="btn btn-danger btn-sm delete" onclick="deleteData(${i})">Delete</button> 
    </td> 
    </tr>`;
  }
}

// loads all data from local storage when document or page loaded
document.onload = showData();

let Emails = [];

const emailValidation = (email) => {
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }
  for (let i = 0; i < peopleList.length; ++i) {
    Emails.push(peopleList[i].emailaddress);
  }
  let validEmail = Emails.includes(email);
  if (validEmail) {
    alert("Email already Exits");
  }
  return validEmail;
};

// function to add data to local storage

function AddData() {
  // if form is validate
  if (!validateForm()) {
    return false;
  }

  let name = document.getElementById("name").value;
  let address = document.getElementById("address").value;
  let emailaddress = document.getElementById("emailaddress").value;
  let gender = getradiovalue();
  let date = document.getElementById("date").value;

  if (emailValidation(emailaddress)) {
    return false;
  }

  let peopleList;

  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  peopleList.push({
    name: name,
    address: address,
    emailaddress: emailaddress,
    gender: gender,
    date: date,
  });

  localStorage.setItem("peopleList", JSON.stringify(peopleList));
  showData();
  document.getElementById("name").value = "";
  document.getElementById("address").value = "";
  document.getElementById("emailaddress").value = "";
  document.getElementById("date").value = "";

  location.reload();
}

// function to delete data from local storage
function deleteData(index) {
  let peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  peopleList.splice(index, 2);
  localStorage.setItem("peopleList", JSON.stringify(peopleList));
  showData();
  location.reload();
}

// function to update/edit data from local storage
function updateData(index) {
  // submit button will hide and update button will show for updateing of data in local storage
  document.getElementById("Submit").style.display = "none";
  document.getElementById("Update").style.display = "block";

  let peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  document.getElementById("name").value = peopleList[index].name;
  document.getElementById("address").value = peopleList[index].address;
  document.getElementById("emailaddress").value =
    peopleList[index].emailaddress;
  setupdatedradiovalue(peopleList[index].gender);
  document.getElementById("date").value = peopleList[index].date;

  document.querySelector("#Update").onclick = function () {
    peopleList[index].name = document.getElementById("name").value;
    peopleList[index].address = document.getElementById("address").value;
    peopleList[index].emailaddress =
      document.getElementById("emailaddress").value;
    peopleList[index].gender = getradiovalue();
    peopleList[index].date = document.getElementById("date").value;

    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    document.getElementById("name").value = "";
    document.getElementById("address").value = "";
    document.getElementById("emailaddress").value = "";
    document.getElementById("date").value = "";

    // Update button will hide and Submit button will show
    document.getElementById("Submit").style.display = "block";
    document.getElementById("Update").style.display = "none";
    location.reload();
  };
}
