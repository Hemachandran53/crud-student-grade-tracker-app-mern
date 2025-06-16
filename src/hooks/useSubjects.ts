
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Subject } from '@/types/student';
import { useToast } from '@/hooks/use-toast';

export const useSubjects = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchSubjects = async () => {
    try {
      const { data, error } = await supabase
        .from('subjects')
        .select('*')
        .order('name');

      if (error) throw error;
      setSubjects(data || []);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      toast({
        title: "Error",
        description: "Failed to fetch subjects",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addSubject = async (subject: Omit<Subject, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('subjects')
        .insert([subject])
        .select()
        .single();

      if (error) throw error;
      setSubjects(prev => [...prev, data]);
      toast({
        title: "Success",
        description: "Subject added successfully",
      });
    } catch (error) {
      console.error('Error adding subject:', error);
      toast({
        title: "Error",
        description: "Failed to add subject",
        variant: "destructive",
      });
    }
  };

  const deleteSubject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('subjects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setSubjects(prev => prev.filter(s => s.id !== id));
      toast({
        title: "Success",
        description: "Subject deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting subject:', error);
      toast({
        title: "Error",
        description: "Failed to delete subject",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return {
    subjects,
    loading,
    addSubject,
    deleteSubject,
    refetch: fetchSubjects
  };
};

/*
HOW TO MODIFY THIS HOOK:

1. TO ADD UPDATE FUNCTIONALITY:
   - Add updateSubject function similar to updateStudent in useStudents.ts
   - Include it in the return object

2. TO ADD VALIDATION:
   - Validate subject code format (e.g., must be uppercase)
   - Check credit limits (1-6 credits)
   - Example: if (subject.credits < 1 || subject.credits > 6) throw new Error('Invalid credits')

3. TO ADD FILTERING:
   - Filter by department, credit hours, etc.
   - Example: .filter('credits', 'gte', 3) for subjects with 3+ credits

4. TO ADD PREREQUISITES:
   - Extend Subject type to include prerequisites array
   - Add functions to manage prerequisite relationships

5. TO ADD SUBJECT CATEGORIES:
   - Add department/category field to Subject type
   - Group subjects by categories in the UI

6. TO ADD REAL-TIME UPDATES:
   - Copy real-time subscription pattern from useGrades
   - Listen to 'subjects' table changes

COMMON PATTERNS:
- Use consistent naming conventions (addX, updateX, deleteX)
- Always handle errors gracefully
- Provide user feedback through toasts
- Keep functions focused and single-purpose
- Use TypeScript for type safety
*/
