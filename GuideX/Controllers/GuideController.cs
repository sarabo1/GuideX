using GuideX.DTOs;
using GuideX.Services;
using Microsoft.AspNetCore.Mvc;

namespace GuideX.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GuideController : ControllerBase
    {
        private readonly GuideService _guideService;

        public GuideController(GuideService guideService)
        {
            _guideService = guideService;
        }

        /// <summary>POST /api/Guide — מקבל מדריך + קורות חיים + תעודות (multipart/form-data)
        /// ושומר ל-DB. מחזיר 201 עם מזהה המדריך החדש.</summary>
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> AddGuide([FromForm] GuideUploadDto dto)
        {
            if (dto is null || dto.UserId <= 0)
            {
                return BadRequest(new { message = "פרטי המדריך אינם תקינים" });
            }

            try
            {
                var guideId = await _guideService.AddGuideAsync(dto);
                return CreatedAtAction(nameof(GetGuideById), new { id = guideId }, new { guideId });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, new { message = "שגיאה בשמירת המדריך" });
            }
        }

        /// <summary>GET /api/Guide — מחזיר את כל המדריכים (כולל מטא-הקבצים).</summary>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var guides = await _guideService.GetGuidesAsync();
            return Ok(guides);
        }

        /// <summary>GET /api/Guide/{id} — מחזיר מדריך לפי מזהה.</summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetGuideById(int id)
        {
            // נעשה שימוש ב-repository דרך ה-GET הכללי פשוט: נשלוף מכל המדריכים.
            var all = await _guideService.GetGuidesAsync();
            var guide = all.FirstOrDefault(g => g.GuideId == id);
            return guide == null ? NotFound() : Ok(guide);
        }

        /// <summary>GET /api/Guide/byuser/{userId} — מחזיר מדריך לפי זיהוי המשתמש.</summary>
        [HttpGet("byuser/{userId}")]
        public async Task<IActionResult> GetGuideByUserId(int userId)
        {
            var guide = await _guideService.GetGuideByUserIdAsync(userId);
            return guide == null ? NotFound() : Ok(guide);
        }

        /// <summary>GET /api/Guide/file/{guideFileId} — מחזיר את תוכן הקובץ
        /// (byte[]) עם סוג התוכן הנכון — לפתיחה/הורדה.</summary>
        [HttpGet("file/{guideFileId}")]
        public async Task<IActionResult> GetFile(int guideFileId)
        {
            var file = await _guideService.GetGuideFileAsync(guideFileId);
            if (file == null)
            {
                return NotFound();
            }

            var fileName = Uri.EscapeDataString(file.FileName);
            return File(file.Data, file.ContentType, file.FileName);
        }
    }
}
