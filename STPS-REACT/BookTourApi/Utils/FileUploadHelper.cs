using Microsoft.AspNetCore.Http;

namespace BookTourApi.Utils
{
    public static class FileUploadHelper
    {
        public static async Task<string?> UploadImageAsync(IFormFile? file, string uploadsFolder = "")
        {
            if (file == null || file.Length == 0)
                return null;

            if (!string.IsNullOrEmpty(uploadsFolder) && !Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var fileName = $"{Guid.NewGuid()}-{Path.GetExtension(file.FileName)}";
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Return the relative path to be stored in DB
            return $"/uploads/{fileName}";
        }
    }
}