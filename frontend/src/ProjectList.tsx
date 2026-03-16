import { useEffect, useState } from 'react';
import type { Project } from './types/Project';

function ProjectList() {

  const [projects, setProjects] = useState<Project[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalProjects, setTotalProjects] = useState<number>(0);

  const totalPages = Math.ceil(totalProjects / pageSize);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(`https://localhost:4000/api/Water/AllProjects?pageSize=${pageSize}&pageNumber=${currentPage}`);
      const data = await response.json();
      setProjects(data.projects);
      setTotalProjects(data.totalProjects);
    };

    fetchProjects();
  }, [pageSize, currentPage]);

  return (
    <>
    <div className="container my-4">
      <h1 className="mb-4">Water Projects</h1>
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
    </>
  );
}

export default ProjectList;
