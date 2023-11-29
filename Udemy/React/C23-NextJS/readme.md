Intro to Next.js



3hrs 



# key takeaways

what is Nextjs? why

file-based routing & Page pre-rendering

data fetching & adding an API



# Intro

a fullstack framework for react.js / a react framework for production

+ Next.js solves common problems and make it easier to build react



## key features

Server-side rendering

+ next.js allows automatic page pre-rendering before sending html to the client
  +  great for SEO and inital load
+ blending client-side and server-side.
  +  Fecth data on the server and render finished pages

file-based routing

+ react router needs code to define routing logics, 
+ but Nest.js gets rid of that code-based routing: it defines pages and routes with files and folders instead of code
  + Less code, less work, more understandable

build fullstack app

+ easily add backend (server-side) code to your Next/React apps
+ CRUD data, authentication etc. can be added to your react projects



# Hands-on

p532-



create a Next project

https://nextjs.org/docs/getting-started/installation



the starting project file structure changed after running `npx create-next-app` compared to the lec

```js
> pages
> public 
> styles
```

:bangbang: it seems the lec content has outdated, when run `npm run dev` pop environment issues

stop learning !



# :bangbang: Learn Next js

an up-to-date Next learning tutorial offered by vercel: 

https://nextjs.org/learn/dashboard-app

see nextjs-dashboard folder

+ Uses typescript, tailwind css / css module, eslint 



## Getting started

C1

project file structure





## styling 

C2

+ use `tailwind css` or `css modules` to add styling 
+ `clsx` for toggling class names
  + 直接在classname里写conditional className 的代码
    + 其实也可以用 react state 来控制额外的变量, 再让其与className concatnate来写
+ and even more options for styling code (omitted)



## optimizing fonts & imgs

C3





# Learn Next.js in 30 mins

youtube: web dev simplify - a todo list app with database



```ts
npx create-next-app@latest		// use typescript, eslint, tailwind
```

database setup

```ts
npm i prisma --save-dev
npx prisma init --datasource-provider sqlite

// write prisma model code...

npx prisma migrate dev --name init
```





