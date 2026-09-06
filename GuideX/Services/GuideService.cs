using GuideX.Data;
using GuideX.DTOs;
using GuideX.Repository;

namespace GuideX.Services
{
    public class GuideService
    {
        private readonly GuideRepository _repository;

        public GuideService(GuideRepository repository)
        {
            _repository = repository;
        }

        /// <summary>קורא ל-repository לשמירת מדריך עם קבצים.
        /// ממיר את קובצי ה-IFormFile ל-byte[] ולתגית סוג (Cv/Certificate).</summary>
        public async Task<int> AddGuideAsync(GuideUploadDto dto)
        {
            byte[]? resumeData = null;
            string? resumeName = null;
            string? resumeContentType = null;

            if (dto.ResumeFile is { Length: > 0 })
            {
                resumeData = await ReadFileAsync(dto.ResumeFile);
                resumeName = dto.ResumeFile.FileName;
                resumeContentType = dto.ResumeFile.ContentType;
            }

            var certificates = new List<(byte[] Data, string FileName, string ContentType)>();
            foreach (var cert in dto.CertificateFiles ?? new List<IFormFile>())
            {
                if (cert.Length <= 0) continue;
                certificates.Add((
                    await ReadFileAsync(cert),
                    cert.FileName,
                    cert.ContentType));
            }

            return await _repository.AddGuideAsync(
                dto.UserId,
                dto.ReligiousId,
                dto.AreasOfExpertise,
                resumeData,
                resumeName,
                resumeContentType,
                certificates);
        }

        public async Task<List<GuideResponseDto>> GetGuidesAsync()
        {
            var guides = await _repository.GetGuidesAsync();
            return guides.Select(ToResponse).ToList();
        }

        public async Task<GuideResponseDto?> GetGuideByUserIdAsync(int userId)
        {
            var guide = await _repository.GetGuideByUserIdAsync(userId);
            return guide == null ? null : ToResponse(guide);
        }

        public async Task<GuideFile?> GetGuideFileAsync(int guideFileId)
        {
            return await _repository.GetGuideFileAsync(guideFileId);
        }

        private static async Task<byte[]> ReadFileAsync(IFormFile file)
        {
            using var ms = new MemoryStream();
            await file.CopyToAsync(ms);
            return ms.ToArray();
        }

        private static GuideResponseDto ToResponse(Guide g)
        {
            var files = g.Files
                .Select(f => new GuideFileDto
                {
                    GuideFileId = f.GuideFileId,
                    FileName = f.FileName,
                    ContentType = f.ContentType,
                    Kind = f.Kind.ToString(),
                    Size = f.Data.Length
                })
                .ToList();

            return new GuideResponseDto
            {
                GuideId = g.GuideId,
                UserId = g.UserId,
                ReligiousId = g.ReligiousId,
                AreasOfExpertise = g.Areas.Select(a => a.AreaId).ToList(),
                Files = files,
                ResumeFile = files.FirstOrDefault(f => f.Kind == "Cv")
            };
        }
    }
}
