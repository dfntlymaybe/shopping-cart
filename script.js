// an array with all of our cart items
var cartObj = {
   cartItem: [],
   total: 0
};


var updateCart = function () {
  // TODO: finish
  $('.cart-list').empty();
  var source = $('#cartList-template').html();
  var template = Handlebars.compile(source);
  var newHtml = template(cartObj);

  $('.cart-list').append(newHtml);

  $('.remove-btn').on('click', function(){
  itemName = $(this).closest('p').attr("data-name");
  removeItem(itemName);
  updateCart();
});
}


var addItem = function (item) {
  // TODO: finish
  var name = item.attr("data-name");
  var price = item.attr("data-price");
  for(var i = 0; i < cartObj.cartItem.length; i++){
    if(name == cartObj.cartItem[i].name){
      cartObj.cartItem[i].quantity++;
      cartObj.cartItem[i].price = price * cartObj.cartItem[i].quantity;
      cartObj.total += Number(price);
      return;
    }
  } 
  cartObj.cartItem.push({name: name, price: price, quantity: 1});
  cartObj.total += Number(price);
}

var removeItem = function(itemName){
  for(var i = 0; i < cartObj.cartItem.length; i++){
    if(itemName == cartObj.cartItem[i].name){
      cartObj.total -= Number(cartObj.cartItem[i].price);
      cartObj.cartItem.splice(i, 1);
    }
  }
}

var clearCart = function () {
  // TODO: finish
  cartObj.cartItem = [];
  cartObj.total = 0;
  updateCart();

}

$('.view-cart').on('click', function () {
  // TODO: hide/show the shopping cart!
  if($('.shopping-cart').css('display') == 'none'){
    $('.shopping-cart').css('display', "block");
  }else{
    $('.shopping-cart').css('display', "none");
  }
});

$('.add-to-cart').on('click', function () {
  // TODO: get the "item" object from the page
  item =  $(this).closest('.item');
  addItem(item);
  updateCart();
});

$('.clear-cart').on('click', function () {

  clearCart();
});



// update the cart as soon as the page loads!
updateCart();