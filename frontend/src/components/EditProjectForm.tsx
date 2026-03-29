import { useState } from "react";
import type { Project } from "../types/Project";
import { updateProject } from "../api/ProjectsAPI";
import "./ProjectForm.css";

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

    return (
        <form className="project-form" onSubmit={handleSubmit}>
            <h2>Edit Project</h2>

            <div className="project-form__field">
                <label className="project-form__label">Project Name</label>
                <input className="project-form__input" name="projectName" value={formData.projectName} type="text" onChange={handleChange} />
            </div>

            <div className="project-form__field">
                <label className="project-form__label">Project Type</label>
                <input className="project-form__input" name="projectType" value={formData.projectType} type="text" onChange={handleChange} />
            </div>

            <div className="project-form__field">
                <label className="project-form__label">Regional Program</label>
                <input className="project-form__input" name="projectRegionalProgram" value={formData.projectRegionalProgram} type="text" onChange={handleChange} />
            </div>

            <div className="project-form__field">
                <label className="project-form__label">Impact (Individuals Served)</label>
                <input className="project-form__input" name="projectImpact" value={formData.projectImpact} type="number" onChange={handleChange} />
            </div>

            <div className="project-form__field">
                <label className="project-form__label">Phase</label>
                <input className="project-form__input" name="projectPhase" value={formData.projectPhase} type="text" onChange={handleChange} />
            </div>

            <div className="project-form__field">
                <label className="project-form__label">Functionality Status</label>
                <input className="project-form__input" name="projectFunctionalityStatus" value={formData.projectFunctionalityStatus} type="text" onChange={handleChange} />
            </div>

            <div className="project-form__actions">
                <button className="project-form__btn--submit" type="submit">Update Project</button>
                <button className="project-form__btn--cancel" type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
};

export default EditProjectForm;
