
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Student } from '@/types/student';
import { useToast } from '@/hooks/use-toast';

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchStudents = async () => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('name');

      if (error) throw error;
      setStudents(data || []);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast({
        title: "Error",
        description: "Failed to fetch students",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addStudent = async (student: Omit<Student, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('students')
        .insert([student])
        .select()
        .single();

      if (error) throw error;
      setStudents(prev => [...prev, data]);
      toast({
        title: "Success",
        description: "Student added successfully",
      });
    } catch (error) {
      console.error('Error adding student:', error);
      toast({
        title: "Error",
        description: "Failed to add student",
        variant: "destructive",
      });
    }
  };

  const updateStudent = async (id: string, updates: Partial<Student>) => {
    try {
      const { data, error } = await supabase
        .from('students')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setStudents(prev => prev.map(s => s.id === id ? data : s));
      toast({
        title: "Success",
        description: "Student updated successfully",
      });
    } catch (error) {
      console.error('Error updating student:', error);
      toast({
        title: "Error",
        description: "Failed to update student",
        variant: "destructive",
      });
    }
  };

  const deleteStudent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setStudents(prev => prev.filter(s => s.id !== id));
      toast({
        title: "Success",
        description: "Student deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting student:', error);
      toast({
        title: "Error",
        description: "Failed to delete student",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return {
    students,
    loading,
    addStudent,
    updateStudent,
    deleteStudent,
    refetch: fetchStudents
  };
};

/*
HOW TO MODIFY THIS HOOK:

1. TO ADD NEW STUDENT OPERATIONS:
   - Add functions like: searchStudents, getStudentsByClass, etc.
   - Example: const searchStudents = async (query: string) => { ... }

2. TO ADD VALIDATION:
   - Validate email format before adding/updating
   - Check for duplicate student IDs
   - Example: if (!student.email.includes('@')) throw new Error('Invalid email')

3. TO ADD FILTERING AND SEARCH:
   - Modify fetchStudents to accept search parameters
   - Use .ilike() for case-insensitive search
   - Example: .ilike('name', `%${searchTerm}%`)

4. TO ADD REAL-TIME UPDATES:
   - Copy the real-time subscription pattern from useGrades
   - Listen to 'students' table changes

5. TO ADD BULK OPERATIONS:
   - Create bulkAddStudents, bulkUpdateStudents functions
   - Use .insert() with array of students for bulk insert

6. TO ADD EXPORT/IMPORT:
   - Add exportToCSV function to convert students to CSV
   - Add importFromCSV function to parse and add multiple students

COMMON PATTERNS:
- Always validate data before database operations
- Use consistent error handling and user feedback
- Update local state immediately for better UX
- Include proper TypeScript typing
- Add loading states for async operations
*/
