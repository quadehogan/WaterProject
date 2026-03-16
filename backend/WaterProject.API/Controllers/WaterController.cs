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
        public IActionResult GetProjects(int pageSize = 10, int pageNumber = 0)
        {
            var skipCalc = pageNumber * pageSize;
            var allProjects =  _waterContext.Projects
                .Skip(skipCalc)
                .Take(pageSize)    
                .ToList();
            
            var totalNumProjects = _waterContext.Projects.Count();

            return Ok(new
            {
                Projects = allProjects,
                totalProjects = totalNumProjects
            });

        }
        
        [HttpGet("FunctionalProjects")]
        public IEnumerable<Project> GetFunctionalProjects()
        {
            var functionalProjects = _waterContext.Projects.Where(p => p.ProjectFunctionalityStatus == "Functional").ToList();
            return functionalProjects;
        }
    }
}

    