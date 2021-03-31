CS1300 Development

Organization of components:
- Each filter and sorter is its own component, and used by App directly. 
- The list of credit cards (FilteredList) and the cart (Cart) are their own
  components, and used by App directly.
- FilteredList uses multiple CreditCard components to display info about each credit card. 
- Cart uses multiple CartItem components to display info about each credit card in the cart. 


                                                    App                                  
                                                     |                                   
                                                     |                                   
    +----------+-----------------------+-------------|-----------------+-------------+   
    |          |         |             |                               |             |   
    |          |         |             |                               |             |   
    |                                  |                               |             |   
 Sorter  TypeFilter  IssuerFilter  FeeFilter                     FilteredList      Cart  
                                                                       |             |   
                                                                       |             |   
                                                                       |             |   
                                                                   CreditCard    CartItem
                                                                                         

Notably, the information about filters, the sorter, and the cards are loaded from const.js
which stores all of the constant information that should not be stored in the main App.js file
for cleanliness of the code.

The only component with states is App.js. Other components use props for the required data. 

Props are used when each subcomponent is used in a parent. In particular, when a button 
is clicked, a function is called that calls a function passed in as a prop to that component
in a parent. These functions in App.js are the callback functions.

The filters and sort type used when displaying the list of credit cards
is also passed in as a prop to FilteredList. When a user presses "Add to Cart" or "Remove",
the click handler function calls its way back up to the function in App.js which ultimately
handles the state change by removing or adding the specific card from/to the cart.

Material UI was used in this project in order to simplify the coding of the interface. 