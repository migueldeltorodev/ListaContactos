using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ListaContactos.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace ListaContactos.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactoController : ControllerBase
    {
        private readonly DbcontactosContext _dbcontactosContext;

        public ContactoController(DbcontactosContext dbcontactosContext)
        {
            _dbcontactosContext = dbcontactosContext;
        }

        [HttpGet]
        [Route("lista")]
        public async Task<IActionResult> Lista()
        {
            List<Contacto> lista = await _dbcontactosContext.Contactos.OrderByDescending(c => c.IdContacto).ToListAsync();
            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpPost]
        [Route("guardar")]
        public async Task<IActionResult> Guardar([FromBody] Contacto request)
        {
            await _dbcontactosContext.Contactos.AddAsync(request);
            await _dbcontactosContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        [HttpPut]
        [Route("editar")]
        public async Task<IActionResult> Editar([FromBody] Contacto request)
        {
            _dbcontactosContext.Contactos.Update(request);
            await _dbcontactosContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        [HttpDelete]
        [Route("eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            Contacto contacto = _dbcontactosContext.Contactos.Find(id);

            _dbcontactosContext.Contactos.Remove(contacto);
            await _dbcontactosContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "OK");
        }
    }
}
