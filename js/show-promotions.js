function loadData() {
  var oXHR = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

  function reportStatus() {
      if (oXHR.readyState == 4)               // REQUEST COMPLETED.
        showPromoList(this.responseXML);      // ALL SET. NOW SHOW XML DATA.
  }

  oXHR.onreadystatechange = reportStatus;
  oXHR.open("GET", "../xml/products.xml", true);        // true = ASYNCHRONOUS REQUEST (DESIRABLE), false = SYNCHRONOUS REQUEST.
  oXHR.send();
}


function showPromoList(xml) {
  var promoDiv = document.getElementById('products')      // THE PARENT DIV.
  var promoList = xml.getElementsByTagName('Product');       // THE XML TAG NAME.
  var categories = document.getElementById('categories');
  var ul = document.createElement('ul');
  for (var i = 0; i < promoList.length; i++) {
    var li = document.createElement('li');
    var ahref = document.createElement('a')
    ahref.href = "#"
    ahref.innerHTML = "<i class='fas fa-circle'></i>"
    ul.appendChild(li);
    for (let j = 0; j < ul.children.length; j++) {
      if(promoList[i].getElementsByTagName("Type")[0].childNodes[0].nodeValue != ul.children[j].innerHTML){
        ahref.appendChild(document.createTextNode(promoList[i].getElementsByTagName("Type")[0].childNodes[0].nodeValue));
        break;
      } else break;
    }    
    li.appendChild(ahref)
    categories.appendChild(ul);
    
      var productID = promoList[i].getElementsByTagName("EAN")[0].childNodes[0].nodeValue;
      var currentPrice = promoList[i].getElementsByTagName("CurrentPrice")[0].childNodes[0].nodeValue;
      var permanentPrice = promoList[i].getElementsByTagName("PermanentPrice")[0].childNodes[0].nodeValue;
      if (currentPrice != permanentPrice && permanentPrice >= currentPrice) {
        var productCard = document.createElement('div'); 
        productCard.id = "product-card";
        productCard.className = productID;
        productCard.onclick = function (){
          localStorage.setItem("productID",this.className)
          window.location.href = "../pages/product.html"
        }
        var productTitle = document.createElement('p');
        productTitle.classList.add(productID)
        var productImage = document.createElement('img');
        var priceSection = document.createElement('section');
        priceSection.className = "price-section";
        var cPrice = document.createElement('p')
        var pPrice = document.createElement('p')
        cPrice.className = "current-price";
        pPrice.className = "permanent-price";
        cPrice.innerHTML = "AGORA " + currentPrice + "€";
        pPrice.innerHTML = "ANTES " + permanentPrice + "€";
        priceSection.appendChild(pPrice);
        priceSection.appendChild(cPrice);
        productImage.src = promoList[i].getElementsByTagName("Image")[0].childNodes[0].nodeValue;
        productTitle.innerHTML = promoList[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue;
      }
      
      
      productCard.appendChild(productTitle);
      productCard.appendChild(productImage);
      productCard.appendChild(priceSection);
      promoDiv.appendChild(productCard);
  }
};