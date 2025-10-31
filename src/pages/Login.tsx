import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Lock, Unlock } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error("Access Denied", {
        description: "All fields are required for authentication"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      setIsUnlocked(true);
      
      setTimeout(() => {
        localStorage.setItem("isAuthenticated", "true");
        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
        }
        toast.success("Access Granted", {
          description: "Secure connection established"
        });
        navigate("/home");
      }, 800);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Tactical grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(74,95,58,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(74,95,58,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Radar pulse effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-[hsl(var(--tactical-green))]/10 to-transparent animate-pulse" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-card border border-border rounded-lg p-8 shadow-[0_0_30px_rgba(74,95,58,0.2)]">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[hsl(var(--tactical-green))]/20 mb-4">
              {isUnlocked ? (
                <Unlock className="w-8 h-8 text-[hsl(var(--tactical-green-light))] animate-lockSecure" />
              ) : (
                <Shield className="w-8 h-8 text-[hsl(var(--tactical-green-light))] radar-pulse" />
              )}
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2 tracking-wide">
              SECURE ACCESS
            </h1>
            <p className="text-[hsl(var(--steel-gray-light))] text-sm font-mono">
              TACTICAL COMMUNICATION SYSTEM
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground font-mono text-xs tracking-wider">
                OPERATOR ID
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-[hsl(var(--matte-black))] border-[hsl(var(--tactical-green-dark))] focus:border-[hsl(var(--tactical-green-light))] focus:ring-[hsl(var(--tactical-green-light))]/20 font-mono transition-all"
                placeholder="Enter operator ID"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-mono text-xs tracking-wider">
                ACCESS CODE
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[hsl(var(--matte-black))] border-[hsl(var(--tactical-green-dark))] focus:border-[hsl(var(--tactical-green-light))] focus:ring-[hsl(var(--tactical-green-light))]/20 font-mono transition-all"
                placeholder="Enter access code"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                className="border-[hsl(var(--tactical-green-dark))] data-[state=checked]:bg-[hsl(var(--tactical-green))]"
              />
              <label
                htmlFor="remember"
                className="text-sm text-[hsl(var(--steel-gray-light))] cursor-pointer font-mono"
              >
                Remember credentials
              </label>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[hsl(var(--tactical-green))] hover:bg-[hsl(var(--tactical-green-light))] text-white font-mono tracking-wider shadow-[0_0_20px_rgba(74,95,58,0.4)] transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4 animate-pulse" />
                  AUTHENTICATING...
                </span>
              ) : (
                "SECURE LOGIN"
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-center text-xs text-[hsl(var(--steel-gray))] font-mono">
              ENCRYPTED CONNECTION • END-TO-END SECURITY
            </p>
          </div>
        </div>

        {/* Version info */}
        <div className="text-center mt-4">
          <p className="text-xs text-[hsl(var(--steel-gray))] font-mono">
            TACTICAL COMM v2.4.1 • CLASSIFIED
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
