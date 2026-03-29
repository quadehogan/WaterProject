import type { Project } from "../types/Project";

interface FetchProjectsResponse {
    projects: Project[];
    totalProjects: number;
}

export const fetchProjects = async (
    pageSize: number,
    pageNumber: number,
    selectedCategories: string[]
): Promise<FetchProjectsResponse> => {
    try {
    const categoryParams = selectedCategories.map(cat => `categories=${encodeURIComponent(cat)}`).join('&');

    const response = await fetch(`https://localhost:4000/api/Water/AllProjects?pageSize=${pageSize}&pageNumber=${pageNumber}${selectedCategories.length ? `&${categoryParams}` : ''}`);

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