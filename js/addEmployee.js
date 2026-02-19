document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("addEmployeeForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const empId = document.getElementById("empId").value.trim();
        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const email = document.getElementById("email").value.trim();
        const joiningDate = document.getElementById("joiningDate").value;
        const location = document.querySelector("#addEmployeeForm select[name='location']").value;
        const department = document.querySelector("#addEmployeeForm select[name='department']").value;
        const role = document.getElementById("role").value.trim();

        if (!empId || !firstName || !lastName || !email || !joiningDate) {
            alert("Please fill all required fields.");
            return;
        }

        let employees = JSON.parse(localStorage.getItem("employees")) || [];

        employees.push({
            empId,
            firstName,
            lastName,
            email,
            joiningDate,
            location,
            department,
            role,
            status: "Active"
        });

        localStorage.setItem("employees", JSON.stringify(employees));

        form.reset();
        setTimeout(() => {
            const msg = document.getElementById("successMessage");
            msg.style.display = "flex"; 

            setTimeout(() => {
                msg.style.display = "none";
            }, 3000);

        });

        // setTimeout(() => {
        //     window.location.href = "../html/employees.html";
        // }, 1000);
    });
});
