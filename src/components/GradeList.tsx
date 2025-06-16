
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useGrades } from '@/hooks/useGrades';
import { useStudents } from '@/hooks/useStudents';
import { useSubjects } from '@/hooks/useSubjects';
import { GradeWithDetails } from '@/types/student';

const getLetterGrade = (score: number): string => {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
};

export const GradeList = () => {
  const { grades, loading, addGrade, updateGrade, deleteGrade } = useGrades();
  const { students } = useStudents();
  const { subjects } = useSubjects();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingGrade, setEditingGrade] = useState<GradeWithDetails | null>(null);
  const [formData, setFormData] = useState({
    student_id: '',
    subject_id: '',
    grade: '',
    semester: '',
    year: new Date().getFullYear()
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const gradeValue = parseFloat(formData.grade);
    const gradeData = {
      student_id: formData.student_id,
      subject_id: formData.subject_id,
      grade: gradeValue,
      letter_grade: getLetterGrade(gradeValue),
      semester: formData.semester,
      year: formData.year
    };

    if (editingGrade) {
      await updateGrade(editingGrade.id, gradeData);
      setEditingGrade(null);
    } else {
      await addGrade(gradeData);
      setIsAddOpen(false);
    }
    
    setFormData({
      student_id: '',
      subject_id: '',
      grade: '',
      semester: '',
      year: new Date().getFullYear()
    });
  };

  const handleEdit = (grade: GradeWithDetails) => {
    setEditingGrade(grade);
    setFormData({
      student_id: grade.student_id,
      subject_id: grade.subject_id,
      grade: grade.grade?.toString() || '',
      semester: grade.semester || '',
      year: grade.year || new Date().getFullYear()
    });
  };

  if (loading) return <div>Loading grades...</div>;

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Grades</h2>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Grade
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Grade</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="student">Student</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, student_id: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name} ({student.student_id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, subject_id: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        {subject.name} ({subject.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="grade">Grade (0-100)</Label>
                <Input
                  id="grade"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="semester">Semester</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, semester: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fall">Fall</SelectItem>
                    <SelectItem value="Spring">Spring</SelectItem>
                    <SelectItem value="Summer">Summer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Add Grade</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Letter Grade</TableHead>
            <TableHead>Semester</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {grades.map((grade) => (
            <TableRow key={grade.id}>
              <TableCell>{grade.student_name}</TableCell>
              <TableCell>{grade.subject_name} ({grade.subject_code})</TableCell>
              <TableCell>{grade.grade}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded text-sm font-medium ${
                  grade.letter_grade === 'A' ? 'bg-green-100 text-green-800' :
                  grade.letter_grade === 'B' ? 'bg-blue-100 text-blue-800' :
                  grade.letter_grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                  grade.letter_grade === 'D' ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {grade.letter_grade}
                </span>
              </TableCell>
              <TableCell>{grade.semester}</TableCell>
              <TableCell>{grade.year}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(grade)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => deleteGrade(grade.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingGrade && (
        <Dialog open={!!editingGrade} onOpenChange={() => setEditingGrade(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Grade</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="edit-student">Student</Label>
                <Select value={formData.student_id} onValueChange={(value) => setFormData({ ...formData, student_id: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name} ({student.student_id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-subject">Subject</Label>
                <Select value={formData.subject_id} onValueChange={(value) => setFormData({ ...formData, subject_id: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        {subject.name} ({subject.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-grade">Grade (0-100)</Label>
                <Input
                  id="edit-grade"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-semester">Semester</Label>
                <Select value={formData.semester} onValueChange={(value) => setFormData({ ...formData, semester: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fall">Fall</SelectItem>
                    <SelectItem value="Spring">Spring</SelectItem>
                    <SelectItem value="Summer">Summer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-year">Year</Label>
                <Input
                  id="edit-year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Update Grade</Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
};
