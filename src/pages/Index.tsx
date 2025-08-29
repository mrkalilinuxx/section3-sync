import { useState } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { WeeklyRoutine } from "@/components/WeeklyRoutine";
import { StudyMaterials } from "@/components/StudyMaterials";
import { SubjectAnalysis } from "@/components/SubjectAnalysis";
import { NoticeBoard } from "@/components/NoticeBoard";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeSection, setActiveSection] = useState("routine");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "routine":
        return <WeeklyRoutine isAdmin={isAdmin} />;
      case "materials":
        return <StudyMaterials isAdmin={isAdmin} />;
      case "analysis":
        return <SubjectAnalysis isAdmin={isAdmin} />;
      case "notices":
        return <NoticeBoard isAdmin={isAdmin} />;
      default:
        return <WeeklyRoutine isAdmin={isAdmin} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isAdmin={isAdmin} onAdminToggle={setIsAdmin} />
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="container mx-auto px-4 py-8">
        {renderActiveSection()}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
