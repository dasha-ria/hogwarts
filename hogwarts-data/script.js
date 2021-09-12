fetch("https://petlatkea.dk/2021/hogwarts/students.json")
  .then((res) => res.json())
  // .then((data) => console.log(data))
  .then((students) => {
    students
      .map(trimStudents)
      .map(splitStudents)
      .map(capitalizeFix)
      .map(associateImage)
      .map(console.log);
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
