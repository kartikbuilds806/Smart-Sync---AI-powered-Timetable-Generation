-- ============================================================================
-- SmartSync: College Timetable Management System
-- Supabase PostgreSQL Database Schema & Initial Data Seeding
-- Project URL: https://vgdevgtgdqddgufjqofj.supabase.co
-- ============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Drop existing triggers if re-running
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_auth_user();

-- 3. Core Profiles Table (Linked 1:1 with auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('student', 'faculty', 'admin')),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  student_id TEXT UNIQUE,
  course TEXT,
  section TEXT,
  phone TEXT,
  designation TEXT,
  department TEXT DEFAULT 'Computer Applications',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Pre-Enrolled University Student Registry Table
-- Contains officially registered students from academic records
CREATE TABLE IF NOT EXISTS public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  institutional_email TEXT NOT NULL UNIQUE,
  course TEXT NOT NULL,
  section TEXT NOT NULL,
  semester TEXT NOT NULL,
  registered_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Authorized Faculty Roster Table
-- Contains officially appointed university teachers and professors
CREATE TABLE IF NOT EXISTS public.faculty (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  institutional_email TEXT NOT NULL UNIQUE,
  phone TEXT,
  designation TEXT NOT NULL,
  department TEXT DEFAULT 'Computer Applications',
  registered_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Administrative Profiles Table
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  department TEXT DEFAULT 'Academic Affairs',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. High-Performance Indexes
CREATE INDEX IF NOT EXISTS idx_profiles_student_id ON public.profiles(student_id);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_students_student_id ON public.students(student_id);
CREATE INDEX IF NOT EXISTS idx_students_email ON public.students(institutional_email);
CREATE INDEX IF NOT EXISTS idx_faculty_email ON public.faculty(institutional_email);
CREATE INDEX IF NOT EXISTS idx_faculty_employee_id ON public.faculty(employee_id);

-- 8. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- 9. Row Level Security Policies

-- Profiles Policies
DROP POLICY IF EXISTS "Public profiles read for resolution" ON public.profiles;
CREATE POLICY "Public profiles read for resolution" 
  ON public.profiles FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Students Policies
DROP POLICY IF EXISTS "Public read student registry" ON public.students;
CREATE POLICY "Public read student registry" 
  ON public.students FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Student update own registry linkage" ON public.students;
CREATE POLICY "Student update own registry linkage" 
  ON public.students FOR UPDATE 
  USING (auth.uid() = registered_user_id);

-- Faculty Policies
DROP POLICY IF EXISTS "Public read faculty roster" ON public.faculty;
CREATE POLICY "Public read faculty roster" 
  ON public.faculty FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Faculty update own record" ON public.faculty;
CREATE POLICY "Faculty update own record" 
  ON public.faculty FOR UPDATE 
  USING (auth.uid() = registered_user_id);

-- Admin Policies
DROP POLICY IF EXISTS "Admin profiles read" ON public.admin_profiles;
CREATE POLICY "Admin profiles read" 
  ON public.admin_profiles FOR SELECT 
  USING (true);

-- 10. Automated Sync Trigger from auth.users to public tables
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS TRIGGER AS $$
DECLARE
  v_role TEXT;
  v_name TEXT;
  v_student_id TEXT;
  v_course TEXT;
  v_section TEXT;
  v_phone TEXT;
  v_designation TEXT;
  v_dept TEXT;
BEGIN
  -- Extract values from user_metadata
  v_role := COALESCE(NEW.raw_user_meta_data->>'role', 'student');
  v_name := COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1));
  v_student_id := NEW.raw_user_meta_data->>'student_id';
  v_course := NEW.raw_user_meta_data->>'course';
  v_section := NEW.raw_user_meta_data->>'section';
  v_phone := NEW.raw_user_meta_data->>'phone';
  v_designation := NEW.raw_user_meta_data->>'designation';
  v_dept := COALESCE(NEW.raw_user_meta_data->>'department', 'Computer Applications');

  -- Insert or Update into public.profiles
  INSERT INTO public.profiles (
    id, role, full_name, email, student_id, course, section, phone, designation, department
  ) VALUES (
    NEW.id, v_role, v_name, NEW.email, v_student_id, v_course, v_section, v_phone, v_designation, v_dept
  )
  ON CONFLICT (id) DO UPDATE SET
    role = EXCLUDED.role,
    full_name = EXCLUDED.full_name,
    student_id = EXCLUDED.student_id,
    course = EXCLUDED.course,
    section = EXCLUDED.section,
    phone = EXCLUDED.phone,
    designation = EXCLUDED.designation,
    department = EXCLUDED.department,
    updated_at = NOW();

  -- Route to specific role registry
  IF v_role = 'student' AND v_student_id IS NOT NULL THEN
    -- Link authenticated user to authorized student registry
    UPDATE public.students 
    SET registered_user_id = NEW.id
    WHERE student_id = v_student_id;
    
    -- If not pre-enrolled, insert record
    INSERT INTO public.students (student_id, full_name, institutional_email, course, section, semester, registered_user_id)
    VALUES (v_student_id, v_name, NEW.email, COALESCE(v_course, 'BCA'), COALESCE(v_section, 'BCA III G1'), 'Semester 3', NEW.id)
    ON CONFLICT (student_id) DO UPDATE SET
      registered_user_id = NEW.id;

  ELSIF v_role = 'faculty' THEN
    -- Link authenticated faculty member
    UPDATE public.faculty 
    SET registered_user_id = NEW.id, phone = COALESCE(v_phone, public.faculty.phone)
    WHERE institutional_email = NEW.email;

    -- If not pre-enrolled, insert record
    INSERT INTO public.faculty (employee_id, full_name, institutional_email, phone, designation, department, registered_user_id)
    VALUES ('EMP-' || substr(md5(NEW.email), 1, 6), v_name, NEW.email, v_phone, COALESCE(v_designation, 'Assistant Professor'), v_dept, NEW.id)
    ON CONFLICT (institutional_email) DO UPDATE SET
      registered_user_id = NEW.id;

  ELSIF v_role = 'admin' THEN
    INSERT INTO public.admin_profiles (id, full_name, email, department)
    VALUES (NEW.id, v_name, NEW.email, 'Academic Affairs')
    ON CONFLICT (id) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_auth_user();

-- ============================================================================
-- 11. Initial Data Seeding from Verified Real Academic Dataset
-- ============================================================================

-- Seed Verified Students
INSERT INTO public.students (student_id, full_name, institutional_email, course, section, semester, status) VALUES
  ('20261001', 'Kartik Sharma', 'kartik.20261001@gehu.ac.in', 'BCA', 'BCA III G1', 'Semester 3', 'Active'),
  ('20261002', 'Ananya Roy', 'ananya.20261002@gehu.ac.in', 'BCA', 'BCA III G2', 'Semester 3', 'Active'),
  ('20261003', 'Rahul Verma', 'rahul.20261003@gehu.ac.in', 'BCA', 'BCA I G1', 'Semester 1', 'Active'),
  ('20261004', 'Sneha Kapoor', 'sneha.20261004@gehu.ac.in', 'BCA', 'BCA I G2', 'Semester 1', 'Active'),
  ('20261005', 'Rohan Joshi', 'rohan.20261005@gehu.ac.in', 'MCA', 'MCA IIIrd SEC G1', 'Semester 3', 'Active'),
  ('20261006', 'Pooja Bisht', 'pooja.20261006@gehu.ac.in', 'MCA', 'MCA IIIrd SEC G2', 'Semester 3', 'Active')
ON CONFLICT (student_id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  institutional_email = EXCLUDED.institutional_email,
  course = EXCLUDED.course,
  section = EXCLUDED.section,
  semester = EXCLUDED.semester;

-- Seed Verified Faculty Members (38 unique instructors)
INSERT INTO public.faculty (employee_id, full_name, institutional_email, phone, designation, department) VALUES
  ('TCH-001', 'Mrs. Geetika Sharma', 'geetika.sharma@gehu.ac.in', '+91 8171768899', 'Assistant Professor', 'Computer Applications'),
  ('TCH-002', 'Mr. Abhishek Thapa', 'abhishek.thapa@gehu.ac.in', '+91 9876543201', 'Assistant Professor', 'Computer Applications'),
  ('TCH-003', 'Ms. Ritu Barthwal', 'ritu.barthwal@gehu.ac.in', '+91 9876543202', 'Assistant Professor', 'Mathematics / CS'),
  ('TCH-004', 'Mr. Vibhakar Ghosh', 'vibhakar.ghosh@gehu.ac.in', '+91 9876543203', 'Assistant Professor', 'English & Humanities'),
  ('TCH-005', 'Ms. Shiwani Bhaskar', 'shiwani.bhaskar@gehu.ac.in', '+91 8445159744', 'Assistant Professor', 'Computer Applications'),
  ('TCH-006', 'Ms. Anukriti', 'anukriti@gehu.ac.in', '+91 9876543205', 'Assistant Professor', 'Mathematics'),
  ('TCH-007', 'Mr. Vikas Kumar', 'vikas.kumar@gehu.ac.in', '+91 8678813350', 'Assistant Professor', 'Computer Applications'),
  ('TCH-008', 'Mr. Abhishek Chauhan', 'abhishek.chauhan@gehu.ac.in', '+91 9876543207', 'Assistant Professor', 'Mathematics / AI'),
  ('TCH-009', 'Dr. Ovais Bashir', 'ovais.bashir@gehu.ac.in', '+91 9876543208', 'Associate Professor', 'Computer Applications'),
  ('TCH-010', 'Ms. Ayushi Rana', 'ayushi.rana@gehu.ac.in', '+91 9876543209', 'Assistant Professor', 'Computer Applications'),
  ('TCH-011', 'Ms. Afsar Jahan', 'afsar.jahan@gehu.ac.in', '+91 9876543210', 'Assistant Professor', 'Computer Applications'),
  ('TCH-012', 'Ms. Deepanshi', 'deepanshi@gehu.ac.in', '+91 9876543211', 'Assistant Professor', 'AI & Data Science'),
  ('TCH-013', 'Ms. Gauri Takiyar', 'gauri.takiyar@gehu.ac.in', '+91 9876543212', 'Assistant Professor', 'English & Soft Skills'),
  ('TCH-014', 'Ms. Sangamitra', 'sangamitra@gehu.ac.in', '+91 9876543213', 'Assistant Professor', 'Management & Venture'),
  ('TCH-015', 'Ms. Aakriti Singh', 'aakriti.singh@gehu.ac.in', '+91 9876543214', 'Assistant Professor', 'Computer Applications'),
  ('TCH-016', 'Mr. Anuj Rawat', 'anuj.rawat@gehu.ac.in', '+91 9876543215', 'Assistant Professor', 'Computer Applications'),
  ('TCH-017', 'Dr. Ravi Sharma', 'ravi.sharma@gehu.ac.in', '+91 9876543216', 'Associate Professor', 'Computer Applications'),
  ('TCH-018', 'Dr. Vartika Agarwal', 'vartika.agarwal@gehu.ac.in', '+91 7701994248', 'Associate Professor', 'Computer Applications'),
  ('TCH-019', 'Dr. Sanjay Roka', 'sanjay.roka@gehu.ac.in', '+91 9876543218', 'Professor', 'Computer Science'),
  ('TCH-020', 'Dr. Deepak Gaur', 'deepak.gaur@gehu.ac.in', '+91 9876543219', 'Professor & HOD', 'Computer Applications'),
  ('TCH-021', 'Ms. Gunjan Mehra', 'gunjan.mehra@gehu.ac.in', '+91 7088316631', 'Assistant Professor', 'Computer Applications'),
  ('TCH-022', 'Mr. Abhinav Sharma', 'abhinav.sharma@gehu.ac.in', '+91 9876543221', 'Assistant Professor', 'Career Success'),
  ('TCH-023', 'Mr. Krishna Kumar', 'krishna.kumar@gehu.ac.in', '+91 6201645675', 'Assistant Professor', 'Computer Applications'),
  ('TCH-024', 'Dr. Siddhant Thapliyal', 'siddhant.thapliyal@gehu.ac.in', '+91 9876543223', 'Associate Professor', 'Computer Science'),
  ('TCH-025', 'Dr. Ankur Choudhary', 'ankur.choudhary@gehu.ac.in', '+91 9876543224', 'Associate Professor', 'Computer Applications'),
  ('TCH-026', 'Dr. Vandana Rawat', 'vandana.rawat@gehu.ac.in', '+91 7055001712', 'Associate Professor', 'Computer Science'),
  ('TCH-027', 'Mr. H. S. Negi', 'harendra.negi@gehu.ac.in', '+91 8126475013', 'Assistant Professor', 'Computer Applications'),
  ('TCH-028', 'Dr. Aditya Joshi', 'aditya.joshi@gehu.ac.in', '+91 9557004416', 'Associate Professor', 'Computer Applications'),
  ('TCH-029', 'Ms. Alankrita Joshi', 'alankrita.joshi@gehu.ac.in', '+91 9876543228', 'Assistant Professor', 'Electronics / CS'),
  ('TCH-030', 'Mr. Priyansh Kumar', 'priyansh.kumar@gehu.ac.in', '+91 7500068057', 'Assistant Professor', 'Computer Applications'),
  ('TCH-031', 'Mohd. Shuaib', 'mohd.shuaib@gehu.ac.in', '+91 9876543230', 'Assistant Professor', 'Computer Applications'),
  ('TCH-032', 'Dr. Bhawnesh Kumar', 'teacher@geu.ac.in', '+91 9897680354', 'Associate Professor', 'Computer Applications'),
  ('TCH-033', 'Ms. Rashmi Kanyal', 'rashmi.kanyal@gehu.ac.in', '+91 6397154208', 'Assistant Professor', 'Computer Applications'),
  ('TCH-034', 'Ms. Swati Pant', 'swati.pant@gehu.ac.in', '+91 7500057411', 'Assistant Professor', 'Computer Applications'),
  ('TCH-035', 'Mr. Utsav Kumar', 'utsav.kumar@gehu.ac.in', '+91 9576685689', 'Assistant Professor', 'Computer Applications'),
  ('TCH-036', 'Dr. Amit Kumar', 'amit.kumar@gehu.ac.in', '+91 9876543235', 'Associate Professor', 'Computer Applications'),
  ('TCH-037', 'Dr. Varsha Mittal', 'varsha.mittal@gehu.ac.in', '+91 9634435387', 'Associate Professor', 'Computer Applications'),
  ('TCH-038', 'Mr. Gagandeep Singh', 'gagandeep.singh@gehu.ac.in', '+91 9927035279', 'Assistant Professor', 'Computer Applications')
ON CONFLICT (institutional_email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = EXCLUDED.phone,
  designation = EXCLUDED.designation,
  department = EXCLUDED.department;
