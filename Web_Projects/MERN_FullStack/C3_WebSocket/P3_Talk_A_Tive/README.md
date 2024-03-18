Resource

https://www.youtube.com/watch?v=3vRcB0P84t4&list=PLKhlp2qtUcSZsGkxAdgnPcHioRr-4guZf

mainly to learn mongoDB and web socket (socket io)



check out features at https://www.youtube.com/watch?v=3vRcB0P84t4&list=PLKhlp2qtUcSZsGkxAdgnPcHioRr-4guZf



his code is not really elegant and readble, practice to rebuild the app in your own way. By doing so, you could make it your own project on your resume!

+ Not using any UI lib
+ make the code more elegant and readable
+ use typescript, next.js, nest.js
+ use S3 to upload image
+ use AWS to deploy app



# Key Takeaways

some vscode extensions

+ code spell checker



Server

---

+ Mongoose & MongoDB
  + Schema
  + Model
  + populate
  + query...

+ User sign up & authentication using JWT token
  + `protect` middleware to authenticate a user login

+ :gem: use morgon for logging to help debug
+ :star: 写server api pattern: 边写边validate user input or a db operation result



Postman

---

+ set and save environment variables
+ Authentication token



Client

---

+ React Router V5, 
  + `useHistory` is replaced by other hooks in V6 
  + :bangbang: React Router should be outside of context provider when wrapping `<App />`

+ use of Chakra UI lib
  + Modal
  + Toast for input feedback
  + Menu
+ set proxy in package.json for CORS. we can also config CORS at server 
+ upload image to cloudiary, then MongoDB store pic url
  + S3 should also be able to do this!

+ :bangbang: Authentication & authorization (logged-in user can only see his data)
  + done by set HTTP header when sending axios request
+ :bangbang: manage app-wide states (these states spans across a wide range of components in app) in Context API
  + logged-in user's dynamic info (state)
    + localStorage

  + selectedChats
  + chats that logged-in user get involved in
  + Notifications of logged-in user received

+ :star: handler inovling http request code pattern
  + check input, then do business
  + set boolean state for visual feedback whether async operation is done or not
+ :star: [Common React States categories](./sub_topics/reactStatesPattern.md) 





# Content List

| Id                    | Title                                                        | Description                                                  |
| --------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| [Part1](./part1.md)   | Intro & Basic setup                                          | MongoDB setup                                                |
| [Part2](./part2.md)   | General UI & REST API build up                               | REST <br>Mongoose <br>upload image <br>:bangbang: user authorization using JWT <br>more like JR P3 |
| [Part3](./part3.md)   | Business logic component <br>:bangbang: Messaging <br> Deploy App | REST <br>Socket.io <br>:star: React States summary           |
| [deploy](./deploy.md) | deploy the app to AWS                                        |                                                              |

