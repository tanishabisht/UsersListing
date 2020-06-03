# Users Listing with Authentication

So for this I used react js that I created using create-react-app, its documentation is given in the file above called Create-React-App-Documentation. I have deployed using Netlify. 

The above code is only provided for the front-end.



## Summary

This is a web application to perform the basic CRUD operations. CRUD basically stands for create, read, update and delete. It adds, deletes, edits the data of the user.


## Functionality

First there is the sign in page with has two buttons, one to direct it to the sign up page if you dont have an account and if you do you need to fill the username and password in the sign in page. The web app will then authenticate with the backend data if the information is saved though the sign up page or not. If you are authenticated then you are directed to the users listing page where the list of all the users are displayed. We can have and option to delete and edit the details of other users. All this is done using **basic CRUD operations**, I didnt use and external dependancy to perform them instead pure js but a very good dependancy for such operations is **axios**.



## Libraries and dependancies installed

1. [bootstrap 4](https://getbootstrap.com/docs/4.0/getting-started/introduction/)
   - this is the original bootstrap 4 not specifically for react

2. [react-bootstrap](https://react-bootstrap.github.io/getting-started/introduction/)
   - it is a dependancy for react has similar features as to normal bootstrap 4

3. [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start)
   - so this is a dependancy which helps us in routing for our react application i.e. a single page application

4. [react-toastify](https://github.com/fkhadra/react-toastify)
   - it is a dependancy installed to pop up notifications of warning, alert, successful etc.

5. [react-loader-spinner](https://www.npmjs.com/package/react-loader-spinner)
   - it is a dependancy that helps to use loader spinners in our application


NOTE: this documentation is not complete as it doesnt contain the backend dependancies, tools or frameworks used.
