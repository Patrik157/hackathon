using CleanStreetsApi.Models;
using CleanStreetsApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace CleanStreetsApi.Controllers;

[Authorize]
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

    /*[HttpGet("{id:length(24)}")]
    public async Task<ActionResult<User>> Get(string id)
    {
        var user = await _UsersService.GetAsync(id);

        if (user is null)
        {
            return NotFound();
        }

        return user;
    }*/
    [HttpGet("{email}")]
    public async Task<ActionResult<User>> GetRole(string email)
    {
        var user = await _UsersService.GetRoleAsync(email);

        if (user is null)
        {
            return NotFound();
        }

        return user;
    }
    /*
    [AllowAnonymous]
    [Route("heatmap")]
    [HttpGet]
    public List<mapCords> GenerateHeatmap()=>
        _UsersService.GenerateHeatMap();*/
    

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
    [AllowAnonymous]
    [Route("register")]
    [HttpPost]
    public async Task<IActionResult> Register(User newUser){   //0= success, 1 = emailtaken, 2 = username taken,3= password is too short, 4= username too short
        int exists = await _UsersService.Register(newUser);

        switch(exists){
            case 1:
                return BadRequest("Email already in use!");
            case 2:
                return BadRequest("Username is taken!");
            case 3:
                return BadRequest("Password is too short!");
            case 4: 
                return BadRequest("Username must be longer than 2 letters!");
            
        }   
        return Ok(new{newUser});
    }

    [AllowAnonymous]
    [Route("confirm/{GUID}")]
    [HttpPost]
    public async Task<IActionResult> Confirm(string GUID){
        var res = await _UsersService.Confirm(GUID);
        if(res == 1)
            return Ok();
        return BadRequest("Krivo uneseni sigurnosni PIN!");
    }

    [AllowAnonymous]
    [Route("login")]
    [HttpPost]
    public async Task<IActionResult> Login(User user){
        user.username = "username";     
        var (token, fuser) = await _UsersService.Authenticate(user.email, user.password);
    
        if(fuser is null)
            return BadRequest("User not found");
        if(!fuser.confirmed)
            return BadRequest("Email not confirmed");  
        if(token is null)
            return Unauthorized();

        return Ok(token);
    }
}