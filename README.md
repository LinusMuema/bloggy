# Bloggy API

### Technology used
* [ExpressJS](https://expressjs.com/): easily create a Nodejs server and reduce the boilerplate code in NodeJs
* [MongoDB atlas](https://www.mongodb.com/): the database hosting the `user` and `blog` objects.
* [Json Web tokens](https://www.npmjs.com/package/jsonwebtoken): issued after registration or login. They are used for security during data access
* [bcrypt](https://www.npmjs.com/package/bcrypt): hashing of passwords. The string saved in the database is a hashed version of the password.

The [application](https://bloggy-backend.herokuapp.com/) is hosted on heroku.

### Architecture
The application follows a basic MVC architecture to ensure code readability and scalability.
#### Components
* [`model`](https://github.com/LinusMuema/bloggy/tree/main/models): this package contains the mongoose models and schemas. They define and temporarily hold our data. The models are: `User` and `Blog`
* [`view`](https://github.com/LinusMuema/bloggy/tree/main/routes): In a basic Express application, the views are the routes defined in the `routes` package. This is what the user/consumer intercts with when making API requests.
* [`controller`](https://github.com/LinusMuema/bloggy/tree/main/controllers): The business logic is handled by the controller. The `view` needs not to know how the data is collected or transformed. This adds a form of abstraction in the application.

#### [utils](https://github.com/LinusMuema/bloggy/tree/main/utils)
This is package contains modules with different reusable functions used around the application.
1. `middleware` exports various functions used as middleware for different requests. 
2. `util` this has functions to create tokens, hash passwords etc.
3. `response` all endpoints throw errors and this module provides a basic way of displaying the errors to the consumer.

> Documentation and runnable APIs are hosted on the Postman documenter. The link to the documenter is found in the base url of the application.
