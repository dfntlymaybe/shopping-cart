// an array with all of our cart items
var cartObj = {
   cartItem: [],
   total: 0
};

//Update 
var updateCart = function () {

  $('.cart-list').empty();

  //Update the cart list using handlebars
  var source = $('#cartList-template').html();
  var template = Handlebars.compile(source);
  var newHtml = template(cartObj);
  $('.cart-list').append(newHtml);

  //Event handler for clicking on the remove item button
  $('.remove-btn').on('click', function(){
    itemName = $(this).closest('p').attr("data-name");
    removeItem(itemName);
    updateCart();
  });
};

//Add item to the main array
var addItem = function (itemName, itemPrice) {

  //Check if the ite, exists in the array
  for(var i = 0; i < cartObj.cartItem.length; i++){

    //If exists just update quantity and price
    if(itemName == cartObj.cartItem[i].name){
      cartObj.cartItem[i].quantity++;
      cartObj.cartItem[i].price = itemPrice * cartObj.cartItem[i].quantity;
      cartObj.total += Number(itemPrice);
      updateCart();
      return;
    }
  } 
  //If doesn't exists add to the array
  cartObj.cartItem.push({name: itemName, price: itemPrice, quantity: 1});
  cartObj.total += Number(itemPrice);
  updateCart();

}

//Remove item from the main array
var removeItem = function(itemName){
  for(var i = 0; i < cartObj.cartItem.length; i++){
    if(itemName == cartObj.cartItem[i].name){
      cartObj.total -= Number(cartObj.cartItem[i].price);
      cartObj.cartItem.splice(i, 1);
    }
  }
  updateCart();
}

//Clear and update cart
var clearCart = function () {
  // TODO: finish
  cartObj.cartItem = [];
  cartObj.total = 0;
  updateCart();
}

//Add new item to the screen
var addNewItem = function(item){

  //handlebars
  var source = $('#new-item-template').html();
  var template = Handlebars.compile(source);
  var newHtml = template(item);
  $('.main-container').append(newHtml);


  $('.add-to-cart').off();

  $('.add-to-cart').on('click', function () {
    itemName =  $(this).closest('.item').attr("data-name");
    itemPrice =  $(this).closest('.item').attr("data-price");
    addItem(itemName, itemPrice);
  });
};


var clearNewProductForm = function(){
  $('#new-item-name').val('');
  $('#new-item-price').val('');
  $('#new-item-image').val('');
};


//Toggle shopping cart
$('.view-cart').on('click', function () {
  // TODO: hide/show the shopping cart!
  if($('.shopping-cart').css('display') == 'none'){
    $('.shopping-cart').css('display', "block");
  }else{
    $('.shopping-cart').css('display', "none");
  }
});

//Event handler for add to cart 
$('.add-to-cart').on('click', function () {
  itemName =  $(this).closest('.item').attr("data-name");
  itemPrice =  $(this).closest('.item').attr("data-price");
  addItem(itemName, itemPrice);
});

//Event handler for clear cart
$('.clear-cart').on('click', function () {
  clearCart();
});

//Event handler for admin panel button
$('.admin-panel-btn').on('click', function () {
  $('.admin-panel').css('display', "block");
});

//Event handler for close panel
$('.close-admin-panel').on('click', function () {
  $('.admin-panel').css('display', "none");
});

//event handler for add new item
$('.add-new-item-button').on('click', function () {
  var name = $('#new-item-name').val();
  var price = $('#new-item-price').val();
  var imageUrl = $('#new-item-image').val();

  addNewItem({name: name, price: price, imageUrl: imageUrl});

  clearNewProductForm();
  
  $('.admin-panel').css('display', 'none');

});


// update the cart as soon as the page loads!
updateCart();