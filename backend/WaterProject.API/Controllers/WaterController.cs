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
    }
}

    