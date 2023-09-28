https://www.youtube.com/watch?v=3vRcB0P84t4&list=PLKhlp2qtUcSZsGkxAdgnPcHioRr-4guZf

mainly to learn mongoDB and web socket (socket io)





# Key Takeaways

some vscode extensions



Server

+ MongoDB schema
+ Connect MongoDB
+ User sign up & authentication using JWT token
  + `protect` middleware to authenticate a user login

+ :gem: use morgon for logging to help debug
+ 写server api pattern: 边写边validate user input or a db operation result

Postman

+ set and save environment variables
+ Authentication token



Client

+ React Router V5 
+ use of Chakra UI lib
  + modal
  + Toast for input feedback
  + Menu

+ set proxy in package.json for CORS. we can also config CORS at server 
+ upload image to cloudiary, then MongoDB store pic url
+ manage logged-in user's dynamic info (state) in Context API
+ handler inovling http request code pattern
  + check input, then do business
  + set boolean state for visual feedback whether async operation is done or not







| Id                  | Title                                | Description              |
| ------------------- | ------------------------------------ | ------------------------ |
| [Part1](./part1.md) | Intro & Basic setup                  |                          |
| [Part2](./part2.md) | General UI & API build up            | REST <br>more like JR P3 |
| [Part3](./part3.md) | :bangbang: Messaging <br> Deploy App | Socket.io                |

