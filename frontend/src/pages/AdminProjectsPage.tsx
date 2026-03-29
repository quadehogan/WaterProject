import { useEffect, useState } from "react";

import type { Project } from "../types/Project";
import { deleteProject, fetchProjects } from "../api/ProjectsAPI";
import Pagination from "../components/Pagination";
import "./AdminProjectsPage.css";
import NewProjectForm from "../components/NewProjectForm";
import EditProjectForm from "../components/EditProjectForm";


const AdminProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalProjects, setTotalProjects] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const totalPages = Math.ceil(totalProjects / pageSize);

  useEffect(() => {
    setCurrentPage(0);
  }, []);

  useEffect(() => {
    const loadProjects = async () => {
        try {
            const data = await fetchProjects(pageSize, currentPage, []);
            setTotalProjects(data.totalProjects);
            setProjects(data.projects);
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    }

    loadProjects();

  }, [pageSize, currentPage]);

  const handleDelete = async (projectId: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;

    try {
        await deleteProject(projectId);
        setProjects(prev => prev.filter(p => p.projectId !== projectId));
    } catch (error) {
        setError((error as Error).message);
    }
  };

  if (loading) {
    return <div className="text-center my-5">Loading projects...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center my-5">Error: {error}</div>;
  }

  return (
    <div className="admin-projects">
        <h1>Admin Projects</h1>

        {!showForm && (
            <button
                className="admin-projects__btn admin-projects__btn--new"
                onClick={() => setShowForm(true)}
            >
                New Project
            </button>
        )}

        {showForm && (
            <NewProjectForm 
            onSuccess={() => {
                setShowForm(false); 
                fetchProjects(pageSize, currentPage, []).then((data) => setProjects(data.projects)
            );
            }}
            onCancel={() => setShowForm(false)} 
            />
        )}

        {editingProject && (
            <EditProjectForm 
            project={editingProject}
            onSuccess={() => {
                setEditingProject(null);
                fetchProjects(pageSize, currentPage, []).then((data) => setProjects(data.projects));
            }}
            onCancel={() => setEditingProject(null)} 
            />
        )}

        <div className="admin-projects__table-wrapper">
            <table className="admin-projects__table">
                <thead>
                    <tr>
                        {["Project ID", "Name", "Type", "Regional Program", "Impact", "Phase", "Status", "Actions"].map((col) => (
                            <th key={col}>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project.projectId}>
                            <td className="id">{project.projectId}</td>
                            <td className="name">{project.projectName}</td>
                            <td>{project.projectType}</td>
                            <td>{project.projectRegionalProgram}</td>
                            <td>{project.projectImpact}</td>
                            <td>{project.projectPhase}</td>
                            <td>{project.projectFunctionalityStatus}</td>
                            <td className="actions">
                                <button
                                    className="admin-projects__btn admin-projects__btn--edit"
                                    onClick={() => setEditingProject(project)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="admin-projects__btn admin-projects__btn--delete"
                                    onClick={() => handleDelete(project.projectId)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} pageSize={pageSize} onPageChange={setCurrentPage} onPageSizeChange={setPageSize} />

    </div>
  );

};



export default AdminProjectsPage;