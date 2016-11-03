#AngularPOS

A point of sale UI proof of concept served by Flask, with AngularJS & Bootstrap

##How to use

Clone repo and run flask_app.py to start wsgi, then navigate to localhost to use.

- Select the seat number of the item you would like to order. Default starting seat is seat #1.
- Select a category of items
- Select an item to add to the order

To modify an item in the order:

- Click an item div in the Order Details well and the Modifier Controls well will populate with the selected item
- Click the Modify Item button to modify the selected item

Then you can either clear the order or send the order via the Order Controls panel.
