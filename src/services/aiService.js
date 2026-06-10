export const getEstimate = async (
  description
) => {
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            import.meta.env.VITE_OPENAI_API_KEY
          }`,
        },

        body: JSON.stringify({
          model: "gpt-4o-mini",

          messages: [
            {
              role: "system",
              content: `
You are a handyman assistant.

Analyze the request.

Return ONLY valid JSON.

{
  "category":"",
  "complexity":"",
  "duration":"",
  "priceRange":""
}
`,
            },

            {
              role: "user",
              content: description,
            },
          ],

          temperature: 0.3,
        }),
      }
    );

    const data = await response.json();

    const content =
      data.choices[0].message.content;

    return JSON.parse(content);
  } catch (error) {
    console.error(error);

    return {
      category: "Unknown",
      complexity: "Unknown",
      duration: "Unknown",
      priceRange: "Manual Review Required",
    };
  }
};