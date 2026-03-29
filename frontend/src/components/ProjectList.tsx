import { useEffect, useState } from 'react';
import type { Project } from '../types/Project';
import './ProjectList.css';
import { useNavigate } from 'react-router-dom';
import { fetchProjects } from '../api/ProjectsAPI';
import Pagination from './Pagination';

function ProjectList({ selectedCategories }: { selectedCategories: string[] }) {

  const [projects, setProjects] = useState<Project[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalProjects, setTotalProjects] = useState<number>(0);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const totalPages = Math.ceil(totalProjects / pageSize);

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedCategories]);

  useEffect(() => {
    const loadProjects = async () => {

      try {
        setLoading(true);
        const data = await fetchProjects(pageSize, currentPage, selectedCategories);
        setTotalProjects(data.totalProjects);
        setProjects(data.projects);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [pageSize, currentPage, selectedCategories]);

  if (loading) {
    return <div className="text-center my-5">Loading projects...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center my-5">Error: {error}</div>;
  }

  return (
    <div className="project-list">
    <div className="container mb-4">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {projects.map((project) => (
          <div className="col" key={project.projectId}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{project.projectName}</h5>
                <ul className="list-unstyled mb-0">
                  <li><strong>Type:</strong> {project.projectType}</li>
                  <li><strong>Regional Program:</strong> {project.projectRegionalProgram}</li>
                  <li><strong>Impact:</strong> {project.projectImpact} Individuals Served</li>
                  <li><strong>Phase:</strong> {project.projectPhase}</li>
                  <li><strong>Functionality Status:</strong> {project.projectFunctionalityStatus}</li>
                </ul>

                <button className="btn btn-donate" onClick={() => navigate(`/donate/${project.projectId}/${project.projectName}`)}>
                  Donate
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <Pagination currentPage={currentPage} totalPages={totalPages} pageSize={pageSize} onPageChange={setCurrentPage} onPageSizeChange={setPageSize} />

    </div>
  );
}

export default ProjectList;
