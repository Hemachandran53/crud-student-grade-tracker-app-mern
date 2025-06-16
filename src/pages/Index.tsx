
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, BookOpen, BarChart3 } from "lucide-react";
import { StudentList } from "@/components/StudentList";
import { SubjectList } from "@/components/SubjectList";
import { GradeList } from "@/components/GradeList";
import { useStudents } from "@/hooks/useStudents";
import { useSubjects } from "@/hooks/useSubjects";
import { useGrades } from "@/hooks/useGrades";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { students } = useStudents();
  const { subjects } = useSubjects();
  const { grades } = useGrades();

  console.log('Dashboard - Current data:', {
    students: students.length,
    subjects: subjects.length,
    grades: grades.length,
    gradesData: grades
  });

  // Calculate average grade
  const validGrades = grades.filter(grade => grade.grade !== null && grade.grade !== undefined && grade.grade > 0);
  const averageGrade = validGrades.length > 0 
    ? validGrades.reduce((sum, grade) => sum + (grade.grade || 0), 0) / validGrades.length 
    : 0;

  console.log('Dashboard - Grade calculations:', {
    validGrades: validGrades.length,
    averageGrade,
    allGrades: grades.map(g => ({ id: g.id, grade: g.grade, letter: g.letter_grade }))
  });

  // Count letter grades
  const letterGradeCounts = grades.reduce((acc, grade) => {
    if (grade.letter_grade) {
      acc[grade.letter_grade] = (acc[grade.letter_grade] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  console.log('Dashboard - Letter grade counts:', letterGradeCounts);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <GraduationCap className="h-10 w-10 text-blue-600" />
            Student Grade Tracker
          </h1>
          <p className="text-gray-600">Manage students, subjects, and grades efficiently</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-white">
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="students" className="data-[state=active]:bg-white">
              <Users className="h-4 w-4 mr-2" />
              Students ({students.length})
            </TabsTrigger>
            <TabsTrigger value="subjects" className="data-[state=active]:bg-white">
              <BookOpen className="h-4 w-4 mr-2" />
              Subjects ({subjects.length})
            </TabsTrigger>
            <TabsTrigger value="grades" className="data-[state=active]:bg-white">
              <GraduationCap className="h-4 w-4 mr-2" />
              Grades ({grades.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 bg-white/60 backdrop-blur-sm border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Students</p>
                    <p className="text-3xl font-bold text-blue-900">{students.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </Card>

              <Card className="p-6 bg-white/60 backdrop-blur-sm border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Subjects</p>
                    <p className="text-3xl font-bold text-green-900">{subjects.length}</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-green-600" />
                </div>
              </Card>

              <Card className="p-6 bg-white/60 backdrop-blur-sm border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Grades</p>
                    <p className="text-3xl font-bold text-purple-900">{grades.length}</p>
                  </div>
                  <GraduationCap className="h-8 w-8 text-purple-600" />
                </div>
              </Card>

              <Card className="p-6 bg-white/60 backdrop-blur-sm border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Average Grade</p>
                    <p className="text-3xl font-bold text-orange-900">
                      {averageGrade > 0 ? averageGrade.toFixed(1) : '0.0'}
                    </p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-orange-600" />
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 bg-white/60 backdrop-blur-sm border-white/20">
                <h3 className="text-lg font-semibold mb-4">Grade Distribution</h3>
                <div className="space-y-3">
                  {Object.entries(letterGradeCounts).map(([letter, count]) => (
                    <div key={letter} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          letter === 'A' ? 'default' :
                          letter === 'B' ? 'secondary' :
                          letter === 'C' ? 'outline' : 'destructive'
                        }>
                          {letter}
                        </Badge>
                        <span className="text-sm text-gray-600">Grade {letter}</span>
                      </div>
                      <span className="font-semibold">{count}</span>
                    </div>
                  ))}
                  {Object.keys(letterGradeCounts).length === 0 && (
                    <p className="text-gray-500 text-sm">No grades available yet</p>
                  )}
                </div>
              </Card>

              <Card className="p-6 bg-white/60 backdrop-blur-sm border-white/20">
                <h3 className="text-lg font-semibold mb-4">Recent Grades</h3>
                <div className="space-y-3">
                  {grades.slice(0, 5).map((grade) => (
                    <div key={grade.id} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                      <div>
                        <p className="font-medium">{grade.student_name}</p>
                        <p className="text-sm text-gray-600">{grade.subject_name}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={
                          grade.letter_grade === 'A' ? 'default' :
                          grade.letter_grade === 'B' ? 'secondary' :
                          grade.letter_grade === 'C' ? 'outline' : 'destructive'
                        }>
                          {grade.letter_grade}
                        </Badge>
                        <p className="text-sm text-gray-600 mt-1">{grade.grade}</p>
                      </div>
                    </div>
                  ))}
                  {grades.length === 0 && (
                    <p className="text-gray-500 text-sm">No grades available yet</p>
                  )}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="students">
            <StudentList />
          </TabsContent>

          <TabsContent value="subjects">
            <SubjectList />
          </TabsContent>

          <TabsContent value="grades">
            <GradeList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;

/*
HOW TO MODIFY THE DASHBOARD:

1. TO ADD NEW STATISTICS CARDS:
   - Add new Card components in the stats grid
   - Calculate new metrics (e.g., failing students, top performers)
   - Example: const failingStudents = grades.filter(g => g.letter_grade === 'F').length

2. TO ADD NEW DASHBOARD WIDGETS:
   - Create new Card components in the lower grid
   - Add charts using Recharts library
   - Example: <LineChart data={gradesTrend} />

3. TO MODIFY THE LAYOUT:
   - Change grid-cols-4 to grid-cols-3 or grid-cols-5 for different layouts
   - Adjust lg:grid-cols-2 for responsive behavior
   - Add new sections with different layouts

4. TO ADD FILTERING:
   - Add filter controls (dropdowns, date pickers)
   - Filter data based on semester, year, student class
   - Example: const filteredGrades = grades.filter(g => g.semester === selectedSemester)

5. TO ADD CHARTS AND VISUALIZATION:
   - Install recharts: npm install recharts
   - Create chart components using LineChart, BarChart, PieChart
   - Example: <PieChart data={letterGradeData} />

6. TO ADD EXPORT FUNCTIONALITY:
   - Add export buttons for dashboard data
   - Generate PDFs or CSV reports
   - Example: exportDashboardData, generateReport functions

7. TO ADD REAL-TIME UPDATES:
   - Dashboard automatically updates due to hooks
   - Add refresh button for manual updates
   - Show last updated timestamp

8. TO CUSTOMIZE COLORS AND THEMES:
   - Modify gradient classes: from-blue-50 to from-purple-50
   - Change icon colors: text-blue-600 to text-green-600
   - Update card backgrounds and borders

COMMON PATTERNS:
- Use consistent spacing with gap-6, p-6, mb-4
- Follow color scheme: blue for students, green for subjects, purple for grades
- Keep calculations in useMemo for performance
- Use descriptive variable names for clarity
- Add loading states for better UX
*/
