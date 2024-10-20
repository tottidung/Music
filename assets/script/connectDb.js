var listCourses = document.querySelector(".playlist");
var courseAPI = "http://localhost:3000/courses";

function start() {
  getCourses(renderCourses);
  handleCreateBtn();
}
start();

function getCourses(callback) {
  fetch(courseAPI)
    .then(function (responsive) {
      return responsive.json();
    })
    .then(callback);
}

function renderCourses(courses) {
  var listCourses = document.querySelector(".playlist");
  var htmls = courses.map(function (course) {
    return `<li class="course-item-${course.id}">
          <h4 contenteditable="false" class="course-item-name-${course.id}">${course.name}</h4>
          <p contenteditable="false" class="course-item-description-${course.id} ">${course.description}</p>
          <button onclick="handleDeleteCourses('${course.id}')">Xóa</button>
          <button onclick="handleUpdateCourses('${course.id}')" id="update-${course.id}">Sửa</button>
      </li>`;
  });
  listCourses.innerHTML = htmls.join(" ");
}
// Start : POST
function handleCreateCourse(data, callback) {
  var option = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(courseAPI, option)
    .then(function (responsive) {
      return responsive.json();
    })
    .then(callback);
}

function handleCreateBtn() {
  var createBTN = document.querySelector("#create");
  createBTN.onclick = function () {
    var name = document.querySelector('input[name="name"]').value;
    var description = document.querySelector('input[name="description"]').value;

    var listData = {
      name: name,
      description: description,
    };

    handleCreateCourse(listData, function () {
      getCourses(renderCourses);
    });
  };
}
// End :POST

// Start : DELETE

function handleDeleteCourses(id) {
  var option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(courseAPI + "/" + id, option)
    .then(function (responsive) {
      return responsive.json();
    })
    .then(function () {
      var courseItem = document.querySelector(`.course-item-${id}`);
      if (courseItem) {
        courseItem.remove();
      }
    });
}

//End : DELETE

// Start : Update
function putCourse(id, data, callback) {
  var option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(courseAPI + "/" + id, option)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

function handleUpdateCourses(id) {
  var nameElement = document.querySelector(`.course-item-name-${id}`);
  var descriptionElement = document.querySelector(
    `.course-item-description-${id}`
  );
  var updateButton = document.querySelector(`#update-${id}`);

  if (updateButton.textContent === "Sửa") {
    nameElement.contentEditable = "true";
    descriptionElement.contentEditable = "true";
    updateButton.textContent = "Lưu";
  } else {
    nameElement.contentEditable = "false";
    descriptionElement.contentEditable = "false";
    updateButton.textContent = "Sửa";

    var formData = {
      name: nameElement.textContent,
      description: descriptionElement.textContent,
    };

    putCourse(id, formData, function () {
      getCourses(renderCourses);
    });
  }
}

// End : Update
