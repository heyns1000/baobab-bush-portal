import Anthropic from "@anthropic-ai/sdk";

interface GeneratedFile {
  path: string;
  content: string;
  language: string;
}

interface CodeGenerationResult {
  sessionId: string;
  files: GeneratedFile[];
  summary: string;
}

interface StreamCallback {
  onFileStart: (filename: string) => void;
  onFileContent: (content: string) => void;
  onFileComplete: (file: GeneratedFile) => void;
  onComplete: (result: CodeGenerationResult) => void;
  onError: (error: Error) => void;
}

const SYSTEM_PROMPT = `You are the Baobab Live Coding AI. You generate production-ready code based on user descriptions.

RULES:
1. Generate complete, working code files
2. Use modern best practices (TypeScript, React 18, Tailwind CSS)
3. Include proper error handling and types
4. Format output as JSON with files array

OUTPUT FORMAT:
{
  "files": [
    {
      "path": "src/components/Example.tsx",
      "content": "// full file content here",
      "language": "typescript"
    }
  ],
  "summary": "Brief description of what was built"
}

Generate clean, production-ready code. No placeholders or TODOs.`;

export class LiveCodingService {
  private client: Anthropic | null = null;

  constructor() {
    if (process.env.ANTHROPIC_API_KEY) {
      this.client = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      });
    }
  }

  async generateCode(
    prompt: string,
    sessionId: string,
    callbacks?: StreamCallback
  ): Promise<CodeGenerationResult> {
    if (!this.client) {
      throw new Error("ANTHROPIC_API_KEY not configured");
    }

    try {
      const response = await this.client.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 8192,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: `Build the following: ${prompt}\n\nRespond with JSON only.`,
          },
        ],
      });

      const content = response.content[0];
      if (content.type !== "text") {
        throw new Error("Unexpected response type");
      }

      const parsed = this.parseResponse(content.text);
      const result: CodeGenerationResult = {
        sessionId,
        files: parsed.files,
        summary: parsed.summary,
      };

      if (callbacks?.onComplete) {
        callbacks.onComplete(result);
      }

      return result;
    } catch (error) {
      if (callbacks?.onError) {
        callbacks.onError(error as Error);
      }
      throw error;
    }
  }

  async *generateCodeStream(
    prompt: string,
    sessionId: string
  ): AsyncGenerator<{ type: string; data: any }> {
    if (!this.client) {
      throw new Error("ANTHROPIC_API_KEY not configured");
    }

    yield { type: "session_start", data: { sessionId } };

    const stream = await this.client.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 8192,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Build the following: ${prompt}\n\nRespond with JSON only.`,
        },
      ],
    });

    let fullContent = "";

    for await (const event of stream) {
      if (
        event.type === "content_block_delta" &&
        event.delta.type === "text_delta"
      ) {
        fullContent += event.delta.text;
        yield {
          type: "content_delta",
          data: { text: event.delta.text, accumulated: fullContent },
        };
      }
    }

    try {
      const parsed = this.parseResponse(fullContent);
      yield {
        type: "generation_complete",
        data: {
          sessionId,
          files: parsed.files,
          summary: parsed.summary,
        },
      };
    } catch (error) {
      yield {
        type: "parse_error",
        data: { error: (error as Error).message, rawContent: fullContent },
      };
    }
  }

  private parseResponse(text: string): {
    files: GeneratedFile[];
    summary: string;
  } {
    // Extract JSON from response (handle markdown code blocks)
    let jsonText = text;

    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonText = jsonMatch[1].trim();
    }

    // Try to find JSON object
    const objectMatch = jsonText.match(/\{[\s\S]*\}/);
    if (objectMatch) {
      jsonText = objectMatch[0];
    }

    const parsed = JSON.parse(jsonText);

    return {
      files: parsed.files || [],
      summary: parsed.summary || "Code generated successfully",
    };
  }

  isConfigured(): boolean {
    return this.client !== null;
  }
}

export const liveCodingService = new LiveCodingService();
