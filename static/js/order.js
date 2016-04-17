GenerateId = function() {
      return Math.floor((Math.random() * 100000) + 1)
    };
    
if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

app = angular.module('orderApp', [])
  .controller('OrderListController', function() {
    var orderList = this;
    orderList.order = [];
    orderList.seats = [1];
    orderList.currentSeat = 1;
    orderList.selectionCategory = null;
    
    orderList.selectionStyle = function(num) {
      if (num==orderList.currentSeat) {
        return "btn btn-success btn-block";
      };
        return "btn btn-block";
     
    };
 
    orderList.seats.addSeat = function() {
       orderList.seats.push((orderList.seats.last()+1));
      };
    orderList.seats.deleteSeat = function() {
      if (orderList.seats.length > 1) {
        orderList.seats.pop();
        orderList.currentSeat = 1;
      };
      
    };
 
    orderList.addToOrder = function(item) {
      orderList.order.push(item);
      
    };

  });
app.config(['$interpolateProvider', function($interpolateProvider) {
     $interpolateProvider.startSymbol('{[{');
     $interpolateProvider.endSymbol('}]}');
   }]);
