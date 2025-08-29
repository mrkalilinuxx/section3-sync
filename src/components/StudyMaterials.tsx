import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Upload, Plus, Trash2, FolderOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Material {
  id: string;
  name: string;
  subject: string;
  uploadDate: string;
  fileSize: string;
  downloadCount: number;
}

interface StudyMaterialsProps {
  isAdmin: boolean;
}

export function StudyMaterials({ isAdmin }: StudyMaterialsProps) {
  const [materials, setMaterials] = useState<Material[]>([
    {
      id: "1",
      name: "C Programming Basics.pdf",
      subject: "Programming in C",
      uploadDate: "2024-01-15",
      fileSize: "2.4 MB",
      downloadCount: 45
    },
    {
      id: "2", 
      name: "Database Normalization Notes.pdf",
      subject: "Database",
      uploadDate: "2024-01-10",
      fileSize: "1.8 MB",
      downloadCount: 32
    },
    {
      id: "3",
      name: "HTML CSS Tutorial.pdf",
      subject: "Web Development", 
      uploadDate: "2024-01-08",
      fileSize: "3.1 MB",
      downloadCount: 28
    },
    {
      id: "4",
      name: "Calculus Problems Set.pdf",
      subject: "Mathematics",
      uploadDate: "2024-01-05",
      fileSize: "1.5 MB",
      downloadCount: 38
    }
  ]);

  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [newFileSubject, setNewFileSubject] = useState("");
  const { toast } = useToast();

  const subjects = [
    "Programming in C",
    "Mathematics", 
    "Database",
    "Web Development",
    "Computer Networks",
    "Operating System",
    "Data Structures",
    "Software Engineering"
  ];

  const filteredMaterials = selectedSubject === "all" 
    ? materials 
    : materials.filter(m => m.subject === selectedSubject);

  const groupedMaterials = filteredMaterials.reduce((groups, material) => {
    const subject = material.subject;
    if (!groups[subject]) {
      groups[subject] = [];
    }
    groups[subject].push(material);
    return groups;
  }, {} as Record<string, Material[]>);

  const handleDownload = (materialId: string, fileName: string) => {
    setMaterials(prev => prev.map(m => 
      m.id === materialId 
        ? { ...m, downloadCount: m.downloadCount + 1 }
        : m
    ));
    toast({
      title: "Download Started",
      description: `Downloading ${fileName}`,
    });
  };

  const handleUpload = () => {
    if (newFileName.trim() && newFileSubject) {
      const newMaterial: Material = {
        id: Date.now().toString(),
        name: newFileName,
        subject: newFileSubject,
        uploadDate: new Date().toISOString().split('T')[0],
        fileSize: "0.5 MB", // Placeholder
        downloadCount: 0
      };
      setMaterials(prev => [...prev, newMaterial]);
      setNewFileName("");
      setNewFileSubject("");
      setIsUploadDialogOpen(false);
      toast({
        title: "File Uploaded",
        description: "Study material added successfully",
      });
    }
  };

  const handleDelete = (materialId: string) => {
    setMaterials(prev => prev.filter(m => m.id !== materialId));
    toast({
      title: "File Deleted",
      description: "Study material removed successfully",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold">Study Materials</CardTitle>
          <div className="flex items-center space-x-4">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background"
            >
              <option value="all">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
            {isAdmin && (
              <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-secondary">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Material
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Study Material</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="File name (e.g., Chapter1.pdf)"
                      value={newFileName}
                      onChange={(e) => setNewFileName(e.target.value)}
                    />
                    <select
                      value={newFileSubject}
                      onChange={(e) => setNewFileSubject(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    >
                      <option value="">Select Subject</option>
                      {subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                    <div className="flex space-x-2">
                      <Button onClick={handleUpload} className="flex-1">
                        Upload
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsUploadDialogOpen(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {Object.keys(groupedMaterials).length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FolderOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No materials found for the selected subject</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedMaterials).map(([subject, subjectMaterials]) => (
                <div key={subject} className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-sm">
                      {subject}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {subjectMaterials.length} file{subjectMaterials.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {subjectMaterials.map((material) => (
                      <Card key={material.id} className="hover:shadow-elevated transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <FileText className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-sm truncate" title={material.name}>
                                {material.name}
                              </h3>
                              <div className="text-xs text-muted-foreground space-y-1 mt-2">
                                <p>Size: {material.fileSize}</p>
                                <p>Uploaded: {new Date(material.uploadDate).toLocaleDateString()}</p>
                                <p>Downloads: {material.downloadCount}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <Button
                              size="sm"
                              onClick={() => handleDownload(material.id, material.name)}
                              className="bg-gradient-primary"
                            >
                              <Download className="h-3 w-3 mr-2" />
                              Download
                            </Button>
                            {isAdmin && (
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDelete(material.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}