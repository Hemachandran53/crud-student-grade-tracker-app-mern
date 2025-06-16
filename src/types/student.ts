
export interface Student {
  id: string;
  name: string;
  email: string | null;
  student_id: string;
  created_at: string;
  updated_at: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  credits: number | null;
  created_at: string;
}

export interface Grade {
  id: string;
  student_id: string;
  subject_id: string;
  grade: number | null;
  letter_grade: string | null;
  semester: string | null;
  year: number | null;
  created_at: string;
  updated_at: string;
}

export interface GradeWithDetails extends Grade {
  student_name: string;
  subject_name: string;
  subject_code: string;
  students?: { name: string };
  subjects?: { name: string; code: string };
}

/*
HOW TO MODIFY THESE TYPE DEFINITIONS:

1. TO ADD NEW FIELDS TO STUDENT:
   - Add new properties to the Student interface
   - Example: phone?: string; address?: string; class?: string;
   - Update database schema accordingly
   - Update all components that use Student type

2. TO ADD NEW FIELDS TO SUBJECT:
   - Add properties like: department?: string; description?: string; instructor?: string;
   - Add prerequisites?: string[]; for subject dependencies
   - Update database schema and components

3. TO ADD NEW FIELDS TO GRADE:
   - Add properties like: assignment_type?: string; max_points?: number;
   - Add comments?: string; for additional feedback
   - Update database schema and components

4. TO MAKE FIELDS REQUIRED:
   - Remove the "?" from optional fields to make them required
   - Example: change "email: string | null" to "email: string"
   - Ensure database schema matches (NOT NULL constraints)

5. TO ADD COMPUTED FIELDS:
   - Add calculated properties to interfaces
   - Example: gpa?: number; to Student interface
   - Calculate these in hooks or components, not stored in database

6. TO ADD VALIDATION TYPES:
   - Create union types for specific values
   - Example: semester: 'Fall' | 'Spring' | 'Summer';
   - letter_grade: 'A' | 'B' | 'C' | 'D' | 'F';

7. TO ADD RELATIONSHIP TYPES:
   - Create types for joined data
   - Example: StudentWithGrades extends Student { grades: Grade[] }
   - Use these for complex queries and displays

8. TO ADD FORM TYPES:
   - Create input types for forms (without id, timestamps)
   - Example: type StudentInput = Omit<Student, 'id' | 'created_at' | 'updated_at'>
   - Use these in form components

9. TO ADD FILTER TYPES:
   - Create types for search and filter parameters
   - Example: type StudentFilter = { search?: string; class?: string; }
   - Use in search/filter components

10. TO ADD API RESPONSE TYPES:
    - Create types for API responses
    - Example: type ApiResponse<T> = { data: T; error?: string; }
    - Use for consistent API handling

BEST PRACTICES:
- Always use TypeScript strict mode
- Keep interfaces focused and single-purpose
- Use optional fields (?) for nullable database columns
- Document complex types with comments
- Keep types in sync with database schema
- Use union types for enum-like values
- Export all types that are used across components
*/
