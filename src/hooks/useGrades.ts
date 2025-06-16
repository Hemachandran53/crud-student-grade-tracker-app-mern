
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Grade, GradeWithDetails } from '@/types/student';
import { useToast } from '@/hooks/use-toast';

export const useGrades = () => {
  const [grades, setGrades] = useState<GradeWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchGrades = async () => {
    try {
      console.log('Fetching grades...');
      const { data, error } = await supabase
        .from('grades')
        .select(`
          *,
          students!inner(name),
          subjects!inner(name, code)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Raw grades data:', data);
      
      const gradesWithDetails: GradeWithDetails[] = (data || []).map(item => ({
        id: item.id,
        student_id: item.student_id,
        subject_id: item.subject_id,
        grade: item.grade,
        letter_grade: item.letter_grade,
        semester: item.semester,
        year: item.year,
        created_at: item.created_at,
        updated_at: item.updated_at,
        student_name: item.students?.name || '',
        subject_name: item.subjects?.name || '',
        subject_code: item.subjects?.code || ''
      }));
      
      console.log('Processed grades:', gradesWithDetails);
      setGrades(gradesWithDetails);
    } catch (error) {
      console.error('Error fetching grades:', error);
      toast({
        title: "Error",
        description: "Failed to fetch grades",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addGrade = async (grade: Omit<Grade, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      console.log('Adding grade:', grade);
      const { data, error } = await supabase
        .from('grades')
        .insert([grade])
        .select();

      if (error) {
        console.error('Error adding grade:', error);
        throw error;
      }
      
      console.log('Grade added successfully:', data);
      await fetchGrades(); // Refresh data
      toast({
        title: "Success",
        description: "Grade added successfully",
      });
    } catch (error) {
      console.error('Error adding grade:', error);
      toast({
        title: "Error",
        description: "Failed to add grade. Check if this grade already exists for the student.",
        variant: "destructive",
      });
    }
  };

  const updateGrade = async (id: string, updates: Partial<Grade>) => {
    try {
      console.log('Updating grade:', id, updates);
      const { error } = await supabase
        .from('grades')
        .update(updates)
        .eq('id', id);

      if (error) {
        console.error('Error updating grade:', error);
        throw error;
      }
      
      console.log('Grade updated successfully');
      await fetchGrades(); // Refresh data
      toast({
        title: "Success",
        description: "Grade updated successfully",
      });
    } catch (error) {
      console.error('Error updating grade:', error);
      toast({
        title: "Error",
        description: "Failed to update grade",
        variant: "destructive",
      });
    }
  };

  const deleteGrade = async (id: string) => {
    try {
      console.log('Deleting grade:', id);
      const { error } = await supabase
        .from('grades')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting grade:', error);
        throw error;
      }
      
      console.log('Grade deleted successfully');
      // Update local state immediately for better UX
      setGrades(prev => prev.filter(g => g.id !== id));
      toast({
        title: "Success",
        description: "Grade deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting grade:', error);
      toast({
        title: "Error",
        description: "Failed to delete grade",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchGrades();

    // Create a unique channel name to avoid conflicts - using timestamp + random string
    const channelName = `grades-changes-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Set up real-time subscription for grades table
    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'grades'
        },
        (payload) => {
          console.log('Real-time grade change detected:', payload);
          fetchGrades(); // Refresh data when changes occur
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up grades subscription');
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    grades,
    loading,
    addGrade,
    updateGrade,
    deleteGrade,
    refetch: fetchGrades
  };
};

/*
HOW TO MODIFY THIS HOOK:

1. TO ADD NEW GRADE OPERATIONS:
   - Add new function like: const bulkAddGrades = async (grades: Grade[]) => { ... }
   - Include it in the return object
   - Example: bulkDeleteGrades, exportGrades, importGrades

2. TO MODIFY FETCH QUERY:
   - Change the .select() clause to include/exclude fields
   - Add .filter() conditions for specific data
   - Modify .order() for different sorting
   - Example: .filter('semester', 'eq', 'Fall')

3. TO ADD VALIDATION:
   - Add validation before database operations
   - Example: if (grade.grade < 0 || grade.grade > 100) throw new Error('Invalid grade')

4. TO MODIFY REAL-TIME UPDATES:
   - Change the 'event' property ('INSERT', 'UPDATE', 'DELETE', or '*' for all)
   - Add filters: { event: 'INSERT', filter: 'semester=eq.Fall' }
   - Listen to different tables by changing 'table' property

5. TO ADD CACHING:
   - Add localStorage or sessionStorage operations
   - Implement cache invalidation logic
   - Consider using React Query for better caching

6. TO ADD OFFLINE SUPPORT:
   - Store operations in local queue when offline
   - Sync when back online
   - Use navigator.onLine to detect connectivity

COMMON PATTERNS:
- Always handle errors with try-catch
- Show user feedback with toast notifications
- Update local state for immediate UI feedback
- Log operations for debugging
- Use proper TypeScript types for type safety
*/
