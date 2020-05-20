let slider = document.getElementById("control_slider");
let num = document.getElementById("control_num");

slider.oninput = function() {
  num.value = this.value;
}

num.oninput = function() {
  slider.value = this.value;
}