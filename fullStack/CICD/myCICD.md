

# Intro

https://www.youtube.com/watch?v=scEDHsr3APg

:computer: [ByteByteGo: CI/CD in 5 mins](https://www.youtube.com/watch?v=42UP1fxi2SY)



CI/CD stands for Continuous Integration and Continuous Delivery/Deployment, which are key practices in modern software development. Here's a brief overview of each:

1. **Continuous Integration (CI)**: This is a development practice where developers integrate code changes into a shared repository frequently, typically several times a day. Each integration is verified by an automated build and automated tests to detect integration errors as quickly as possible. The main goal of CI is to provide rapid feedback so that if a defect is introduced into the code base, it can be identified and corrected as soon as possible.

2. **Continuous Delivery (CD)**: This extends the concept of CI, automating the software delivery process further to enable easy and confident deployments into production at any time. Continuous Delivery ensures that the software can be reliably released at any moment. It involves automating the entire software release process, with the only manual step being the actual 'push' to production.

3. **Continuous Deployment (also CD)**: Sometimes CD refers to Continuous Deployment, which is a step beyond Continuous Delivery. Here, every change that passes all stages of your production pipeline is released to your customers. There's no human intervention, and only a failed test will prevent a new change from being deployed to production.

CI/CD is fundamental to a modern DevOps approach and cloud-native software development, helping teams to be more efficient, delivering better quality software with fewer bugs, and releasing it more frequently and reliably.





|                                    |                |      |
| ---------------------------------- | -------------- | ---- |
| [1](./C1-Github-Actions/readme.md) | github actions |      |
|                                    |                |      |
|                                    |                |      |





# Deployment of app to AWS

https://www.youtube.com/watch?v=sCQwEVhCvTg

```ts
client -> route53 -> S3 that hosting a static website
```



Key takeaways

+ static files vs. dynamic files & `npm run build`
+ React vs. Next: differences when running `npm run build` 



## Static files & `npm run build` 

<u>Static files in the context of web development are files that are not dynamically generated, meaning their content doesn't change based on user input or other dynamic data sources.</u> These files are delivered to the client (usually a web browser) as-is. Common types of static files include:

1. **HTML Files**: These are the backbone of any website, containing the structure and content of your web pages.

2. **CSS Files**: Cascading Style Sheets (CSS) define the look and format of the content in HTML files, including layout, colors, fonts, and more.

3. **JavaScript Files**: These contain scripts that run on the client side, in the user's browser. JavaScript in static files typically includes functionality that does not require server-side processing, like animations, form validations, and user interactions.

4. **Images**: Common formats include JPEG, PNG, GIF, SVG, and others. These are used to display pictures, icons, backgrounds, etc.

5. **Videos and Audio Files**: These are media files embedded in or linked from web pages.

6. **PDFs and Other Document Formats**: These can be downloadable resources, manuals, brochures, etc.

7. **Other Files**: This includes files like fonts, XML, JSON (usually used for configurations or static data), and any other files that do not require server-side processing before being sent to the client.

<span style="color: yellow">Static files</span> are contrasted with <span style="color: yellow">dynamic files or content</span>, which are generated on-the-fly by a server based on specific requests, user interactions, or other real-time data. For instance, a server-side script might pull data from a database to generate a personalized web page for each user, which would be considered dynamic content.

In the context of a React application, when you build your project using `npm run build`, it generates a `build` directory with static files. These files contain all the HTML, JavaScript, and CSS required to run your application. They are "static" because they do not change after being built, and they can be served directly by a web server without the need for server-side processing.



## React.js app: launch app using just `build` static files

:bangbang: Questions is: can I launch the front end app just using these static files in the `build` folder? 

Yes, you can launch a React app directly from the `index.html` file in the `build` directory after running `npm run build`, but there are some important considerations to keep in mind. <span style="color: red">The `build` directory contains static files which are meant to be served by a web server.</span> Simply opening the `index.html` file in a browser (using a `file:///` URL) often won't work as expected due to the following reasons:

1. **Relative Paths**: The `build` process typically configures assets (like JavaScript, CSS, and media files) to be loaded via relative paths assuming a server environment. When opened directly in a browser, these paths might not resolve correctly.

2. **CORS Policies**: Modern browsers enforce strict CORS (Cross-Origin Resource Sharing) policies for security reasons. This can prevent JavaScript modules and AJAX requests from loading correctly when you open the file directly from the filesystem.

3. **Routing Issues**: If your React app uses client-side routing (like with React Router), directly opening `index.html` will not handle navigation as expected, since client-side routing relies on server-side support to properly serve the `index.html` file for different routes.

<span style="color: red">To properly launch your React app from the `build` directory, you should serve the files using a web server.</span> There are several ways to do this:

### Using a Static Server

For local testing, you can use a simple static file server. Here's how you can do it with `serve`, a popular static server for serving single-page applications:

1. First, install `serve` globally using npm:
   ```sh
   npm install -g serve
   ```

2. Then, navigate to your project's root directory and run:
   ```sh
   serve -s build
   ```
   This will serve your `build` directory on a local server, typically at `http://localhost:5000`.

### Using Other Web Servers

For production, you might deploy the `build` directory to a web server like Apache, Nginx, or an equivalent hosting platform. These servers need to be configured to serve your `index.html` file for all navigation routes (a common setup for single-page applications).

### Deploying to Cloud Services

You can also deploy your `build` directory to cloud-based hosting services like Netlify, Vercel, AWS S3 + CloudFront, GitHub Pages, etc. These platforms are optimized for serving static sites and can handle the routing and server configuration for you.

Remember, the method you choose depends on whether you're simply testing your build locally or deploying it to a production environment.





## :bangbang: Next.js app: `npm run build`

when running `npm run build` in a nextjs app, does this also generate static files to `.next` directory?



Yes, running `npm run build` in a Next.js application does generate static files, but the process and the outcome are a bit different compared to a typical React application.

In Next.js, `npm run build` performs the following:

1. **Static Site Generation (SSG)**: For pages that use `getStaticProps` or `getStaticPaths`, Next.js pre-renders these pages at build time. This means that the HTML for these pages is generated during the build process and saved as static files.

2. **Server-Side Rendering (SSR) Preparation**: For pages that use `getServerSideProps`, Next.js doesn't generate static HTML files. Instead, it prepares the necessary JavaScript code to render these pages on the server at request time.

3. **API Routes**: If your Next.js app includes API routes, `npm run build` prepares these routes for deployment. These are not static files but server-side code that runs in response to API requests.

4. **JavaScript Bundling**: Like in Create React App, Next.js compiles and bundles your JavaScript and TypeScript code, CSS, and other assets. This includes optimizations like minification and tree-shaking (removing unused code).

5. **Output in `.next` Directory**: The output of this build process is stored in the `.next` directory. This directory includes:
   - Static HTML files for pages that use SSG.
   - JavaScript files (both client-side and server-side bundles).
   - Other assets like images, CSS, etc.
   - A special server code for pages that require SSR and API routes.

6. **Hydration**: The JavaScript files included in the `.next` build are used to "hydrate" the static HTML on the client side, turning it into a fully interactive React application.

7. **Special Note on Exporting**: If you run `next export` after `npm run build`, Next.js generates a fully static version of your site in the `out` directory. This command is used for static-only deployments and requires that all pages can be pre-rendered at build time.

In summary, `npm run build` in a Next.js application does generate static files for pages that can be statically generated, but it also prepares server-side code for pages that use server-side rendering or API routes. <span style="color: red">The resulting `.next` directory contains a mix of static assets and server-side JavaScript necessary to run the application in a production environment.</span>



## :bangbang: React vs. Next at `npm run build`

Certainly! The process and outcome of running `npm run build` in a React app (created using Create React App) and a Next.js app are different due to their distinct architectures and purposes. Here's a comparison:

### React App (Create React App):

1. **Single-Page Application (SPA)**: React apps are typically SPAs. All routing is handled client-side, and there is usually a single HTML file (e.g., `index.html`).

2. **Compilation and Bundling**: The build process compiles JSX, JavaScript, and CSS. It bundles these assets, often using tools like Webpack and Babel.

3. **Minification and Optimization**: The JavaScript and CSS files are minified for performance. Additional optimizations like code splitting can be configured.

4. :bangbang: **Static File Generation**: Generates a `build` directory containing static files – HTML, CSS, JavaScript, and media files. These files are completely static and require a web server to serve them.

5. **Client-Side Rendering**: The JavaScript files handle rendering components in the browser. The initial page load fetches the single HTML file, and then React takes over to render the rest of the UI dynamically.

6. **Environment**: Optimized for a production environment, meaning debug tools are stripped, and performance optimizations are applied.

### Next.js App:

1. :bangbang: **Hybrid Rendering**: Next.js supports both server-side rendering (SSR) and static site generation (SSG), alongside client-side rendering.

2. :bangbang: **SSG and SSR Preparation**: `npm run build` generates static HTML files for pages using `getStaticProps` or `getStaticPaths` (SSG). For SSR pages using `getServerSideProps`, it compiles the necessary JavaScript to render these pages on the server.

3. :bangbang: **API Routes**: Prepares server-side code for API routes defined in the `pages/api` directory.

4. **JavaScript Bundling**: Similar to React, Next.js compiles and bundles JavaScript, TypeScript, and CSS. This includes both client-side and server-side code.

5. **Optimization**: Minifies assets and performs optimizations. Next.js also optimizes images and performs automatic code splitting.

6. **Output in `.next` Directory**: The build output is stored in the `.next` directory, containing both static files (for SSG) and server-side code (for SSR and APIs).

7. **Hydration**: In the browser, Next.js "hydrates" the static HTML into a fully interactive React application.

8. **Optional Static Export**: Running `next export` after the build generates a fully static site in the `out` directory, suitable for static hosting.

### Key Differences:

- **Rendering**: React apps are client-side rendered SPAs. Next.js apps can be a mix of static, server-side, and client-side rendered pages.
- **Output Directory**: React’s `npm run build` outputs to the `build` directory, while Next.js uses the `.next` directory.
- **SSR and API Support**: Next.js supports SSR and API routes, which are not native features in a standard React app.
- :bangbang: **Static Export Option**: Next.js offers an additional static export option with `next export`.
  - but this sacrifices SSR and API routing features of Next.js


In summary, the main differences lie in how these frameworks handle rendering and the nature of the output files. React (CRA) primarily generates a fully client-side SPA, while Next.js offers more flexibility with server-side rendering, static generation, and API routes, leading to a more complex build output.



## :moon: deploy Next.js app to AWS S3

Yes, Next.js can be deployed as a static website to AWS S3 through its static export feature. This is facilitated by the `next export` command, which generates a fully static version of your Next.js application. Here's how it works and what it means for deploying to a service like AWS S3:



### Static Export in Next.js

1. **Running `next export`**: After completing your application and running `npm run build`, you execute `next export`. This command turns your Next.js application into a static site.

2. **What `next export` Does**: 
   - For pages that use static generation (`getStaticProps`), it pre-renders these pages into HTML at build time.
   - For each route, it generates an HTML file.
   - It also copies over the JavaScript, CSS, and other static files needed to run the site.
   - Pages that rely on server-side rendering (`getServerSideProps`) or are dynamically routed without static paths defined won't work with `next export` as they require a Node.js server environment to render.

3. **Output**: The result is a set of static files in the `out` directory. This includes HTML, JavaScript, CSS, and other assets.



### Deployment to AWS S3

- **AWS S3 as a Static Website Host**: S3 can host static websites, serving files directly from the bucket.

- **Uploading to S3**: You upload the contents of the `out` directory to an S3 bucket. This bucket should be configured to serve as a static website.

- **Routing Considerations**: Since S3 is a simple static file host, it doesn't support server-side rendering or dynamic routing. Your Next.js application needs to be fully static for S3 hosting to work effectively.

- <span style="color: red">**Limitations**: Because S3 can only serve static files, any server-side features of Next.js (like SSR or API routes) won't work. This means your application should only use features compatible with static site generation.</span>

- **Benefits**: Hosting on S3 is typically cheaper and more scalable for static sites, leveraging AWS's robust infrastructure.

In conclusion, `next export` allows Next.js applications to be transformed into static websites, which can be hosted on AWS S3 or any other static file hosting service. This provides an alternative to server-based deployments for Next.js applications, <span style="color: red">with the trade-off being the inability to use server-side features of Next.js.</span> For fully static sites or applications where dynamic content can be pre-rendered at build time, this can be an efficient and cost-effective hosting solution.



### other deployment options 

Yes, there are several other options for deploying a Next.js application to AWS, each catering to different needs and offering various levels of flexibility, scalability, and complexity. Here are some popular choices:

#### 1. AWS Elastic Beanstalk

- **What It Is**: A Platform-as-a-Service (PaaS) that automates the deployment, scaling, and management of web applications and services.
- **How It Works**: You package your Next.js app and deploy it to an Elastic Beanstalk environment. Elastic Beanstalk handles the deployment, from capacity provisioning, load balancing, and auto-scaling to application health monitoring.
- **Use Case**: Suitable for applications that require server-side rendering (SSR) or need the full capabilities of Next.js, including API routes.

#### 2. Amazon EC2

- **What It Is**: Amazon Elastic Compute Cloud (EC2) provides scalable computing capacity in the AWS Cloud.
- **How It Works**: You can manually set up a server (or a set of servers) on EC2, install Node.js, and run your Next.js application. This approach offers complete control over the server and environment.
- **Use Case**: Best for those who need full control over the infrastructure and are comfortable managing and scaling servers manually.

#### 3. AWS Amplify

- **What It Is**: A set of tools and services to build full-stack apps powered by AWS.
- **How It Works**: AWS Amplify can automatically deploy and host serverless Next.js applications. It simplifies the process of CI/CD pipeline setup and can handle both static site generation and server-side rendering through Lambda@Edge.
- **Use Case**: Great for developers looking for an easy-to-use, fully managed serverless platform, especially for static and JAMstack-style sites.

#### 4. AWS Lambda and Amazon API Gateway

- **What It Is**: AWS Lambda lets you run code without provisioning or managing servers, and Amazon API Gateway handles the HTTP requests.
- **How It Works**: Your Next.js application can be deployed as a serverless function in AWS Lambda. Each page or API route can be a separate Lambda function, triggered by API Gateway.
- **Use Case**: Suitable for highly scalable, serverless architectures, particularly when you want to break down your app into microservices.

#### 5. Amazon S3 with CloudFront and Lambda@Edge

- **What It Is**: A combination of Amazon S3 for hosting static files, CloudFront as a CDN, and Lambda@Edge for running server-side code at edge locations.
- **How It Works**: Static files are served from S3 through CloudFront. Dynamic rendering and SSR can be handled by Lambda@Edge, which runs your server-side code in response to CloudFront events.
- **Use Case**: Ideal for applications that need both static hosting and dynamic content generation, benefiting from the CDN's low latency and high transfer speeds.

#### Choosing the Right Option

The best deployment option depends on your application's specific needs:

- For full server control: **EC2**.
- For ease of use and automatic scaling: **Elastic Beanstalk** or **AWS Amplify**.
- For a serverless architecture: **AWS Lambda with API Gateway** or **Lambda@Edge with CloudFront and S3**.
- For static sites: **S3 with CloudFront**.

Each method has its own set of trade-offs in terms of complexity, scalability, control, and cost. It's important to evaluate these factors based on your application requirements and team capabilities.
