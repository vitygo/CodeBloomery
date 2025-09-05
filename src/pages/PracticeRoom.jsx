import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { BookOpen, Pencil, Zap, MessageCircle, Video, Star, Award, Code, Globe } from "lucide-react";

export default function PracticeRoom({ topic, sectionId, setActiveSection }) {
  const cardsRef = useRef([]);

  const cards = [
    { type: "theory", title: "Theory", description: "Read materials and explanations", icon: <BookOpen size={28} /> },
    { type: "exercises", title: "Exercises", description: "Complete practical tasks", icon: <Pencil size={28} /> },
    { type: "flashcards", title: "Flashcards", description: "Review key terms", icon: <Zap size={28} /> },
    { type: "quizzes", title: "Quizzes", description: "Test your knowledge", icon: <MessageCircle size={28} /> },
    { type: "videos", title: "Video Lessons", description: "Watch educational videos", icon: <Video size={28} /> },
    { type: "progress", title: "Progress", description: "Track your achievements", icon: <Star size={28} /> },
    { type: "rewards", title: "Rewards", description: "Earn badges and certificates", icon: <Award size={28} /> },
    { type: "projects", title: "Projects", description: "Work on real-life tasks", icon: <Code size={28} /> },
    { type: "community", title: "Community", description: "Join discussions and forums", icon: <Globe size={28} /> },
  ];
  

  useEffect(() => {
    // Очищаємо старі анімації
    gsap.killTweensOf(cardsRef.current);
    // Анімуємо всі картки заново при зміні topic
    gsap.fromTo(
      cardsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power2.out" }
    );
  }, [topic]);

  return (
    <div className="p-8 bg-transparent min-h-screen">
      <h2 className="text-3xl font-bold mb-8">{topic}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
            <div
            key={card.title}
            ref={(el) => (cardsRef.current[index] = el)}
            className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer flex flex-col items-center text-center"
            onClick={() =>
              setActiveSection({
                id: `${sectionId}-${card.type}`,
                title: topic,
                practiceType: card.type,
              })
            }
          >
            <div className="text-blue-500 mb-4">{card.icon}</div>
            <h3 className="font-semibold text-xl mb-2">{card.title}</h3>
            <p className="text-gray-500 text-base">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}