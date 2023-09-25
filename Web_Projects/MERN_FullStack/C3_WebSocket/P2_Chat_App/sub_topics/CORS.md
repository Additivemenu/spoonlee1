# Key Takeaway

+ SOP: 最保守的情况, block所有人除了自己
+ CORS: 在SOP基础上, 允许某些人不被block
+ SOP & CORS 都是browser mechanism



# Introduction

CORS (Cross-Origin Resource Sharing) is a security feature <u>implemented by web browsers</u>. It controls how web pages in one origin can request and interact with resources hosted on another origin. The primary goal of CORS is to protect the user and their data from potentially malicious actions.

Here's a bit more detail:

1. **`Same-Origin Policy (SOP)`**: Browsers have a security feature called the "Same-Origin Policy" which restricts web pages from making requests to a different domain than the one that served the web page. This is a fundamental security mechanism that prevents malicious sites from reading sensitive data from another site. However, there are legitimate cases where cross-origin requests are necessary (e.g., APIs, CDNs). That's where CORS comes in.

2. **How CORS works**: <span style="color: red">CORS allows servers to specify who (i.e., which origins) can access their assets.</span> If a browser is trying to access a resource on Server B (server) from a page hosted on Server A (client), Server B can respond with CORS headers to tell the browser that it's okay to share the response with Server A. If Server B doesn't send the appropriate CORS headers, the browser will block the request.

3. :bangbang: **Server-side Configuration**: <span style="color: red">While CORS is a browser-enforced mechanism, it relies on servers to provide headers that specify which origins are permitted</span>. For instance, the `Access-Control-Allow-Origin` header can be set to a specific domain or `*` to allow any domain (though this is generally not recommended for sensitive operations).

4. **Preflight Requests**: For certain types of requests (e.g., those with methods other than GET or POST, or those with custom headers), browsers will send a preliminary "preflight" request using the `OPTIONS` method. This preflight request checks with the server if the actual request is safe to send.

5. :bangbang: **Not a Defense Against CSRF**: <span style="color: red">It's worth noting that while CORS can prevent sites from reading data across origins, it doesn't prevent sites from making requests across origins.</span> This means it isn't a defense against `Cross-Site Request Forgery (CSRF)` attacks.

In summary, CORS is a browser-implemented security feature that works in conjunction with server-side headers to determine if cross-origin requests should be allowed. It provides a way for servers to safely enable cross-site interactions.



# Examples

Certainly! Let's delve into a more illustrative example:

## How CORS Works:

**Scenario**:
Imagine you're building a weather app called `weatherApp.com`. Your frontend fetches weather data from an API hosted on `weatherAPI.com`. <span style="color: yellow">Now, since the app (frontend on `weatherApp.com`) and the API (backend on `weatherAPI.com`) are on different origins, making a request to the API from your app would be a cross-origin request.</span>

```ts
weatherApp.com --> weatherAPI.com     // they are different origin
```



### **1. Without CORS**:

最不安全的情况: 所有人都能看

<span style="color: red">If browsers didn't have the Same-Origin Policy (SOP) in place, any website could make a request to `weatherAPI.com` and read its data.</span> This would be problematic if `weatherAPI.com` also had personal user data or if reading from the API had cost implications.

### **2. With SOP but Without CORS**:

最安全的情况: block 所有人除了自己

With SOP, your web page on `weatherApp.com` can't read the response from `weatherAPI.com` because they're different origins. So, you're stuck. Even though `weatherAPI.com` is a public API, SOP won't allow you to read the response.

> To be more specific:
>
> 1. The browser sends the request to `weatherAPI.com`.
> 2. The server processes the request and sends back the response.
> 3. Before your JavaScript code can read the response, the browser checks if reading this response would violate the Same-Origin Policy.
> 4. If the origins don't match and there are no appropriate CORS headers in the response to indicate that the cross-origin request is allowed, the browser will block your JavaScript code from accessing the response.
>
> The response is technically received by the browser, but the content of the response is not made accessible to the JavaScript running on the page due to the SOP. The browser's console will typically show an error message indicating that the cross-origin request was blocked.
>
> you can ask GPT how to enforce to read the response 



### **3. Enter CORS**:

中间情况: 指定几个人不作block

CORS comes to the rescue. `weatherAPI.com` can add a response header like:

```
Access-Control-Allow-Origin: https://weatherApp.com
```
When your browser sees this header in the response from `weatherAPI.com`, it knows that the web page from `weatherApp.com` is allowed to read the data. If instead, the header was `Access-Control-Allow-Origin: *`, any web page (from any origin) would be allowed to read the data.

> Counter-example: 
>
> If the server (in this case, `weatherAPI.com`) doesn't specify the `Access-Control-Allow-Origin` header in its response, or if it specifies a value that doesn't match the origin of the requesting site (e.g., `weatherApp.com`), then the browser will assume that the server has not approved the cross-origin request.
>
> In such cases:
>
> 1. **The JavaScript Can't Read the Response**: While the browser does receive the response from `weatherAPI.com`, any JavaScript running on the page from `weatherApp.com` won't be able to read the response content. It's blocked due to the Same-Origin Policy (SOP).
>
> 2. **Browser Console Error**: The browser's developer console will display an error. This error typically looks something like:
>     ```
>     Access to XMLHttpRequest at 'https://weatherAPI.com/data' from origin 'https://weatherApp.com' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
>     ```
>
> 3. **Response Headers**: If you inspect the response in the Network tab of your browser's developer tools, you'll see that the `Access-Control-Allow-Origin` header is missing or doesn't match the origin of the requesting site.
>
> The key takeaway is that the absence of the correct `Access-Control-Allow-Origin` header (or other necessary CORS headers, depending on the type of request) results in the browser preventing the web page's JavaScript from accessing the response data. This is all part of the browser's security measures to protect users and their data.



## Why CORS Doesn't Defend Against CSRF:

**Scenario**:
Imagine you're logged into your online banking website `secureBank.com`. This bank site uses cookies to keep you authenticated.

Now, you visit a malicious website `evil.com` that tries to trick your browser into making a transaction on `secureBank.com` on your behalf, without you realizing it.

**Attack**:
A script on `evil.com` might try to make a POST request to `secureBank.com/transferMoney` (a hypothetical endpoint to transfer money). Because cookies are sent with every request to `secureBank.com`, even if initiated by `evil.com`, the request would include your authentication cookie.

**CORS Perspective**:
From a CORS standpoint, `evil.com` cannot read the response from `secureBank.com` due to the Same-Origin Policy. However, for CSRF attacks, the attacker doesn't care about reading the response. The damage is done simply by making the request. So, even if `secureBank.com` has proper CORS headers, it won't stop `evil.com` from initiating requests.

**CSRF Defense**:
To defend against CSRF, `secureBank.com` would typically use anti-CSRF tokens. Whenever you perform sensitive operations (like transferring money), the bank's site would require not just your cookie but also a unique anti-CSRF token (usually embedded in the form or request header) to be sent. Since `evil.com` can't read this token due to SOP, it can't make valid malicious requests.

<span style="color:red">In summary, while CORS determines who can read resources from a domain, it doesn't restrict who can send requests to it.</span> CSRF defenses, like anti-CSRF tokens, are needed to ensure that requests are intentionally made by the user and not forged by malicious sites.





# SOP vs. CORS

The Same-Origin Policy (SOP) and Cross-Origin Resource Sharing (CORS) are both web security mechanisms implemented in web browsers, and they're closely related. Here's how they interplay:

1. **Same-Origin Policy (SOP)**:
   - **Purpose**: The primary goal of SOP is to protect sensitive data on a web page from being accessed by malicious scripts running on another web page.
   - **How It Works**: By default, web pages from one origin cannot make certain types of requests (especially those using `XMLHttpRequest` or the Fetch API) to a different origin and read the response. This restriction ensures that, for instance, a script on a malicious website cannot make a request to a banking site and read sensitive account details.
   - **Origin**: In the context of SOP, an origin is determined by the scheme (http/https), the domain (example.com), and the port (80/443/other). If any of these differ between two URLs, they are considered to be of different origins.

2. **Cross-Origin Resource Sharing (CORS)**:
   - **Purpose**: While SOP is important for security, there are legitimate scenarios where a web page needs to access resources (like APIs) from a different origin. CORS is a mechanism that allows servers to specify who (i.e., which origins) can access their resources.
   - **How It Works**: A server specifies CORS permissions through HTTP headers. For example, the `Access-Control-Allow-Origin` header indicates which origin(s) are allowed to read the response. If a web page from an allowed origin tries to read the response, the browser will permit it; otherwise, the browser will block it.
   - **Preflight Requests**: For some types of requests, before making the actual request, the browser will send a preliminary "preflight" request using the HTTP `OPTIONS` method. This is to determine if the actual request is safe to send, based on the CORS rules set by the server.

**Relationship**:
- SOP and CORS work together. Think of SOP as the default restrictive state, blocking all cross-origin requests. CORS is the mechanism that servers can use to loosen those restrictions selectively.
- SOP acts as a wall preventing cross-origin requests, and CORS provides doors or windows in that wall, allowing specific requests to get through under specific conditions.
- Without SOP, there wouldn't be much need for CORS, because there wouldn't be any restrictions to relax or specify. Conversely, without CORS, the web would be a more siloed place, where pages couldn't easily interact with services and APIs hosted on different origins.

In summary, while SOP serves to protect users by restricting web pages from making requests to different origins, CORS provides a way for servers to define exceptions to these restrictions, allowing for controlled cross-origin interactions.