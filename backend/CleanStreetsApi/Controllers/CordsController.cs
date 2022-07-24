using CleanStreetsApi.Models;
using CleanStreetsApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace CleanStreetsApi.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class cordsController : ControllerBase
{
    private readonly cordsService _cordsService;

    public cordsController(cordsService cordsService) =>
        _cordsService = cordsService;

    [HttpGet]
    public async Task<List<mapCords>> Get() =>
        await _cordsService.GetcordsAsync();

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<mapCords>> Get(string id)
    {
        var cord = await _cordsService.GetcordsAsync(id);

        if (cord is null)
        {
            return NotFound();
        }

        return cord;
    }
    /*
    [AllowAnonymous]
    [Route("heatmap")]
    [HttpGet]
    public List<mapcords> GenerateHeatmap()=>
        _cordsService.GenerateHeatMap();*/
    
    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> Post(mapCords newcord)
    {
        await _cordsService.CreatecordsAsync(newcord);

        return CreatedAtAction(nameof(Get), new { id = newcord.Id }, newcord);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, mapCords updatedcord)
    {
        var cord = await _cordsService.GetcordsAsync(id);

        if (cord is null)
        {
            return NotFound();
        }

        updatedcord.Id = cord.Id;

        await _cordsService.UpdatecordsAsync(id, updatedcord);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var cord = await _cordsService.GetcordsAsync(id);

        if (cord is null)
        {
            return NotFound();
        }

        await _cordsService.RemovecordsAsync(id);

        return NoContent();
    }

}