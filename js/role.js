//minimize side bar
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