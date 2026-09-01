import { create } from "zustand";
import { mockData } from "../data/BoardData";

export interface postType {
  bno: number;
  title: string;
  content: string;
  writer: string;
  regDate?: number;
  modDate?: number;
}

interface BoardStoreType {
  posts: postType[];
  idRef: number;
  selectedId: number | null;

  onCreate: (title: string, content: string, writer: string) => void;

  onUpdate: (
    targetId: number,
    title: string,
    content: string,
    writer: string,
  ) => void;

  onDelete: (targetId: number) => void;
  onSelect: (targetId: number | null) => void;
}

const useBoardStore = create<BoardStoreType>((set) => ({
  posts: mockData,
  idRef: 2,
  selectedId: null,

  onCreate: (title, content, writer) =>
    set((state) => ({
      posts: [
        {
          bno: state.idRef,
          title,
          content,
          writer,
          regDate: new Date().getTime(),
        },
        ...state.posts,
      ],
      idRef: state.idRef + 1,
    })),

  onUpdate: (targetId, title, content, writer) =>
    set((state) => ({
      posts: state.posts.map((it) =>
        it.bno === targetId
          ? {
              ...it,
              title,
              content,
              writer,
              modDate: new Date().getTime(),
            }
          : it,
      ),
      selectedId: null,
    })),

  onDelete: (targetId) =>
    set((state) => ({
      posts: state.posts.filter((it) => it.bno !== targetId),
      selectedId: state.selectedId === targetId ? null : state.selectedId,
    })),

  onSelect: (targetId) =>
    set(() => ({
      selectedId: targetId,
    })),
}));

export default useBoardStore;
