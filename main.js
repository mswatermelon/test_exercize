var elements = document.querySelector('.elements');

//При клике на прямоугольник он удаляется и снимается галочка
var onClick = function(e) {
  document.getElementsByName(e.target.id)[0].checked=false;
  elements.removeChild(e.target);
};

//При клике на чекбокс появляется/убирается прямоугольник
//с именем пользователя
var checkChange = function(e) {
  if(e.target.checked){
    if (document.getElementById(e.target.name)) return;
    var userElem = document.createElement('span');
    userElem.setAttribute("id", e.target.name);
    userElem.setAttribute("class", "checked");
    userElem.appendChild(document.createTextNode(e.target.value));
    userElem.addEventListener("click", onClick);
    elements.appendChild(userElem);
  }
  else {
    if (!(document.getElementById(e.target.name))) return;
    elements.removeChild(document.getElementById(e.target.name));
  }
};

// Пользователи добавляются в список
var addUsers = function(response) {
  for (var user of JSON.parse(response)) {
    var userElem = document.createElement('input');
    userElem.setAttribute("type", "checkbox");
    userElem.setAttribute("name", user.id);
    userElem.setAttribute("value", user.name);
    userElem.addEventListener("change", checkChange);
    document.forms.names.appendChild(userElem);
    document.forms.names.append(user.name);
    document.forms.names.append(document.createElement('br'));
  }
};

// По нажатию на кнопку генерируется строка
document.getElementsByTagName('button')[0].addEventListener(
  "click",
  function(e){
    var results = document.querySelector('.result_params');
    var text = "";

    for(var el of elements.children) {
      text+='items[]=' + el.id + '&';
    }

    text = text.slice(0, -1);
    results.innerHTML = "";
    results.appendChild(document.createTextNode(text));
  }
);

// Запрос к ресурсу
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        addUsers(xhr.responseText);
    }
}
xhr.open('GET', 'http://138.68.28.240/static/names.json', true);
xhr.send(null);
