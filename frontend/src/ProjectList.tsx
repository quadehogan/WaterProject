import { useEffect, useState } from 'react';
import type { Project } from './types/Project';

function ProjectList() {

  const[projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
        const response = await fetch('https://localhost:4000/api/Water/AllProjects');
        const data = await response.json();
        setProjects(data);
    };

    fetchProjects();
  }, []);

  return (
    <>
        <h1>Water Projects</h1>
        <br />
        {projects.map((project) => (
            <div id='projectCard' key={project.projectId}>
                <h2>{project.projectName}</h2>
                <ul>
                    <li>Type: {project.projectType}</li>
                    <li>Regional Program: {project.projectRegionalProgram}</li>
                    <li>Impact: {project.projectImpact} Individuals Served</li>
                    <li>Phase: {project.projectPhase}</li>
                    <li>Functionality Status: {project.projectFunctionallityStatus}</li>
                </ul>
            </div>
        ))}
    </>
  );
}

export default ProjectList;
