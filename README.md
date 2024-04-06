
# SUNBASE DATABOX FrontEnd
 Sunbase Databox is a full-stack web application that provides functionalities for managing customer data.
 




## Features 

- User Authentication         :   Secure user login and          signup with Spring Security and JWT Token based Authentication.

- User Authorization : Only authorized user can access the Rest api end point

- Users are not required to provide credentials for each service; instead, JWT tokens will authenticate and authorize them seamlessly.

-

## Tech Stack
 

   
   - [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
   - [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
   - [Javascript](https://www.javascript.com/)
##  Getting Started
  ###  1. Installation

  Clone this repository to your local machine using the following HTTPS link:

  https://github.com/shivasaiparsha/SunbaseFrontEnd/

 Access  Backend Spring boot project using below link

 https://github.com/shivasaiparsha/SunbaseAssignment

  


 ### 2. Set up project

    Open your favourite code editor(VS CODE Suggestead) and follow these below steps to clone the project:

- click on file in your code editor
- click one new file
- select upload file from version control
- paste the above mentioned url in the given box
- wait for few mintues to set up project in your code editor

### 3.Login Methods
1.Users initially log into the system using hardcoded credentials stored in the backend Spring Boot application. After successful authentication, users are then provided with the option to log in using remote API credentials.
 

  ### 4.Run the Application
  Once you done all the steps

  - Open the project in your code editor
  - Run the project in your browser
 - Make sure that your backend spring boot server must be run on port 8080
 - When interfacing the frontend with the backend, you might face Cors not allowed origin error 
 
 To resolve potential Cross-Origin Resource Sharing (CORS) errors, navigate to the backend Spring Boot project and follow these steps:

Locate the file CorsConfiguration.java within the directory src/main/java/com/example/SunBase/SecurityFilter/.

Within CorsConfiguration.java, find the method where CORS configurations are defined.

Replace the value of allowedOrigins("http://127.0.0.1:5500") with the domain of your browser. This will ensure that requests from your specific domain are allowed.

 successfully set up and started the Sunbase application FrontEnd. If you encounter any issues or have suggestions, feel free to open an issue in the repository or you can contact to email shivasaiparsha140@gmail.com.

 


## Feedback

If you have any feedback, please reach out to us at shivasaiparsha140@gmai.com

