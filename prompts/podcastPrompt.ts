//add article content to the prompt
export const podcastPrompt = (articleContent: string, articleTitle?: string) => `
You are an AI scriptwriter creating a **two-voice podcast** based on the following article:

${articleTitle ? `**Article Title:** "${articleTitle}"` : ''}

**Article Content:**
"""${articleContent}"""

Instructions:

1. Convert the article content into a **dialogue** between a "host" and a "guest".
2. The "host" introduces topics, asks questions, and guides the conversation.
3. The "guest" explains the concepts, gives insights, and responds naturally.
4. Keep each line concise (6–7 sentences) for smooth TTS conversion.
5. Make it engaging, conversational, and informative.
6. Generate at least 8–10 dialogue turns (more if the content is long).
7. The host is Ekta(female) and Guest is Vipul(male).
8. Let them address each other by their names sometimes in conversation.
9. Start the conversation with the host welcoming the listeners to The Podwise Podcast and introducing the guest, introducing the topic and guest responding to it.
${articleTitle ? `10. Use the article title "${articleTitle}" in the introduction to make it more engaging.` : ''}
11.End with host thanking the guest to be on the show and also addressing the audience for tuning in to the Podwise podcast.

**IMPORTANT: Return ONLY valid JSON, no markdown formatting, no code blocks, no explanations.**

Return in this exact format:
[
  {
    "role": "host",
    "content": "First line of the host introducing the topic."
  },
  {
    "role": "guest",
    "content": "Guest responds here with informative content."
  }
]

Do not include any extra text, explanations, or comments outside the JSON. Ensure the output is **well-formed JSON** that can be parsed programmatically.
`;