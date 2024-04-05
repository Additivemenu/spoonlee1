Doc: https://docs.nestjs.com/graphql/quick-start





# Qucick start

https://docs.nestjs.com/graphql/quick-start



Read https://www.apollographql.com/blog/graphql-vs-rest for quick understanding of GraphQL



reosurces in REST & in GraphQL

> We’ve identified some similarities and differences already:
>
> - **Similar:** Both have the idea of a resource, and can specify IDs for those resources.
> - **Similar:** Both can be fetched via an HTTP GET request with a URL.
> - **Similar:** Both can return JSON data in the request.
> - **Different:** In REST, the endpoint you call is the identity of that object. In GraphQL, the identity is separate from how you fetch it.
> - **Different:** In REST, the shape and size of the resource is determined by the server. In GraphQL, the server declares what resources are available, and the client asks for what it needs at the time.

In GraphQL, as we covered above, you don’t use URLs to identify what is available in the API. Instead, you use a GraphQL schema:



URL routes(REST) vs. GraphQL schema

> In REST, the space of accessible data is described as a linear list of endpoints, and in GraphQL it’s a schema with relationships.
>
> - **Similar:** The list of endpoints in a REST API is similar to the list of fields on the `Query` and `Mutation` types in a GraphQL API. They are both the entry points into the data.
> - **Similar:** Both have a way to differentiate if an API request is meant to read data or write it.
> - **Different:** In GraphQL, you can traverse from the entry point to related data, following relationships defined in the schema, in a single request. In REST, you have to call multiple endpoints to fetch related resources.
> - **Different:** In GraphQL, there’s no difference between the fields on the `Query` type and the fields on any other type, except that only the query type is accessible at the root of a query. For example, you can have arguments in any field in a query. In REST, there’s no first-class concept of a nested URL.
> - **Different:** In REST, you specify a write by changing the HTTP verb from `GET` to something else like `POST`. In GraphQL, you change a keyword in the query.



Route handlers(REST) vs. resolvers(GraphQL) 

> At the end of the day, both REST and GraphQL APIs are just fancy ways to call functions over a network. If you’re familiar with building a REST API, implementing a GraphQL API won’t feel too different. But GraphQL has a big leg up because it lets you call several related functions without multiple roundtrips.
>
> - **Similar:** Endpoints in REST and fields in GraphQL both end up calling functions on the server.
> - **Similar:** Both REST and GraphQL usually rely on frameworks and libraries to handle the nitty-gritty networking boilerplate.
> - **Different:** In REST, each request usually calls exactly one route handler function. In GraphQL, one query can call many resolvers to construct a nested response with multiple resources.
> - **Different:** In REST, you construct the shape of the response yourself. In GraphQL, the shape of the response is built up by the GraphQL execution library to match the shape of the query.
>
> Essentially, you can think of GraphQL as a system for calling many nested endpoints in one request. Almost like a multiplexed REST.