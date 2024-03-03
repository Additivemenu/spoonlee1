const { buildSchema } = require("graphql");

module.export = buildSchema(`
    type TestData{
        text: String!
        view: Int!
    }
    
    type RootQuery {
        hello: TestData!
    }

    schema{
        query: RootQuery
    }
`);
