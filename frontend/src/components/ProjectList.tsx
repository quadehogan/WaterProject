import { useEffect, useState } from 'react';
import type { Project } from '../types/Project';
import './ProjectList.css';
import { useNavigate } from 'react-router-dom';
import { fetchProjects } from '../api/ProjectsAPI';

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
                  <li><strong>Functionality Status:</strong> {project.projectFunctionallityStatus}</li>
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

    <div className="container d-flex align-items-center gap-2 my-3 flex-wrap">
      <button
        className="btn btn-outline-primary"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 0}
      >
        &laquo; Previous
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={`btn ${i === currentPage ? 'btn-primary' : 'btn-outline-secondary'}`}
          onClick={() => setCurrentPage(i)}
        >
          {i + 1}
        </button>
      ))}

      <button
        className="btn btn-outline-primary"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
      >
        Next &raquo;
      </button>

      <label className="d-flex align-items-center gap-2 ms-auto mb-0">
        Results per page:
        <select
          className="form-select form-select-sm w-auto"
          value={pageSize}
          onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(0); }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </div>
    </div>
  );
}

export default ProjectList;
