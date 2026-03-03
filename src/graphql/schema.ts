export const typeDefs = `#graphql
  type Project {
    id: ID!
    title: String!
    createdAt: String!
    tasks: [Task!]!
    resources: [Resource!]!
  }

  type Task {
    id: ID!
    issueKey: String!
    summary: String!
    status: String!
    workState: String
    sizeEstimate: Int
    plannedStartDate: String
    plannedEndDate: String
    actualStartDate: String
    actualEndDate: String
    project: Project!
    resource: Resource
  }

  type Resource {
    id: ID!
    name: String!
    ptoDates: String
    project: Project!
    tasks: [Task!]!
  }

  type Query {
    getProjects: [Project!]!
    getProject(id: ID!): Project
    getTasks(projectId: ID!): [Task!]!
    getResources(projectId: ID!): [Resource!]!
  }

  type Mutation {
    createProject(title: String!): Project!
    createResource(projectId: ID!, name: String!, ptoDates: String): Resource!
    createTask(
      projectId: ID!,
      issueKey: String!,
      summary: String!,
      status: String!,
      sizeEstimate: Int,
      plannedStartDate: String,
      plannedEndDate: String,
      resourceId: ID
    ): Task!
  }
`;
