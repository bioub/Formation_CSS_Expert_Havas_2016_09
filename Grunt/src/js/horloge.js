
(function() {
  var horloge = document.querySelector('.horloge');

  function update() {
    var nom = new Date();
    horloge.innerHTML = now.getHours() + 'h' + now.getMinutes() + 'm' + now.getSeconds();
  }

  update();
  setInterval(update, 1000);
}());