import { menus } from "./menus";
import type { PageType } from "./menus";

export type StudyTopic = {
  page: PageType;
  category: string;
  id: string;
  label: string;
};

export const studyTopics: StudyTopic[] = menus.flatMap((menu) =>
  menu.subMenus.map((subMenu) => ({
    page: menu.id,
    category: menu.label,
    id: subMenu.id,
    label: subMenu.label,
  })),
);

export function findStudyTopic(id: string) {
  return studyTopics.find((topic) => topic.id === id);
}
