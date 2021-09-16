let students = [];

fetch("https://petlatkea.dk/2021/hogwarts/students.json")
  .then((res) => res.json())
  // .then((data) => console.log(data))
  .then((students) => {
    return students
      .map(trimStudents)
      .map(splitStudents)
      .map(capitalizeFix)
      .map(associateImage);
    // .map(console.log);
  })
  .then((allstudents) => {
    students = allstudents;
    allstudents.forEach(showStudent);
  });

function splitStudents(student) {
  const splitStudentName = student.fullname.split(" ");
  const fullName = student.fullname;
  const firstName = splitStudentName[0];

  let lastName;
  if (splitStudentName.length > 1) {
    lastName = splitStudentName[splitStudentName.length - 1];
  }

  let nickName;
  let middleName;
  if (splitStudentName.length > 2) {
    if (fullName.includes('"')) {
      nickName = splitStudentName[1];
    } else {
      middleName = splitStudentName[1];
    }
  }

  return {
    ...student,
    firstname: firstName,
    middlename: middleName,
    nickname: nickName,
    lastname: lastName,
  };
}

function trimStudents(student) {
  const trimStudentName = student.fullname.trim();
  const trimStudentHouse = student.house.trim();
  return {
    ...student,
    fullname: trimStudentName,
    house: trimStudentHouse,
  };
}

function capitalize(word) {
  if (word != undefined) {
    const capitalizeLetter = word.charAt(0).toUpperCase();
    const lowerCaseWord = word.slice(1).toLowerCase();

    return capitalizeLetter + lowerCaseWord;
  } else {
    return undefined;
  }
}

function capitalizeFix(student) {
  // const uppercaseName = student.fullname.charAt(0).toUpperCase() + student.fullname.slice(1).toLowerCase();

  const uppercaseFirstName = capitalize(student.firstname);
  const capitalizeHouse = capitalize(student.house);
  const uppercaseMiddleName = capitalize(student.middlename);
  const uppercaseLastName = capitalize(student.lastname);
  const uppercaseGender = capitalize(student.gender);

  return {
    ...student,
    firstname: uppercaseFirstName,
    middlename: uppercaseMiddleName,
    // nickname: uppercaseName,
    lastname: uppercaseLastName,
    house: capitalizeHouse,
    gender: uppercaseGender,
  };
}

function associateImage(student) {
  let imgSrc;
  if (student.lastname !== undefined) {
    const firstNameLowercase = student.firstname.toLowerCase();
    const firstNameFirstLetter = student.firstname.slice(0, 1).toLowerCase();
    const lastNameLowercase = student.lastname.toLowerCase();

    if (student.lastname == "Patil") {
      imgSrc = `${lastNameLowercase}_${firstNameLowercase}.png`;
    } else if (student.lastname.includes("-")) {
      const lineLastName = student.lastname.slice(
        student.lastname.indexOf("-") + 1
      );
      imgSrc = `${lineLastName}_${firstNameFirstLetter}.png`;
    } else {
      imgSrc = `${lastNameLowercase}_${firstNameFirstLetter}.png`;
    }
  }
  return {
    ...student,
    image: imgSrc,
  };
}

//The student list has now been "cleaned", and the images have been associated with the students
//Now I need to do sorting, filtering, searching..

/**
 * {
 *   firstName,
 *   lastName,
 *   house
 * }
 */

function filterByHouse(student, house) {
  if (student.house === house) {
    return true;
  } else {
    return false;
  }
}

function sortByHouse(a, b) {
  if (a.house < b.house) {
    return -1;
  }
  if (b.house > a.house) {
    return 1;
  }
  return 0;
}

function sortByFirstName(a, b) {
  if (a.firstname < b.firstname) {
    return -1;
  }
  if (b.firstname > a.firstname) {
    return 1;
  }
  return 0;
}

function sortByLastName(a, b) {
  if (a.lastname < b.lastname) {
    return -1;
  }
  if (b.lastname > a.lastname) {
    return 1;
  }
  return 0;
}

// const housesort = students.sort((a, b) => sortByHouse(a, b)).reverse();

function showStudent(student) {
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);
  copy.querySelector(".student-firstname").innerText = student.firstname;
  copy.querySelector(".student-lastname").innerText = student.lastname;
  copy.querySelector(".student-house").innerText = student.house;
  copy.querySelector(".student-pic").src = `images/${student.image}`;

  copy.querySelector(".student-box").onclick = () => {
    document.querySelector(".modal-wrap").classList.remove("popuphidden");
    document.querySelector(".modal-student-firstname").innerText =
      student.firstname;
    document.querySelector(".modal-student-lastname").innerText =
      student.lastname;
    document.querySelector(".modal-house").innerText = student.house;
    document.querySelector(
      ".modal-student-pic"
    ).src = `images/${student.image}`;
    document.querySelector(
      ".house-crest"
    ).src = `student-house-img/${student.house}.svg`;
  };
  document.querySelector(".close-button").onclick = () => {
    document.querySelector(".modal-wrap").classList.add("popuphidden");
  };

  document.querySelector(".student-template-wrap").appendChild(copy);
}

document.querySelector(".filter-slytherin").onclick = () => {
  const newstudents = students.filter((student) =>
    filterByHouse(student, "Slytherin")
  );
  document.querySelector(".student-template-wrap").replaceChildren();
  newstudents.forEach(showStudent);

  document
    .querySelector(".filter-ravenclaw")
    .classList.remove("active-category");
  document
    .querySelector(".filter-gryffindor")
    .classList.remove("active-category");
  document
    .querySelector(".filter-hufflepuff")
    .classList.remove("active-category");
  document.querySelector(".filter-all").classList.remove("active-category");
  document.querySelector(".filter-slytherin").classList.add("active-category");
};

document.querySelector(".filter-hufflepuff").onclick = () => {
  const newstudents = students.filter((student) =>
    filterByHouse(student, "Hufflepuff")
  );
  document.querySelector(".student-template-wrap").replaceChildren();
  newstudents.forEach(showStudent);

  document.querySelector(".filter-all").classList.remove("active-category");
  document
    .querySelector(".filter-slytherin")
    .classList.remove("active-category");
  document
    .querySelector(".filter-ravenclaw")
    .classList.remove("active-category");
  document
    .querySelector(".filter-gryffindor")
    .classList.remove("active-category");
  document.querySelector(".filter-hufflepuff").classList.add("active-category");
};

document.querySelector(".filter-ravenclaw").onclick = () => {
  const newstudents = students.filter((student) =>
    filterByHouse(student, "Ravenclaw")
  );
  document.querySelector(".student-template-wrap").replaceChildren();
  newstudents.forEach(showStudent);

  document.querySelector(".filter-all").classList.remove("active-category");
  document
    .querySelector(".filter-slytherin")
    .classList.remove("active-category");
  document
    .querySelector(".filter-gryffindor")
    .classList.remove("active-category");
  document
    .querySelector(".filter-hufflepuff")
    .classList.remove("active-category");
  document.querySelector(".filter-ravenclaw").classList.add("active-category");
};

document.querySelector(".filter-gryffindor").onclick = () => {
  const newstudents = students.filter((student) =>
    filterByHouse(student, "Gryffindor")
  );
  document.querySelector(".student-template-wrap").replaceChildren();
  newstudents.forEach(showStudent);

  document
    .querySelector(".filter-hufflepuff")
    .classList.remove("active-category");
  document
    .querySelector(".filter-slytherin")
    .classList.remove("active-category");
  document
    .querySelector(".filter-ravenclaw")
    .classList.remove("active-category");
  document.querySelector(".filter-all").classList.remove("active-category");
  document.querySelector(".filter-gryffindor").classList.add("active-category");
};

document.querySelector(".filter-all").onclick = () => {
  document.querySelector(".student-template-wrap").replaceChildren();
  students.forEach(showStudent);
  document
    .querySelector(".filter-ravenclaw")
    .classList.remove("active-category");
  document
    .querySelector(".filter-hufflepuff")
    .classList.remove("active-category");
  document
    .querySelector(".filter-slytherin")
    .classList.remove("active-category");
  document
    .querySelector(".filter-gryffindor")
    .classList.remove("active-category");
  document.querySelector(".filter-all").classList.add("active-category");
};

let sortingBy = null;
document.querySelector(".house-sort").onclick = () => {
  if (sortingBy === "house:asc") {
    const studentsorting = [...students]
      .sort((a, b) => sortByHouse(a, b))
      .reverse();
    document.querySelector(".student-template-wrap").replaceChildren();
    studentsorting.forEach(showStudent);
    sortingBy = "house:desc";
  } else if (sortingBy === "house:desc") {
    document.querySelector(".student-template-wrap").replaceChildren();
    students.forEach(showStudent);
    sortingBy = null;
  } else {
    const studentsorting = [...students].sort((a, b) => sortByHouse(a, b));
    document.querySelector(".student-template-wrap").replaceChildren();
    studentsorting.forEach(showStudent);
    sortingBy = "house:asc";
  }
};

document.querySelector(".first-name-sort").onclick = () => {
  if (sortingBy === "firstname:asc") {
    const studentsorting = [...students]
      .sort((a, b) => sortByFirstName(a, b))
      .reverse();
    document.querySelector(".student-template-wrap").replaceChildren();
    studentsorting.forEach(showStudent);
    sortingBy = "firstname:desc";
  } else if (sortingBy === "firstname:desc") {
    document.querySelector(".student-template-wrap").replaceChildren();
    students.forEach(showStudent);
    sortingBy = null;
  } else {
    const studentsorting = [...students].sort((a, b) => sortByFirstName(a, b));
    document.querySelector(".student-template-wrap").replaceChildren();
    studentsorting.forEach(showStudent);
    sortingBy = "firstname:asc";
  }
};

document.querySelector(".last-name-sort").onclick = () => {
  if (sortingBy === "lastname:asc") {
    const studentsorting = [...students]
      .sort((a, b) => sortByLastName(a, b))
      .reverse();
    document.querySelector(".student-template-wrap").replaceChildren();
    studentsorting.forEach(showStudent);
    sortingBy = "lastname:desc";
  } else if (sortingBy === "lastname:desc") {
    document.querySelector(".student-template-wrap").replaceChildren();
    students.forEach(showStudent);
    sortingBy = null;
  } else {
    const studentsorting = [...students].sort((a, b) => sortByLastName(a, b));
    document.querySelector(".student-template-wrap").replaceChildren();
    studentsorting.forEach(showStudent);
    sortingBy = "lastname:asc";
  }
};
