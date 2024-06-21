using Jagoda.Server.Data;
using Jagoda.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Jagoda.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TravelPackagesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TravelPackagesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TravelPackage>>> GetTravelPackages()
        {
            return await _context.TravelPackages.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TravelPackage>> GetTravelPackage(int id)
        {
            var travelPackage = await _context.TravelPackages.FindAsync(id);

            if (travelPackage == null)
            {
                return NotFound();
            }

            return travelPackage;
        }

        [HttpPost]
        public async Task<ActionResult<TravelPackage>> CreateTravelPackage([FromBody] TravelPackage travelPackage)
        {
            _context.TravelPackages.Add(travelPackage);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTravelPackage), new { id = travelPackage.Id }, travelPackage);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTravelPackage(int id, [FromBody] TravelPackage travelPackage)
        {
            if (id != travelPackage.Id)
            {
                return BadRequest();
            }

            _context.Entry(travelPackage).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TravelPackageExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTravelPackage(int id)
        {
            var travelPackage = await _context.TravelPackages.FindAsync(id);
            if (travelPackage == null)
            {
                return NotFound();
            }

            _context.TravelPackages.Remove(travelPackage);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TravelPackageExists(int id)
        {
            return _context.TravelPackages.Any(e => e.Id == id);
        }
    }
}
