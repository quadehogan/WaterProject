import type { Project } from "../types/Project";

interface FetchProjectsResponse {
    projects: Project[];
    totalProjects: number;
}

const API_BASE_URL = 'https://waterproject-quade-backend-ftf5apbkfnfnddhg.westus2-01.azurewebsites.net/api/Water';

export const fetchProjects = async (
    pageSize: number,
    pageNumber: number,
    selectedCategories: string[]
): Promise<FetchProjectsResponse> => {
    try {
    const categoryParams = selectedCategories.map(cat => `categories=${encodeURIComponent(cat)}`).join('&');

    const response = await fetch(`${API_BASE_URL}/AllProjects?pageSize=${pageSize}&pageNumber=${pageNumber}${selectedCategories.length ? `&${categoryParams}` : ''}`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;

    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
}

export const addProject = async (newProject: Project): Promise<Project> => {
    try {
        const response = await fetch(`${API_BASE_URL}/AddProject`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProject)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding project:', error);
        throw error;
    }
}

export const updateProject = async (projectId: number, updatedProject: Project): Promise<Project> => {
    try {
        const response = await fetch(`${API_BASE_URL}/UpdateProject/${projectId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProject)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating project:', error);
        throw error;
    }
}

export const deleteProject = async (projectId: number): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}/DeleteProject/${projectId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error deleting project:', error);
        throw error;
    }
}