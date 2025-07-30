Advanced React E-Commerce App Project


The objective is to create an advanced e-commerce application that utilizes FakeStoreAPI, ContextAPI, Redux Toolkit, and React Query. 

Visual Features:
1. I opted to use a mild purple color scheme to set the stage for this shop.
2. I have the products in stylish card format, with interactive hover.
3. I have the buttons with a hover effect to darken the shade.
4. I have the product cards centered utilizing flexbox for a better visual shopping experience. 


Requirements / Features:

1. Product listings that display title, price, category, description, rating, the product's image, and a button to add to the cart.
2. All products are visible in the home page component. 
3. Added products need to be stored in session storage, and the cart needs to be cleared when the user "checks out".
4. Category drop down is not hardcoded -- React Query pulls the information in dynamically through API requests.
5. Products should filter correctly based off of user's filtration choice or by default showing all products.
6. The shopping cart component needs to display a list of products in the cart and the option of deleting a product from the cart page.
7. The shopping cart accurately displays the total number of items in the cart as well as the total price of all products combined. These values dynamically update as the user interacts with their cart (eg. removing an item).
8. The shopping cart will update with a successful checkout message upon clicking checkout, and will display the message for a duration of three seconds prior to returning an "empty cart" message. 