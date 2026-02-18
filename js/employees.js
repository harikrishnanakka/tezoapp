
function hidehandle() {
    const sidebar = document.querySelector(".sidebar");
    const main = document.querySelector(".main");
    const handle = document.querySelector(".handle-pic");

    const spans = sidebar.querySelectorAll("span"); 
    const titles = sidebar.querySelectorAll(".sidebar-title"); 
    const updateBox = sidebar.querySelector(".update-box"); 
    const menuItems = sidebar.querySelectorAll(".menu li"); 
    const itags=sidebar.querySelectorAll("i");
    const image=sidebar.querySelectorAll("img");

    handle.style.position = "fixed";
    handle.style.zIndex = "9999";
    handle.style.top = "120px"; 

    if (sidebar.style.width === "55px") {
        //  EXPAND
        handle.style.zIndex="500";
        sidebar.style.width = "240px";
        main.style.marginLeft = "250px";
        handle.style.left = "242px";
        
        spans.forEach(el => el.style.display = "inline");
        titles.forEach(el => el.style.display = "block");

        if (updateBox) updateBox.style.display = "block";

        menuItems.forEach(el => el.style.justifyContent = "flex-start");

    } else {
        //  COLLAPSE
        sidebar.style.width = "55px";
        main.style.marginLeft = "70px";
        handle.style.left = "60px";
        handle.style.zIndex="500";
        handle.style.marginTop="-85px";
        handle.style.marginLeft="-8px";
        image.style.marginTop="2px";

        spans.forEach(el => el.style.display = "none");
        titles.forEach(el => el.style.display = "none");
        itags.forEach(el => el.style.display = "none");
        

        if (updateBox) updateBox.style.display = "none";

        menuItems.forEach(el => el.style.justifyContent = "center");

    }
}

//Export
function exportTableToExcel(filename, type = "xlsx") {
    try {
        const table = document.querySelector(".table-wrapper table");
        const rows = table.querySelectorAll("tbody tr");

        let data = [];

        const headers = table.querySelectorAll("thead th, tr:nth-child(2) th");
        let headerData = [];

        headers.forEach((th, index) => {
            if (index !== 0 && index !== headers.length - 1) {
                headerData.push(th.innerText.trim());
            }
        });

        data.push(headerData);

        rows.forEach(row => {
            if (row.offsetParent !== null) {  
                let rowData = [];
                const cells = row.querySelectorAll("td");

                cells.forEach((cell, index) => {
                    if (index !== 0 && index !== cells.length - 1) {
                        rowData.push(cell.innerText.trim());
                    }
                });

                data.push(rowData);
            }
        });

        const worksheet = XLSX.utils.aoa_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");

        if (type === "csv") {
            XLSX.writeFile(workbook, filename.replace(".xlsx", ".csv"), { bookType: "csv" });
        } else {
            XLSX.writeFile(workbook, filename);
        }

    } catch (error) {
        console.error("Export failed:", error);
        alert("Error exporting to Excel. Check console for details.");
    }
}


function goToAddEmployee(){
    window.location.href="../html/addEmployee.html"
}


// getDataFromAddEmployeeAndFilterTheAlphabet
document.addEventListener("DOMContentLoaded", function () {

    const tableBody = document.querySelector("tbody");
    const letters = document.querySelectorAll(".letters span");
    const filterIcon = document.getElementById("alphabetFilterIcon");

    if (!tableBody) return;
    if (filterIcon) filterIcon.style.color = "black";

    const employees = JSON.parse(localStorage.getItem("employees")) || [];

    //  Append localStorage employees
    employees.forEach(emp => {

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td><input type="checkbox"></td>
            <td class="user-cell">
                <img src="../images/employee-image2.jpg" class="avatar">
                <div>
                    <strong>${emp.firstName} ${emp.lastName}</strong>
                    <small>${emp.email}</small>
                </div>
            </td>
            <td>${emp.location}</td>
            <td>${emp.department}</td>
            <td>${emp.role}</td>
            <td>${emp.empId}</td>
            <td><span class="status ${emp.status.toLowerCase()}">${emp.status}</span></td>
            <td>${emp.joiningDate}</td>
            <td><i class="bi bi-three-dots"></i></td>
        `;

        tableBody.appendChild(tr);
    });

    //  Alphabet Filter
    letters.forEach(letter => {

        letter.addEventListener("click", function () {

            const rows = tableBody.querySelectorAll("tr");

            if (this.classList.contains("active")) {
                letters.forEach(l => l.classList.remove("active"));
                rows.forEach(row => row.style.display = "");
                if (filterIcon) filterIcon.style.color = "black";
                return;
            }

            const selectedLetter = this.textContent.trim().toUpperCase();

            letters.forEach(l => l.classList.remove("active"));
            this.classList.add("active");

            rows.forEach(row => {

                const nameElement = row.querySelector(".user-cell strong");
                if (!nameElement) return;

                const fullName = nameElement.textContent.trim();

                const firstLetter = fullName.charAt(0).toUpperCase();

                if (firstLetter === selectedLetter) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }

            });

            if (filterIcon) filterIcon.style.color = "#e53935";
        });

    });

});

//Delete Enable and disabled
const deleteBtn = document.getElementById("deleteBtn");
const tableBody = document.querySelector("tbody");

function toggleDeleteButton() {
    const checkboxes = tableBody.querySelectorAll("input[type='checkbox']");
    const isAnyChecked = Array.from(checkboxes).some(cb => cb.checked);
    deleteBtn.disabled = !isAnyChecked;
    if (isAnyChecked) {
        deleteBtn.style.backgroundColor = "red";
    } else {
        deleteBtn.style.backgroundColor = "#f89191";
    }
}

// Enable/Disable button
tableBody.addEventListener("change", function (e) {
    if (e.target.type === "checkbox") {
        toggleDeleteButton();
    }
});

// DELETE FUNCTION
deleteBtn.addEventListener("click", function () {

    const rows = tableBody.querySelectorAll("tr");
    let employees = JSON.parse(localStorage.getItem("employees")) || [];

    rows.forEach(row => {

        const checkbox = row.querySelector("input[type='checkbox']");
        if (!checkbox || !checkbox.checked)  return;
        deleteBtn.style.backgroundColor="#f89191";

        const empIdCell = row.children[5];
        const empId = empIdCell ? empIdCell.textContent.trim() : null;

        employees = employees.filter(emp => emp.empId !== empId);

        row.remove();
    });

    // Update localStorage
    localStorage.setItem("employees", JSON.stringify(employees));

    deleteBtn.disabled = true;
});

