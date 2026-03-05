//sidebar minimize(1-4)
function hidehandle() {

    const sidebar = document.querySelector(".sidebar");
    const main = document.querySelector(".main");
    const spans = sidebar.querySelectorAll(".menu span");
    const titles = sidebar.querySelectorAll(".sidebar-title");
    const updateBox = sidebar.querySelector(".update-box");
    const chevrons = sidebar.querySelectorAll(".menu i");
    const listItems = sidebar.querySelectorAll(".menu li");
    const tezoText = document.querySelector(".logo-box span");
    const tezoLogo = document.querySelector(".logo-box img");
    const logoBox = document.querySelector(".logo-box");
    const handlePic = document.querySelector(".handle-pic");


    sidebar.classList.toggle("collapsed");

    if (sidebar.classList.contains("collapsed")) {

        sidebar.style.width = "70px";
        main.style.marginLeft = "80px";

        spans.forEach(el => el.style.display = "none");
        titles.forEach(el => el.style.display = "none");
        chevrons.forEach(el => el.style.display = "none");

        if (updateBox) updateBox.style.display = "none";
        if (tezoText) tezoText.style.display = "none";

        if (tezoLogo) {
            tezoLogo.style.width = "40px";
            tezoLogo.style.maxWidth = "none";
            tezoLogo.style.marginLeft = "18px";
        }
        if (logoBox) {
            logoBox.style.width = "40px";
            logoBox.style.overflow = "hidden";
        }

        if (handlePic) handlePic.classList.add("rotate");

        listItems.forEach(li => {
            li.style.padding = "20px";
            li.style.marginTop = "10px";
            li.style.justifyContent = "center";
        });

    } else {

        sidebar.style.width = "240px";
        main.style.marginLeft = "250px";

        spans.forEach(el => el.style.display = "");
        titles.forEach(el => el.style.display = "");
        chevrons.forEach(el => el.style.display = "");

        if (updateBox) updateBox.style.display = "";
        if (tezoText) tezoText.style.display = "";

        if (tezoLogo) {
            tezoLogo.style.width = "110px";
            tezoLogo.style.maxWidth = "";
            tezoLogo.style.marginLeft = "";
        }
        if (logoBox) {
            logoBox.style.width = "250px";
            logoBox.style.overflow = "";
        }

        if (handlePic) {
            handlePic.style.left = "-36px";
            handlePic.classList.remove("rotate");
        }

        listItems.forEach(li => {
            li.style.padding = "";
            li.style.marginTop = "";
            li.style.justifyContent = "";
        });
    }
};

//profileNameadddynamically
function profileAddDynamically() {

    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const profileName = document.querySelector(".profile-info .profile-name");
    const profileRole = document.querySelector(".profile-info .profile-role");

    const adminUser = employees.find(emp =>
        emp.role && emp.role.toLowerCase() === "admin"
    );

    if (adminUser) {

        profileName.textContent =
            (adminUser.firstName || "") + " " +
            (adminUser.lastName || "");

        profileRole.textContent =
            adminUser.role || "";

    }
    else {
        profileName.textContent = "";
        profileRole.textContent = "";

    }

}
document.addEventListener("DOMContentLoaded", profileAddDynamically);


//alphabetdynamic
function createAlphabets() {

    const container = document.querySelector(".letters");
    const alphabets = Array.from({ length: 26 }, (_, i) =>
        String.fromCharCode(65 + i)
    );
    alphabets.forEach(letter => {

        const span = document.createElement("span");
        span.textContent = letter;

        container.appendChild(span);

    });
}

document.addEventListener("DOMContentLoaded", function () {

    createAlphabets();

});

function updateExportButton() {
    const exportBtn = document.querySelector(".btn-outline");
    if (!exportBtn) return;

    const tableBody = document.querySelector("tbody");
    if (!tableBody) return;

    const visibleRows = [...tableBody.querySelectorAll("tr")].filter(row =>
        row.style.display !== "none"
    );

    if (visibleRows.length === 0) {
        exportBtn.disabled = true;
        exportBtn.style.backgroundColor = "#f5f5f5";
        exportBtn.style.color = "#bbb";
        exportBtn.style.border = "1px solid #ddd";
        exportBtn.style.cursor = "not-allowed";
        exportBtn.style.opacity = "0.6";
        exportBtn.style.pointerEvents = "none";
    } else {
        exportBtn.disabled = false;
        exportBtn.style.backgroundColor = "#fff";
        exportBtn.style.color = "#333";
        exportBtn.style.border = "1px solid #ccc";
        exportBtn.style.cursor = "pointer";
        exportBtn.style.opacity = "1";
        exportBtn.style.pointerEvents = "auto";
    }
}



//Exporttoexcel(5)
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


function goToAddEmployee() {
    window.location.href = "../html/addEmployee.html"
}

function updateNoResultsMessage() {
    const tableBody = document.querySelector("tbody");
    const tableWrapper = document.querySelector(".table-wrapper");

    const visibleRows = [...tableBody.querySelectorAll("tr")].filter(row =>
        row.style.display !== "none"
    );

    let noResults = document.getElementById("no-results-msg");

    if (visibleRows.length === 0) {
        if (!noResults) {
            noResults = document.createElement("div");
            noResults.id = "no-results-msg";
            noResults.style.cssText = `
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 60px 20px;
                color: #999;
            `;
            noResults.innerHTML = `
                <p style="font-size:18px; font-weight:600; margin:16px 0 6px; color:#555;">No Results Found</p>
                <p style="font-size:14px; color:#aaa;">Try adjusting your filters or search criteria</p>
            `;
            tableWrapper.appendChild(noResults);
        }
        noResults.style.display = "flex";
    } else {
        if (noResults) noResults.style.display = "none";
    }
}

// getDataFromAddEmployeeAndFilterTheAlphabet(6-10)
function employeeTableInit() {

    const tableBody = document.querySelector("tbody");
    const letters = document.querySelectorAll(".letters span");
    const filterIcon = document.querySelector(".alphabet-filter i");

    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const profileName = document.querySelector(".profile-name");
    const profileRole = document.querySelector(".profile-role");

    if (!tableBody) return;
    function generateDynamicFilters() {

        const employees =
            JSON.parse(
                localStorage.getItem("employees")
            ) || [];

        const statusSet =
            new Set();

        const locationSet =
            new Set();

        const departmentSet =
            new Set();

        employees.forEach(emp => {

            if (emp.status) {

                statusSet.add(
                    emp.status.trim()
                );

            }

            if (emp.location) {

                locationSet.add(
                    emp.location
                        .trim()
                        .toLowerCase()
                );

            }

            if (emp.department) {

                departmentSet.add(
                    emp.department.trim()
                );

            }

        });

        createCheckboxes(
            ".status-filter .checkboxes",
            statusSet
        );

        createCheckboxes(
            ".location-filter .checkboxes",
            [...locationSet]
                .map(l =>
                    l.charAt(0).toUpperCase() +
                    l.slice(1)
                )
        );

        createCheckboxes(
            ".department-filter .checkboxes",
            departmentSet
        );

    }


    function createCheckboxes(selector, dataSet) {

        const container = document.querySelector(selector);
        if (!container) return;
        container.innerHTML = "";
        dataSet.forEach(value => {
            const label = document.createElement("label");
            label.innerHTML = `
            <input type="checkbox" value="${value}">
            ${value}
        `;
            container.appendChild(label);

        });

    }
    function renderTable() {
        tableBody.innerHTML = "";

        const employees = JSON.parse(localStorage.getItem("employees")) || [];

        employees.forEach(emp => {
            const status = emp.status || "Active" || "Inactive";
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td><input type="checkbox"></td>
                <td class="user-cell">
                    <img src="../images/employee-image2.jpg" class="avatar">
                    <div>
                        <strong>${emp.firstName || ""} ${emp.lastName || ""}</strong>
                        <small>${emp.email || ""}</small>
                    </div>
                </td>
                <td>${emp.location || ""}</td>
                <td>${emp.department || ""}</td>
                <td>${emp.role || ""}</td>
                <td>${emp.empId || ""}</td>
                <td><span class="status ${status.toLowerCase()}">${status}</span></td>
                <td>${emp.joiningDate || ""}</td>
                <td><i class="bi bi-three-dots"></i></td>
            `;

            tableBody.appendChild(tr);
        });
        updateExportButton();
        updateNoResultsMessage();
        const headerCheckbox = document.querySelector("thead tr:nth-child(2) th input[type='checkbox']");
        if (headerCheckbox) {
            headerCheckbox.addEventListener("change", function () {
                const visibleRows = [...tableBody.querySelectorAll("tr")].filter(row =>
                    row.style.display !== "none"
                );
                visibleRows.forEach(row => {
                    const cb = row.querySelector("input[type='checkbox']");
                    if (cb) cb.checked = this.checked;
                });
                toggleDeleteButton();
            });
        }

    }
    renderTable();
    generateDynamicFilters();

    document.addEventListener("change", function (e) {

        if (e.target.matches("tbody input[type='checkbox']")) {
            toggleDeleteButton();
        }

    });

    function refreshTableOnLoad() {
        renderTable();
        generateDynamicFilters();
    }

    //  Alphabet Filter
    letters.forEach(letter => {

        letter.addEventListener("click", function () {

            const rows = tableBody.querySelectorAll("tr");

            if (this.classList.contains("active")) {
                letters.forEach(l => l.classList.remove("active"));
                rows.forEach(row => row.style.display = "");
                if (filterIcon) filterIcon.style.color = "black";
                updateExportButton();
                toggleDeleteButton();
                updateNoResultsMessage();
                updateButtonVisibility();
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

                const status =
                    row.querySelector(
                        "td:nth-child(7) .status"
                    )?.textContent.trim();

                const location =
                    row.querySelector(
                        "td:nth-child(3)"
                    )?.textContent.trim();

                const department =
                    row.querySelector(
                        "td:nth-child(4)"
                    )?.textContent.trim();

                const selectedStatus =
                    [...document.querySelectorAll(
                        ".status-filter input:checked"
                    )].map(cb => cb.value);

                const selectedLocation =
                    [...document.querySelectorAll(
                        ".location-filter input:checked"
                    )].map(cb => cb.value);

                const selectedDepartment =
                    [...document.querySelectorAll(
                        ".department-filter input:checked"
                    )].map(cb => cb.value);

                const alphabetMatch =
                    firstLetter === selectedLetter;

                const statusMatch =
                    selectedStatus.length === 0 ||
                    selectedStatus.includes(status);

                const locationMatch =
                    selectedLocation.length === 0 ||
                    selectedLocation.includes(location);

                const departmentMatch =
                    selectedDepartment.length === 0 ||
                    selectedDepartment.includes(department);

                if (
                    alphabetMatch &&
                    statusMatch &&
                    locationMatch &&
                    departmentMatch
                ) {
                    row.style.display = "";
                }
                else {
                    row.style.display = "none";
                    const cb = row.querySelector("input[type='checkbox']");
                    if (cb) cb.checked = false;
                }


            });

            if (filterIcon) filterIcon.style.color = "#e53935";
            updateExportButton();
            toggleDeleteButton();
            updateNoResultsMessage();
            updateButtonVisibility();
        });

    });

}
document.addEventListener("DOMContentLoaded", function () {
    employeeTableInit();
});


//Delete Enable and disabled(13)
function toggleDeleteButton() {
    const deleteBtn = document.querySelector(".table-actions button");
    const tableBody = document.querySelector("tbody");
    const headerCheckbox = document.querySelector("thead tr:nth-child(2) th input[type='checkbox']");
    const checkboxes = tableBody.querySelectorAll("input[type='checkbox']");
    const isAnyChecked = Array.from(checkboxes).some(cb => cb.checked);
    deleteBtn.disabled = !isAnyChecked;
    if (isAnyChecked) {
        deleteBtn.style.backgroundColor = "red";
    } else {
        deleteBtn.style.backgroundColor = "#f89191";
    }

    const visibleRows = [...tableBody.querySelectorAll("tr")].filter(row =>
        row.style.display !== "none"
    );
    const visibleCheckboxes = visibleRows
        .map(row => row.querySelector("input[type='checkbox']"))
        .filter(Boolean);
    const isAllChecked = visibleCheckboxes.length > 0 && visibleCheckboxes.every(cb => cb.checked);

    if (headerCheckbox) {
        headerCheckbox.checked = isAllChecked;
        headerCheckbox.indeterminate = isAnyChecked && !isAllChecked;
    }

    deleteBtn.disabled = !isAnyChecked;
    deleteBtn.style.backgroundColor = isAnyChecked ? "red" : "#f89191";
}


// DELETE FUNCTION
function setupDeleteFunction() {

    const deleteBtn = document.querySelector(".table-actions button");
    const tableBody = document.querySelector("tbody");
    if (!deleteBtn || !tableBody) return;

    deleteBtn.addEventListener("click", function () {
        const rows = tableBody.querySelectorAll("tr");
        let employees = JSON.parse(localStorage.getItem("employees")) || [];

        rows.forEach(row => {

            const checkbox =
                row.querySelector("input[type='checkbox']");

            if (!checkbox || !checkbox.checked) return;

            const empIdCell = row.children[5];

            const empId =
                empIdCell ?
                    empIdCell.textContent.trim()
                    : null;

            employees =
                employees.filter(emp =>
                    emp.empId !== empId
                );

            row.remove();

        });
        localStorage.setItem(
            "employees",
            JSON.stringify(employees)
        );
        deleteBtn.disabled = true;
        deleteBtn.style.backgroundColor = "#f89191";
        updateExportButton();
        updateNoResultsMessage();

    });

};
document.addEventListener("DOMContentLoaded", setupDeleteFunction);



//ellipseViewEditDeleteOptions(14)
function setupEllipseOptions() {
    document.addEventListener("click", function (e) {

        const existingMenu = document.querySelector(".action-menu");
        if (existingMenu) existingMenu.remove();

        if (e.target.classList.contains("bi-three-dots")) {

            e.stopPropagation();

            const icon = e.target;
            const row = icon.closest("tr");

            const menu = document.createElement("div");
            menu.className = "action-menu";

            menu.innerHTML = `
            <div class="action-item view">View Details</div>
            <div class="action-item edit">Edit</div>
            <div class="action-item delete">Delete</div>
        `;

            icon.parentElement.style.position = "relative";
            icon.parentElement.appendChild(menu);

            Object.assign(menu.style, {
                position: "absolute",
                right: "0",
                top: "20px",
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "6px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                zIndex: "1000",
                minWidth: "140px"
            });

            menu.querySelectorAll(".action-item").forEach(item => {
                item.style.padding = "8px 12px";
                item.style.cursor = "pointer";

                item.addEventListener("mouseenter", () => {
                    item.style.backgroundColor = "#f5f5f5";
                });

                item.addEventListener("mouseleave", () => {
                    item.style.backgroundColor = "#fff";
                });
            });

            menu.addEventListener("click", function (event) {

                if (event.target.classList.contains("view")) {
                    const empId = row.cells[5]?.textContent.trim();
                    window.location.href = `../html/addEmployee.html?mode=view&empId=${encodeURIComponent(empId)}`;
                }

                if (event.target.classList.contains("edit")) {
                    const empId = row.cells[5]?.textContent.trim();
                    window.location.href = `../html/addEmployee.html?mode=edit&empId=${encodeURIComponent(empId)}`;
                }

                if (event.target.classList.contains("delete")) {
                    const empId = row.cells[5]?.textContent.trim();
                    let employees = JSON.parse(localStorage.getItem("employees")) || [];
                    employees = employees.filter(e => e.empId !== empId);
                    localStorage.setItem("employees", JSON.stringify(employees));
                    row.remove();
                    updateExportButton();
                    updateNoResultsMessage();
                }

                menu.remove();

            });
        }
    });

}
document.addEventListener("DOMContentLoaded", setupEllipseOptions);

function updateButtonVisibility() {
    const anyChecked = document.querySelector('.custom-multiselect input[type="checkbox"]:checked');
    const anyLetterActive = document.querySelector('.letters span.active');
    const applyBtn = document.querySelector('.filter-right .btn-primary');
    const resetBtn = document.querySelector('.filter-right .btn-reset');

    if (!applyBtn || !resetBtn) return;

    if (anyChecked || anyLetterActive) {
        // Enable
        applyBtn.disabled = false;
        applyBtn.style.backgroundColor = '#e53935';
        applyBtn.style.cursor = 'pointer';

        resetBtn.disabled = false;
        resetBtn.style.opacity = '1';
        resetBtn.style.cursor = 'pointer';
    } else {
        // Disable
        applyBtn.disabled = true;
        applyBtn.style.backgroundColor = '#f89191';
        applyBtn.style.cursor = 'not-allowed';

        resetBtn.disabled = true;
        resetBtn.style.opacity = '0.5';
        resetBtn.style.cursor = 'not-allowed';
    }
}

//filterLocationStatus(11-12)
function setupFilters() {
    const multiSelects = document.querySelectorAll('.custom-multiselect');
    const applyBtn = document.querySelector('.filter-right .btn-primary');
    const resetBtn = document.querySelector('.filter-right .btn-reset');

    applyBtn.disabled = true;
    applyBtn.style.backgroundColor = '#f89191';
    applyBtn.style.cursor = 'not-allowed';

    resetBtn.disabled = true;
    resetBtn.style.opacity = '0.5';
    resetBtn.style.cursor = 'not-allowed';

    multiSelects.forEach(function (multiSelect) {
        const selectedText = multiSelect.querySelector('.selected-text');
        selectedText.dataset.default = selectedText.textContent.trim();
    });

    multiSelects.forEach(function (multiSelect) {
        const selectBox = multiSelect.querySelector('.select-box');
        const selectedText = multiSelect.querySelector('.selected-text');
        const checkboxes = multiSelect.querySelectorAll('input[type="checkbox"]');

        selectBox.addEventListener('click', function (e) {
            e.stopPropagation();
            const isOpen = multiSelect.classList.contains('open');
            closeAllDropdowns();
            if (!isOpen) {
                multiSelect.classList.add('open');
            }
        });

        multiSelect.addEventListener('change', function (e) {
            if (e.target.type === "checkbox") {
                const selectedText = multiSelect.querySelector('.selected-text');
                const checkedCount =
                    multiSelect.querySelectorAll('input[type="checkbox"]:checked').length;

                selectedText.textContent =
                    checkedCount === 0
                        ? selectedText.dataset.default
                        : checkedCount + ' Selected';
                updateButtonVisibility();

                const anyChecked = document.querySelector(
                    '.custom-multiselect input[type="checkbox"]:checked'
                );

                if (!anyChecked) {

                    document.querySelectorAll('tbody tr')
                        .forEach(row => row.style.display = '');

                }

            }

        });

        multiSelect.querySelector('.checkboxes').addEventListener('click', function (e) {
            e.stopPropagation();
        });
    });

    document.addEventListener('click', function () {
        closeAllDropdowns();
    });

    function closeAllDropdowns() {
        multiSelects.forEach(function (ms) {
            ms.classList.remove('open');
        });
    }


    // Reset
    resetBtn.addEventListener('click', function () {
        if (resetBtn.disabled) return;

        multiSelects.forEach(function (multiSelect) {
            const selectedText = multiSelect.querySelector('.selected-text');
            multiSelect.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
            selectedText.textContent = selectedText.dataset.default;
        });

        document.querySelectorAll('.letters span')
            .forEach(letter => {
                letter.classList
                    .remove('active');

            });

        document.querySelectorAll('tbody tr')
            .forEach(row => {
                row.style.display = '';
                const cb = row.querySelector("input[type='checkbox']");
                if (cb) cb.checked = false;
            });

        const filterIcon =
            document.querySelector(".alphabet-filter i");

        if (filterIcon) {

            filterIcon.style.color = "black";

        }
        const headerCheckbox = document.querySelector("thead tr:nth-child(2) th input[type='checkbox']");
        if (headerCheckbox) {
            headerCheckbox.checked = false;
            headerCheckbox.indeterminate = false;
        }

        closeAllDropdowns();
        updateButtonVisibility();
        updateExportButton();
        toggleDeleteButton();
        updateNoResultsMessage();
        document.querySelectorAll('tbody tr').forEach(row => row.style.display = '');
    });

    // Apply
    applyBtn.addEventListener('click', function () {
        if (applyBtn.disabled) return;

        const filters = {};
        multiSelects.forEach(function (multiSelect) {
            const key = [...multiSelect.classList]
                .find(c => c.endsWith('-filter'))
                ?.replace('-filter', '');
            if (key) {
                filters[key] = [...multiSelect.querySelectorAll('input[type="checkbox"]:checked')]
                    .map(cb => cb.value);
            }
        });
        closeAllDropdowns();
        applyTableFilters(filters);
    });
}
document.addEventListener("DOMContentLoaded", setupFilters);

function applyTableFilters(filters) {
    const rows = document.querySelectorAll('tbody tr');
    const activeLetter = document.querySelector('.letters span.active');

    rows.forEach(function (row) {

        const name =
            row.querySelector(
                '.user-cell strong'
            )?.textContent.trim();

        const firstLetter =
            name ?
                name.charAt(0).toUpperCase()
                : "";

        const location =
            row.querySelector(
                'td:nth-child(3)'
            )?.textContent.trim();

        const department =
            row.querySelector(
                'td:nth-child(4)'
            )?.textContent.trim();

        const status =
            row.querySelector(
                'td:nth-child(7) .status'
            )?.textContent.trim();


        const alphabetMatch =
            !activeLetter ||
            firstLetter ===
            activeLetter.textContent.trim();


        const locationMatch =
            filters.location.length === 0 ||
            filters.location.includes(location);

        const departmentMatch =
            filters.department.length === 0 ||
            filters.department.includes(department);

        const statusMatch =
            filters.status.length === 0 ||
            filters.status.includes(status);

        if (alphabetMatch && locationMatch && departmentMatch && statusMatch) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
            const cb = row.querySelector("input[type='checkbox']");
            if (cb) cb.checked = false;
        }
    });
    updateExportButton();
    toggleDeleteButton();
    updateNoResultsMessage();
}




// Tableheader sorting(15)
function setupTableHeaderSorting() {

    const table = document.querySelector('table');
    const headers = table.querySelectorAll('thead tr:nth-child(2) th');
    const tbody = table.querySelector('tbody');

    const columnMap = {
        1: 'user',
        2: 'location',
        3: 'department',
        4: 'role',
        5: 'empno',
        6: 'status',
        7: 'joindt'
    };

    let currentSortCol = null;
    let currentSortOrder = 'asc';

    headers.forEach(function (th, index) {

        if (index === 0 || index === 8) return;

        th.style.cursor = 'pointer';

        th.addEventListener('click', function () {

            if (currentSortCol === index) {
                currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
            } else {
                currentSortCol = index;
                currentSortOrder = 'asc';
            }

            sortTable(index, currentSortOrder);
        });
    });

    function sortTable(colIndex, order) {
        const rows = Array.from(tbody.querySelectorAll('tr'));

        rows.sort(function (a, b) {
            let aText = getCellText(a, colIndex);
            let bText = getCellText(b, colIndex);

            const aNum = Date.parse(aText) || Number(aText.replace(/\D/g, ''));
            const bNum = Date.parse(bText) || Number(bText.replace(/\D/g, ''));

            if (!isNaN(aNum) && !isNaN(bNum) && aNum !== 0 && bNum !== 0) {
                return order === 'asc' ? aNum - bNum : bNum - aNum;
            }

            return order === 'asc'
                ? aText.localeCompare(bText)
                : bText.localeCompare(aText);
        });

        rows.forEach(row => tbody.appendChild(row));
    }

    function getCellText(row, colIndex) {
        const cell = row.querySelector(`td:nth-child(${colIndex + 1})`);
        if (!cell) return '';
        const strong = cell.querySelector('strong');
        if (strong) return strong.textContent.trim();
        const span = cell.querySelector('.status');
        if (span) return span.textContent.trim();

        return cell.textContent.trim();
    }
}
document.addEventListener('DOMContentLoaded', setupTableHeaderSorting);



