  let total = 0;
  let countLoyalty = 0;
  let countOrder=0;
  
  
  let products = {
    "Trickledown" : {
		"name": "Trickledown",

	},
	"BacktoEarth" : {
		"name": "BacktoEarth",
	},
	"Eco-Products SL" : {
		"name": "Eco-Products SL",
	},
	"Hayleys-Fibre" : {
		"name": "Hayleys-Fibre",
	},
	"Eco-Films" : {
		"name": "Eco-Films",
	},
	"Ecoware-Lanka" : {
		"name": "Ecoware-Lanka",
	}
  }
  
  let sizes = {
      "small": {
		"size": "Small",
		"price":0
	},
	"medium": {
		"size": "Medium",
		"price": 2500
	},
	"large": {
		"size": "Large",
		"price": 5000
	}
  }
  let packagings = {
    "Bags" : {
		"name": "Bag",
		"price": 1000
	},
	"Plates" : {
		"name": "Plate",
		"price": 2000
	},
	"Mugs" : {
		"name": "Mug",
		"price": 2500
	},
	"Books" : {
		"name": "Book",
		"price": 1000
	},
	"Soaps" : {
		"name": "Soap",
		"price": 800
	},
	"Vases" : {
		"name": "Vase",
		"price": 1500
	}
  }
  
  let extras = {
    "Packaging": {
		"name": "Eco-Friendly Packaging",
		"price": 500
	},
	"Greetingcards": {
		"name": "Eco-Friendly Greetingcards",
		"price": 1000
	},
	"Decorations": {
		"name": "Eco-Friendly Decorations",
		"price": 1500
	}
  }
  
  let orderProcess = {
  
      /* Extracting data from order html form */

      getOrderData: function(){
  
          let product  = products[document.getElementById("Manufacturer").value];
          let size = sizes[document.getElementById("Size").value];
          let packaging = packagings[document.getElementById("Product").value]
          extra = [];
  
          let checkboxes = document.getElementsByName("Extra");
          for (let i = 0; i<checkboxes.length; i++){
              if ( checkboxes[i].checked ){
                  extra.push(extras[checkboxes[i].value])
              }
          }
  
          return {
              "product": product,
              "size": size,
              "packaging": packaging,
              "extra": extra
          };
  
      },

      /*Place Order*/

      placeOrder: function(){
        var orderNum= (document.getElementById("Total-Order").rows.length)-2; // the no of orders//
        var data = document.getElementById("t-data");	

        //confirmation message//
        if (orderNum>0){
            data.innerHTML = "";
            total=0;
            alert("Your order has been placed and you will receive a confirmation email shortly\n Thank you and come again!");
            }

        else{
            alert("Your cart is empty!");
        }
         
    },
  
      /*Add order to cart */

      addToCart: function(){
  
          let orderData = orderProcess.getOrderData();
          orderProcess.createCartRow(orderData.product, orderData.size, orderData.packaging, orderData.extra);
          return;
  
      },

      /* Add to favourite */

      addToFavourite: function(product, size, packaging, extra){
          
        alert("Your item(s) have been added to favourites");

        // Getting order data//
        let orderData = orderProcess.getOrderData();

        // Saving order data in local storage//
        localStorage.setItem("order", JSON.stringify(orderData));

    },
    
  
      /* Order Favourite */

      orderFavourite: function(){
          
          let order = localStorage.getItem('order');
          if ( order == null ){
              alert("No orders in favourites !");
              return;
          }
  
          
          order = JSON.parse(order);
          orderProcess.createCartRow(order.product, order.size, order.packaging, order.extra);
          return;
  
      },
  
      
      /*  Create cart row with order data*/

        createCartRow: function(product, size, packaging, extra){
  
          let table_body = document.getElementById("t-data");
  
          let row = table_body.insertRow();
          row.insertCell().appendChild(document.createTextNode(product.name));
          row.insertCell().appendChild(document.createTextNode(size.size));
          row.insertCell().appendChild(document.createTextNode(packaging.name));
  
          let extrasPrice = 0;
          // Checking for extras
          if ( extra.length > 0){
              
              let extrasString;
  
              for ( let i = 0; i<extra.length;i++){
                  if ( i == 0 ){
                      extrasString = extra[i].name;
                  } else {
                      extrasString = extrasString + ", " + extra[i].name
                  }
  
                  extrasPrice = extrasPrice + extra[i].price;
                  
              }
              
              row.insertCell().appendChild(document.createTextNode(extrasString));
  
          } else {
              row.insertCell().appendChild(document.createTextNode("No Extras"));			
          }
  
          let price = size.price + packaging.price + extrasPrice;
          row.insertCell().appendChild(document.createTextNode(price+" LKR"));
          
          orderProcess.calculateSubTotal(price);
  
  
      },
  
      /* Calculating the total */

      calculateSubTotal: function(price=null){
  
          if ( price == null ){
              total = 0;
          } else {
              total = total+price;
          }
  
          console.log("Price " + total)
          if ( document.getElementById('total-row') ){
              document.getElementById('total-row').remove();
          }
          
          let table_body = document.getElementById("t-data");
  
          let total_row = table_body.insertRow();
          total_row.setAttribute('id', 'total-row');
          let total_row_name = total_row.insertCell();
          total_row_name.appendChild(document.createTextNode("Total"));
          total_row_name.colSpan = "4";
          total_row.insertCell().appendChild(document.createTextNode(total+" LKR"))
  
      },

      /*Check Loyalty */
      
      checkLoyalty:function(){
        alert("You have no Loyalty points!");
      },
  
      
  
  }
  
  
  
  
  
  
      
  