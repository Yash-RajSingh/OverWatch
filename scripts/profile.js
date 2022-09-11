const uid = sessionStorage.getItem("uid");
const profileCont = document.getElementById("user-profile");
const zoneCont = document.getElementById("zones");
const storyCont = document.getElementById("story");

// ANONYMITY CHECKER
const identityChecker = (token, name) => {
  if (token == true) {
    var iden = "Anonymous";
    return iden;
  } else {
    return name;
  }
};

const getDetails = async () => {
  const request = await fetch(
    `https://overwatch-apis.herokuapp.com/user_details/?user_uid=${uid}`,
    {
      method: "GET",
    }
  );
  const response = await request.json();
  console.log(response);
  const users = response.user_details[0];
  const zones = response.zones_details;
  const stories = response.stories_details;

  profileCont.innerHTML = `<div class="profile-card">
        <h3>Username :- </h3>
        <p>${users.username}</p>
        <h3>Email :- </h3>
        <p>${users.email}</p>
    </div>`;

  storyCont.innerHTML = "";
  for (let x in stories) {
    // console.log(stories[x]);
    var identity = identityChecker(stories[x].anonymity, users.username);
    storyCont.innerHTML += `<div class="card" id='${stories[x].suid}'>
        <h4>${identity}</h4>
        <img src="../assets/icons/bin.png" class="mini-icon-1" onclick="deleteStory('${stories[x].suid}')"/>
        <div class="sub-card">
            <img src="../assets/icons/at.png" class="mini-icon">&nbsp;<span>${stories[x].location}</span>
            &emsp;<span> Date of incident: ${stories[x].incident_date}</span>
        </div>
        <div class="main-card">
            <p>${stories[x].story}</p><br>
            <span>Posted on: ${stories[x].date_created}</span>
        </div>
        </div>`;
  }

  zoneCont.innerHTML = "";
  for (let t in zones) {
    console.log(zones[t]);
    zoneCont.innerHTML += `<li class="zone-loc">
        <img src="../assets/icons/bin2.png" class="mini-icon-2" onclick="deleteZone('${zones[t].zuid}')"/>
        ${zones[t].loc_name} 
        </li>`;
  }
};
getDetails();

const reupdate = () => {
  const dispDelay = setTimeout(disp, 1000);
  function disp() {
    getDetails();
  }
  function stopdisp() {
    clearTimeout(disp);
  }
  stopdisp();
};

const deleteStory = async (sid) => {
  const request = await fetch(
    `https://overwatch-apis.herokuapp.com/stories/delete_story?suid=${sid}`,
    {
      method: "DELETE",
    }
  );
  const response = await request.json();
  console.log(response);
  reupdate();
};

const deleteZone = async (zid) => {
  const request = await fetch(
    `https://overwatch-apis.herokuapp.com/zones/delete_zone?zuid=${zid}`,
    {
      method: "DELETE",
    }
  );
  const response = await request.json();
  console.log(response);
  reupdate();
};
