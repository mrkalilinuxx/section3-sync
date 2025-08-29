import { Button } from "@/components/ui/button";
import { Calendar, FileText, BarChart3, MessageSquare } from "lucide-react";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const sections = [
    { id: "routine", label: "Weekly Routine", icon: Calendar },
    { id: "materials", label: "Study Materials", icon: FileText },
    { id: "analysis", label: "Subject Analysis", icon: BarChart3 },
    { id: "notices", label: "Notice Board", icon: MessageSquare },
  ];

  return (
    <nav className="bg-white shadow-card border-b">
      <div className="container mx-auto px-4">
        <div className="flex space-x-1 overflow-x-auto py-4">
          {sections.map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant={activeSection === id ? "default" : "ghost"}
              onClick={() => onSectionChange(id)}
              className={`flex-shrink-0 ${
                activeSection === id
                  ? "bg-gradient-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              <Icon className="h-4 w-4 mr-2" />
              {label}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
}