import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Shield, GraduationCap, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HeaderProps {
  isAdmin: boolean;
  onAdminToggle: (isAdmin: boolean) => void;
}

export function Header({ isAdmin, onAdminToggle }: HeaderProps) {
  const [password, setPassword] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAdminLogin = () => {
    if (password === "ssladmin") {
      onAdminToggle(true);
      setIsDialogOpen(false);
      setPassword("");
      toast({
        title: "Admin Access Granted",
        description: "You now have full editing privileges",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Incorrect password",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    onAdminToggle(false);
    toast({
      title: "Logged Out",
      description: "Switched to student view",
    });
  };

  return (
    <header className="bg-gradient-primary shadow-elevated sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <GraduationCap className="h-8 w-8 text-primary-foreground" />
            <div>
              <h1 className="text-2xl font-bold text-primary-foreground">
                BCA Section 3
              </h1>
              <p className="text-sm text-primary-foreground/80">
                Routine & Study Materials
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isAdmin ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-admin/10 px-3 py-1 rounded-full">
                  <Shield className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">
                    Admin Mode
                  </span>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 text-primary-foreground hover:bg-white/20"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/10 border-white/20 text-primary-foreground hover:bg-white/20"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Admin Login
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-admin" />
                      <span>Admin Access</span>
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      type="password"
                      placeholder="Enter admin password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAdminLogin()}
                    />
                    <Button
                      onClick={handleAdminLogin}
                      className="w-full bg-gradient-primary"
                    >
                      Login as Admin
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}