import type { Project } from "../types/Project";

interface FetchProjectsResponse {
    projects: Project[];
    totalProjects: number;
}

const API_BASE_URL = 'https://localhost:4000/api/Water';

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