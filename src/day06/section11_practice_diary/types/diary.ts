export type Diary = {
  id: number;
  date: number;
  content: string;
  emotionId: number;
};

export type DiaryFormData = {
  date: Date;
  content: string;
  emotionId: number;
};
