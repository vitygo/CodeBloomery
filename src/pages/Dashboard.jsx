import React from "react";
import { Code } from "lucide-react";
import {StatsGrid} from "./UserMainPage";
import {DailyTasks} from "./UserMainPage";
import {ProgressCard} from "./UserMainPage";
import {FlashcardPreview} from "./UserMainPage";
import {Recommendations} from "./UserMainPage";

import gsap from "gsap";




export default function Dashboard() {
  return (
    <>
      <StatsGrid />
      <div className="grid md:grid-cols-2 gap-6">
        <DailyTasks />
        <div className="space-y-6">
          <ProgressCard />
          <FlashcardPreview />
        </div>
      </div>
      <Recommendations />
    </>
  );
}
