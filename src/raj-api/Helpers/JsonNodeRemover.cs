using System.Text.Json;
using System.Text.Json.Nodes;

namespace RajApi.Helpers
{
    public static class JsonNodeRemover
    {
        public static string RemoveNode(string json, string nodeName)
        {
            if (string.IsNullOrWhiteSpace(json) || string.IsNullOrWhiteSpace(nodeName))
                return json;

            JsonNode root = JsonNode.Parse(json);
            RemoveRecursive(root, nodeName);

            return root.ToJsonString(new JsonSerializerOptions
            {
                WriteIndented = false
            });
        }

        private static void RemoveRecursive(JsonNode node, string nodeName)
        {
            if (node is JsonObject obj)
            {
                // Remove matching properties at this level
                var keysToRemove = obj
                    .Where(kvp => kvp.Key.Equals(nodeName, StringComparison.OrdinalIgnoreCase))
                    .Select(kvp => kvp.Key)
                    .ToList();

                foreach (var key in keysToRemove)
                    obj.Remove(key);

                // Recurse into remaining properties
                foreach (var property in obj)
                    RemoveRecursive(property.Value, nodeName);
            }
            else if (node is JsonArray array)
            {
                foreach (var item in array)
                    RemoveRecursive(item, nodeName);
            }
        }

    }
}
