// ANONYMITY CHECKER
const identityCheck = (token, name) =>{
	if(token == true){
		var iden = "Anonymous";
        return iden;
    }
    else {
		return name;
    }
}

// DISPLAYING STORIES
const storyContainer = document.getElementById('story-container');
const displayStory = async () => {
    const url = `https://overwatch-apis.herokuapp.com/stories/get_all_stories`;
    const request = await fetch(url, {
        method: 'GET'
    })
    const response = await request.json();
    console.log(response);
    const data = response.data;
    storyContainer.innerHTML = ``;
    for(let x=0; x<4; x++){
        var identity = identityCheck(data[x].anonymity, data[x].username)
        storyContainer.innerHTML += `<div class="card" id='${data[x].suid}' onclick="window.location.href = 'stories.html#${data[x].suid}'">
        <h4>${identity}</h4>
            <div class="sub-card">
            <img src="../assets/icons/at.png" class="mini-icon">&nbsp;<span>${data[x].location}</span>
                &emsp;<span> Date of incident: ${data[x].incident_date}</span>
            </div>
            <div class="main-card">
                <p>${data[x].story.substring(0, 370)}....</p><br>
                <span>Posted on: ${data[x].date_created}</span>
                </div>
                </div>`
            }
        }
displayStory();

// DISPLAYING MAP 
var mymap = L.map('map').setView([20.5937, 78.9629], 5);

var osm = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
		'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	id: 'mapbox/streets-v11',
	tileSize: 512,
	zoomOffset: -1
})
osm.addTo(mymap);
L.Control.geocoder().addTo(mymap);


// LOGIN CHECK
const logCheck = () =>{
    const uuid = sessionStorage.getItem('uid');
    if(uuid != null){
        return 1;
    }
    else{
        return 0;
    }
}
const zonesAdder = (a,b) =>{
    var circle = L.circle([`${a}`, ` ${b}`], 500, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 10000
    }).addTo(mymap);
    circle.bindPopup("<b>Caution! Unsafe Zone!</b>").openPopup();
}


const getZones = async () =>{
    const request = await fetch(`https://overwatch-apis.herokuapp.com/zones/get_all_zones`,{
        method: 'GET'
    })
    const response = await request.json()
    const curr = response.data;
    for( let x in curr){
        var lat = curr[x].latitude;
        var long = curr[x].longitude;
        zonesAdder(lat,long);
    }
}
getZones();


// const reupdate = () =>{
//     const dispDelay = setTimeout(disp, 1000);
//     function disp() {
//         updateStats();
//     }
//     function stopdisp() {
//         clearTimeout(disp);
//     }
//     stopdisp();  
// }



const getLocName = async (c,d) =>{
    const request = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${c}&longitude=${d}&localityLanguage=en`)
    const response = await request.json();
    var locName = response.locality;
    var locstate= response.principalSubdivision;
    var location = `${locName} , ${locstate}`;
    return location;
}

const postZone = async (lat,long) =>{
    const uuid = sessionStorage.getItem('uid');
    const loc = await getLocName(lat,long);
    const base = `https://overwatch-apis.herokuapp.com/zones/post_zone?latitude=${lat}&longitude=${long}&user_uid=${uuid}&loc_name=${loc}`
    const req = await fetch(base,{
        method: 'POST'
    })
    const res = await req.json();
    console.log(res)
    getZones();
}

mymap.on('click', function (e){
    var lat = e.latlng.lat;
    var long = e.latlng.lng;
    var flag = logCheck();
    if(flag == true){
        const uuid = sessionStorage.getItem('uid');
        postZone(lat,long); 
    }
    else{
        alert('You must be logged in to add a danger zone!')
        window.location.href= "../login.html";
    }
})



// ANIMATION 
$(document).scroll(function(){
    $('.down').fadeOut()
})


$("#down").click(function(){
    window.scrollBy(0, 650);
})