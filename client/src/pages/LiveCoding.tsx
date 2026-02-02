import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Link } from 'wouter';
import {
  TreePine,
  ArrowLeft,
  Play,
  Square,
  Download,
  Folder,
  File,
  Terminal,
  Loader2,
  CheckCircle,
  XCircle,
  Copy,
  Maximize2
} from 'lucide-react';

interface GeneratedFile {
  path: string;
  content: string;
  language: string;
}

interface CodingSession {
  id: string;
  prompt: string;
  status: 'connecting' | 'active' | 'completed' | 'error';
  files: GeneratedFile[];
  output: string;
}

export default function LiveCoding() {
  const [prompt, setPrompt] = useState('');
  const [session, setSession] = useState<CodingSession | null>(null);
  const [selectedFile, setSelectedFile] = useState<GeneratedFile | null>(null);
  const [copied, setCopied] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const outputRef = useRef<HTMLPreElement>(null);

  const connectWebSocket = useCallback(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const ws = new WebSocket(`${protocol}//${window.location.host}/ws/live-coding`);

    ws.onopen = () => {
      console.log('Connected to Live Coding WebSocket');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      handleWebSocketMessage(data);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setTimeout(connectWebSocket, 3000);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    wsRef.current = ws;
  }, []);

  useEffect(() => {
    connectWebSocket();
    return () => {
      wsRef.current?.close();
    };
  }, [connectWebSocket]);

  const handleWebSocketMessage = (data: any) => {
    switch (data.type) {
      case 'session_started':
        setSession({
          id: data.sessionId,
          prompt: data.prompt,
          status: 'active',
          files: [],
          output: '',
        });
        break;

      case 'stream_text':
        setSession(prev => prev ? {
          ...prev,
          output: prev.output + data.content,
        } : null);
        if (outputRef.current) {
          outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
        break;

      case 'stream_file':
        const file = JSON.parse(data.content);
        setSession(prev => prev ? {
          ...prev,
          files: [...prev.files, file],
        } : null);
        break;

      case 'stream_complete':
        setSession(prev => prev ? {
          ...prev,
          status: 'completed',
        } : null);
        break;

      case 'stream_error':
        setSession(prev => prev ? {
          ...prev,
          status: 'error',
          output: prev.output + '\n\nError: ' + data.content,
        } : null);
        break;
    }
  };

  const startCoding = () => {
    if (!prompt.trim() || !wsRef.current) return;

    setSession({
      id: '',
      prompt,
      status: 'connecting',
      files: [],
      output: '',
    });

    wsRef.current.send(JSON.stringify({
      type: 'start_coding',
      prompt: prompt.trim(),
    }));
  };

  const stopCoding = () => {
    wsRef.current?.close();
    setSession(prev => prev ? { ...prev, status: 'completed' } : null);
  };

  const downloadFiles = () => {
    if (!session?.files.length) return;

    const content = session.files.map(f =>
      `// ===== ${f.path} =====\n\n${f.content}\n\n`
    ).join('\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bushportal-generated-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyCode = () => {
    if (selectedFile) {
      navigator.clipboard.writeText(selectedFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStatusIcon = () => {
    switch (session?.status) {
      case 'connecting':
        return <Loader2 className="w-4 h-4 animate-spin" />;
      case 'active':
        return <Loader2 className="w-4 h-4 animate-spin text-amber-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = () => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
      connecting: 'secondary',
      active: 'default',
      completed: 'default',
      error: 'destructive',
    };
    return (
      <Badge variant={variants[session?.status || 'default']} className="flex items-center gap-1">
        {getStatusIcon()}
        {session?.status || 'Ready'}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-amber-950">
      {/* Navigation */}
      <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-amber-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <TreePine className="w-8 h-8 text-amber-600" />
              <div>
                <h1 className="text-xl font-bold text-amber-900 dark:text-amber-100">Live AI Coding</h1>
                <p className="text-xs text-amber-600 dark:text-amber-300">BushPortal Terminal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {getStatusBadge()}
              <Link href="/">
                <Button variant="ghost" className="text-amber-700">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Input Section */}
        <Card className="mb-6 bg-white/80 dark:bg-gray-800/80 border-amber-200 dark:border-gray-700">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
              <Terminal className="w-5 h-5" />
              What would you like to build?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="e.g., Build a podcast player component with play/pause and progress bar..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && startCoding()}
                className="flex-1 border-amber-300 focus:border-amber-500"
                disabled={session?.status === 'active'}
              />
              {session?.status === 'active' ? (
                <Button onClick={stopCoding} variant="destructive">
                  <Square className="w-4 h-4 mr-2" />
                  Stop
                </Button>
              ) : (
                <Button onClick={startCoding} className="bg-amber-600 hover:bg-amber-700">
                  <Play className="w-4 h-4 mr-2" />
                  Generate
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Main Content - Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* File Tree */}
          <Card className="bg-white/80 dark:bg-gray-800/80 border-amber-200 dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between text-amber-900 dark:text-amber-100">
                <span className="flex items-center gap-2">
                  <Folder className="w-4 h-4" />
                  Generated Files
                </span>
                {session?.files.length ? (
                  <Button size="sm" variant="outline" onClick={downloadFiles}>
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                ) : null}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {session?.files.length ? (
                <div className="space-y-1">
                  {session.files.map((file, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedFile(file)}
                      className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                        selectedFile?.path === file.path
                          ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-100'
                          : 'hover:bg-amber-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <File className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate text-sm font-mono">{file.path}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-8">
                  {session?.status === 'active'
                    ? 'Generating files...'
                    : 'Files will appear here as they are generated'}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Code Preview */}
          <Card className="lg:col-span-2 bg-white/80 dark:bg-gray-800/80 border-amber-200 dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between text-amber-900 dark:text-amber-100">
                <span className="flex items-center gap-2">
                  {selectedFile ? (
                    <>
                      <File className="w-4 h-4" />
                      <span className="font-mono text-sm">{selectedFile.path}</span>
                      <Badge variant="secondary" className="ml-2">{selectedFile.language}</Badge>
                    </>
                  ) : (
                    <>
                      <Terminal className="w-4 h-4" />
                      Live Output
                    </>
                  )}
                </span>
                <div className="flex gap-2">
                  {selectedFile && (
                    <Button size="sm" variant="outline" onClick={copyCode}>
                      {copied ? <CheckCircle className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                  )}
                  <Button size="sm" variant="ghost">
                    <Maximize2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre
                ref={outputRef}
                className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-auto max-h-[600px] text-sm font-mono"
              >
                {selectedFile ? (
                  <code>{selectedFile.content}</code>
                ) : session?.output ? (
                  <code>{session.output}</code>
                ) : (
                  <code className="text-gray-500">
                    {`// BushPortal Live Coding Terminal
// ================================
//
// Enter a prompt above and click "Generate" to start.
//
// Examples:
// - "Build a podcast episode card with thumbnail and play button"
// - "Create a user settings page with profile editing"
// - "Add a real-time listener count component with WebSocket"
//
// The AI will generate complete, production-ready code
// that matches the BushPortal design system.
//
// VaultPulse Status: ●●●●● READY`}
                  </code>
                )}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
