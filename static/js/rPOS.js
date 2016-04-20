//so I can use .last() method to return last element in javascript array
if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

//init angular app
app = angular.module('rPOSapp', [])
  .controller('rPOSController', function() {
    var rPOS = this;
    
    //set some vars
    rPOS.seats = [1,];
    rPOS.currentSeat = 1;
    rPOS.order = [];
    rPOS.total = 0;
    rPOS.currentCategory = "pick a category";
    rPOS.currentItem = null;
    
    //TESTING
    rPOS.a = ""
    rPOS.itemIndex = 0;
    
    //alert some shit
    rPOS.alert = function(message) {
      alert(message);
    };
    
    //category and button view controls
    rPOS.populateButtons = function(c) {
       rPOS.categoryView = menu2.categories[c];
    };
    
    rPOS.categoryView = function(cat) {
      console.log(cat);
    };
    
    //seat controls
    rPOS.seats.addSeat = function() {
      rPOS.seats.push((rPOS.seats.last()+1));
    };
      
    rPOS.seats.deleteSeat = function() {
      //check if length is greater than 1
      if (rPOS.seats.length > 1) {
        //NEEDED: check if seat has items assigned to it
        rPOS.seats.pop();
        rPOS.currentSeat = 1;
      };
    };
    
    //bootstrap styling for seat buttons
    rPOS.selectionStyle = function(num) {
      if (num==rPOS.currentSeat) {
        return "btn btn-success btn-block";
      };
        return "btn btn-block";
    };
    
    //order controls
    rPOS.addToOrder = function(item) {
      console.log(item.name + " added to order")
      var orderItem = {
        'item':item,
        'seat':rPOS.currentSeat,
        //TEST
        'id':rPOS.itemIndex,
        'active':false
      }
      //TEST
      rPOS.itemIndex += 1;
      
      rPOS.order.push(orderItem);
      rPOS.total += item.price;
    };
    
    rPOS.clearOrder = function() {
      rPOS.order = [];
      location.reload();
    };
    
    rPOS.sendOrder = function() {
      console.log(rPOS.order);
      var url = "/send_order";
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        // send the collected data as JSON
        xhr.send(JSON.stringify(rPOS.order));
        alert('The order array was sent to the console and Flask. Now I will reload this page so you can input more orders.');
        location.reload();
    };
    
    //bootstrap styling for category buttons
    rPOS.categoryStyle = function(category) {
      if (category==rPOS.currentCategory) {
        return "btn btn-success btn-block";
      };
        return "btn btn-block";
    };
    
    //item modifier
    rPOS.modifyItem = function() {
      alert('modify method called!');  
    };
    
    rPOS.activate = function(itemIndex) {
        if (rPOS.order[itemIndex]['active'] == true) {
            rPOS.order[itemIndex]['active'] = false;
            rPOS.currentItem = null;
        } else {
            rPOS.order[itemIndex]['active'] = true;
            rPOS.currentItem = rPOS.order[itemIndex];
        }
        
        
        
    };
    
    rPOS.isItemActive = function(itemIndex) {
        if (rPOS.order[itemIndex]['active']==true) {
            return "activeItem";
        } else {
            return "";
        }
    };
    

  //end of angular controller
  });

// to play nice with jinja2 template
app.config(['$interpolateProvider', function($interpolateProvider) {
     $interpolateProvider.startSymbol('{[{');
     $interpolateProvider.endSymbol('}]}');
   }]);
