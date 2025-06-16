
-- Update the grades table to allow values up to 100
ALTER TABLE public.grades 
ALTER COLUMN grade TYPE DECIMAL(5,2);

-- Update the check constraint to allow grades 0-100
ALTER TABLE public.grades 
DROP CONSTRAINT IF EXISTS grades_grade_check;

ALTER TABLE public.grades 
ADD CONSTRAINT grades_grade_check CHECK (grade >= 0 AND grade <= 100);
