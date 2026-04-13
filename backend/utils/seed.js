const Admin = require('../models/Admin');
const About = require('../models/About');
const Course = require('../models/Course');
const Notice = require('../models/Notice');

const seed = async () => {
  try {
    // Create default admin
    const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL || 'admin@knsingh.edu.in' });
    if (!adminExists) {
      await Admin.create({
        email: process.env.ADMIN_EMAIL || 'admin@knsingh.edu.in',
        password: process.env.ADMIN_PASSWORD || 'Admin@123',
        name: 'Administrator',
      });
      console.log('Default admin created');
    }

    // Create default About
    const aboutExists = await About.findOne();
    if (!aboutExists) {
      await About.create({
        vision: 'To be a premier educational institution that nurtures academic excellence, moral values, and holistic development of students from rural Uttar Pradesh.',
        mission: 'Our mission is to provide quality education, foster critical thinking, and prepare students to be responsible citizens who contribute positively to society and the nation.',
        history: 'K N Singh Inter College was established in 1985 with a vision to bring quality education to the rural heartland of Azamgarh. Named after the visionary educationist Late K N Singh, the college has grown from a small institution to a beacon of learning for thousands of students across the region. Over the decades, we have produced graduates who have excelled in various fields including civil services, medicine, engineering, and the arts.',
        principalMessage: 'Welcome to K N Singh Inter College. Our institution stands as a testament to the belief that quality education should be accessible to all, regardless of geography or economic background. We are committed to providing an environment that encourages learning, creativity, and character development. I invite all aspiring students to join our family and embark on a journey of knowledge and growth.',
        principalName: 'Dr. Ramesh Kumar Singh',
        stats: {
          established: '1985',
          students: '2500+',
          faculty: '45+',
          courses: '12+',
        },
        contactInfo: {
          address: 'Masuriyapur, Azamgarh, Uttar Pradesh - 276001',
          phone: '+91 98765 43210',
          email: 'info@knsingh.edu.in',
          website: 'www.knsingh.edu.in',
        },
      });
      console.log('Default About content created');
    }

    // Seed sample courses
    const courseCount = await Course.countDocuments();
    if (courseCount === 0) {
      await Course.insertMany([
        {
          title: 'Intermediate Science (PCM)',
          description: 'Physics, Chemistry and Mathematics stream for students aspiring for engineering and technical fields.',
          duration: '2 Years',
          eligibility: 'Class 10 pass with minimum 50% marks',
          seats: 60,
          category: 'Science',
          subjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Hindi'],
        },
        {
          title: 'Intermediate Science (PCB)',
          description: 'Physics, Chemistry and Biology stream for students aspiring for medical and life sciences.',
          duration: '2 Years',
          eligibility: 'Class 10 pass with minimum 50% marks',
          seats: 60,
          category: 'Science',
          subjects: ['Physics', 'Chemistry', 'Biology', 'English', 'Hindi'],
        },
        {
          title: 'Intermediate Arts',
          description: 'Humanities stream covering History, Geography, Political Science and Literature.',
          duration: '2 Years',
          eligibility: 'Class 10 pass',
          seats: 120,
          category: 'Arts',
          subjects: ['History', 'Geography', 'Political Science', 'Hindi', 'English', 'Sociology'],
        },
        {
          title: 'Intermediate Commerce',
          description: 'Commerce stream with Accountancy, Business Studies and Economics.',
          duration: '2 Years',
          eligibility: 'Class 10 pass',
          seats: 80,
          category: 'Commerce',
          subjects: ['Accountancy', 'Business Studies', 'Economics', 'Hindi', 'English'],
        },
      ]);
      console.log('Sample courses created');
    }

    // Seed sample notices
    const noticeCount = await Notice.countDocuments();
    if (noticeCount === 0) {
      await Notice.insertMany([
        {
          title: 'Admission Open for Session 2024-25',
          content: '<p>Admissions are now open for Intermediate (Class XI) for the academic session 2024-25. Interested students can collect the application form from the college office or download it from the website. Last date to apply is 30th June 2024.</p>',
          category: 'Admission',
          isImportant: true,
        },
        {
          title: 'Annual Sports Day – April 15, 2024',
          content: '<p>The Annual Sports Day will be held on April 15, 2024. All students are requested to participate enthusiastically. Registration for events is open till April 10, 2024. Contact the Physical Education Department for details.</p>',
          category: 'Event',
          isImportant: false,
        },
        {
          title: 'Half-Yearly Examination Schedule Released',
          content: '<p>The half-yearly examination schedule for all classes has been released. Students are advised to check the notice board for their respective timetables. The examinations will commence from November 1, 2024.</p>',
          category: 'Exam',
          isImportant: true,
        },
      ]);
      console.log('Sample notices created');
    }

  } catch (error) {
    console.error('Seed error:', error.message);
  }
};

module.exports = seed;
