import type { StudyContentMap } from "./types";

export const modelingContents = {
  keys: {
    id: "keys",
    category: "데이터 모델링과 정규화",
    title: "키의 종류",
    summary:
      "키는 행을 식별하거나 테이블을 연결하며, 최소성·업무 의미·대표 여부에 따라 여러 이름으로 구분합니다.",
    tags: ["Primary Key", "Candidate Key", "Foreign Key"],
    sections: [
      {
        title: "식별 키의 관계",
        blocks: [
          {
            type: "table",
            headers: ["키", "정의", "예"],
            rows: [
              ["슈퍼키", "행을 유일하게 식별하는 컬럼 집합", "회원 ID + 이메일"],
              ["후보키", "불필요한 컬럼 없이 최소한으로 식별하는 슈퍼키", "회원 ID, 이메일"],
              ["기본키", "후보키 중 대표로 선택한 키", "회원 ID"],
              ["대체키", "후보키이지만 기본키로 선택되지 않은 키", "이메일"],
              ["복합키", "둘 이상의 컬럼으로 만든 키", "학생 ID + 과목 ID"],
            ],
          },
          {
            type: "callout",
            tone: "info",
            title: "PK와 UNIQUE",
            content:
              "Primary Key는 한 테이블의 대표 식별자이고 NULL을 허용하지 않습니다. UNIQUE는 다른 후보키의 중복을 막는 데 쓰며 한 테이블에 여러 개 둘 수 있습니다. NULL 처리 규칙은 DBMS마다 확인합니다.",
          },
        ],
      },
      {
        title: "자연키와 대리키",
        blocks: [
          {
            type: "table",
            headers: ["구분", "장점", "주의점"],
            rows: [
              ["자연키", "업무 의미가 있고 이미 유일할 수 있음", "정책 변경, 개인정보, 긴 복합키 가능성"],
              ["대리키", "짧고 안정적인 식별자, 관계 연결이 단순", "업무 중복은 별도 UNIQUE로 막아야 함"],
            ],
          },
          {
            type: "text",
            paragraphs: [
              "자동 증가 번호나 UUID를 기본키로 선택해도 이메일 같은 업무상 유일한 값에 UNIQUE 제약을 두지 않으면 중복 데이터는 여전히 들어올 수 있습니다.",
            ],
          },
        ],
      },
    ],
  },
  constraints: {
    id: "constraints",
    category: "데이터 모델링과 정규화",
    title: "제약조건",
    summary:
      "제약조건은 데이터가 저장되는 순간부터 도메인의 최소 규칙을 지키게 해 무결성을 보호합니다.",
    tags: ["NOT NULL", "UNIQUE", "CHECK", "DEFAULT"],
    sections: [
      {
        title: "주요 제약조건",
        blocks: [
          {
            type: "table",
            headers: ["제약조건", "보장하는 내용"],
            rows: [
              ["NOT NULL", "값이 반드시 존재함"],
              ["UNIQUE", "컬럼 또는 컬럼 조합이 중복되지 않음"],
              ["CHECK", "값이 지정한 조건을 만족함"],
              ["DEFAULT", "입력값을 생략했을 때 기본값을 사용함"],
              ["PRIMARY KEY", "각 행의 대표 식별자가 유일하고 NULL이 아님"],
              ["FOREIGN KEY", "참조 대상이 유효함"],
            ],
          },
          {
            type: "code",
            language: "sql",
            title: "주문 테이블의 규칙",
            code: "CREATE TABLE orders (\n  order_id BIGINT PRIMARY KEY,\n  customer_id BIGINT NOT NULL,\n  amount DECIMAL(12, 2) CHECK (amount >= 0),\n  status VARCHAR(20) NOT NULL DEFAULT 'CREATED',\n  order_number VARCHAR(40) UNIQUE,\n  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)\n);",
          },
        ],
      },
      {
        title: "애플리케이션 검증과 함께 사용하기",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "화면과 API 검증은 친절한 오류 메시지와 빠른 피드백을 제공하고, DB 제약조건은 우회 경로와 동시 요청에서도 마지막 안전망이 됩니다.",
            ],
          },
          {
            type: "callout",
            tone: "warning",
            title: "DEFAULT의 의미",
            content:
              "DEFAULT는 컬럼을 생략했을 때 적용되는 규칙입니다. 명시적으로 NULL을 넣었을 때도 기본값으로 바뀐다고 가정하지 말고 DBMS 동작과 NULL 허용 여부를 확인합니다.",
          },
        ],
      },
    ],
  },
  "referential-integrity": {
    id: "referential-integrity",
    category: "데이터 모델링과 정규화",
    title: "참조 무결성",
    summary:
      "참조 무결성은 자식 행의 외래키가 존재하는 부모 키를 가리키도록 보장해 고아 데이터를 막습니다.",
    tags: ["Foreign Key", "Referential Integrity", "Cascade"],
    sections: [
      {
        title: "부모와 자식의 관계",
        blocks: [
          {
            type: "code",
            language: "sql",
            title: "주문이 유효한 고객을 참조하도록 설정",
            code: "CREATE TABLE orders (\n  order_id BIGINT PRIMARY KEY,\n  customer_id BIGINT NOT NULL,\n  FOREIGN KEY (customer_id)\n    REFERENCES customers(customer_id)\n);",
          },
          {
            type: "list",
            items: [
              "존재하지 않는 customer_id로 주문을 추가하는 일을 막습니다.",
              "부모 키는 일반적으로 PRIMARY KEY 또는 UNIQUE여야 합니다.",
              "자식의 외래키가 NULL 가능하면 관계가 선택 사항임을 표현할 수 있습니다.",
            ],
          },
        ],
      },
      {
        title: "부모 변경·삭제 정책",
        blocks: [
          {
            type: "table",
            headers: ["정책", "부모 삭제 시 동작", "사용 시 고려"],
            rows: [
              ["RESTRICT / NO ACTION", "참조 중이면 삭제 거부", "기본적인 무결성 보호"],
              ["CASCADE", "자식도 함께 삭제", "삭제 범위가 커질 수 있음"],
              ["SET NULL", "외래키를 NULL로 변경", "컬럼이 NULL을 허용해야 함"],
            ],
          },
          {
            type: "callout",
            tone: "danger",
            title: "CASCADE는 업무 규칙입니다",
            content:
              "편리함만 보고 연쇄 삭제를 선택하면 중요한 이력까지 사라질 수 있습니다. 주문·결제처럼 보존이 필요한 데이터는 소프트 삭제나 상태 변경 정책도 함께 검토합니다.",
          },
        ],
      },
    ],
  },
  "table-relationships": {
    id: "table-relationships",
    category: "데이터 모델링과 정규화",
    title: "테이블 관계",
    summary:
      "1:1, 1:N, N:M 관계는 실제 업무 규칙을 키와 제약조건으로 옮기는 기본 모델링 도구입니다.",
    tags: ["1:1", "1:N", "N:M", "Junction Table"],
    sections: [
      {
        title: "관계별 구현 방식",
        blocks: [
          {
            type: "table",
            headers: ["관계", "예", "일반적인 구현"],
            rows: [
              ["1:1", "회원과 회원 상세", "FK에 UNIQUE를 함께 둠"],
              ["1:N", "고객과 주문", "N 쪽인 주문에 customer_id FK를 둠"],
              ["N:M", "학생과 과목", "student_id와 course_id를 가진 수강 연결 테이블"],
            ],
          },
          {
            type: "code",
            language: "sql",
            title: "N:M을 연결 테이블로 풀기",
            code: "CREATE TABLE enrollments (\n  student_id BIGINT NOT NULL,\n  course_id BIGINT NOT NULL,\n  enrolled_at TIMESTAMP NOT NULL,\n  PRIMARY KEY (student_id, course_id),\n  FOREIGN KEY (student_id) REFERENCES students(student_id),\n  FOREIGN KEY (course_id) REFERENCES courses(course_id)\n);",
          },
        ],
      },
      {
        title: "관계의 선택성과 카디널리티",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "관계 표기에는 몇 개까지 연결되는지뿐 아니라 반드시 연결되어야 하는지도 포함됩니다. 예를 들어 주문은 반드시 한 고객을 가져야 하지만 고객은 아직 주문이 없을 수 있습니다.",
              "이 규칙은 FK의 NULL 허용 여부와 UNIQUE 제약, 애플리케이션 업무 규칙으로 구체화합니다.",
            ],
          },
          {
            type: "callout",
            tone: "tip",
            title: "JOIN 행 수 예측",
            content:
              "1:N 관계를 조인하면 부모 한 행이 자식 수만큼 반복됩니다. 조인 결과를 예측할 때 관계의 최대 개수와 선택성을 먼저 생각합니다.",
          },
        ],
      },
    ],
  },
  erd: {
    id: "erd",
    category: "데이터 모델링과 정규화",
    title: "ERD와 데이터 모델링",
    summary:
      "ERD는 엔터티, 속성, 키, 관계를 그림으로 표현해 구현 전 데이터 구조와 업무 규칙을 검토하게 합니다.",
    tags: ["ERD", "Entity", "Relationship"],
    sections: [
      {
        title: "ERD에서 읽어야 할 것",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "엔터티: 회원, 주문, 상품처럼 관리할 대상이나 사건을 찾습니다.",
              "속성: 각 엔터티가 가져야 할 값과 자료형을 정의합니다.",
              "식별자: 행을 유일하게 구분할 기본키와 후보키를 고릅니다.",
              "관계: 엔터티 사이의 1:1, 1:N, N:M과 필수 여부를 표시합니다.",
              "제약: 중복, NULL, 값 범위, 삭제 정책을 결정합니다.",
            ],
          },
          {
            type: "code",
            language: "text",
            title: "간단한 주문 모델",
            code: "CUSTOMER (1) ────< (N) ORDER\nORDER    (1) ────< (N) ORDER_ITEM >──── (1) PRODUCT",
          },
        ],
      },
      {
        title: "모델링은 질문 과정입니다",
        blocks: [
          {
            type: "list",
            items: [
              "주문의 가격은 현재 상품 가격인가, 주문 당시 가격인가?",
              "회원 탈퇴 후에도 주문 이력을 보존해야 하는가?",
              "한 주문 항목에 같은 상품이 중복될 수 있는가?",
              "상태 변경 이력을 별도 테이블로 남겨야 하는가?",
            ],
          },
          {
            type: "callout",
            tone: "info",
            title: "그림보다 규칙",
            content:
              "ERD 도구로 선을 그리는 것보다 각 관계의 선택성, 삭제 정책, 변경 시점 데이터를 합의하는 일이 더 중요합니다.",
          },
        ],
      },
    ],
  },
  "data-anomalies": {
    id: "data-anomalies",
    category: "데이터 모델링과 정규화",
    title: "데이터 이상 현상",
    summary:
      "한 테이블에 서로 다른 사실을 중복 저장하면 삽입·갱신·삭제 때 의도하지 않은 문제가 생깁니다.",
    tags: ["Insertion Anomaly", "Update Anomaly", "Deletion Anomaly"],
    sections: [
      {
        title: "중복된 수강 테이블 예시",
        blocks: [
          {
            type: "table",
            headers: ["student_id", "student_name", "course_id", "course_name", "professor_phone"],
            rows: [
              ["1", "민수", "SQL01", "SQL 기초", "010-1111-1111"],
              ["2", "지수", "SQL01", "SQL 기초", "010-1111-1111"],
            ],
            caption: "과목과 교수 정보가 학생 수만큼 반복됩니다.",
          },
          {
            type: "table",
            headers: ["이상 현상", "문제"],
            rows: [
              ["삽입 이상", "수강생이 없는 새 과목 정보를 등록하기 어려움"],
              ["갱신 이상", "교수 전화번호를 모든 수강 행에서 바꾸지 않으면 값이 불일치"],
              ["삭제 이상", "마지막 수강생을 삭제하면서 과목 정보도 함께 사라짐"],
            ],
          },
        ],
      },
      {
        title: "원인은 서로 다른 사실의 혼합",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "학생 정보, 과목 정보, 수강 사실은 서로 독립적으로 변합니다. 이를 한 행에 모두 저장하면 같은 사실이 반복되고 변경 단위가 불명확해집니다.",
              "정규화는 함수적 종속성을 기준으로 이 사실들을 학생·과목·수강 테이블로 분리해 이상 현상을 줄입니다.",
            ],
          },
        ],
      },
    ],
  },
  "first-normal-form": {
    id: "first-normal-form",
    category: "데이터 모델링과 정규화",
    title: "제1정규형",
    summary:
      "1NF는 각 컬럼에 반복 그룹이나 목록이 아니라 관계 연산으로 다룰 수 있는 하나의 원자값을 저장하도록 요구합니다.",
    tags: ["1NF", "Atomic value", "Repeating group"],
    sections: [
      {
        title: "목록을 한 칸에 넣지 않기",
        blocks: [
          {
            type: "table",
            headers: ["잘못된 구조", "문제"],
            rows: [
              ["member_id=1, phone='010-1111,010-2222'", "전화번호별 검색·제약·수정이 어려움"],
              ["order_id=1, product1, product2, product3", "상품 수가 늘 때 컬럼을 계속 추가해야 함"],
            ],
          },
          {
            type: "code",
            language: "text",
            title: "반복 값을 별도 행으로",
            code: "MEMBER(member_id, name)\nMEMBER_PHONE(member_id, phone_number)\n\nORDER(order_id, customer_id)\nORDER_ITEM(order_id, product_id, quantity)",
          },
        ],
      },
      {
        title: "원자값은 업무 맥락에 따라 달라집니다",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "주소를 언제나 도·시·구로 쪼개야 1NF가 되는 것은 아닙니다. 시스템에서 주소 전체를 한 값으로만 다룬다면 하나의 문자열도 원자값일 수 있습니다.",
            ],
          },
          {
            type: "callout",
            tone: "tip",
            title: "판단 질문",
            content:
              "한 컬럼 내부의 일부만 독립적으로 검색·수정·제약해야 한다면 별도 컬럼이나 행, 테이블로 분리할 필요가 있는지 검토합니다.",
          },
        ],
      },
    ],
  },
  "second-normal-form": {
    id: "second-normal-form",
    category: "데이터 모델링과 정규화",
    title: "제2정규형",
    summary:
      "2NF는 복합 후보키의 일부에만 종속되는 일반 컬럼을 분리해 부분 함수 종속을 제거합니다.",
    tags: ["2NF", "Partial dependency", "Composite key"],
    sections: [
      {
        title: "부분 함수 종속 찾기",
        blocks: [
          {
            type: "code",
            language: "text",
            title: "정규화 전 수강 테이블",
            code: "ENROLLMENT(\n  student_id, course_id,  -- 복합 기본키\n  student_name,          -- student_id에만 종속\n  course_name,           -- course_id에만 종속\n  grade                  -- 두 키 전체에 종속\n)",
          },
          {
            type: "text",
            paragraphs: [
              "student_name은 (student_id, course_id) 전체가 아니라 student_id만 알면 결정됩니다. course_name도 course_id에만 종속됩니다. 이런 컬럼이 부분 함수 종속입니다.",
            ],
          },
        ],
      },
      {
        title: "사실의 주인에게 옮기기",
        blocks: [
          {
            type: "code",
            language: "text",
            title: "2NF로 분리",
            code: "STUDENT(student_id, student_name)\nCOURSE(course_id, course_name)\nENROLLMENT(student_id, course_id, grade)",
          },
          {
            type: "callout",
            tone: "info",
            title: "단일 컬럼 후보키라면",
            content:
              "부분 집합이 존재하지 않으므로 1NF인 테이블의 모든 후보키가 단일 컬럼이면 부분 함수 종속 문제는 발생하지 않습니다.",
          },
        ],
      },
    ],
  },
  "third-normal-form": {
    id: "third-normal-form",
    category: "데이터 모델링과 정규화",
    title: "제3정규형",
    summary:
      "3NF는 키가 아닌 컬럼이 다른 일반 컬럼을 통해 키에 간접적으로 종속되는 이행 함수 종속을 제거합니다.",
    tags: ["3NF", "Transitive dependency", "Functional dependency"],
    sections: [
      {
        title: "이행 종속 찾기",
        blocks: [
          {
            type: "code",
            language: "text",
            title: "정규화 전 직원 테이블",
            code: "EMPLOYEE(\n  employee_id,  -- 기본키\n  employee_name,\n  department_id,\n  department_name\n)\n\nemployee_id → department_id → department_name",
          },
          {
            type: "text",
            paragraphs: [
              "department_name은 직원 키에 직접 속한 사실이라기보다 department_id가 결정하는 부서의 사실입니다. 같은 부서명이 여러 직원 행에 반복되므로 갱신 이상이 생깁니다.",
            ],
          },
        ],
      },
      {
        title: "엔터티별로 분리하기",
        blocks: [
          {
            type: "code",
            language: "text",
            title: "3NF로 분리",
            code: "EMPLOYEE(employee_id, employee_name, department_id)\nDEPARTMENT(department_id, department_name)",
          },
          {
            type: "callout",
            tone: "tip",
            title: "암기보다 함수 종속",
            content:
              "어떤 값이 무엇에 의해 결정되는지를 문장으로 써 보면 분리 기준을 찾기 쉽습니다. 정규화는 무조건 테이블 수를 늘리는 작업이 아니라 사실의 소유자를 명확히 하는 과정입니다.",
          },
        ],
      },
    ],
  },
  denormalization: {
    id: "denormalization",
    category: "데이터 모델링과 정규화",
    title: "역정규화",
    summary:
      "역정규화는 검증된 조회 병목을 줄이기 위해 중복이나 계산 결과를 의도적으로 저장하는 설계 선택입니다.",
    tags: ["Denormalization", "Read performance", "Consistency"],
    sections: [
      {
        title: "언제 고려하는가",
        blocks: [
          {
            type: "list",
            items: [
              "빈번한 조회에서 반복되는 복잡한 조인과 집계가 실제 병목일 때",
              "쓰기보다 읽기가 압도적으로 많고 약간의 지연된 일관성을 허용할 때",
              "집계 테이블, 캐시, 검색 인덱스처럼 목적이 분명한 읽기 모델이 필요할 때",
              "실행 계획과 측정 결과로 정규화 구조의 비용을 확인했을 때",
            ],
          },
          {
            type: "table",
            headers: ["예", "얻는 것", "새로 생기는 비용"],
            rows: [
              ["orders에 customer_name 복제", "조인 감소", "회원명 변경 시 동기화"],
              ["일별 매출 집계 테이블", "대시보드 조회 단축", "집계 갱신·재처리 로직"],
              ["상품별 review_count 저장", "COUNT 반복 제거", "리뷰 변경과 카운트의 원자성"],
            ],
          },
        ],
      },
      {
        title: "중복을 관리하는 설계",
        blocks: [
          {
            type: "callout",
            tone: "warning",
            title: "먼저 정규화, 그다음 측정",
            content:
              "처음부터 성능을 추측해 중복시키면 갱신 이상과 복잡도만 늘 수 있습니다. 일관성의 원본을 정하고, 동기화 실패·재처리·검증 방법까지 설계한 뒤 제한적으로 적용합니다.",
          },
          {
            type: "list",
            items: [
              "어느 데이터가 진짜 원본인지 명시합니다.",
              "동기 갱신인지 이벤트 기반 비동기 갱신인지 결정합니다.",
              "불일치를 탐지하고 다시 맞추는 절차를 준비합니다.",
              "성능 개선 효과와 쓰기 비용을 함께 측정합니다.",
            ],
          },
        ],
      },
    ],
  },
} satisfies StudyContentMap;
