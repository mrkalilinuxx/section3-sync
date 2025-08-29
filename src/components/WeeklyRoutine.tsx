import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit3, Plus, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TimeSlot {
  id: string;
  time: string;
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
}

interface WeeklyRoutineProps {
  isAdmin: boolean;
}

export function WeeklyRoutine({ isAdmin }: WeeklyRoutineProps) {
  const [routine, setRoutine] = useState<TimeSlot[]>([
    { id: "1", time: "9:00 - 10:00", monday: "Programming in C", tuesday: "Mathematics", wednesday: "Database", thursday: "Web Development", friday: "Computer Networks" },
    { id: "2", time: "10:00 - 11:00", monday: "Mathematics", tuesday: "Programming in C", wednesday: "Web Development", thursday: "Database", friday: "Operating System" },
    { id: "3", time: "11:00 - 12:00", monday: "Database", tuesday: "Computer Networks", wednesday: "Mathematics", thursday: "Programming in C", friday: "Web Development" },
    { id: "4", time: "12:00 - 1:00", monday: "Break", tuesday: "Break", wednesday: "Break", thursday: "Break", friday: "Break" },
    { id: "5", time: "1:00 - 2:00", monday: "Web Development", tuesday: "Operating System", wednesday: "Computer Networks", thursday: "Mathematics", friday: "Database" },
    { id: "6", time: "2:00 - 3:00", monday: "Computer Networks", tuesday: "Database", wednesday: "Operating System", thursday: "Web Development", friday: "Programming in C" },
  ]);
  
  const [editingSlot, setEditingSlot] = useState<{ slotId: string; day: string } | null>(null);
  const [editValue, setEditValue] = useState("");
  const [isAddTimeDialogOpen, setIsAddTimeDialogOpen] = useState(false);
  const [newTimeSlot, setNewTimeSlot] = useState("");
  const { toast } = useToast();

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
  const dayLabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const subjects = [
    "Programming in C",
    "Mathematics", 
    "Database",
    "Web Development",
    "Computer Networks",
    "Operating System",
    "Data Structures",
    "Software Engineering",
    "Break",
    "Free Period"
  ];

  const handleEdit = (slotId: string, day: string, currentValue: string) => {
    setEditingSlot({ slotId, day });
    setEditValue(currentValue || "");
  };

  const handleSave = () => {
    if (editingSlot) {
      setRoutine(prev => prev.map(slot => 
        slot.id === editingSlot.slotId 
          ? { ...slot, [editingSlot.day]: editValue }
          : slot
      ));
      setEditingSlot(null);
      setEditValue("");
      toast({
        title: "Routine Updated",
        description: "Changes saved successfully",
      });
    }
  };

  const handleCancel = () => {
    setEditingSlot(null);
    setEditValue("");
  };

  const addTimeSlot = () => {
    if (newTimeSlot.trim()) {
      const newSlot: TimeSlot = {
        id: Date.now().toString(),
        time: newTimeSlot,
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: ""
      };
      setRoutine(prev => [...prev, newSlot]);
      setNewTimeSlot("");
      setIsAddTimeDialogOpen(false);
      toast({
        title: "Time Slot Added",
        description: "New time slot created successfully",
      });
    }
  };

  const removeTimeSlot = (slotId: string) => {
    setRoutine(prev => prev.filter(slot => slot.id !== slotId));
    toast({
      title: "Time Slot Removed",
      description: "Time slot deleted successfully",
    });
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-foreground">
          Weekly Class Routine
        </CardTitle>
        {isAdmin && (
          <Dialog open={isAddTimeDialogOpen} onOpenChange={setIsAddTimeDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-gradient-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add Time Slot
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Time Slot</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="e.g., 3:00 - 4:00"
                  value={newTimeSlot}
                  onChange={(e) => setNewTimeSlot(e.target.value)}
                />
                <div className="flex space-x-2">
                  <Button onClick={addTimeSlot} className="flex-1">
                    Add Slot
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsAddTimeDialogOpen(false)}
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
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-routine-bg">
                <th className="border border-border p-3 text-left font-semibold">
                  Time
                </th>
                {dayLabels.map(day => (
                  <th key={day} className="border border-border p-3 text-center font-semibold min-w-[150px]">
                    {day}
                  </th>
                ))}
                {isAdmin && (
                  <th className="border border-border p-3 text-center font-semibold">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {routine.map((slot) => (
                <tr key={slot.id} className="hover:bg-muted/50 transition-colors">
                  <td className="border border-border p-3 font-medium bg-muted/30">
                    {slot.time}
                  </td>
                  {days.map(day => (
                    <td key={day} className="border border-border p-2 text-center relative group">
                      {editingSlot?.slotId === slot.id && editingSlot?.day === day ? (
                        <div className="flex items-center space-x-1">
                          <Select value={editValue} onValueChange={setEditValue}>
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {subjects.map(subject => (
                                <SelectItem key={subject} value={subject}>
                                  {subject}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button size="sm" onClick={handleSave} className="p-1">
                            <Save className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={handleCancel} className="p-1">
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="min-h-[40px] flex items-center justify-center relative">
                          <span className={`${
                            slot[day as keyof TimeSlot] === "Break" ? "text-accent font-medium" : ""
                          }`}>
                            {slot[day as keyof TimeSlot] || "—"}
                          </span>
                          {isAdmin && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEdit(slot.id, day, slot[day as keyof TimeSlot] as string)}
                              className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6"
                            >
                              <Edit3 className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      )}
                    </td>
                  ))}
                  {isAdmin && (
                    <td className="border border-border p-2 text-center">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeTimeSlot(slot.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
