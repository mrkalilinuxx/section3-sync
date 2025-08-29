import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Plus, Edit3, Trash2, Calendar, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: "low" | "medium" | "high";
  author: string;
}

interface NoticeBoardProps {
  isAdmin: boolean;
}

export function NoticeBoard({ isAdmin }: NoticeBoardProps) {
  const [notices, setNotices] = useState<Notice[]>([
    {
      id: "1",
      title: "Upcoming Mid-Term Exams",
      content: "Mid-term examinations will be conducted from February 15-20, 2024. Please prepare accordingly and check the detailed schedule on the college website.",
      date: "2024-01-20",
      priority: "high",
      author: "Admin"
    },
    {
      id: "2", 
      title: "Project Submission Deadline",
      content: "All semester projects must be submitted by February 10, 2024. Late submissions will not be accepted without valid reasons.",
      date: "2024-01-18",
      priority: "medium",
      author: "Admin"
    },
    {
      id: "3",
      title: "Library Hours Extended",
      content: "Library hours have been extended during exam period. New timings: 8:00 AM to 10:00 PM on weekdays and 9:00 AM to 6:00 PM on weekends.",
      date: "2024-01-15",
      priority: "low",
      author: "Admin"
    }
  ]);

  const [isAddNoticeOpen, setIsAddNoticeOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [newNotice, setNewNotice] = useState<{
    title: string;
    content: string;
    priority: "low" | "medium" | "high";
  }>({
    title: "",
    content: "",
    priority: "medium"
  });
  const { toast } = useToast();

  const priorityColors = {
    low: "bg-green-100 text-green-800 border-green-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200", 
    high: "bg-red-100 text-red-800 border-red-200"
  };

  const priorityIcons = {
    low: <Calendar className="h-3 w-3" />,
    medium: <MessageSquare className="h-3 w-3" />,
    high: <AlertCircle className="h-3 w-3" />
  };

  const sortedNotices = [...notices].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority] || 
           new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const handleAddNotice = () => {
    if (newNotice.title.trim() && newNotice.content.trim()) {
      const notice: Notice = {
        id: Date.now().toString(),
        title: newNotice.title,
        content: newNotice.content,
        date: new Date().toISOString().split('T')[0],
        priority: newNotice.priority,
        author: "Admin"
      };
      setNotices(prev => [notice, ...prev]);
      setNewNotice({ title: "", content: "", priority: "medium" });
      setIsAddNoticeOpen(false);
      toast({
        title: "Notice Posted",
        description: "Notice has been added successfully",
      });
    }
  };

  const handleEditNotice = (notice: Notice) => {
    setEditingNotice(notice);
    setNewNotice({
      title: notice.title,
      content: notice.content,
      priority: notice.priority
    });
  };

  const handleUpdateNotice = () => {
    if (editingNotice && newNotice.title.trim() && newNotice.content.trim()) {
      setNotices(prev => prev.map(notice => 
        notice.id === editingNotice.id 
          ? { ...notice, ...newNotice, date: new Date().toISOString().split('T')[0] }
          : notice
      ));
      setEditingNotice(null);
      setNewNotice({ title: "", content: "", priority: "medium" });
      toast({
        title: "Notice Updated",
        description: "Notice has been updated successfully",
      });
    }
  };

  const handleDeleteNotice = (noticeId: string) => {
    setNotices(prev => prev.filter(notice => notice.id !== noticeId));
    toast({
      title: "Notice Deleted",
      description: "Notice has been removed successfully",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <span>Notice Board</span>
          </CardTitle>
          {isAdmin && (
            <Dialog 
              open={isAddNoticeOpen || !!editingNotice} 
              onOpenChange={(open) => {
                if (!open) {
                  setIsAddNoticeOpen(false);
                  setEditingNotice(null);
                  setNewNotice({ title: "", content: "", priority: "medium" });
                }
              }}
            >
              <DialogTrigger asChild>
                <Button 
                  onClick={() => setIsAddNoticeOpen(true)}
                  className="bg-gradient-primary"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Notice
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingNotice ? "Edit Notice" : "Add New Notice"}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Notice title"
                    value={newNotice.title}
                    onChange={(e) => setNewNotice(prev => ({ ...prev, title: e.target.value }))}
                  />
                  <Textarea
                    placeholder="Notice content"
                    value={newNotice.content}
                    onChange={(e) => setNewNotice(prev => ({ ...prev, content: e.target.value }))}
                    rows={6}
                  />
                  <select
                    value={newNotice.priority}
                    onChange={(e) => setNewNotice(prev => ({ ...prev, priority: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                  <div className="flex space-x-2">
                    <Button 
                      onClick={editingNotice ? handleUpdateNotice : handleAddNotice} 
                      className="flex-1"
                    >
                      {editingNotice ? "Update Notice" : "Post Notice"}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setIsAddNoticeOpen(false);
                        setEditingNotice(null);
                        setNewNotice({ title: "", content: "", priority: "medium" });
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </CardHeader>
        <CardContent>
          {sortedNotices.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No notices posted yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedNotices.map((notice) => (
                <Card key={notice.id} className="hover:shadow-elevated transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="font-semibold text-lg text-foreground">
                            {notice.title}
                          </h3>
                          <Badge 
                            variant="outline" 
                            className={`${priorityColors[notice.priority]} flex items-center space-x-1`}
                          >
                            {priorityIcons[notice.priority]}
                            <span className="capitalize">{notice.priority}</span>
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {notice.content}
                        </p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Posted on {new Date(notice.date).toLocaleDateString()}</span>
                          <span className="mx-2">•</span>
                          <span>By {notice.author}</span>
                        </div>
                      </div>
                      {isAdmin && (
                        <div className="flex items-center space-x-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditNotice(notice)}
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteNotice(notice.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}