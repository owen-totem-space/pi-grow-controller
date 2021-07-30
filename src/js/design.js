export { setBackgroundImg };
//Set Background
function setBackgroundImg() {
  let today = new Date();
  let hour = today.getHours();

  if (hour < 11) {
    //Morning
    // document.body.style.backgroundImage = "url('./img/brown-and-green-grass-field-during-sunset-1237119.jpg')";
    // document.body.style.backgroundImage = "url('img/astronomy-beautiful-clouds-constellation-355465.jpg')";
    // document.body.style.background = "url('img/pexels-flenn-may-802505.jpg')";
    document.body.style.background = "url('img/pexels-rahul-shah-1546027.jpg')";
  } else if (hour < 18) {
    //Afternoon
    // document.body.style.backgroundImage = "url('img/woman-rocking-climbing-near-waterfalls-1543756.jpg')";
    // document.body.style.backgroundImage = "url('img/astronomy-beautiful-clouds-constellation-355465.jpg')";
    // document.body.style.background = "url('img/pexels-flenn-may-802505.jpg')";
    document.body.style.background = "url('img/pexels-rahul-shah-1546027.jpg')";
  } else {
    //Evening
    // document.body.style.backgroundImage = "url('img/astronomy-beautiful-clouds-constellation-355465.jpg')";
    // document.body.style.backgroundImage = "url('./img/brown-and-green-grass-field-during-sunset-1237119.jpg')";
    // document.body.style.background = "url('img/pexels-flenn-may-802505.jpg')";
    document.body.style.background = "url('img/pexels-rahul-shah-1546027.jpg')";
  }
}
