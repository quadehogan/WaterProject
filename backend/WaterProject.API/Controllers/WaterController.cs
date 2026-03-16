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
        public IEnumerable<Project> GetProjects()
        {
            var allProjects =  _waterContext.Projects.ToList();
            return allProjects;
        }
        
        [HttpGet("FunctionalProjects")]
        public IEnumerable<Project> GetFunctionalProjects()
        {
            var functionalProjects = _waterContext.Projects.Where(p => p.ProjectFunctionalityStatus == "Functional").ToList();
            return functionalProjects;
        }
    }
}

    