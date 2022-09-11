const sidebar = document.getElementById('sidebar');
const sideContainer = document.getElementById('sidebar-container');
const statContainer = document.getElementById('stats-container');
const username = sessionStorage.getItem('uname');
// const loader = document.getElementById("loader-container");
var flag = 0;

const expand = () => {
    if (flag == 0) {
        flag = 1;
        sidebar.style.width = '13rem';
        sidebar.classList.add("animate__slideInLeft");
        const myTimeout = setTimeout(remove1, 3000);

        function remove1() {
            sidebar.classList.remove("animate__slideInLeft");
        }
    }
    else if (flag == 1) {
        sidebar.style.width = '1.8rem';
        flag = 0;
        sidebar.style.transition = '0.5s';
    }
}

$('#menu-icon').click(function () {
    $('#sidebar-container').toggle();
    expand()
})


$('#sidebar button').click(function () {
    console.log("click");
    window.location.href = "./login.html";
})

const usercheck = () => {
    const profile = document.getElementById('profile')
    if (username != null) {
        profile.innerHTML = `<img src="../assets/icons/about.png" class="profile-icon"><h3 onclick="openProfile()">${username}</h3>
        <br>
        <p id="logout" onclick="logout()">Logout</p>
        `;
    }
    else {
        console.log("not logged in");
        return 0;
    }
}
usercheck();

const openProfile = () => {
    window.location.href = "../profile.html";
}

const logout = () => {
    sessionStorage.clear();
    window.location.href = "../index.html"
}


const removeLoader = () => {
    // loader.style.display = "none";
    $('#loader-container').fadeOut();
}
const myTimeout2 = setTimeout(removeLoader, 2000);