"use client";

import { gql, useQuery, useMutation } from "@apollo/client";
import { useState } from "react";

const GET_PROJECTS = gql`
  query GetProjects {
    getProjects {
      id
      title
      createdAt
    }
  }
`;

const CREATE_PROJECT = gql`
  mutation CreateProject($title: String!) {
    createProject(title: $title) {
      id
      title
      createdAt
    }
  }
`;

export default function Home() {
  const { data, loading, error, refetch } = useQuery(GET_PROJECTS);
  const [createProject, { loading: creating }] = useMutation(CREATE_PROJECT, {
    onCompleted: () => refetch(),
  });
  
  const [newTitle, setNewTitle] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    await createProject({ variables: { title: newTitle } });
    setNewTitle("");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6">Roadmap Projects</h1>

      <form onSubmit={handleCreate} className="mb-8 flex gap-2">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New Project Title"
          className="border p-2 rounded flex-1 dark:bg-zinc-800 dark:border-zinc-700"
        />
        <button
          type="submit"
          disabled={creating}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {creating ? "Creating..." : "Create Project"}
        </button>
      </form>

      {loading && <p>Loading projects...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}

      {!loading && !error && data?.getProjects.length === 0 && (
        <p className="text-zinc-500">No projects found. Create one above.</p>
      )}

      <ul className="space-y-4">
        {data?.getProjects.map((project: any) => (
          <li key={project.id} className="p-4 border rounded shadow-sm dark:border-zinc-700">
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <p className="text-sm text-zinc-500">
              Created: {new Date(project.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
