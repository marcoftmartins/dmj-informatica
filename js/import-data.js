function loadData() {
  var oXHR = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');


  function reportStatus() {
      if (oXHR.readyState == 4)
        showCategories(this.responseXML);
  }

  oXHR.onreadystatechange = reportStatus();
  oXHR.open("GET", "../xml/products.xml", true);        // true = ASYNCHRONOUS REQUEST (DESIRABLE), false = SYNCHRONOUS REQUEST.
  oXHR.send();
}

function showCategories(xml) {
  var categoriesDiv = document.getElementById('categories');        // THE PARENT DIV.
  var products = xml.getElementsByTagName('Product');       // THE XML TAG NAME.
  var categoriesList = products[i].getElementsByTagName("*");
  for (var i = 0; i < categoriesList.length; i++) {
    var pCategories = document.createElement('p');
    pCategories.innerHTML = categoriesList[i].getElementsByTagName("Description")[0].childNodes[0].nodeValue;
    var image = document.createElement('img');
    image.src = categoriesList[i].getElementsByTagName("Image")[0].childNodes[0].nodeValue;
    categoriesDiv.appendChild(pCategories);
    categoriesDiv.appendChild(image);
    console.log(categoriesList[i])
  }
};