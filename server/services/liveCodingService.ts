import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export interface GeneratedFile {
  path: string;
  content: string;
  language: string;
}

export interface CodingSession {
  id: string;
  prompt: string;
  status: 'active' | 'completed' | 'error';
  files: GeneratedFile[];
  startedAt: Date;
  completedAt?: Date;
}

const activeSessions = new Map<string, CodingSession>();

export async function* streamCodeGeneration(
  sessionId: string,
  prompt: string,
  onFileGenerated?: (file: GeneratedFile) => void
): AsyncGenerator<{ type: string; content: string }> {
  const session: CodingSession = {
    id: sessionId,
    prompt,
    status: 'active',
    files: [],
    startedAt: new Date(),
  };
  activeSessions.set(sessionId, session);

  const systemPrompt = `You are an expert full-stack developer for BushPortal. Generate complete, production-ready code.

When generating files, use this format for EACH file:
---FILE: path/to/file.ext---
[file content here]
---END FILE---

Always generate:
1. Complete, working code (no placeholders)
2. Proper TypeScript/JavaScript with types
3. React components with Tailwind CSS
4. Server routes if needed
5. Database schemas if needed

Current project: BushPortal - African podcasting platform with amber/orange theme.`;

  try {
    const stream = await anthropic.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8192,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: `Generate a complete implementation for: ${prompt}

Include all necessary files with proper structure. Use the BushPortal design system (amber colors, TreePine icons, etc).`,
        },
      ],
    });

    let currentContent = '';
    let currentFile: Partial<GeneratedFile> | null = null;

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        const text = event.delta.text;
        currentContent += text;

        yield { type: 'text', content: text };

        // Parse files from the stream
        const fileStartMatch = currentContent.match(/---FILE:\s*(.+?)---\n/);
        const fileEndMatch = currentContent.match(/---END FILE---/);

        if (fileStartMatch && !currentFile) {
          const path = fileStartMatch[1].trim();
          const ext = path.split('.').pop() || 'txt';
          currentFile = {
            path,
            language: getLanguageFromExtension(ext),
            content: '',
          };
          currentContent = currentContent.replace(fileStartMatch[0], '');
        }

        if (fileEndMatch && currentFile) {
          currentFile.content = currentContent.replace(/---END FILE---.*$/, '').trim();
          const completedFile = currentFile as GeneratedFile;
          session.files.push(completedFile);

          yield { type: 'file', content: JSON.stringify(completedFile) };

          if (onFileGenerated) {
            onFileGenerated(completedFile);
          }

          currentFile = null;
          currentContent = currentContent.replace(/.*---END FILE---/, '');
        }
      }
    }

    session.status = 'completed';
    session.completedAt = new Date();
    yield { type: 'complete', content: JSON.stringify({ sessionId, fileCount: session.files.length }) };

  } catch (error) {
    session.status = 'error';
    yield { type: 'error', content: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export function getSession(sessionId: string): CodingSession | undefined {
  return activeSessions.get(sessionId);
}

export function getAllSessions(): CodingSession[] {
  return Array.from(activeSessions.values());
}

function getLanguageFromExtension(ext: string): string {
  const languageMap: Record<string, string> = {
    ts: 'typescript',
    tsx: 'typescript',
    js: 'javascript',
    jsx: 'javascript',
    json: 'json',
    html: 'html',
    css: 'css',
    scss: 'scss',
    md: 'markdown',
    sql: 'sql',
    sh: 'bash',
    yml: 'yaml',
    yaml: 'yaml',
  };
  return languageMap[ext] || 'plaintext';
}

export async function generateCodeSync(prompt: string): Promise<GeneratedFile[]> {
  const sessionId = `sync-${Date.now()}`;
  const files: GeneratedFile[] = [];

  for await (const event of streamCodeGeneration(sessionId, prompt)) {
    if (event.type === 'file') {
      files.push(JSON.parse(event.content));
    }
  }

  return files;
}
