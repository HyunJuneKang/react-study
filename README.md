# React Study

React, TypeScript, React Router, Context API, Zustand, Axios 학습 프로젝트입니다.
현재 기본 실행 화면은 `section11_practice_diary` 일기 앱입니다.

## 실행 방법

```bash
npm install
```

환경설정 예시를 복사합니다.

```powershell
Copy-Item .env.example .env.development
```

```bash
npm run dev
```

기본 접속 주소는 `http://localhost:5173`입니다.

## API 설정

일기 앱은 mock 데이터를 사용하므로 Spring 서버 없이 실행할 수 있습니다. Axios 게시판 실습에는 8000번 포트의 Spring Boot 서버가 필요합니다.

```env
VITE_API_BASE_URL=http://localhost:8000
```

`VITE_` 환경변수는 브라우저에 포함될 수 있으므로 비밀번호나 비밀키를 저장하면 안 됩니다.

## 폰트와 이미지

- 폰트: `public/fonts/NanumPenScript-Regular.ttf`
- 감정 이미지: `src/assets/emotion1.png` ~ `emotion5.png`

`public` 파일은 경로 그대로 제공되고 `src/assets` 파일은 Vite가 번들링합니다. 제출할 때 두 폴더를 모두 포함해야 합니다.

## 제출물에 포함

- `src/`, `public/`
- `package.json`, `package-lock.json`
- `index.html`, `vite.config.ts`
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- `eslint.config.js`
- `tailwind.config.js`, `postcss.config.js`
- `.env.example`, `README.md`

다음은 다시 생성되므로 제출하지 않습니다.

- `node_modules/`, `dist/`
- `.git/`, `.idea/`

## 일기 앱 구조

```text
src/day06/section11_practice_diary/
├─ app/          # 앱 진입점과 라우팅
├─ components/   # UI와 입력·목록 컴포넌트
├─ contexts/     # 상태 및 액션 Context
├─ data/         # mock 데이터
├─ hooks/        # 일기 조회 Hook
├─ pages/        # 라우트 페이지
├─ types/        # 공통 TypeScript 타입
└─ utils/        # 날짜·감정 유틸리티
```
