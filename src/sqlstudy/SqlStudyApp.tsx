import { useState } from "react";
import Sidebar from "./components/Sidebar";
import StudyFooterNavigation from "./components/StudyFooterNavigation";
import TopicToolbar from "./components/TopicToolbar";
import { StudyContentPage } from "./components/study";
import { getStudyContent } from "./content";
import { studyTopics } from "./data/navigation";
import type { PageType } from "./data/menus";
import BasicConceptCard from "./features/basics/BasicConceptCard";
import { InterviewQuestionsPage } from "./features/interview";
import JoinVisualizerPage from "./features/joins/JoinVisualizerPage";
import PaginationVisualizer from "./features/performance/PaginationVisualizer";
import ExecutionOrderLab from "./features/sql/ExecutionOrderLab";

const completedStorageKey = "sql-study-completed-topics";

function getInitialCompletedTopics() {
  if (typeof window === "undefined") return new Set<string>();

  try {
    const savedTopics = window.localStorage.getItem(completedStorageKey);
    if (!savedTopics) return new Set<string>();

    const parsedTopics: unknown = JSON.parse(savedTopics);
    return Array.isArray(parsedTopics)
      ? new Set(parsedTopics.filter((topic): topic is string => typeof topic === "string"))
      : new Set<string>();
  } catch {
    return new Set<string>();
  }
}

export default function SqlStudyApp() {
  const firstTopic = studyTopics[0];
  const [currentPage, setCurrentPage] = useState<PageType>(
    firstTopic?.page ?? "database",
  );
  const [currentSubMenu, setCurrentSubMenu] = useState(
    firstTopic?.id ?? "database-and-dbms",
  );
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(
    getInitialCompletedTopics,
  );

  const currentIndex = Math.max(
    0,
    studyTopics.findIndex((topic) => topic.id === currentSubMenu),
  );
  const currentTopic = studyTopics[currentIndex] ?? firstTopic;
  const previousTopic = studyTopics[currentIndex - 1];
  const nextTopic = studyTopics[currentIndex + 1];
  const content = getStudyContent(currentSubMenu);
  const isCompleted = completedTopics.has(currentSubMenu);

  const selectTopic = (page: PageType, subMenuId: string) => {
    setCurrentPage(page);
    setCurrentSubMenu(subMenuId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleCompleted = () => {
    setCompletedTopics((previousTopics) => {
      const nextTopics = new Set(previousTopics);

      if (nextTopics.has(currentSubMenu)) {
        nextTopics.delete(currentSubMenu);
      } else {
        nextTopics.add(currentSubMenu);
      }

      window.localStorage.setItem(
        completedStorageKey,
        JSON.stringify([...nextTopics]),
      );
      return nextTopics;
    });
  };

  const interactiveContent = (() => {
    switch (currentSubMenu) {
      case "database-and-dbms":
        return <BasicConceptCard />;
      case "joins":
        return <JoinVisualizerPage />;
      case "sql-execution-order":
        return <ExecutionOrderLab />;
      case "pagination":
        return <PaginationVisualizer />;
      default:
        return undefined;
    }
  })();

  return (
    <div className="min-h-screen bg-slate-100 md:flex">
      <Sidebar
        currentPage={currentPage}
        currentSubMenu={currentSubMenu}
        completedCount={completedTopics.size}
        totalCount={studyTopics.length}
        onSelect={selectTopic}
      />

      <main className="min-w-0 flex-1 bg-slate-100">
        {currentTopic && (
          <div className="mx-auto max-w-6xl px-4 pt-5 sm:px-6 lg:px-10 lg:pt-8">
            <TopicToolbar
              category={currentTopic.category}
              title={currentTopic.label}
              isCompleted={isCompleted}
              onToggleCompleted={toggleCompleted}
            />
          </div>
        )}

        {currentPage === "interview-questions" ? (
          <InterviewQuestionsPage
            key={currentSubMenu}
            subMenuId={currentSubMenu}
          />
        ) : (
          <StudyContentPage
            key={currentSubMenu}
            content={content}
            fallbackTitle={currentTopic?.label}
            afterContent={interactiveContent}
          />
        )}

        {currentTopic && (
          <div className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-10">
            <StudyFooterNavigation
              currentIndex={currentIndex}
              totalCount={studyTopics.length}
              previous={
                previousTopic
                  ? {
                      category: previousTopic.category,
                      label: previousTopic.label,
                    }
                  : undefined
              }
              next={
                nextTopic
                  ? {
                      category: nextTopic.category,
                      label: nextTopic.label,
                    }
                  : undefined
              }
              onPrevious={() => {
                if (previousTopic) {
                  selectTopic(previousTopic.page, previousTopic.id);
                }
              }}
              onNext={() => {
                if (nextTopic) {
                  selectTopic(nextTopic.page, nextTopic.id);
                }
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
}
