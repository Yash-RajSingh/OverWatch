// GETTING ALL THE REQUIRED DOM ELEMENTS
const form = document.getElementById('story');
const storyContain = document.getElementById('story-container');
const uid = sessionStorage.getItem('uid');

// LOGIN CHECK
const logCheck = () =>{
    if(uid != null){
        return 1;
    }
    else{
        return 0;
    }
}

// ANONYMITY CHECKER
const identityChecker = (token, name) =>{
    if(token == true){
        var iden = "Anonymous";
        return iden;
    }
    else {
        return name;
    }
}

// DISPLAYING OVWEWATCH STATS
const updateStats = async () =>{
    const request = await fetch(`https://overwatch-apis.herokuapp.com/count/`,{
        method: 'GET'
    })
    const response = await request.json();
    statContainer.innerHTML = `<div class="stat-card">
    <p> Users : <b>${response.users_count}</b><br>
    User Experiences : <b>${response.stories_count}</b><br>
    Dangerous Zones : <b> ${response.zones_count} </b></p>
    </div>`
}
updateStats();
/* <p>So far, OverWatch has <br>
        <b>${response.users_count}</b> users have joined OverWatch to keep each other safe. 
        <b>${response.stories_count}</b> user experiences have been shared and <b> 5 </b>
        dangerous locations have been revealed! */

/*<p> Users : <b>${response.users_count}</b><br>
        User Experiences : <b>${response.stories_count}</b><br>
        Dangerous Zones : <b> 5 </b> */



// DISPLAYING STORIES
const displayStories = async () => {
    const url = `https://overwatch-apis.herokuapp.com/stories/get_all_stories`;
    const request = await fetch(url, {
        method: 'GET'
    })
    const response = await request.json();
    console.log(response);
    const data = response.data;
    storyContain.innerHTML = ``;
    for(let x in data){
        var identity = identityChecker(data[x].anonymity, data[x].username)
        storyContain.innerHTML += `<div class="card" id='${data[x].suid}'>
        <h4>${identity}</h4>
            <div class="sub-card">
            <img src="../assets/icons/at.png" class="mini-icon">&nbsp;<span>${data[x].location}</span>
                &emsp;<span> Date of incident: ${data[x].incident_date}</span>
            </div>
            <div class="main-card">
                <p>${data[x].story}</p><br>
                <span>Posted on: ${data[x].date_created}</span>
                </div>
                </div>`
            }
        }
displayStories();
        


const reupdate = () =>{
    const dispDelay = setTimeout(disp, 1000);
    function disp() {
        displayStories();
        updateStats();
    }
    function stopdisp() {
        clearTimeout(disp);
    }
    stopdisp();  
}

const deleteStory = async (sid) =>{
        const request = await fetch(`https://overwatch-apis.herokuapp.com/stories/delete_story?suid=${sid}`, {
            method: 'DELETE'
        })
        const response = await request.json();
        console.log(response);
    reupdate();
}

// POSTING STORY 
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    var stringAsHtml = document.getElementById('experience').value;
    // console.log(stringAsHtml)
    var story = stringAsHtml.replaceAll("\n", "<br />");
    var date = document.getElementById('date').value;
    var location = document.getElementById('location').value;
    var identity = document.getElementById('choice');
    if(identity.checked == true){
        var anonymity = 1;
    }
    else{
        var anonymity = 0;
    }
    const post = async () => {
        const url = `https://overwatch-apis.herokuapp.com/stories/post_story`;
        const query = `?story=${story}&location=${location}&incident_date=${date}&anonymity=${anonymity}&user_uid=${uid}`;
        const base = `${url}${query}`;
        console.log(base);
        const request = await fetch(base,{
            method: 'POST'
        });
        const response = await request.json();
        console.log(response);
    }
    var flag = logCheck();
    if(flag == true){
        post();
        // form.reset();
        reupdate();
    }
    else{
        alert('You must be logged in to share your story')
        window.location.href= "../login.html";
    }
})

