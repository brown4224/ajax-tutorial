$(function (){
  var $orders = $('#orders');
  var $name = $('#name');
  var $drink = $('#drink');
  var ajax_url = 'http://rest.learncode.academy/api/learncode/friends';
  // var orderTemplate = "<li>name: {{name}}, drink {{drink}}</li>";
  var orderTemplate = "" + // Must have empty string first
  "<li>" +
  "<p><strong>Name:</strong> {{name}}</p>" +
  "<p><strong>Drink:</strong> {{drink}}</p>" +
  "<button data-id='{{id}}' class='remove'>X</button>" +
  "</li>"


function addOrder(order){
  $orders.append(Mustache.render(orderTemplate, order));
  // $orders.append('<li>name: '+ order.name + ', drink: ' + order.drink + '</li>');
  console.log(orders);
}

  $.ajax({
      type: 'GET',
      url: ajax_url,
      success: function(orders){
        $.each(orders, function(i, order){
          addOrder(order);
        });
      }, error: function(){
        alert('error loading orders');
      }
  });
  $('#add-order').on('click', function(){
    var order = {
      name: $name.val(),
      drink: $drink.val()
    };
    $.ajax({
      type: 'POST',
      url: ajax_url,
      data: order,
      success: function(newOrder){
         addOrder(newOrder);
      }
    });
  });
});
