using System.IO.Compression;
using System.Text;

namespace RajApi.Helpers
{
    public static class Utility
    {
        public static string Base64ToFile(string base64, string folderPath)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(base64))
                    return string.Empty;

                if (base64.Length > 100)
                {
                    // Remove data URI prefix if present// Example: "data:image/png;base64,AAAA...
                    var rawData = base64.Split(',');
                    var extension = rawData[0].Split('/')[1].Split(';')[0];

                    if (!Directory.Exists(folderPath))
                    {
                        Directory.CreateDirectory(folderPath);
                    }

                    var uniqueFileName = $"{Guid.NewGuid():N}.{extension}";
                    var fullPath = Path.Combine(folderPath, uniqueFileName);

                    // Decode base64 and save
                    var base64Data = rawData[1]; // Remove data URL prefix
                    var fileBytes = Convert.FromBase64String(base64Data);

                    File.WriteAllBytes(fullPath, fileBytes);
                    Console.WriteLine($"File saved successfully to {folderPath}");
                    return uniqueFileName;
                }
                else //if we recive file name only
                {
                    return base64;
                }

            }
            catch (FormatException ex)
            {
                Console.WriteLine($"Invalid Base64 string: {ex.Message}");
                throw;
            }
            catch (IOException ex)
            {
                Console.WriteLine($"File write error: {ex.Message}");
                throw;
            }
        }

    }
}
