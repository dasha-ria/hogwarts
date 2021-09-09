fetch("https://petlatkea.dk/2021/hogwarts/students.json")
    .then((res) => res.json())
    // .then((data) => console.log(data))
    .then((students) => {
        students
    })

    function capitalize(student) {
        return student.fullname.charAt(0).toUpperCase() + student.fullname.slice(1).toLowerCase();
    }

    function getFirstName(student) {
        return student.fullname[0];
    }

    function getMiddleName(student) {
        
    }