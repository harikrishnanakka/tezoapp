document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("addEmployeeForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const params = new URLSearchParams(window.location.search);
        const mode = params.get("mode");

        if (mode === "edit" || mode === "view") {
            return;
        }

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



//viewEditModeEmployees

document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");
    const empId = params.get("empId");

    if (mode && empId) {
        loadEmployeeData(mode, empId);
    } else {
        initAddForm();
    }
});

// ─── Load employee for View / Edit ───────────────────────────────────────────

function loadEmployeeData(mode, empId) {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const emp = employees.find(e => e.empId === empId);

    if (!emp) {
        alert("Employee not found!");
        history.back();
        return;
    }

    populateForm(emp);
    updatePageHeader(mode);

    if (mode === "view") {
        initViewMode();
    } else if (mode === "edit") {
        initEditMode(empId);
    }
}

// ─── Populate Form Fields 

function populateForm(emp) {
    document.getElementById("empId").value       = emp.empId       || "";
    document.getElementById("firstName").value   = emp.firstName   || "";
    document.getElementById("lastName").value    = emp.lastName    || "";
    document.getElementById("email").value       = emp.email       || "";
    document.getElementById("joiningDate").value = emp.joiningDate || "";
    document.getElementById("role").value        = emp.role        || "";

    setSelectValue("location", emp.location);
    setSelectValue("department", emp.department);
}

// ─── Update Page Header

function updatePageHeader(mode) {
    const headings = {
        view: { title: "View Employee",  subtitle: "Employee details (read-only)." },
        edit: { title: "Edit Employee",  subtitle: "Update employee details."      },
    };
    const { title, subtitle } = headings[mode] || {};
    if (title) document.querySelector(".page-header h2").textContent = title;
    if (subtitle) document.querySelector(".page-header p").textContent = subtitle;
}

// ─── View Mode 

function initViewMode() {
    // Disable all form fields
    document.querySelectorAll("#addEmployeeForm input, #addEmployeeForm select").forEach(el => {
        el.setAttribute("disabled", true);
    });

    document.querySelector(".form-actions .btn-primary").style.display = "none";

    const backBtn = document.querySelector(".form-actions .btn-light");
    backBtn.textContent = "Back";
    backBtn.addEventListener("click", () => history.back());
}

// ─── Edit Mode 

function initEditMode(empId) {
    document.getElementById("empId").setAttribute("disabled", true);

    const saveBtn   = document.querySelector(".form-actions .btn-primary");
    const cancelBtn = document.querySelector(".form-actions .btn-light");

    saveBtn.textContent   = "Save Changes";
    cancelBtn.textContent = "Cancel";

    cancelBtn.addEventListener("click", () => history.back());

    let submitted = false; 

    document.getElementById("addEmployeeForm").addEventListener("submit", function (e) {
        e.preventDefault();
        if (submitted) return; 
        submitted = true;
        saveEditedEmployee(empId);
    });
}

function saveEditedEmployee(empId) {
    let employees = JSON.parse(localStorage.getItem("employees")) || [];
    const index = employees.findIndex(e => e.empId === empId);

    if (index === -1) {
        alert("Employee not found to update!");
        return;
    }

    const existing = employees[index];

    employees[index] = {
        empId,
        firstName:   document.getElementById("firstName").value.trim()         || existing.firstName,
        lastName:    document.getElementById("lastName").value.trim()          || existing.lastName,
        email:       document.getElementById("email").value.trim()             || existing.email,
        joiningDate: document.getElementById("joiningDate").value              || existing.joiningDate,
        location:    document.querySelector("select[name='location']").value   || existing.location,
        department:  document.querySelector("select[name='department']").value || existing.department,
        role:        document.getElementById("role").value.trim()              || existing.role,
        status:      existing.status,
    };

    localStorage.setItem("employees", JSON.stringify(employees));

    // Show success message then go back
    const msg = document.getElementById("successMessage");
    msg.style.display = "flex";
    setTimeout(() => {
        msg.style.display = "none";
        history.back();
    }, 1500);
}

// ─── Helpers 

function getFormData() {
    return {
        empId:       document.getElementById("empId").value.trim(),
        firstName:   document.getElementById("firstName").value.trim(),
        lastName:    document.getElementById("lastName").value.trim(),
        email:       document.getElementById("email").value.trim(),
        joiningDate: document.getElementById("joiningDate").value,
        location:    document.querySelector("select[name='location']").value,
        department:  document.querySelector("select[name='department']").value,
        role:        document.getElementById("role").value.trim(),
    };
}

function setSelectValue(name, value) {
    const select = document.querySelector(`select[name='${name}']`);
    if (!select || !value) return;
    [...select.options].forEach(opt => {
        if (opt.value === value || opt.textContent.trim() === value) {
            opt.selected = true;
        }
    });
}


//minimize sidebar

//sidebar minimize
function hidehandle() {
    const sidebar = document.querySelector(".sidebar");
    const main = document.querySelector(".main");

    const spans = sidebar.querySelectorAll(".menu span");
    const titles = sidebar.querySelectorAll(".sidebar-title");
    const updateBox = sidebar.querySelector(".update-box");
    const menuItems = sidebar.querySelectorAll(".menu li");
    const chevrons = sidebar.querySelectorAll(".menu i");
    const logo = sidebar.querySelector(".logo");

    sidebar.classList.toggle("collapsed");

    if (sidebar.classList.contains("collapsed")) {

        sidebar.style.width = "70px";
        main.style.marginLeft = "85px";

        spans.forEach(el => el.style.display = "none");
        titles.forEach(el => el.style.display = "none");
        chevrons.forEach(el => el.style.display = "none");

        if (updateBox) updateBox.style.display = "none";

        menuItems.forEach(el => el.style.justifyContent = "center");

        if (logo) {
            logo.style.width = "40px";
            logo.style.margin = "15px auto";
        }

    } else {

        sidebar.style.width = "240px";
        main.style.marginLeft = "250px";

        spans.forEach(el => el.style.display = "inline");
        titles.forEach(el => el.style.display = "block");
        chevrons.forEach(el => el.style.display = "inline");

        if (updateBox) updateBox.style.display = "block";

        menuItems.forEach(el => el.style.justifyContent = "flex-start");

        if (logo) {
            logo.style.width = "120px";
            logo.style.margin = "20px";
        }
    }
}



