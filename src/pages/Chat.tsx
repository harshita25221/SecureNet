import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Clock, CheckCheck, Timer } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  text: string;
  sender: "user" | "other";
  timestamp: Date;
  status: "sent" | "delivered" | "read";
  selfDestructTimer: number;
  destroyed: boolean;
}

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    if (!auth) {
      navigate("/login");
    }

    // Add welcome message
    const welcomeMsg: Message = {
      id: "welcome",
      text: "Secure channel established. All messages will self-destruct in 10 seconds.",
      sender: "other",
      timestamp: new Date(),
      status: "read",
      selfDestructTimer: 10,
      destroyed: false,
    };
    setMessages([welcomeMsg]);
  }, [navigate]);

  useEffect(() => {
    // Timer for self-destruct
    const interval = setInterval(() => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) => {
          if (msg.destroyed) return msg;
          
          const newTimer = msg.selfDestructTimer - 1;
          
          if (newTimer <= 0) {
            setTimeout(() => {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === msg.id ? { ...m, destroyed: true } : m
                )
              );
            }, 500);
          }
          
          return { ...msg, selfDestructTimer: Math.max(0, newTimer) };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
      status: "sent",
      selfDestructTimer: 10,
      destroyed: false,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    // Simulate message status updates
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "delivered" as const } : msg
        )
      );
    }, 500);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "read" as const } : msg
        )
      );
    }, 1000);

    // Simulate typing and response
    setTimeout(() => {
      setIsTyping(true);
    }, 1500);

    setTimeout(() => {
      setIsTyping(false);
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Message received. Proceeding with tactical response.",
        sender: "other",
        timestamp: new Date(),
        status: "read",
        selfDestructTimer: 10,
        destroyed: false,
      };
      setMessages((prev) => [...prev, responseMessage]);
    }, 3000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Tactical grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(74,95,58,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(74,95,58,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Header */}
      <div className="relative z-10 bg-card border-b border-[hsl(var(--tactical-green-dark))] px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/home")}
              className="hover:bg-[hsl(var(--tactical-green))]/20"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h2 className="font-bold text-foreground tracking-wide">
                SECURE CHANNEL #1
              </h2>
              <p className="text-xs text-[hsl(var(--steel-gray-light))] font-mono">
                End-to-end encrypted • Self-destructing
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[hsl(var(--tactical-green-light))] animate-pulse" />
            <span className="text-xs font-mono text-[hsl(var(--steel-gray-light))]">
              SECURE
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 relative z-10">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages
            .filter((msg) => !msg.destroyed)
            .map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                } animate-slideUp`}
              >
                <div
                  className={`max-w-[70%] ${
                    message.selfDestructTimer <= 3
                      ? "animate-glitch"
                      : ""
                  }`}
                >
                  <div
                    className={`rounded-lg p-4 ${
                      message.sender === "user"
                        ? "bg-[hsl(var(--tactical-green))] text-white"
                        : "bg-card border border-[hsl(var(--tactical-green-dark))]"
                    } shadow-lg`}
                  >
                    <p className="text-sm mb-2">{message.text}</p>
                    <div className="flex items-center justify-between gap-4 text-xs opacity-70">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        <span>{formatTime(message.timestamp)}</span>
                      </div>
                      {message.sender === "user" && (
                        <CheckCheck
                          className={`w-4 h-4 ${
                            message.status === "read"
                              ? "text-[hsl(var(--tactical-green-light))]"
                              : ""
                          }`}
                        />
                      )}
                    </div>
                  </div>
                  {/* Self-destruct timer */}
                  <div
                    className={`flex items-center gap-2 mt-2 text-xs font-mono ${
                      message.selfDestructTimer <= 3
                        ? "text-[hsl(var(--amber-alert))]"
                        : "text-[hsl(var(--steel-gray))]"
                    } ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <Timer className="w-3 h-3" />
                    <span>
                      Self-destruct: {message.selfDestructTimer}s
                    </span>
                  </div>
                </div>
              </div>
            ))}

          {isTyping && (
            <div className="flex justify-start animate-slideUp">
              <div className="bg-card border border-[hsl(var(--tactical-green-dark))] rounded-lg p-4 max-w-[70%]">
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-[hsl(var(--tactical-green-light))] animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-[hsl(var(--tactical-green-light))] animate-pulse delay-75" />
                  <div className="w-2 h-2 rounded-full bg-[hsl(var(--tactical-green-light))] animate-pulse delay-150" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="relative z-10 bg-card border-t border-[hsl(var(--tactical-green-dark))] px-6 py-4">
        <div className="max-w-4xl mx-auto flex gap-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type encrypted message..."
            className="bg-[hsl(var(--matte-black))] border-[hsl(var(--tactical-green-dark))] focus:border-[hsl(var(--tactical-green-light))] focus:ring-[hsl(var(--tactical-green-light))]/20 font-mono"
          />
          <Button
            onClick={handleSend}
            className="bg-[hsl(var(--tactical-green))] hover:bg-[hsl(var(--tactical-green-light))] text-white shadow-[0_0_20px_rgba(74,95,58,0.4)] transition-all"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-center text-xs text-[hsl(var(--steel-gray))] font-mono mt-3">
          All messages self-destruct after 10 seconds • End-to-end encrypted
        </p>
      </div>
    </div>
  );
};

export default Chat;
