import { ArrowRight, Badge, Info, Clipboard, Eye, GitBranch, Code, LibraryBig, BookOpen, Calendar } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {Link} from 'react-router-dom'

export default function HomePage(){
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const elems = document.querySelectorAll('[data-animate]');
    elems.forEach((el, i) => {
      gsap.from(el, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: i * 0.04,
        scrollTrigger: {
          trigger: el,
          start: 'top 94%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      {/* <FlashcardsQuizSection /> */}
      <PythonCurriculumSection />
      <PricingSection />
      <AuthSection />
      <SuccessStoriesSection />
      <CallToActionSection />
      <FAQSection />
      <Footer />
    </div>
  );
}

function Navbar(){
  return (
    <div data-animate className="navbar border-b-0 shadow-none absolute top-0 right-3 w-full z-50">
      <div className="flex items-center justify-center w-full max-w-4xl mx-auto space-x-4 navbar-start">
        <a className="btn btn-ghost shadow-none text-xl bg-transparent hover:bg-transparent border-0 flex items-center justify-center">
          <img src="3.svg" className="max-h-14 pr-2.5" />
        </a>
      </div>
    </div>
  );
}



function HeroSection(){
  return (
    <div data-animate className="hero bg-transpaernt-200 min-h-[65vh] items-start pt-24 bg-transtparent">
      <div className="hero-content text-center ">
        <div className="max-w-xl relative top-10">
          {/* badge*/}
          <span className="inline-flex items-center rounded-full bg-white px-3 py-2 m-7 text-xs font-medium text-black shadow-sm">
            <span className="inline-flex items-center gap-1">
              <Badge color='green' size={12} strokeWidth={2} />
              <span>5+ New Lessons</span>
            </span>
            <span className="mx-2 h-4 border-l border-white/60"></span>
            <span className="inline-flex items-center gap-1">
              <Info color="orange" size={12} strokeWidth={2} />
              <span>Read More</span>
            </span>
            <ArrowRight size={12} strokeWidth={2} className="ml-2" />
          </span>

          <h1 className="font-medium text-7xl transition-colors duration-300 text-gray-900 dark:text-gray-50 ">Master Python</h1>
          <h2 className="text-7xl font-bold bg-gradient-to-r from-yellow-500 via-yelow-500 to-blue-500 bg-clip-text text-transparent pb-6">
            Learn by doing
          </h2>
          <p className="text-base sm:text-lg mb-7 mt-4 sm:mb-8 max-w-l mx-auto leading-relaxed transition-colors duration-300 px-4 sm:px-0 text-gray-600 dark:text-gray-200 ">
            Learn Python with interactive flashcards, daily challenges, and a variety of proven study methods. Build real skills, one step at a time.
          </p>

          <div className="w-full flex flex-col items-center gap-8">
            {/* Верхні кнопки */}
            <div className="flex flex-wrap justify-center gap-4">
              {/* One-Click Copy */}
              <button className="flex items-center gap-3 rounded-xl bg-white px-5 py-4 shadow-md hover:shadow-lg transition-shadow">
                <Clipboard className="text-yellow-500" size={20} />
                <div className="flex flex-col items-start min-w-77">
                  <span className="font-semibold text-gray-900">One-Click Practice</span>
                  <span className="text-sm text-gray-500">Start coding instantly in your browser</span>
                </div>
              </button>

              {/* Live Preview */}
              <button className="flex items-center gap-3 rounded-xl bg-white px-5 py-4 shadow-md hover:shadow-lg transition-shadow">
                <Eye className="text-blue-500" size={20} />
                <div className="flex flex-col items-start">
                  <span className="font-semibold text-gray-900">Live Demos</span>
                  <span className="text-sm text-gray-500">See concepts in action with real-time examples.</span>
                </div>
              </button>
            </div>

            {/* Нижні кнопки */}
            <div className="flex flex-wrap justify-center gap-4">
              {/* Contribute Here */}
              <button className="flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-white font-medium shadow-md hover:shadow-lg transition-shadow">
                <LibraryBig size={18} />
                <Link to='usermainpage'>Start Learning Now!</Link>
              </button>

              {/* Browse Patterns */}
              <button className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-gray-900 font-medium shadow-md hover:shadow-lg transition-shadow">
                <Code size={18} />
                Browse Courses
              </button>
            </div>

            {/* Роздільна лінія */}
            <div className="w-full max-w-4xl border-t border-gray-200"></div>

            {/* Статистика */}
            <div className="flex flex-wrap justify-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold">100+</div>
                <div className="text-gray-500">Lessons & Exercises</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-gray-500">Free to Start</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">Python</div>
                <div className="text-gray-500">& Beyond</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturesSection(){
  return (
    <div data-animate className="hero bg-transparent-200 py-24 bg-transtparent">
      <div className="hero-content flex flex-col max-w-6xl mx-auto text-center">
        <h2 className="text-5xl font-bold mb-8 text-gray-900 dark:text-gray-50">
          Everything You Need to Master Python
        </h2>
        <p className="mb-16 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Interactive lessons, daily challenges, AI-powered hints, and hands-on projects help you learn faster and smarter. Track your progress, stay motivated, and build real skills with Python.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Feature Card 1 */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
            <Clipboard className="text-yellow-500 mb-4" size={32} />
            <h3 className="font-semibold text-xl mb-2">Interactive Lessons</h3>
            <p className="text-gray-500 dark:text-gray-300">
              Learn Python with real examples, mini-projects, and exercises for every topic.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
            <Eye className="text-blue-500 mb-4" size={32} />
            <h3 className="font-semibold text-xl mb-2">Daily Challenges</h3>
            <p className="text-gray-500 dark:text-gray-300">
              Practice coding every day with quizzes and exercises that reinforce your learning.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
            <GitBranch className="text-green-500 mb-4" size={32} />
            <h3 className="font-semibold text-xl mb-2">AI-Powered Guidance</h3>
            <p className="text-gray-500 dark:text-gray-300">
              Get instant hints, explanations for mistakes, and dynamic difficulty adjustment while coding.
            </p>
          </div>

          {/* Feature Card 4 */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
            <Code className="text-purple-500 mb-4" size={32} />
            <h3 className="font-semibold text-xl mb-2">Hands-On Projects</h3>
            <p className="text-gray-500 dark:text-gray-300">
              Build real Python projects, code challenges, and even interview-style tasks to solidify your skills.
            </p>
          </div>

          {/* Feature Card 5 — Flashcards */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
            <BookOpen className="text-indigo-500 mb-4" size={32} />
            <h3 className="font-semibold text-xl mb-2">Flashcards</h3>
            <p className="text-gray-500 dark:text-gray-300">
              Reinforce your memory with Python flashcards covering syntax, functions, and common algorithms.
            </p>
          </div>

          {/* Feature Card 6 — Daily Practical Tasks */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
            <Calendar className="text-teal-500 mb-4" size={32} />
            <h3 className="font-semibold text-xl mb-2">Daily Practical Tasks</h3>
            <p className="text-gray-500 dark:text-gray-300">
              Complete small daily coding exercises that reinforce concepts and improve problem-solving skills.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PythonCurriculumSection(){
  return (
    <section data-animate className="bg-transparent py-24 relative z-300">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-5xl font-bold mb-6">Python Curriculum</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Explore all the topics you will learn in Python. Click on a section to see detailed topics.
        </p>

        <div className="space-y-4 text-left max-w-3xl mx-auto">
          {/* Beginner */}
          <details className="bg-white rounded-xl shadow-lg p-6">
            <summary className="cursor-pointer text-xl font-semibold">
              🐍 Python Beginner
            </summary>
            <ul className="mt-4 space-y-2 list-disc list-inside text-gray-700">
              <li>Variables and Data Types</li>
              <li>Basic Operators</li>
              <li>Strings and String Methods</li>
              <li>Lists and Tuples</li>
              <li>Dictionaries</li>
              <li>Conditional Statements (if/else)</li>
              <li>Loops (for, while)</li>
              <li>Functions and Scope</li>
              <li>Basic Input/Output</li>
              <li>Introduction to Modules</li>
            </ul>
          </details>

          {/* Intermediate */}
          <details className="bg-white rounded-xl shadow-lg p-6">
            <summary className="cursor-pointer text-xl font-semibold">
              🧩 Python Intermediate
            </summary>
            <ul className="mt-4 space-y-2 list-disc list-inside text-gray-700">
              <li>List Comprehensions</li>
              <li>Sets and Set Operations</li>
              <li>Advanced String Formatting</li>
              <li>File Handling (read/write)</li>
              <li>Exception Handling</li>
              <li>Lambda Functions</li>
              <li>Decorators & Generators</li>
              <li>Modules and Packages</li>
              <li>OOP Basics (Classes & Objects)</li>
              <li>Debugging and Logging</li>
            </ul>
          </details>

          {/* Advanced */}
          <details className="bg-white rounded-xl shadow-lg p-6">
            <summary className="cursor-pointer text-xl font-semibold">
              🚀 Python Advanced
            </summary>
            <ul className="mt-4 space-y-2 list-disc list-inside text-gray-700">
              <li>Advanced OOP (Inheritance, Polymorphism)</li>
              <li>Iterators and Generators</li>
              <li>Decorators Deep Dive</li>
              <li>Context Managers</li>
              <li>Regular Expressions</li>
              <li>Multithreading & Multiprocessing</li>
              <li>Networking (Sockets)</li>
              <li>APIs and Requests</li>
              <li>Data Analysis with Pandas & NumPy</li>
              <li>Introduction to Web Frameworks (Flask/Django)</li>
            </ul>
          </details>

          {/* Data Science */}
          <details className="bg-white rounded-xl shadow-lg p-6">
            <summary className="cursor-pointer text-xl font-semibold">
              📊 Python for Data Science
            </summary>
            <ul className="mt-4 space-y-2 list-disc list-inside text-gray-700">
              <li>NumPy for Numerical Computation</li>
              <li>Pandas for Data Manipulation</li>
              <li>Data Visualization (Matplotlib, Seaborn)</li>
              <li>Exploratory Data Analysis (EDA)</li>
              <li>Data Cleaning and Preprocessing</li>
              <li>Statistical Analysis with Python</li>
              <li>Time Series Analysis</li>
              <li>Working with CSV/Excel/JSON</li>
            </ul>
          </details>

          {/* Machine Learning */}
          <details className="bg-white rounded-xl shadow-lg p-6">
            <summary className="cursor-pointer text-xl font-semibold">
              🤖 Python for Machine Learning
            </summary>
            <ul className="mt-4 space-y-2 list-disc list-inside text-gray-700">
              <li>Introduction to Scikit-Learn</li>
              <li>Supervised Learning (Regression & Classification)</li>
              <li>Unsupervised Learning (Clustering, PCA)</li>
              <li>Model Evaluation & Cross-Validation</li>
              <li>Feature Engineering</li>
              <li>Overfitting and Regularization</li>
              <li>Saving and Loading Models</li>
              <li>Introduction to Deep Learning (TensorFlow/PyTorch)</li>
            </ul>
          </details>

          {/* Projects / Portfolio */}
          <details className="bg-white rounded-xl shadow-lg p-6">
            <summary className="cursor-pointer text-xl font-semibold">
              💼 Projects & Portfolio
            </summary>
            <ul className="mt-4 space-y-2 list-disc list-inside text-gray-700">
              <li>Mini Python Projects (Calculator, To-Do App)</li>
              <li>Web Scraping Projects</li>
              <li>Data Analysis Reports</li>
              <li>Machine Learning Models Deployment</li>
              <li>Flask/Django Web Apps</li>
              <li>Portfolio Website Integration</li>
            </ul>
          </details>
        </div>
      </div>
    </section>
  );
}

function PricingSection(){
  return (
    <section data-animate className="bg-base-200 py-24">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-5xl font-bold mb-6 relative z-33">Choose Your Plan</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto relative z-33">
          Start learning Python today. Pick a plan that suits you: Free to try, or Premium for full access to all features.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Free Plan */}
          <div className="card bg-base-100 shadow-lg rounded-xl border border-gray-200 p-8 flex flex-col">
            <h3 className="text-2xl font-semibold mb-4">Free</h3>
            <p className="text-gray-500 mb-6">Start learning with limited access</p>
            <span className="text-4xl font-bold mb-6">$0<span className="text-lg font-normal">/mo</span></span>
            <ul className="flex-1 space-y-3 mb-6 text-gray-600">
              <li>5 Lessons & Exercises</li>
              <li>Daily Challenges</li>
              <li>Flashcards</li>
            </ul>
            <button className="btn btn-outline btn-block mt-auto">Get Started</button>
          </div>

          {/* Standard Plan */}
          <div className="relative p-1 rounded-xl bg-gradient-to-r from-blue-400 via-yellow-300 to-blue-500 transition-all duration-500 transform md:scale-104 lg:scale-105">
            <div className="card bg-white shadow-2xl rounded-xl border border-transparent p-8 flex flex-col items-center z-10">
              <span className="bg-yellow-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                Most Popular
              </span>
              <h3 className="text-2xl font-semibold mb-4">Standard</h3>
              <p className="text-gray-500 mb-6 text-center">Full access to all features for serious learners</p>
              <span className="text-4xl font-bold mb-6">
                $12<span className="text-lg font-normal">/mo</span>
              </span>
              <ul className="flex-1 space-y-3 mb-6 text-gray-600 text-center">
                <li>All Free Plan Features</li>
                <li>Unlimited Lessons & Exercises</li>
                <li>Daily Challenges & Flashcards</li>
                <li>Progress Tracking</li>
              </ul>
              <button className="btn btn-block mt-auto bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-500 hover:to-blue-700 transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="card bg-base-100 shadow-lg rounded-xl border border-gray-200 p-8 flex flex-col">
            <h3 className="text-2xl font-semibold mb-4">Premium</h3>
            <p className="text-gray-500 mb-6">All features plus one-on-one mentorship</p>
            <span className="text-4xl font-bold mb-6">$24<span className="text-lg font-normal">/mo</span></span>
            <ul className="flex-1 space-y-3 mb-6 text-gray-600">
              <li>All Standard Plan Features</li>
              <li>Personalized Mentorship</li>
              <li>Exclusive Webinars</li>
              <li>Priority Support</li>
            </ul>
            <button className="btn btn-block mt-auto bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-500 hover:to-blue-700 transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SuccessStoriesSection(){
  return (
    <section data-animate className="bg-base-100 py-20 relartive z-500">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 relative z-40">What Our Learners Say</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="card p-6 shadow-lg rounded-xl flex flex-col items-center bg-white">
            <img
              src="https://randomuser.me/api/portraits/women/65.jpg"
              alt="Alice M."
              className="w-16 h-16 rounded-full mb-4"
            />
            <p className="text-gray-600 mb-4 text-center relative z-400555">
              "I went from zero to building real Python projects in just 3 months!"
            </p>
            <h4 className="font-semibold">Alice M.</h4>
          </div>
          <div className="card p-6 shadow-lg rounded-xl flex flex-col items-center  bg-white">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="John D."
              className="w-16 h-16 rounded-full mb-4"
            />
            <p className="text-gray-600 mb-4 text-center">
              "Daily challenges and flashcards made learning Python fun and easy."
            </p>
            <h4 className="font-semibold">John D.</h4>
          </div>
          <div className="card p-6 shadow-lg rounded-xl flex flex-col items-center  bg-white">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Sara K."
              className="w-16 h-16 rounded-full mb-4"
            />
            <p className="text-gray-600 mb-4 text-center">
              "The mentorship program helped me land my first developer job!"
            </p>
            <h4 className="font-semibold">Sara K.</h4>
          </div>
        </div>
      </div>
    </section>
  );
}

function CallToActionSection(){
  return (
    <section data-animate className="bg-transparent text-black-800 py-20 text-center relative z-50">
      <h2 className="text-4xl font-bold mb-6">
        Ready to Level Up Your Python Skills?
      </h2>
      <p className="mb-8 max-w-xl mx-auto text-gray-900/80">
        Join thousands of learners and start building real projects today. It's fun, interactive, and you’ll see results fast.
      </p>
      <button className="btn bg-yellow-400 text-white hover:bg-blue-500 font-bold px-6 py-3 rounded-lg">
        Get Started Now
      </button>
    </section>
  );
}

function FAQSection(){
  return (
    <section data-animate className="bg-base-200 py-20 relative  z-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4 text-left max-w-3xl mx-auto">
          <details className="p-4 border rounded-lg">
            <summary className="font-semibold cursor-pointer">Do I need prior programming experience?</summary>
            <p className="mt-2 text-gray-600">No, our courses are designed for absolute beginners as well as intermediate learners.</p>
          </details>
          <details className="p-4 border rounded-lg">
            <summary className="font-semibold cursor-pointer">Can I track my progress?</summary>
            <p className="mt-2 text-gray-600">Yes! Our dashboard shows completed lessons, streaks, and achievements.</p>
          </details>
          <details className="p-4 border rounded-lg">
            <summary className="font-semibold cursor-pointer">Is there a free trial?</summary>
            <p className="mt-2 text-gray-600">Absolutely! You can start learning for free and upgrade anytime.</p>
          </details>
          <details className="p-4 border rounded-lg">
            <summary className="font-semibold cursor-pointer">Are daily challenges mandatory?</summary>
            <p className="mt-2 text-gray-600">No, they are optional, but highly recommended to reinforce your learning.</p>
          </details>
          <details className="p-4 border rounded-lg">
            <summary className="font-semibold cursor-pointer">Can I download flashcards?</summary>
            <p className="mt-2 text-gray-600">Yes, all your saved flashcards can be exported as PDF or CSV.</p>
          </details>
          <details className="p-4 border rounded-lg">
            <summary className="font-semibold cursor-pointer">What if I get stuck on a lesson?</summary>
            <p className="mt-2 text-gray-600">You can use AI hints, discussion forums, or request mentor guidance anytime.</p>
          </details>
        </div>
      </div>
    </section>
  );
}

function Footer(){
  return (
    <footer data-animate className="bg-base-200 text-base-content py-16 px-8 relative z-20">
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

function FlashcardsQuizSection(){
    const cards = [
      {
        question: "What does len('python') return?",
        choices: ["4", "5", "6", "7"],
        correctIndex: 2,
        hint: "Count the number of characters in the word.",
      },
      {
        question: "What type does the expression 3/2 have in Python 3?",
        choices: ["int", "float", "decimal", "str"],
        correctIndex: 1,
        hint: "The '/' operator always returns a floating-point number.",
      },
      {
        question: "How do you create an empty list?",
        choices: ["{}", "()", "[]", "set()"],
        correctIndex: 2,
        hint: "Use square brackets.",
      },
    ];
  
    const [index, setIndex] = useState(0);
    const [selected, setSelected] = useState(null);
    const [revealed, setRevealed] = useState(false);
    const [score, setScore] = useState(0);
  
    const current = cards[index];
    const finished = index >= cards.length;
  
    const reset = () => {
      setIndex(0);
      setSelected(null);
      setRevealed(false);
      setScore(0);
    };
  
    const onCheck = () => {
      if (revealed || selected === null) return;
      setRevealed(true);
      if (selected === current.correctIndex) setScore(s => s + 1);
    };
  
    const onNext = () => {
      if (!revealed) return;
      const next = index + 1;
      if (next < cards.length) {
        setIndex(next);
        setSelected(null);
        setRevealed(false);
      } else {
        // finish
        setIndex(cards.length);
      }
    };
  
    const onPrev = () => {
      if (index === 0) return;
      const prev = index - 1;
      setIndex(prev);
      setSelected(null);
      setRevealed(false);
    };
  
    return (
      <section data-animate className="py-20 bg-base-100">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold">Quick Flashcards</h2>
            <p className="text-gray-600 mt-2">Interactive questions like the widget, right on the page.</p>
          </div>
  
          {/* Progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Progress</span>
              <span>{Math.min(index+1, cards.length)} / {cards.length}</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
              <div
                className="h-2 bg-yellow-400 rounded-full"
                style={{ width: `${(Math.min(index+1, cards.length) / cards.length) * 100}%` }}
              />
            </div>
          </div>
  
          {/* Result screen */}
          {finished ? (
            <div className="card bg-white shadow-xl rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-semibold mb-2">Done!</h3>
              <p className="text-gray-700 mb-6">Your result: <span className="font-bold">{score}</span> out of {cards.length}</p>
              <button className="btn btn-neutral" onClick={reset}>Retake</button>
            </div>
          ) : (
            <div className="card bg-white shadow-xl rounded-2xl overflow-hidden">
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-wide text-gray-500">Flashcard</span>
                  {revealed && (
                    <span className={`px-3 py-1 text-xs rounded-full font-semibold ${selected === current.correctIndex ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {selected === current.correctIndex ? 'Correct' : 'Try again'}
                    </span>
                  )}
                </div>
  
                <h3 className="text-2xl font-semibold mb-6">{current.question}</h3>
  
                <div className="grid gap-3">
                  {current.choices.map((choice, idx) => {
                    const picked = selected === idx;
                    const correct = revealed && idx === current.correctIndex;
                    const wrong = revealed && picked && idx !== current.correctIndex;
                    return (
                      <button
                        key={idx}
                        className={`w-full text-left px-4 py-3 rounded-xl border transition shadow-sm hover:shadow ${picked ? 'border-blue-500' : 'border-gray-200'} ${correct ? 'bg-green-50 border-green-400' : ''} ${wrong ? 'bg-red-50 border-red-400' : ''}`}
                        onClick={() => { if(!revealed) setSelected(idx); }}
                        disabled={revealed}
                      >
                        <span className="font-medium">{String.fromCharCode(65+idx)}.</span> {choice}
                      </button>
                    );
                  })}
                </div>
  
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    className="btn btn-neutral flex-1"
                    onClick={onCheck}
                    disabled={revealed || selected === null}
                  >
                    Check Answer
                  </button>
                  <button
                    className="btn flex-1"
                    onClick={() => { setSelected(null); setRevealed(false); }}
                    disabled={revealed}
                  >
                    Reset Selection
                  </button>
                </div>
  
                <div className="mt-6 flex items-center justify-between">
                  <button className="btn btn-outline" onClick={onPrev} disabled={index===0}>Back</button>
                  <details className="mx-2">
                    <summary className="cursor-pointer text-sm text-gray-600">Hint</summary>
                    <p className="text-gray-700 mt-2">{current.hint}</p>
                  </details>
                  <button className={`btn ${revealed ? 'btn-primary' : 'btn-disabled'}`} onClick={onNext} disabled={!revealed}>
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
  
export function AuthSection() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="hero min-h-[70vh] relative bg-transparent">
      <div className="relative w-full flex justify-center items-start max-w-6xl mx-auto">
        {/* Жовтий кролик зліва */}
        <img
          src="./yellowbunny.png"
          className="hidden sm:block absolute top-1/2 -translate-y-1/7
                     w-4/4 max-w-[400px] left-0 sm:-left-16 md:-left-20 lg:-left-24 xl:-left-28 2xl:left-0"
          alt="yellow bunny"
        />

        {/* Синій кролик справа */}
        <img
          src="./bluebunny.png"
          className="hidden sm:block absolute top-1/2 -translate-y-1/7
                     w-4/4 max-w-[400px] right-0 sm:-right-16 md:-right-20 lg:-right-24 xl:-right-28 2xl:left-190
                     transform -scale-x-100"
          alt="blue bunny"
        />

        <div className="hero-content flex-col relative z-10">
          <div className="text-center mb-6">
            <h1 className="text-5xl font-bold">Login or Sign Up</h1>
            <p className="py-6 max-w-lg mx-auto">
              Access your progress, saved flashcards, and personalized daily
              challenges by logging in or creating a new account.
            </p>
          </div>

          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              {/* Tabs */}
              <div className="tabs tabs-boxed mb-4">
                <button
                  className={`tab ${isLogin ? "tab-active" : ""}`}
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </button>
                <button
                  className={`tab ${!isLogin ? "tab-active" : ""}`}
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </button>
              </div>

              {/* Login Form */}
              {isLogin && (
                <form className="flex flex-col gap-2">
                  <label className="label">Email</label>
                  <input type="email" className="input" placeholder="Email" />
                  <label className="label">Password</label>
                  <input
                    type="password"
                    className="input"
                    placeholder="Password"
                  />
                  <div>
                    <a className="link link-hover">Forgot password?</a>
                  </div>
                  <button className="btn btn-neutral mt-2 w-full">Login</button>
                </form>
              )}

              {/* Sign Up Form */}
              {!isLogin && (
                <form className="flex flex-col gap-2">
                  <label className="label">Full Name</label>
                  <input type="text" className="input" placeholder="Full Name" />
                  <label className="label">Email</label>
                  <input type="email" className="input" placeholder="Email" />
                  <label className="label">Password</label>
                  <input
                    type="password"
                    className="input"
                    placeholder="Password"
                  />
                  <label className="label">Confirm Password</label>
                  <input
                    type="password"
                    className="input"
                    placeholder="Confirm Password"
                  />
                  <button className="btn btn-neutral mt-2 w-full">Sign Up</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}






function FlashcardSection(){
    const card = {
      question: "Що поверне вираз len('python')?",
      choices: ["4", "5", "6", "7"],
      correctIndex: 2,
      hint: "Порахуйте кількість символів у слові.",
    };
  
    const [selected, setSelected] = useState(null);
    const [revealed, setRevealed] = useState(false);
    const isCorrect = revealed && selected === card.correctIndex;
    const isWrong = revealed && selected !== card.correctIndex;
  
    return (
      <section className="py-20 bg-base-100">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold">Try a Flashcard</h2>
            <p className="text-gray-600 mt-2">Швидка перевірка знань прямо на сторінці.</p>
          </div>
  
          <div className="card bg-white shadow-xl rounded-2xl overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wide text-gray-500">Flashcard</span>
                {revealed && (
                  <span className={`px-3 py-1 text-xs rounded-full font-semibold ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {isCorrect ? 'Correct' : 'Try again'}
                  </span>
                )}
              </div>
  
              <h3 className="text-2xl font-semibold mb-6">{card.question}</h3>
  
              <div className="grid gap-3">
                {card.choices.map((choice, idx) => {
                  const picked = selected === idx;
                  const correct = revealed && idx === card.correctIndex;
                  const wrong = revealed && picked && idx !== card.correctIndex;
                  return (
                    <button
                      key={idx}
                      className={`w-full text-left px-4 py-3 rounded-xl border transition shadow-sm hover:shadow ${picked ? 'border-blue-500' : 'border-gray-200'} ${correct ? 'bg-green-50 border-green-400' : ''} ${wrong ? 'bg-red-50 border-red-400' : ''}`}
                      onClick={() => { if(!revealed) setSelected(idx); }}
                      disabled={revealed}
                    >
                      <span className="font-medium">{String.fromCharCode(65+idx)}.</span> {choice}
                    </button>
                  );
                })}
              </div>
  
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  className="btn btn-neutral flex-1"
                  onClick={() => setRevealed(true)}
                  disabled={revealed || selected === null}
                >
                  Перевірити відповідь
                </button>
                <button
                  className="btn flex-1"
                  onClick={() => { setSelected(null); setRevealed(false); }}
                >
                  Спробувати ще раз
                </button>
              </div>
  
              {/* Hint */}
              <details className="mt-6">
                <summary className="cursor-pointer text-sm text-gray-600">Підказка</summary>
                <p className="text-gray-700 mt-2">{card.hint}</p>
              </details>
            </div>
          </div>
        </div>
      </section>
    );
  }