// Using the youtube chanel LearnCode.academy jQuery Ajax Tutorial
// http://rest.learncode.academy/

$(function (){
  var $orders = $('#orders');
  var $name = $('#name');
  var $drink = $('#drink');
  var ajax_url = 'http://rest.learncode.academy/api/learncode/friends';
  // var orderTemplate = "<li>name: {{name}}, drink {{drink}}</li>";
  // var orderTemplate = "" + // Must have empty string first
  // "<li>" +
  // "<p><strong>Name:</strong> {{name}}</p>" +
  // "<p><strong>Drink:</strong> {{drink}}</p>" +
  // "<button data-id='{{id}}' class='remove'>X</button>" +
  // "</li>";
  var orderTemplate = $('#order-template').html();

  function addOrder(order){
    $orders.append(Mustache.render(orderTemplate, order));
  // $orders.append('<li>name: '+ order.name + ', drink: ' + order.drink + '</li>');
  console.log(order);
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

$orders.delegate('.remove','click', function(){
  var $ajax_url_del = ajax_url + '/' + $(this).attr('data-id');
  var $li =$(this).closest('li');

  console.log($(this).attr('data-id'));
  $.ajax({
    type: 'DELETE',
    url: $ajax_url_del,
    success: function(){
        // You can use animations to fade out before removing
        $li.remove();
      }
    });
});

// Editing Functionality
// Edit
$orders.delegate('.editOrder', 'click', function(){
  var $li =$(this).closest('li');
  $li.find('input.name').val( $li.find('span.name').html() );
  $li.find('input.drink').val( $li.find('span.drink').html() );
  $li.addClass( 'edit' );
});
// Cancel Edit
$orders.delegate('.editCancel', 'click', function(){
  var $li =$(this).closest('li').removeClass('edit');
});
// Save orders
$orders.delegate('.editSave', 'click', function(){
  var $li =$(this).closest('li');
  var order = {
    name: $li.find('input.name').val(),
    drink: $li.find('input.drink').val(),
  };
  // var $ajax_url = ajax_url + "/" + $li.attr('data-id');
  $.ajax({
  // var $ajax_url = ajax_url + '/' + $(this).attr('data-id');

  type: 'PUT',
  url: ajax_url + "/" + $li.attr('data-id'),
  data: order,
  success: function(){
   $li.find('span.name').html(order.name);
   $li.find('span.drink').html(order.drink);
   $li.removeClass('edit');
      //  console.log($ajax_url);
    }, error: function(){
      console.log(ajax_url + "/" + $li.attr('data-id'));
    }
  });
});
});
