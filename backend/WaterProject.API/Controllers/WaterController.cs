using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using WaterProject.API.Data;

namespace WaterProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WaterController : ControllerBase
    {
        private WaterDbContext _waterContext;
        
        public WaterController(WaterDbContext context)
        {
            _waterContext = context;
        }
        
        [HttpGet("AllProjects")]
        public IActionResult GetProjects(int pageSize = 10, int pageNumber = 0, [FromQuery] List<string>? categories = null)
        {
            var query = _waterContext.Projects.AsQueryable();

            if (categories != null && categories.Any())
            {
                query = query.Where(project => categories.Contains(project.ProjectType));
            }
            
            var skipCalc = pageNumber * pageSize;
            var allProjects = query
                .Skip(skipCalc)
                .Take(pageSize)
                .ToList();

            var totalNumProjects = query.Count();

            return Ok(new
            {
                Projects = allProjects,
                totalProjects = totalNumProjects
            });
        }
        
        [HttpGet("GetProjectTypes")]
        public IActionResult GetProjectTypes()
        {
            var projectTypes = _waterContext.Projects
                .Select(p => p.ProjectType)
                .Distinct()
                .ToList();
            
            return Ok(projectTypes);
        }

        [HttpPost("AddProject")]
        public IActionResult AddProject([FromBody] Project newProject)
        {
            _waterContext.Projects.Add(newProject);
            _waterContext.SaveChanges();

            return Ok(newProject);
        }

    [HttpPut("UpdateProject/{id}")]
    public IActionResult UpdateProject(int id, [FromBody] Project updatedProject)
    {
        var existingProject = _waterContext.Projects.Find(id);
        if (existingProject == null)
        {
            return NotFound();
        }

        existingProject.ProjectName = updatedProject.ProjectName;
        existingProject.ProjectType = updatedProject.ProjectType;
        existingProject.ProjectRegionalProgram = updatedProject.ProjectRegionalProgram;
        existingProject.ProjectRegionalProgram = updatedProject.ProjectRegionalProgram;
        existingProject.ProjectImpact = updatedProject.ProjectImpact;
        existingProject.ProjectPhase = updatedProject.ProjectPhase;
        existingProject.ProjectFunctionalityStatus = updatedProject.ProjectFunctionalityStatus;

        _waterContext.Projects.Update(existingProject);
        _waterContext.SaveChanges();

        return Ok(existingProject);
    }

    [HttpDelete("DeleteProject/{id}")]
    public IActionResult DeleteProject(int id)
    {
        var existingProject = _waterContext.Projects.Find(id);
        if (existingProject == null)
        {
            return NotFound();
        }

        _waterContext.Projects.Remove(existingProject);
        _waterContext.SaveChanges();

        return NoContent();
    }
}
}

    