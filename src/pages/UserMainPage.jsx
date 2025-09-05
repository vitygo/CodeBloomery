import React, { useState } from "react";
import TheoryPage from "./TheoryPage/TheoryPage";
import ExercisesPage from "./ExercisesPage/ExercisesPage";
import FlashcardsPage from "./FlashcardsPage/FlashcardPage";
import QuizzesPage from "./QuizzesPage/QuizzesPage";
import VideosPage from "./VideosPage/VideosPage";
import ProgressPage from "./ProgressPage/ProgressPage";
import RewardsPage from "./RewardsPage/RewardsPage";
import ProjectsPage from "./ProjectsPage/ProjectsPage";
import CommunityPage from "./CommunityPage/CommunityPage";

import {
  ArrowRight,
  Badge,
  Info,
  Clipboard,
  Eye,
  Library as LibraryIcon,
  Code,
  BookOpen,
  Calendar,
  User,
  Menu,
  ChevronRight,
} from "lucide-react";
import {Link} from 'react-router-dom'
import PracticeRoom from "./PracticeRoom"
import Dashboard from "./Dashboard"

const practicePages = {
  theory: TheoryPage,
  exercises: ExercisesPage,
  flashcards: FlashcardsPage,
  quizzes: QuizzesPage,
  videos: VideosPage,
  progress: ProgressPage,
  rewards: RewardsPage,
  projects: ProjectsPage,
  community: CommunityPage,
};



/* ------------------------ Root page ------------------------ */
export default function UserMainPage() {





    const demoUser = {
      name: "Viktor",
      avatar: "/avatar.jpg",
      level: "Intermediate",
    };

  
  
    const [activeSection, setActiveSection] = useState({ id: "dashboard", title: null });
  
    return (
      <div className="min-h-screen bg-transparent text-gray-900">
        <Navbar user={demoUser} />
        <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 px-4 py-8 pl-0 pt-0">
          <aside className="md:col-span-4 lg:col-span-2 h-full">
            <SidebarRoadmap setActiveSection={setActiveSection} />
          </aside>
  
          <main className="md:col-span-8 lg:col-span-9 space-y-6 h-screen pt-20">
            <UserHeader user={demoUser}  setActiveSection={setActiveSection}/>
  
{/* Dashboard */}
{activeSection.id === "dashboard" && <Dashboard />}

{/* PracticeRoom */}
{activeSection.id !== "dashboard" && !activeSection.practiceType && (
  <PracticeRoom
    topic={activeSection.title}
    sectionId={activeSection.id}
    setActiveSection={setActiveSection}
  />
)}

{/* Practice type pages */}
{activeSection.practiceType && (() => {
  const Page = practicePages[activeSection.practiceType];
  return Page ? (
    <Page topic={activeSection.title} sectionId={activeSection.id} />
  ) : null;
})()}



          </main>
        </div>
        <Footer />
      </div>
    );
  }

/* ------------------------ Navbar ------------------------ */
/* логотип зсувається вліво (на UI відразу ліворуч), справа аватар */

export function Navbar({ user }){
    return (
      <div data-animate className="navbar border-b-0 shadow-none absolute top-0 right-0 w-full z-60 ">

        <div className="flex items-center justify-center w-full max-w-4xl mx-auto space-x-4 navbar-start">
          <a href="/" className="btn btn-ghost shadow-none text-xl bg-transparent hover:bg-transparent border-0 flex items-center justify-center">
            <img src="3.svg" className="max-h-14 pr-2.5" />
          </a>
        
        </div>
      </div>
    );
  }


// function Navbar({ user }) {
//   return (
//     <header className="w-full sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b">
//       <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <button className="p-2 rounded-md hover:bg-gray-100">
//             <Menu size={18} />
//           </button>
//           <a href="/" className="flex items-center gap-3">
//             <img src="/3.svg" alt="Logo" className="h-10" />
//           </a>
//         </div>

   
//       </div>
//     </header>
//   );
// }

/* ------------------------ Sidebar Roadmap ------------------------ */
/* Roadmap з секціями і підтемами (UI only) */
// SidebarRoadmap.jsx
export function SidebarRoadmap({ setActiveSection }) {
    const roadmap = [
      { id: "python-beginner", title: "Python Beginner", topics: ["Variables", "Data Types", "Operators", "Strings", "Lists"] },
      { id: "python-intermediate", title: "Python Intermediate", topics: ["Comprehensions", "Functions", "Files", "OOP", "Decorators"] },
      { id: "data-science", title: "Data Science Basics", topics: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "EDA"] },
      { id: "ml", title: "Machine Learning", topics: ["Scikit-Learn", "Feature Engineering", "Model Evaluation", "Regression", "Classification"] },
      { id: "projects", title: "Projects & Portfolio", topics: ["Mini Projects", "Data Analysis Projects", "Web Scraping Projects", "Deploy", "Portfolio Site"] },
      { id: "advanced-python", title: "Advanced Python", topics: ["Generators", "Context Managers", "Concurrency", "Typing", "Error Handling"] },
      { id: "web-dev", title: "Web Development with Python", topics: ["Flask", "Django", "REST APIs", "Templates", "Deployment"] },
      { id: "deep-learning", title: "Deep Learning", topics: ["TensorFlow", "Keras", "CNNs", "RNNs", "Transfer Learning"] },
      { id: "nlp", title: "Natural Language Processing", topics: ["Text Processing", "Tokenization", "Word Embeddings", "Sentiment Analysis", "Transformers"] },
      { id: "data-viz", title: "Data Visualization", topics: ["Matplotlib", "Seaborn", "Plotly", "Dash", "Interactive Charts"] },
      { id: "ai-projects", title: "AI Projects", topics: ["Prediction Models", "Classification Projects", "Clustering Projects", "NLP Projects", "Portfolio Deployment"] },
      { id: "career", title: "Career & Learning Resources", topics: ["Interview Prep", "Resume Tips", "GitHub Best Practices", "Learning Communities", "Online Courses"] },
      { id: "automation", title: "Python Automation", topics: ["Web Scraping", "Excel Automation", "Email Automation", "Scripts", "Bots"] },
      { id: "cloud", title: "Cloud & Deployment", topics: ["AWS Basics", "Docker", "Heroku", "CI/CD Pipelines", "Serverless Functions"] }
    ];


    const [expanded, setExpanded] = useState(roadmap[0].id);
  
    return (
      <div className="top-0">
        <div className="bg-white pt-20">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold pl-3">Roadmap</h4>
          </div>
  
          <nav className="space-y-3">
            {roadmap.map((r) => {
              const isOpen = expanded === r.id;
              return (
                <div key={r.id} className="overflow-hidden">
                  <button
                    onClick={() => setExpanded(prev => (prev === r.id ? null : r.id))}
                    className="w-full px-3 py-2 flex items-center justify-between hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-50 p-2 rounded-md">
                        <LibraryIcon size={16} />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-sm">{r.title}</div>
                        <div className="text-xs text-gray-500">Overview</div>
                      </div>
                    </div>
                    <ChevronRight className={`transition-transform ${isOpen ? "rotate-90" : ""}`} />
                  </button>
  
                  {isOpen && (
                    <div className="px-3 pt-2 pb-3 bg-white">
                      <ul className="space-y-1">
                        {r.topics.map((t) => (
                          <li key={t}>
                            <button
                              onClick={() => setActiveSection({ id: r.id, title: t })}
                              className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 text-sm"
                            >
                              {t}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
  
        <div className="mt-4 bg-white p-4">
          <h5 className="font-semibold mb-2">Quick actions</h5>
          <div className="flex flex-col gap-2">
            <button className="btn btn-sm">Continue course</button>
            <button className="btn btn-outline btn-sm">Export progress</button>
            <button className="btn btn-ghost btn-sm">Account settings</button>
          </div>
        </div>
      </div>
    );
  }

     
/* ------------------------ UserHeader ------------------------ */
/* Привітання користувача + кнопки */
export function UserHeader({ user, setActiveSection }) {
    return (
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="ml-2">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="h-20 w-20 rounded-full object-cover" />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center border text-gray-600">
                <User size={18} />
              </div>
            )}
          </div>
          <div>
            <div className="text-sm text-gray-500">Welcome back,</div>
            <div className="text-2xl font-semibold">{user?.name || "Student"}</div>
            <div className="text-sm text-gray-500">
              Level: <span className="font-medium">{user?.level || "Beginner"}</span>
            </div>
          </div>
        </div>
  
        <div className="flex items-center gap-3">
          <button
            className="btn btn-outline rounded-xl"
            onClick={() => setActiveSection({ id: "dashboard", title: null })}
          >
            Dashroom
          </button>
          <button className="btn bg-yellow-400 text-white rounded-xl">Continue Learning</button>
        </div>
      </div>
    );
  }
  

/* ------------------------ HeroSection (твій базовий) ------------------------ */


/* ------------------------ StatsGrid ------------------------ */
/* центральна статистика */
export function StatsGrid() {
  const stats = [
    { label: "Lessons Completed", value: "100+" },
    { label: "Daily Streak", value: "7 days" },
    { label: "Points", value: "1,520" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-sm text-gray-500">{s.label}</div>
          <div className="text-2xl font-bold mt-2">{s.value}</div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------ DailyTasks ------------------------ */
/* UI список щоденних завдань (неактивні) */
export function DailyTasks() {
  const tasks = [
    { id: 1, title: "Complete 'Lists & Tuples' exercise", time: "15 min" },
    { id: 2, title: "Daily challenge: string parsing", time: "10 min" },
    { id: 3, title: "Flashcard review: functions", time: "8 min" },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Today's Tasks</h3>
        <div className="text-sm text-gray-500">3 tasks</div>
      </div>

      <ul className="space-y-3">
        {tasks.map((t) => (
          <li key={t.id} className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 rounded-lg p-3">
            <div>
              <div className="font-medium">{t.title}</div>
              <div className="text-xs text-gray-500">{t.time}</div>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn btn-sm btn-ghost">Start</button>
              <button className="btn btn-sm btn-outline">Skip</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------ ProgressCard ------------------------ */
/* показник прогресу з прогрес-баром */
export function ProgressCard() {
  const progress = 65; // UI only
  return (
    <div className="bg-white  rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold">Overall Progress</h4>
        <div className="text-sm text-gray-500">65%</div>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
        <div className="h-3 bg-yellow-400" style={{ width: `${progress}%` }} />
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 rounded-lg text-center">
          <div className="text-xs text-gray-500">Avg Accuracy</div>
          <div className="font-semibold">87%</div>
        </div>
        <div className="p-3 rounded-lg text-center">
          <div className="text-xs text-gray-500">Avg Time</div>
          <div className="font-semibold">14m</div>
        </div>
        <div className="p-3 rounded-lg text-center">
          <div className="text-xs text-gray-500">Completed This Week</div>
          <div className="font-semibold">5</div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------ FlashcardPreview ------------------------ */
/* невелика картка флешкарти (UI only) */
export function FlashcardPreview() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold">Flashcard Preview</h4>
        <div className="text-xs text-gray-500">Quick review</div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="text-sm text-gray-700 mb-3">Q: What does <code>len('python')</code> return?</div>
        <div className="grid grid-cols-2 gap-2">
          <button className="py-2 px-3  rounded-md text-left hover:bg-gray-100">A. 4</button>
          <button className="py-2 px-3  rounded-md text-left hover:bg-gray-100">B. 5</button>
          <button className="py-2 px-3  rounded-md text-left hover:bg-gray-100">C. 6</button>
          <button className="py-2 px-3  rounded-md text-left hover:bg-gray-100">D. 7</button>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">Hint available</div>
        <div className="flex items-center gap-2">
          <button className="btn btn-sm btn-ghost">Review</button>
          <button className="btn btn-sm btn-outline">Open deck</button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------ Recommendations ------------------------ */
/* рекомендації / next steps */
export function Recommendations() {
  const recs = [
    { title: "Continue Variables", desc: "Next lesson: Advanced string formatting", eta: "12m" },
    { title: "Try today's challenge", desc: "String parsing practice", eta: "10m" },
  ];
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {recs.map((r, i) => (
        <div key={i} className="bg-white rounded-xl p-4 shadow-sm flex items-start gap-4">
          <div className="p-2 rounded-md bg-yellow-50">
            <Code size={20} />
          </div>
          <div>
            <div className="font-semibold">{r.title}</div>
            <div className="text-sm text-gray-500">{r.desc}</div>
            <div className="text-xs text-gray-400 mt-2">ETA: {r.eta}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------ Footer ------------------------ */
export function Footer(){
    return (
      <footer data-animate className="bg-white text-base-content py-16 px-8 relative z-20">
        {/* Logo Section */}
        <div className="flex justify-center mb-10">
          <img src="/3.svg" alt="Logo" className="h-12" />
        </div>
  
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center sm:text-left">
          {/* Features */}
          <nav>
            <h6 className="footer-title mb-4">Features</h6>
            <a className="link link-hover block mb-2">Daily Challenges</a>
            <a className="link link-hover block mb-2">Flashcards</a>
            <a className="link link-hover block mb-2">Monthly Subscription</a>
            <a className="link link-hover block mb-2">Interactive Lessons</a>
          </nav>
  
          {/* Platform */}
          <nav>
            <h6 className="footer-title mb-4">Platform</h6>
            <a className="link link-hover block mb-2">About Us</a>
            <a className="link link-hover block mb-2">How it Works</a>
            <a className="link link-hover block mb-2">Pricing</a>
            <a className="link link-hover block mb-2">Community</a>
          </nav>
  
          {/* Legal */}
          <nav>
            <h6 className="footer-title mb-4">Legal</h6>
            <a className="link link-hover block mb-2">Terms of Use</a>
            <a className="link link-hover block mb-2">Privacy Policy</a>
            <a className="link link-hover block mb-2">Cookie Policy</a>
          </nav>
  
          {/* Newsletter */}
          <form className="text-center sm:text-left">
            <h6 className="footer-title mb-4">Newsletter</h6>
            <fieldset className="w-full sm:w-80 mx-auto sm:mx-0">
              <label className="block mb-2">Get Python tips & updates</label>
              <div className="join w-full">
                <input
                  type="text"
                  placeholder="username@site.com"
                  className="input input-bordered join-item w-full"
                />
                <button className="btn text-white join-item bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700">
                  Subscribe
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </footer>
    );
  }