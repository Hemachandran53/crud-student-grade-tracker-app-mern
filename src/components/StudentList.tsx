
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useStudents } from '@/hooks/useStudents';
import { Student } from '@/types/student';

export const StudentList = () => {
  const { students, loading, addStudent, updateStudent, deleteStudent } = useStudents();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', student_id: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStudent) {
      await updateStudent(editingStudent.id, formData);
      setEditingStudent(null);
    } else {
      await addStudent(formData);
      setIsAddOpen(false);
    }
    setFormData({ name: '', email: '', student_id: '' });
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      email: student.email || '',
      student_id: student.student_id
    });
  };

  if (loading) return <div>Loading students...</div>;

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Students</h2>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="student_id">Student ID</Label>
                <Input
                  id="student_id"
                  value={formData.student_id}
                  onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Add Student</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Student ID</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.email || 'N/A'}</TableCell>
              <TableCell>{student.student_id}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(student)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => deleteStudent(student.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingStudent && (
        <Dialog open={!!editingStudent} onOpenChange={() => setEditingStudent(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Student</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-student_id">Student ID</Label>
                <Input
                  id="edit-student_id"
                  value={formData.student_id}
                  onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Update Student</Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
};

/*
HOW TO MODIFY THE STUDENT LIST COMPONENT:

1. TO ADD SEARCH FUNCTIONALITY:
   - Add search Input above the table
   - Filter students based on search term
   - Example: const filteredStudents = students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()))

2. TO ADD SORTING:
   - Add click handlers to table headers
   - Implement sorting logic
   - Example: const sortedStudents = [...students].sort((a, b) => a.name.localeCompare(b.name))

3. TO ADD BULK OPERATIONS:
   - Add checkboxes to select multiple students
   - Add bulk delete, bulk export buttons
   - Example: const [selectedStudents, setSelectedStudents] = useState<string[]>([])

4. TO ADD PAGINATION:
   - Install pagination component or create custom one
   - Implement page-based data display
   - Example: const paginatedStudents = students.slice(page * pageSize, (page + 1) * pageSize)

5. TO ADD MORE FIELDS:
   - Add new fields to the form (phone, address, class, etc.)
   - Update the Student type in types/student.ts
   - Add corresponding table columns

6. TO ADD VALIDATION:
   - Add form validation before submission
   - Check for duplicate student IDs
   - Validate email format
   - Example: if (!formData.email.includes('@')) { setError('Invalid email'); return; }

7. TO ADD EXPORT FUNCTIONALITY:
   - Add export button to download student list as CSV/PDF
   - Use libraries like react-csv or jsPDF
   - Example: const exportToCSV = () => { ... }

8. TO ADD IMPORT FUNCTIONALITY:
   - Add file upload for CSV import
   - Parse CSV and create multiple students
   - Example: const importFromCSV = (file: File) => { ... }

9. TO CUSTOMIZE THE UI:
   - Modify table styling, add hover effects
   - Change button colors and icons
   - Add student avatars or profile pictures

10. TO ADD CONFIRMATION DIALOGS:
    - Add confirmation before deleting students
    - Use AlertDialog from shadcn/ui
    - Example: <AlertDialog>Are you sure you want to delete this student?</AlertDialog>

FORM PATTERNS:
- Use controlled inputs with state
- Reset form after successful submission
- Handle both add and edit modes with the same form
- Use proper TypeScript types for form data
- Add loading states during operations
*/
