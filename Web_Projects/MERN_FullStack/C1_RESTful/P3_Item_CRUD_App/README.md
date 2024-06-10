# Full-stack-CRUD-Practice

`.gitignore` don't forget!

backend: Nest.js
```js
nest new my-nest-app --skip-git         // avoid making it a git repo

npm install class-validator class-transformer       // for dto input validation

// for updating uuid of an item
npm install uuid
npm install @types/uuid

// wire up new module
nest generate module items
nest generate controller items --no-spec
nest generate service items --no-spec

```


frontend: Next.js - app route
```js
npx create-next-app@latest my-next-app

npx create-react-app my-app --template typescript       // better use this, as Next.js is not really stable at test time

// 
npm install axios
npm install --save-dev @types/axios
```