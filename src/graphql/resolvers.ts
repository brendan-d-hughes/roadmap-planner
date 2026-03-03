import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    getProjects: async () => {
      return prisma.project.findMany({
        include: { tasks: true, resources: true },
      });
    },
    getProject: async (_: any, { id }: { id: string }) => {
      return prisma.project.findUnique({
        where: { id },
        include: { tasks: true, resources: true },
      });
    },
    getTasks: async (_: any, { projectId }: { projectId: string }) => {
      return prisma.task.findMany({
        where: { projectId },
        include: { resource: true },
      });
    },
    getResources: async (_: any, { projectId }: { projectId: string }) => {
      return prisma.resource.findMany({
        where: { projectId },
        include: { tasks: true },
      });
    },
  },
  Mutation: {
    createProject: async (_: any, { title }: { title: string }) => {
      return prisma.project.create({
        data: { title },
        include: { tasks: true, resources: true },
      });
    },
    createResource: async (_: any, { projectId, name, ptoDates }: { projectId: string, name: string, ptoDates?: string }) => {
      return prisma.resource.create({
        data: {
          name,
          projectId,
          ptoDates: ptoDates || "[]",
        },
      });
    },
    createTask: async (_: any, args: any) => {
      const { projectId, resourceId, plannedStartDate, plannedEndDate, ...rest } = args;
      
      const data: any = {
        ...rest,
        project: { connect: { id: projectId } },
      };

      if (resourceId) {
        data.resource = { connect: { id: resourceId } };
      }

      if (plannedStartDate) {
        data.plannedStartDate = new Date(plannedStartDate);
      }
      if (plannedEndDate) {
        data.plannedEndDate = new Date(plannedEndDate);
      }

      return prisma.task.create({
        data,
        include: { resource: true },
      });
    },
  },
  Project: {
    createdAt: (parent: any) => parent.createdAt.toISOString(),
  },
  Task: {
    plannedStartDate: (parent: any) => parent.plannedStartDate?.toISOString(),
    plannedEndDate: (parent: any) => parent.plannedEndDate?.toISOString(),
    actualStartDate: (parent: any) => parent.actualStartDate?.toISOString(),
    actualEndDate: (parent: any) => parent.actualEndDate?.toISOString(),
  },
};
