import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, Settings, LogOut, Wifi, Users, MessageCircle, Activity } from "lucide-react";
import { toast } from "sonner";

const Home = () => {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(true);
  const [activeUsers] = useState(7);
  const [messagesSent] = useState(142);
  const [messagesReceived] = useState(198);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    if (!auth) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    toast.success("Logout Successful", {
      description: "Secure connection terminated"
    });
    navigate("/login");
  };

  const handleEnterChat = () => {
    navigate("/chat");
  };

  return (
    <div className="min-h-screen bg-background p-6 relative overflow-hidden">
      {/* Tactical grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(74,95,58,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(74,95,58,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground tracking-wide mb-1">
              MISSION CONTROL
            </h1>
            <p className="text-[hsl(var(--steel-gray-light))] font-mono text-sm">
              Operator Dashboard • Classified Access
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-[hsl(var(--tactical-green-dark))] text-foreground hover:bg-[hsl(var(--tactical-green))]/20 font-mono"
          >
            <LogOut className="w-4 h-4 mr-2" />
            LOGOUT
          </Button>
        </div>

        {/* Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-[hsl(var(--tactical-green-dark))] p-6 hover:shadow-[0_0_20px_rgba(74,95,58,0.3)] transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[hsl(var(--steel-gray-light))] font-mono text-xs tracking-wider">
                CONNECTION
              </span>
              <Wifi className={`w-5 h-5 ${isOnline ? 'text-[hsl(var(--tactical-green-light))] radar-pulse' : 'text-[hsl(var(--steel-gray))]'}`} />
            </div>
            <div className="text-2xl font-bold text-foreground">
              {isOnline ? "ONLINE" : "OFFLINE"}
            </div>
            <div className="text-xs text-[hsl(var(--steel-gray))] font-mono mt-1">
              Secure tunnel active
            </div>
          </Card>

          <Card className="bg-card border-[hsl(var(--tactical-green-dark))] p-6 hover:shadow-[0_0_20px_rgba(74,95,58,0.3)] transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[hsl(var(--steel-gray-light))] font-mono text-xs tracking-wider">
                ACTIVE USERS
              </span>
              <Users className="w-5 h-5 text-[hsl(var(--tactical-green-light))]" />
            </div>
            <div className="text-2xl font-bold text-foreground">
              {activeUsers}
            </div>
            <div className="text-xs text-[hsl(var(--steel-gray))] font-mono mt-1">
              Operators online
            </div>
          </Card>

          <Card className="bg-card border-[hsl(var(--tactical-green-dark))] p-6 hover:shadow-[0_0_20px_rgba(74,95,58,0.3)] transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[hsl(var(--steel-gray-light))] font-mono text-xs tracking-wider">
                SENT
              </span>
              <MessageCircle className="w-5 h-5 text-[hsl(var(--tactical-green-light))]" />
            </div>
            <div className="text-2xl font-bold text-foreground">
              {messagesSent}
            </div>
            <div className="text-xs text-[hsl(var(--steel-gray))] font-mono mt-1">
              Messages transmitted
            </div>
          </Card>

          <Card className="bg-card border-[hsl(var(--tactical-green-dark))] p-6 hover:shadow-[0_0_20px_rgba(74,95,58,0.3)] transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[hsl(var(--steel-gray-light))] font-mono text-xs tracking-wider">
                RECEIVED
              </span>
              <Activity className="w-5 h-5 text-[hsl(var(--tactical-green-light))]" />
            </div>
            <div className="text-2xl font-bold text-foreground">
              {messagesReceived}
            </div>
            <div className="text-xs text-[hsl(var(--steel-gray))] font-mono mt-1">
              Messages received
            </div>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-card border-[hsl(var(--tactical-green-dark))] p-8 hover:shadow-[0_0_30px_rgba(74,95,58,0.4)] transition-all">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-lg bg-[hsl(var(--tactical-green))]/20">
                <MessageSquare className="w-8 h-8 text-[hsl(var(--tactical-green-light))]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  SECURE CHAT
                </h3>
                <p className="text-[hsl(var(--steel-gray-light))] text-sm font-mono">
                  Enter encrypted messaging channel with self-destructing messages
                </p>
              </div>
            </div>
            <Button
              onClick={handleEnterChat}
              className="w-full bg-[hsl(var(--tactical-green))] hover:bg-[hsl(var(--tactical-green-light))] text-white font-mono tracking-wider shadow-[0_0_20px_rgba(74,95,58,0.4)] transition-all"
            >
              ENTER CHAT ROOM
            </Button>
          </Card>

          <Card className="bg-card border-[hsl(var(--tactical-green-dark))] p-8 hover:shadow-[0_0_30px_rgba(74,95,58,0.4)] transition-all">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-lg bg-[hsl(var(--tactical-green))]/20">
                <Settings className="w-8 h-8 text-[hsl(var(--tactical-green-light))]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  SYSTEM CONFIG
                </h3>
                <p className="text-[hsl(var(--steel-gray-light))] text-sm font-mono">
                  Access system settings, view logs, and manage security protocols
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full border-[hsl(var(--tactical-green-dark))] text-foreground hover:bg-[hsl(var(--tactical-green))]/20 font-mono tracking-wider"
            >
              VIEW SETTINGS
            </Button>
          </Card>
        </div>

        {/* User Info */}
        <Card className="mt-6 bg-card border-[hsl(var(--tactical-green-dark))] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-mono text-[hsl(var(--steel-gray-light))] mb-1">
                OPERATOR STATUS
              </h4>
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-xs text-[hsl(var(--steel-gray))] font-mono">RANK:</span>
                  <span className="ml-2 text-foreground font-mono font-bold">ALPHA-1</span>
                </div>
                <div className="h-4 w-px bg-border" />
                <div>
                  <span className="text-xs text-[hsl(var(--steel-gray))] font-mono">ID:</span>
                  <span className="ml-2 text-foreground font-mono font-bold">TCS-2847</span>
                </div>
                <div className="h-4 w-px bg-border" />
                <div>
                  <span className="text-xs text-[hsl(var(--steel-gray))] font-mono">CLEARANCE:</span>
                  <span className="ml-2 text-[hsl(var(--tactical-green-light))] font-mono font-bold">CLASSIFIED</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[hsl(var(--tactical-green-light))] animate-pulse" />
              <span className="text-xs font-mono text-[hsl(var(--steel-gray-light))]">
                SECURE CONNECTION
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Home;
