import { useState } from "react";
import type { Project } from "../types/Project";
import { updateProject } from "../api/ProjectsAPI";

interface EditProjectFormProps {
    project: Project;
    onSuccess: () => void;
    onCancel: () => void;
}

const EditProjectForm = ({ project, onSuccess, onCancel }: EditProjectFormProps) => {
    const [formData, setFormData] = useState<Project>({...project});  

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateProject(formData.projectId, formData);
        onSuccess();
    };

    return(
        <form onSubmit={handleSubmit}>
            <h2>Add New Project</h2>

            <label>Project Name:
                <input 
                name="projectName" 
                value={formData.projectName} 
                type="text" 
                onChange={handleChange} />
            </label>

            <label>Project Type:
                <input 
                name="projectType" 
                value={formData.projectType} 
                type="text" 
                onChange={handleChange} />
            </label>

            <label>Regional Program:
                <input 
                name="projectRegionalProgram" 
                value={formData.projectRegionalProgram} 
                type="text" 
                onChange={handleChange} />
            </label>

            <label>Impact (Individuals Served):
                <input 
                name="projectImpact" 
                value={formData.projectImpact} 
                type="number" 
                onChange={handleChange} />
            </label>

            <label>Phase:
                <input 
                name="projectPhase" 
                value={formData.projectPhase} 
                type="text" 
                onChange={handleChange} />
            </label>

            <label>Functionality Status:
                <input 
                name="projectFunctionalityStatus" 
                value={formData.projectFunctionalityStatus} 
                type="text" 
                onChange={handleChange} />
            </label>

            <button type="submit">Update Project</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default EditProjectForm;