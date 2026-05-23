import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import logo from "@/assets/logo.png";
import loginBg from "@/assets/login-bg.jpg";

export default function Login() {
  const { session, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin");

  if (!authLoading && session) return <Navigate to="/admin" replace />;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate("/admin");
      } else if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Account created. Check your email to confirm, then sign in.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/admin`,
        });
        if (error) throw error;
        toast.success("Password reset email sent.");
        setMode("signin");
      }
    } catch (err: any) {
      toast.error(err.message ?? "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <img src={logo} alt="Sacramento ElderCare Directory" className="h-14 brightness-0 invert" />
        </div>
        <div className="bg-teal-800 border border-teal-700 rounded-lg p-8 shadow-xl">
          <h1 className="text-2xl font-serif text-white mb-1">
            {mode === "signin" ? "Admin sign in" : mode === "signup" ? "Create admin account" : "Reset password"}
          </h1>
          <p className="text-neutral-300 text-sm mb-6">Sacramento ElderCare Directory back-office</p>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-neutral-200">Email</Label>
              <Input
                id="email" type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 bg-neutral-900 border-teal-700 text-white"
              />
            </div>
            {mode !== "forgot" && (
              <div>
                <Label htmlFor="password" className="text-neutral-200">Password</Label>
                <Input
                  id="password" type="password" required minLength={6} value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 bg-neutral-900 border-teal-700 text-white"
                />
              </div>
            )}
            <Button
              type="submit" disabled={loading}
              className="w-full bg-coral-500 hover:bg-coral-600 text-white"
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {mode === "signin" ? "Sign in" : mode === "signup" ? "Create account" : "Send reset email"}
            </Button>
          </form>

          <div className="mt-6 flex flex-col gap-2 text-sm text-neutral-300">
            {mode === "signin" && (
              <>
                <button type="button" onClick={() => setMode("forgot")} className="text-coral-300 hover:text-coral-200 text-left">
                  Forgot password?
                </button>
                <button type="button" onClick={() => setMode("signup")} className="text-coral-300 hover:text-coral-200 text-left">
                  Need to create the first admin account? Sign up
                </button>
              </>
            )}
            {mode !== "signin" && (
              <button type="button" onClick={() => setMode("signin")} className="text-coral-300 hover:text-coral-200 text-left">
                ← Back to sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
