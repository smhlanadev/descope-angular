# Add Authentication and RBAC to an Angular App
Explore the Magic Link and RBAC features of Descope for an Angular application. Create roles, manage access, and enhance the user experience by avoiding password-related issues, while simplifying the authentication process for developers by reducing the complexity of implementing authentication.

This project is created using Angular and integrates with the Descope API to create a seamless authentication and authorization flow. The application keeps an inventory of books and has the ability to view the books with their details and also add new books using a form. Clicking on each item expands it and displays more information about the book. This also provides an option to delete a book. 
## Getting Started
Here are the things you will need to get this project running:
### Prerequisites
- [Node v20](https://nodejs.org/en/download/prebuilt-installer)
- [Visual Studio Code](https://code.visualstudio.com/)
- [A Descope Free Forever Account](https://www.descope.com/sign-up)
- At least two email accounts.

Use a command line interface (cmd, PowerShell, VS Code terminal, etc.) and the Descope developer console, follow the steps below:
### Step 1. Configure roles and permissions
Log into the Descope console and configure the roles and permissions as follows:
| Role | Permissions |
| ------ | ------ |
| Admin | list, add, delete |
| Guest | list |
### Step 2. Clone or download this repository
```sh
git clone https://github.com/smhlanadev/descope-angular.git
```
### Step 3. Install the node dependencies
```sh
cd descope-angular
npm install
```
### Step 4. Run the application
```sh
npm start
```
### Step 5. Login
After successfully compiling, navigate to the URL shown in the terminal. It is usually http://localhost:3000/. This displays the login screen:

![Login screen](https://i.imgur.com/lQZSgic.png)

Enter the email address you want to authenticate with and click on **Continue**. You will receive an email with the link. Click on the link, and you will be authenticated and redirected to the application.
Now that you’re authenticated, you will be able to see the book inventory based on the role configurations:

**Admin Role**
![Admin log in - After authentication is successful](https://i.imgur.com/9H0FfS6.png)

**Guest Role**
![Guest log in - After authentication is successful](https://i.imgur.com/MvTSsoo.png)
