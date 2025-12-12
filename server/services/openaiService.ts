import OpenAI from "openai";

// Initialize OpenAI with API key
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

export class OpenAIService {
  // AI-powered content recommendations
  async generatePodcastRecommendations(userPreferences: {
    interests: string[];
    languages: string[];
    culturalBackground: string;
    listeningHistory: string[];
  }): Promise<string[]> {
    try {
      const prompt = `Based on these user preferences:
        - Interests: ${userPreferences.interests.join(', ')}
        - Languages: ${userPreferences.languages.join(', ')}
        - Cultural Background: ${userPreferences.culturalBackground}
        - Recently Listened: ${userPreferences.listeningHistory.join(', ')}
        
        Recommend 5 specific podcast topics that would appeal to this user from a global podcasting network spanning 120 countries. Focus on cultural exchange, storytelling, and authentic voices. Return as JSON array of topics.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4", // Using GPT-4 for better recommendations
        messages: [
          {
            role: "system",
            content: "You are an AI that specializes in cross-cultural podcast recommendations. Provide diverse, authentic content suggestions."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 500
      });

      const result = JSON.parse(response.choices[0].message.content || '{"recommendations": []}');
      return result.recommendations || [];
    } catch (error) {
      console.error("Error generating recommendations:", error);
      return [];
    }
  }

  // Real-time content translation
  async translatePodcastContent(text: string, targetLanguage: string): Promise<string> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are a professional translator specializing in podcast content. Translate the following text to ${targetLanguage}, maintaining cultural context and emotional tone.`
          },
          {
            role: "user",
            content: text
          }
        ],
        max_tokens: 1000
      });

      return response.choices[0].message.content || text;
    } catch (error) {
      console.error("Error translating content:", error);
      return text;
    }
  }

  // AI-powered podcast description enhancement
  async enhancePodcastDescription(title: string, basicDescription: string, culturalContext: string): Promise<string> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a creative writer who specializes in compelling podcast descriptions that honor cultural authenticity and attract global audiences."
          },
          {
            role: "user",
            content: `Enhance this podcast description:
            Title: ${title}
            Description: ${basicDescription}
            Cultural Context: ${culturalContext}
            
            Make it engaging, culturally respectful, and appealing to international listeners while maintaining authenticity.`
          }
        ],
        max_tokens: 300
      });

      return response.choices[0].message.content || basicDescription;
    } catch (error) {
      console.error("Error enhancing description:", error);
      return basicDescription;
    }
  }

  // Generate trending topics analysis
  async analyzeTrendingTopics(podcastTitles: string[], regions: string[]): Promise<{
    trending: string[];
    insights: string;
    culturalPatterns: string[];
  }> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a cultural analyst who identifies trending topics and patterns in global podcast content."
          },
          {
            role: "user",
            content: `Analyze these podcast titles from regions ${regions.join(', ')}:
            ${podcastTitles.join('\n')}
            
            Identify trending topics, cultural patterns, and provide insights. Return as JSON with 'trending', 'insights', and 'culturalPatterns' fields.`
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 600
      });

      return JSON.parse(response.choices[0].message.content || '{"trending": [], "insights": "", "culturalPatterns": []}');
    } catch (error) {
      console.error("Error analyzing trends:", error);
      return { trending: [], insights: "", culturalPatterns: [] };
    }
  }

  // Generate cultural context for podcast discovery
  async generateCulturalContext(country: string, topic: string): Promise<string> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a cultural expert who provides respectful, accurate context about different cultures and their storytelling traditions."
          },
          {
            role: "user",
            content: `Provide cultural context for podcast content about "${topic}" from ${country}. Include historical background, cultural significance, and why this perspective is valuable for global audiences. Keep it respectful and educational.`
          }
        ],
        max_tokens: 400
      });

      return response.choices[0].message.content || "";
    } catch (error) {
      console.error("Error generating cultural context:", error);
      return "";
    }
  }

  // Smart content moderation
  async moderateContent(content: string): Promise<{
    isAppropriate: boolean;
    concerns: string[];
    suggestions: string[];
  }> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a content moderator for a global podcasting platform. Evaluate content for cultural sensitivity, appropriateness, and quality while respecting diverse perspectives."
          },
          {
            role: "user",
            content: `Review this podcast content for appropriateness:
            "${content}"
            
            Return JSON with 'isAppropriate' (boolean), 'concerns' (array), and 'suggestions' (array) for improvement.`
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 400
      });

      return JSON.parse(response.choices[0].message.content || '{"isAppropriate": true, "concerns": [], "suggestions": []}');
    } catch (error) {
      console.error("Error moderating content:", error);
      return { isAppropriate: true, concerns: [], suggestions: [] };
    }
  }
}

export const openaiService = new OpenAIService();