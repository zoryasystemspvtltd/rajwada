using System.IO.Compression;
using System.Text;

namespace RajApi.Helpers
{
    public static class ZipUtility
    {
        public static byte[] Compress(string text)
        {
            if (string.IsNullOrEmpty(text))
                return Array.Empty<byte>();

            var bytes = Encoding.UTF8.GetBytes(text);

            using var output = new MemoryStream();
            using (var gzip = new GZipStream(output, CompressionLevel.Optimal))
            {
                gzip.Write(bytes, 0, bytes.Length);
            }

            return output.ToArray();
        }

        public static string Decompress(byte[] compressedData)
        {
            if (compressedData == null || compressedData.Length == 0)
                return string.Empty;

            using var input = new MemoryStream(compressedData);
            using var gzip = new GZipStream(input, CompressionMode.Decompress);
            using var reader = new StreamReader(gzip, Encoding.UTF8);

            return reader.ReadToEnd();
        }
        public static string CompressToBase64(string text)
        {
            var compressedBytes = Compress(text);
            return Convert.ToBase64String(compressedBytes);
        }
        public static string DecompressFromBase64(string base64)
        {
            var bytes = Convert.FromBase64String(base64);
            return Decompress(bytes);
        }

        public static byte[] Base64ToVarbinary(string base64)
        {
            if (string.IsNullOrWhiteSpace(base64))
                return Array.Empty<byte>();

            // Remove data URI prefix if present// Example: "data:image/png;base64,AAAA...
            var commaIndex = base64.IndexOf(',');
            if (commaIndex >= 0)
                base64 = base64.Substring(commaIndex + 1);

            return Convert.FromBase64String(base64);
        }

        public static string VarbinaryToBase64(byte[] data)
        {
            if (data == null || data.Length == 0)
                return string.Empty;

            return Convert.ToBase64String(data);
        }
    }
}
