
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2 } from 'lucide-react';
import { useSubjects } from '@/hooks/useSubjects';

export const SubjectList = () => {
  const { subjects, loading, addSubject, deleteSubject } = useSubjects();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', code: '', credits: 3 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addSubject(formData);
    setIsAddOpen(false);
    setFormData({ name: '', code: '', credits: 3 });
  };

  if (loading) return <div>Loading subjects...</div>;

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Subjects</h2>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Subject
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Subject</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Subject Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="code">Subject Code</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="credits">Credits</Label>
                <Input
                  id="credits"
                  type="number"
                  min="1"
                  max="6"
                  value={formData.credits}
                  onChange={(e) => setFormData({ ...formData, credits: parseInt(e.target.value) })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Add Subject</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Credits</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subjects.map((subject) => (
            <TableRow key={subject.id}>
              <TableCell>{subject.name}</TableCell>
              <TableCell>{subject.code}</TableCell>
              <TableCell>{subject.credits}</TableCell>
              <TableCell>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => deleteSubject(subject.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

/*
HOW TO MODIFY THE SUBJECT LIST COMPONENT:

1. TO ADD EDIT FUNCTIONALITY:
   - Add Edit button similar to StudentList
   - Create edit state and form handling
   - Use updateSubject function from useSubjects hook (need to add this to the hook first)

2. TO ADD SEARCH AND FILTERING:
   - Add search input to filter by subject name or code
   - Add filter dropdown for credit hours
   - Example: const filteredSubjects = subjects.filter(s => s.name.includes(searchTerm))

3. TO ADD DEPARTMENT/CATEGORY:
   - Add department field to Subject type
   - Add department dropdown in the form
   - Group subjects by department in the UI

4. TO ADD PREREQUISITES:
   - Extend Subject type to include prerequisites array
   - Add prerequisite selection in the form
   - Show prerequisite relationships in the table

5. TO ADD MORE SUBJECT DETAILS:
   - Add fields like description, semester, instructor
   - Create detailed view dialog
   - Example: <Dialog>Subject Details</Dialog>

6. TO ADD VALIDATION:
   - Validate subject code format (e.g., must be uppercase)
   - Check for duplicate codes
   - Validate credit range (1-6)
   - Example: if (formData.credits < 1 || formData.credits > 6) { setError('Credits must be 1-6'); }

7. TO ADD BULK OPERATIONS:
   - Add checkboxes for selecting multiple subjects
   - Bulk delete, bulk export functionality
   - Example: const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])

8. TO ADD SORTING:
   - Make table headers clickable for sorting
   - Sort by name, code, or credits
   - Example: const sortedSubjects = [...subjects].sort((a, b) => a.name.localeCompare(b.name))

9. TO ADD SUBJECT STATISTICS:
   - Show number of enrolled students per subject
   - Average grades for each subject
   - Most/least popular subjects

10. TO CUSTOMIZE APPEARANCE:
    - Add subject icons or colors
    - Different styling for different departments
    - Credit-based badges or indicators

COMMON PATTERNS:
- Follow the same patterns as StudentList for consistency
- Use proper TypeScript types
- Handle loading and error states
- Provide user feedback through toasts
- Keep forms simple and intuitive
*/
