import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import {
  TreePine,
  Play,
  Download,
  Users,
  FileCode,
  Folder,
  ArrowLeft,
  Loader2,
  Terminal,
  Copy,
  Check,
} from "lucide-react";

interface GeneratedFile {
  path: string;
  content: string;
  language: string;
}

interface WebSocketMessage {
  type: string;
  data: any;
}

export default function LiveCoding() {
  const [prompt, setPrompt] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [files, setFiles] = useState<GeneratedFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<GeneratedFile | null>(null);
  const [streamContent, setStreamContent] = useState("");
  const [viewers, setViewers] = useState(1);
  const [status, setStatus] = useState<"idle" | "connected" | "generating" | "complete" | "error">("idle");
  const [copied, setCopied] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const connectWebSocket = useCallback(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus("connected");
      console.log("[WS] Connected");
    };

    ws.onmessage = (event) => {
      const message: WebSocketMessage = JSON.parse(event.data);
      handleWebSocketMessage(message);
    };

    ws.onclose = () => {
      setStatus("idle");
      console.log("[WS] Disconnected");
      // Reconnect after 3 seconds
      reconnectTimeoutRef.current = setTimeout(connectWebSocket, 3000);
    };

    ws.onerror = (error) => {
      console.error("[WS] Error:", error);
      setStatus("error");
    };
  }, []);

  const handleWebSocketMessage = (message: WebSocketMessage) => {
    switch (message.type) {
      case "connected":
        console.log("[WS] Server acknowledged connection");
        break;

      case "session_joined":
        setViewers(message.data.viewers);
        break;

      case "viewer_joined":
      case "viewer_left":
        setViewers(message.data.viewers);
        break;

      case "coding_session_start":
        setStatus("generating");
        setStreamContent("");
        setFiles([]);
        break;

      case "coding_content_delta":
        setStreamContent(message.data.accumulated || "");
        break;

      case "coding_generation_complete":
        setFiles(message.data.files || []);
        if (message.data.files?.length > 0) {
          setSelectedFile(message.data.files[0]);
        }
        setStatus("complete");
        setIsGenerating(false);
        break;

      case "coding_started":
        setStatus("generating");
        break;

      case "coding_finished":
        setStatus("complete");
        setIsGenerating(false);
        break;

      case "coding_error":
        setStatus("error");
        setIsGenerating(false);
        console.error("[WS] Coding error:", message.data.error);
        break;

      default:
        console.log("[WS] Unknown message:", message);
    }
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connectWebSocket]);

  const startCoding = () => {
    if (!prompt.trim() || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      return;
    }

    const newSessionId = crypto.randomUUID();
    setSessionId(newSessionId);
    setIsGenerating(true);
    setStatus("generating");
    setStreamContent("");
    setFiles([]);
    setSelectedFile(null);

    wsRef.current.send(
      JSON.stringify({
        type: "start_coding",
        payload: {
          prompt: prompt.trim(),
          sessionId: newSessionId,
        },
      })
    );
  };

  const downloadFiles = () => {
    if (files.length === 0) return;

    const content = files
      .map((f) => `// File: ${f.path}\n\n${f.content}`)
      .join("\n\n// " + "=".repeat(60) + "\n\n");

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `baobab-generated-${sessionId?.slice(0, 8) || "code"}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyCode = async () => {
    if (!selectedFile) return;
    await navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getFileIcon = (path: string) => {
    if (path.endsWith(".tsx") || path.endsWith(".jsx")) return "⚛️";
    if (path.endsWith(".ts") || path.endsWith(".js")) return "📜";
    if (path.endsWith(".css") || path.endsWith(".scss")) return "🎨";
    if (path.endsWith(".json")) return "📋";
    if (path.endsWith(".md")) return "📝";
    return "📄";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-amber-950">
      {/* Header */}
      <nav className="bg-gray-900/90 backdrop-blur-md border-b border-amber-700/30 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <TreePine className="w-8 h-8 text-amber-500" />
              <div>
                <h1 className="text-xl font-bold text-amber-100">Live AI Coding</h1>
                <p className="text-xs text-amber-400">Baobab Terminal</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge
                variant="outline"
                className={`${
                  status === "connected" || status === "complete"
                    ? "bg-green-900/50 text-green-400 border-green-600"
                    : status === "generating"
                    ? "bg-amber-900/50 text-amber-400 border-amber-600 animate-pulse"
                    : status === "error"
                    ? "bg-red-900/50 text-red-400 border-red-600"
                    : "bg-gray-800 text-gray-400 border-gray-600"
                }`}
              >
                {status === "generating" ? (
                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                ) : null}
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>

              <div className="flex items-center gap-1 text-amber-400">
                <Users className="w-4 h-4" />
                <span className="text-sm">{viewers}</span>
              </div>

              <Link href="/">
                <Button variant="ghost" className="text-amber-400 hover:text-amber-200">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-6">
        {/* Prompt Input */}
        <Card className="bg-gray-800/50 border-amber-700/30 mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
                <Input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && startCoding()}
                  placeholder="Describe what you want to build... (e.g., 'Build a React todo app with dark mode')"
                  className="pl-10 bg-gray-900 border-amber-700/50 text-amber-100 placeholder:text-gray-500 focus:border-amber-500"
                  disabled={isGenerating}
                />
              </div>
              <Button
                onClick={startCoding}
                disabled={isGenerating || !prompt.trim() || status !== "connected"}
                className="bg-amber-600 hover:bg-amber-700 text-white px-8"
              >
                {isGenerating ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Play className="w-4 h-4 mr-2" />
                )}
                {isGenerating ? "Generating..." : "Build"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* File Tree */}
          <Card className="bg-gray-800/50 border-amber-700/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-amber-100 flex items-center gap-2 text-sm">
                <Folder className="w-4 h-4" />
                Generated Files
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {files.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-8">
                    {isGenerating ? "Generating files..." : "No files yet. Start coding!"}
                  </p>
                ) : (
                  <div className="space-y-1">
                    {files.map((file, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedFile(file)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center gap-2 transition-colors ${
                          selectedFile?.path === file.path
                            ? "bg-amber-600/30 text-amber-100"
                            : "text-gray-400 hover:bg-gray-700/50 hover:text-gray-200"
                        }`}
                      >
                        <span>{getFileIcon(file.path)}</span>
                        <span className="truncate">{file.path}</span>
                      </button>
                    ))}
                  </div>
                )}
              </ScrollArea>

              {files.length > 0 && (
                <Button
                  onClick={downloadFiles}
                  variant="outline"
                  className="w-full mt-4 border-amber-700/50 text-amber-400 hover:bg-amber-600/20"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download All
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Code Preview */}
          <Card className="lg:col-span-3 bg-gray-800/50 border-amber-700/30">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-amber-100 flex items-center gap-2 text-sm">
                  <FileCode className="w-4 h-4" />
                  {selectedFile ? selectedFile.path : "Code Preview"}
                </CardTitle>
                {selectedFile && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyCode}
                    className="text-amber-400 hover:text-amber-200"
                  >
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="code">
                <TabsList className="bg-gray-900/50 mb-4">
                  <TabsTrigger value="code" className="data-[state=active]:bg-amber-600/30">
                    Code
                  </TabsTrigger>
                  <TabsTrigger value="stream" className="data-[state=active]:bg-amber-600/30">
                    Raw Stream
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="code">
                  <ScrollArea className="h-[500px] rounded-md bg-gray-900 p-4">
                    {selectedFile ? (
                      <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
                        <code>{selectedFile.content}</code>
                      </pre>
                    ) : (
                      <div className="text-gray-500 text-center py-20">
                        <FileCode className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Select a file to view its contents</p>
                      </div>
                    )}
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="stream">
                  <ScrollArea className="h-[500px] rounded-md bg-gray-900 p-4">
                    <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                      {streamContent || (
                        <span className="text-gray-500">
                          {isGenerating ? "Receiving stream..." : "Stream output will appear here"}
                        </span>
                      )}
                    </pre>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
