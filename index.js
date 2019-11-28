console.log("start");

noShow();

makeCallToServer();

function makeCallToServer() {
  fetch("http://dummy.restapiexample.com/api/v1/employees")

    .then(parseResponse)
    .then(displayResponseBody)
    .catch(displayErrorFromServer);
}

function displayErrorFromServer(error) {
  console.log(error);
}

function parseResponse(response) {
  return response.json();
}


function displayResponseBody(json) {
  console.log(json);


  for (let index = 0; index < json.length; index++) {

    if (index < 5) {
      let element = json[index];

      let employee = document.createElement("div");
      employee.classList.add("employee");
      let employeeName = document.createElement("p");

      closingBtn(employee, employeeName).then(deleteButton);

      employeeName.classList.add("employee-name");
      employeeName.innerText = element.employee_name;

      employee.appendChild(employeeName);

      let employeeAgeSalary = document.createElement("p");
      employeeAgeSalary.classList.add("employee-age-salary");
      employeeAgeSalary.innerText =
        "Age: " + element.employee_age + " Salary: " + element.employee_salary;

      employee.appendChild(employeeAgeSalary);



      document.getElementById("employee-list").appendChild(employee);


    }

  }
}

console.log("end");

document.getElementsByTagName("button")[0].addEventListener("click", AddInput);
document.getElementsByTagName("button")[0].addEventListener("click", postData);

function postData() {
  let inputName = document.getElementById("name");
  let inputAge = document.getElementById("age");
  let inputSalary = document.getElementById("salary");

  let data = {
    "name": inputName.value,
    "salary": inputSalary.value,
    "age": inputAge.value
  };

  noShow();

  fetch('http://dummy.restapiexample.com/api/v1/create', {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      noShow();
      console.log(data);
    })
    .catch(function (error) {
      console.log(error);
    });

}


function AddInput(mainDiv, mainParagraph) {
  mainDiv = document.createElement("div");
  mainDiv.classList.add("employee");

  mainParagraph = document.createElement("p");
  closingBtn(mainDiv, mainParagraph).then(deleteButton);
  mainParagraph.classList.add("employee-name");
  mainParagraph.innerText = document.getElementById("name").value;
  mainDiv.appendChild(mainParagraph);

  ageSalaryParagraph = document.createElement("p");
  ageSalaryParagraph.classList.add("employee-age-salary");
  ageSalaryParagraph.innerText = "Age: " + document.getElementById("age").value + " Salary: " + document.getElementById("salary").value;
  mainDiv.appendChild(ageSalaryParagraph);

  document.getElementById("employee-list").appendChild(mainDiv);

}

function noShow() {
  document.getElementById("loaderDiv").classList.toggle("showNone");
}

function closingBtn(parent, paragraph) {
  return new Promise(function (resolve, reject) {
    let close = document.createElement("p");
    parent.appendChild(close);
    close.innerHTML = "&times;"
    close.classList.add("closebtn");
    close.addEventListener("click", function () {
      resolve(close);
    });
  })
}

function deleteButton(close) {
  close.parentElement.remove();

}
