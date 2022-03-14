function loadData() {
  var oXHR = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

  function reportStatus() {
      if (oXHR.readyState == 4)               // REQUEST COMPLETED.
        showProductInfo(this.responseXML);      // ALL SET. NOW SHOW XML DATA.
  }

  oXHR.onreadystatechange = reportStatus;
  oXHR.open("GET", "../xml/products.xml", true);        // true = ASYNCHRONOUS REQUEST (DESIRABLE), false = SYNCHRONOUS REQUEST.
  oXHR.send();
}

function showProductInfo(xml){
  var productDiv = document.getElementById('product-info') 
  var products = xml.getElementsByTagName('Product');
  for (var i = 0; i < products.length; i++) {
    
    if(products[i].getElementsByTagName("EAN")[0].childNodes[0].nodeValue == localStorage.getItem("productID")){
      var productSpecs = products[i].getElementsByTagName("*");
      var leftDiv = document.createElement('div')
      var rightDiv = document.createElement('div')
      leftDiv.className="product-info-left"
      rightDiv.className="product-info-right"

      var productType = document.createElement('p')
      productType.className = "product-type"
      productType.innerText = products[i].getElementsByTagName("Type")[0].childNodes[0].nodeValue
      var productName = document.createElement('p')
      productName.innerHTML =  products[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue
      var productImage = document.createElement('figure')
      var img = document.createElement('img')
      productImage.appendChild(img)
      img.src = products[i].getElementsByTagName("Image")[0].childNodes[0].nodeValue;
      var imgCaption = document.createElement('figcaption')
      imgCaption.innerHTML = "EAN - " + products[i].getElementsByTagName("EAN")[0].childNodes[0].nodeValue;
      productImage.appendChild(imgCaption)
      var productPrice = document.createElement('p')
      productPrice.className = "price"
      productPrice.innerHTML = "Preço: " + products[i].getElementsByTagName("CurrentPrice")[0].childNodes[0].nodeValue + "€";

      var productInfoTitle = document.createElement('h1')
      productInfoTitle.className = "features-title"
      productInfoTitle.innerText = "Características"

      var productDescription = document.createElement('p')
      productDescription.className = "product-description"
      productDescription.innerHTML = products[i].getElementsByTagName("Description")[0].childNodes[0].nodeValue;

      var productSpecsTitle = document.createElement('h1')
      productSpecsTitle.className = "features-title"
      productSpecsTitle.innerText = "Especificações"

      var specsTable = document.createElement('table');
      var specsTableRow = document.createElement('tr');
      specsTable.appendChild(specsTableRow)
      var specsTableDataLeft = document.createElement('td')
      var specsTableDataRight = document.createElement('td')

      for (let j = 0; j < productSpecs.length; j++) {
          if(productSpecs[j].tagName != "Image" && productSpecs[j].tagName != "Description" && productSpecs[j].tagName != "CurrentPrice" && productSpecs[j].tagName != "PermanentPrice"){
          var specsTableRow = document.createElement('tr');
          specsTable.appendChild(specsTableRow)
          var specsTableDataLeft = document.createElement('td')
          specsTableDataLeft.className = "td-left"
          var specsTableDataRight = document.createElement('td')
          specsTableDataLeft.innerHTML = productSpecs[j].tagName + " :"
          specsTableDataRight.innerHTML = productSpecs[j].childNodes[0].nodeValue
          specsTableRow.appendChild(specsTableDataLeft)
          specsTableRow.appendChild(specsTableDataRight)
        }
      }
    }
  }
  
  leftDiv.appendChild(productType)
  leftDiv.appendChild(productName)
  leftDiv.appendChild(productImage)
  leftDiv.appendChild(productPrice)
  
  rightDiv.appendChild(productInfoTitle)
  rightDiv.appendChild(document.createElement('hr'))
  rightDiv.appendChild(productDescription)

  rightDiv.appendChild(productSpecsTitle)
  rightDiv.appendChild(document.createElement('hr'))
  rightDiv.appendChild(specsTable)

  productDiv.appendChild(leftDiv)
  productDiv.appendChild(rightDiv)
}