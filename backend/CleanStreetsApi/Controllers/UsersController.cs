using CleanStreetsApi.Models;
using CleanStreetsApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace CleanStreetsApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly UsersService _UsersService;

    public UsersController(UsersService UsersService) =>
        _UsersService = UsersService;

    [HttpGet]
    public async Task<List<User>> Get() =>
        await _UsersService.GetAsync();

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<User>> Get(string id)
    {
        var user = await _UsersService.GetAsync(id);

        if (user is null)
        {
            return NotFound();
        }

        return user;
    }

    [HttpPost]
    public async Task<IActionResult> Post(User newUser)
    {
        await _UsersService.CreateAsync(newUser);

        return CreatedAtAction(nameof(Get), new { id = newUser.Id }, newUser);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, User updatedUser)
    {
        var user = await _UsersService.GetAsync(id);

        if (user is null)
        {
            return NotFound();
        }

        updatedUser.Id = user.Id;

        await _UsersService.UpdateAsync(id, updatedUser);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var user = await _UsersService.GetAsync(id);

        if (user is null)
        {
            return NotFound();
        }

        await _UsersService.RemoveAsync(id);

        return NoContent();
    }
}