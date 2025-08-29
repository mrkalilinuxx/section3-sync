import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Clock, BookOpen, TrendingUp } from "lucide-react";

interface SubjectAnalysisProps {
  isAdmin: boolean;
}

export function SubjectAnalysis({ isAdmin }: SubjectAnalysisProps) {
  // Mock data - in real app this would be calculated from the routine
  const subjectData = [
    { subject: "Programming in C", hours: 8, percentage: 20, color: "bg-primary" },
    { subject: "Mathematics", hours: 8, percentage: 20, color: "bg-secondary" },
    { subject: "Database", hours: 7, percentage: 17.5, color: "bg-accent" },
    { subject: "Web Development", hours: 7, percentage: 17.5, color: "bg-purple-500" },
    { subject: "Computer Networks", hours: 6, percentage: 15, color: "bg-green-500" },
    { subject: "Operating System", hours: 4, percentage: 10, color: "bg-orange-500" },
  ];

  const totalHours = subjectData.reduce((sum, subject) => sum + subject.hours, 0);
  const mostStudiedSubject = subjectData.reduce((prev, current) => 
    prev.hours > current.hours ? prev : current
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Weekly Hours</p>
                <p className="text-2xl font-bold text-foreground">{totalHours}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-secondary/10 rounded-full">
                <BookOpen className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Subjects</p>
                <p className="text-2xl font-bold text-foreground">{subjectData.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-accent/10 rounded-full">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Most Studied</p>
                <p className="text-lg font-bold text-foreground truncate" title={mostStudiedSubject.subject}>
                  {mostStudiedSubject.subject}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject Breakdown */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <span>Subject-wise Weekly Hours</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subjectData.map((subject, index) => (
              <div key={subject.subject} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">{subject.subject}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      {subject.hours} hrs ({subject.percentage}%)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ease-out ${subject.color}`}
                    style={{ 
                      width: `${subject.percentage}%`,
                      animationDelay: `${index * 100}ms`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Detailed Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Weekly Distribution</h3>
              <div className="space-y-3">
                {subjectData.map((subject) => (
                  <div key={subject.subject} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium">{subject.subject}</span>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{subject.hours} hours</p>
                      <p className="text-xs text-muted-foreground">{subject.percentage}% of total</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Insights</h3>
              <div className="space-y-3">
                <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-sm">
                    <strong className="text-primary">Balanced Schedule:</strong> Programming and Mathematics 
                    have equal time allocation (8 hours each), ensuring strong foundation in both theory and practice.
                  </p>
                </div>
                <div className="p-3 bg-secondary/5 border border-secondary/20 rounded-lg">
                  <p className="text-sm">
                    <strong className="text-secondary">Core Subjects:</strong> Database and Web Development 
                    get significant time (7 hours each) as they are practical, industry-relevant skills.
                  </p>
                </div>
                <div className="p-3 bg-accent/5 border border-accent/20 rounded-lg">
                  <p className="text-sm">
                    <strong className="text-accent">Optimization:</strong> Consider increasing Operating System 
                    hours if system programming becomes more important for your curriculum.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}