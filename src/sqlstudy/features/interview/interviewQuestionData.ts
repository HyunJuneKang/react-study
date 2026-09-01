export type InterviewCategoryId =
  | "database-questions"
  | "sql-result-questions"
  | "join-questions"
  | "null-questions"
  | "normalization-questions"
  | "index-questions"
  | "execution-plan-questions"
  | "transaction-questions"
  | "practical-questions";

export type InterviewDifficulty = "기초" | "중급" | "심화";

export type InterviewQuestion = {
  id: string;
  sourceNumber?: number;
  question: string;
  hint: string;
  answer: string[];
  code?: string;
  difficulty: InterviewDifficulty;
  keywords: string[];
  followUp?: string;
};

export type InterviewCategory = {
  title: string;
  description: string;
  focus: string[];
  questions: InterviewQuestion[];
};

export const interviewCategoryIds: InterviewCategoryId[] = [
  "database-questions",
  "sql-result-questions",
  "join-questions",
  "null-questions",
  "normalization-questions",
  "index-questions",
  "execution-plan-questions",
  "transaction-questions",
  "practical-questions",
];

export function isInterviewCategoryId(
  value: string,
): value is InterviewCategoryId {
  return interviewCategoryIds.some((categoryId) => categoryId === value);
}

export const interviewCategories: Record<
  InterviewCategoryId,
  InterviewCategory
> = {
  "database-questions": {
    title: "데이터베이스 기본 문제",
    description:
      "용어를 나열하는 데서 멈추지 말고, 각 개념의 역할과 선택 기준까지 설명해보세요.",
    focus: ["핵심 용어", "SQL 분류", "집합 연산"],
    questions: [
      {
        id: "database-01",
        sourceNumber: 1,
        question: "데이터베이스, DBMS, 스키마, 테이블의 차이를 설명하세요.",
        hint: "저장된 데이터, 이를 관리하는 소프트웨어, 구조 정의, 실제 행·열 저장소로 나누어보세요.",
        answer: [
          "데이터베이스는 목적에 맞게 구조화한 데이터의 집합이고, DBMS는 그 데이터의 저장·조회·권한·동시성·복구를 관리하는 소프트웨어입니다.",
          "스키마는 테이블·컬럼·관계·제약조건 같은 구조의 정의이며, 테이블은 그 정의에 따라 데이터를 행과 열로 저장하는 관계형 구조입니다.",
          "DBMS별로 Database와 Schema의 계층 및 명칭은 다를 수 있다는 점도 함께 언급하면 좋습니다.",
        ],
        difficulty: "기초",
        keywords: ["Database", "DBMS", "Schema", "Table"],
      },
      {
        id: "database-02",
        sourceNumber: 2,
        question: "RDBMS와 NoSQL의 차이와 각각 적합한 사례를 설명하세요.",
        hint: "스키마, 관계, 트랜잭션, 확장 방식, 접근 패턴을 기준으로 비교하세요.",
        answer: [
          "RDBMS는 명확한 스키마와 테이블 관계, SQL, 강한 트랜잭션을 중심으로 하므로 결제·주문·계좌처럼 정합성이 중요한 업무에 적합합니다.",
          "NoSQL은 Key-Value, Document, Graph 등 목적별 모델을 사용하며 스키마 변화가 잦거나 대규모 수평 확장, 특정 접근 패턴 최적화가 중요한 경우에 유리합니다.",
          "어느 쪽이 항상 우수한 것이 아니라 관계의 복잡도, 일관성 요구, 조회 패턴, 확장 요구를 근거로 선택해야 합니다.",
        ],
        difficulty: "기초",
        keywords: ["RDBMS", "NoSQL", "트랜잭션", "수평 확장"],
        followUp:
          "주문 시스템에서 RDBMS와 Redis를 함께 쓴다면 각자 어떤 역할을 맡길 수 있을까요?",
      },
      {
        id: "database-03",
        sourceNumber: 3,
        question: "DDL, DML, DCL, TCL의 역할과 대표 명령을 설명하세요.",
        hint: "구조, 데이터, 권한, 트랜잭션이라는 네 단어에 연결해보세요.",
        answer: [
          "DDL은 CREATE·ALTER·DROP·TRUNCATE처럼 데이터 구조를 정의합니다.",
          "DML은 SELECT·INSERT·UPDATE·DELETE처럼 데이터를 조회·변경합니다. SELECT를 DQL로 별도 분류하기도 합니다.",
          "DCL은 GRANT·REVOKE로 권한을 제어하고, TCL은 COMMIT·ROLLBACK·SAVEPOINT로 트랜잭션을 제어합니다.",
        ],
        difficulty: "기초",
        keywords: ["DDL", "DML", "DCL", "TCL"],
      },
      {
        id: "database-04",
        sourceNumber: 4,
        question: "DELETE, TRUNCATE, DROP의 차이를 설명하세요.",
        hint: "삭제 대상, WHERE 사용 가능 여부, 테이블 구조 유지 여부를 비교하세요.",
        answer: [
          "DELETE는 행을 제거하며 WHERE로 대상을 고를 수 있고 테이블 구조는 유지합니다.",
          "TRUNCATE는 일반적으로 조건 없이 전체 행을 빠르게 비우고 구조는 유지합니다.",
          "DROP은 테이블 객체 자체를 제거합니다. 로그, 롤백, 자동 증가 값 초기화 같은 세부 동작은 DBMS마다 다르므로 단정하지 않는 것이 안전합니다.",
        ],
        difficulty: "기초",
        keywords: ["DELETE", "TRUNCATE", "DROP"],
      },
      {
        id: "database-05",
        sourceNumber: 7,
        question:
          "DISTINCT는 언제 사용하며, 무조건 붙이면 안 되는 이유는 무엇인가요?",
        hint: "중복 제거에는 정렬이나 해시 비용이 들 수 있고, 잘못된 조인을 숨길 수도 있습니다.",
        answer: [
          "DISTINCT는 SELECT한 컬럼 조합이 동일한 결과 행을 하나로 줄일 때 사용합니다.",
          "중복 제거 자체에 비용이 들 수 있고, 조인 조건이나 관계 설계가 잘못돼 생긴 중복을 가릴 수 있으므로 먼저 중복 발생 원인을 확인해야 합니다.",
        ],
        difficulty: "중급",
        keywords: ["DISTINCT", "중복", "조인"],
      },
      {
        id: "database-06",
        sourceNumber: 9,
        question: "COUNT(*)와 COUNT(column)의 차이는 무엇인가요?",
        hint: "NULL 행을 세는지 확인하세요.",
        answer: [
          "COUNT(*)는 조건을 만족한 행 자체의 수를 셉니다.",
          "COUNT(column)은 해당 컬럼 값이 NULL이 아닌 행만 셉니다. 따라서 NULL이 존재하면 두 결과가 달라질 수 있습니다.",
        ],
        code: "SELECT COUNT(*) AS rows,\n       COUNT(cancelled_at) AS cancelled_rows\nFROM orders;",
        difficulty: "기초",
        keywords: ["COUNT", "NULL", "집계"],
      },
      {
        id: "database-07",
        sourceNumber: 10,
        question: "UNION과 UNION ALL의 차이와 선택 기준을 설명하세요.",
        hint: "중복 제거 여부와 그 비용을 중심으로 답하세요.",
        answer: [
          "UNION은 두 결과를 합친 뒤 중복 행을 제거하고, UNION ALL은 중복을 그대로 유지합니다.",
          "중복 제거가 업무적으로 필요하지 않다면 추가 연산이 없는 UNION ALL을 우선 고려합니다. 양쪽 SELECT의 컬럼 개수와 대응 자료형은 호환되어야 합니다.",
        ],
        difficulty: "기초",
        keywords: ["UNION", "UNION ALL", "집합 연산"],
      },
    ],
  },

  "sql-result-questions": {
    title: "SQL 결과 예측",
    description:
      "SQL의 논리적 실행 순서와 집계·윈도 함수의 결과를 말로 예측한 뒤 쿼리를 확인하세요.",
    focus: ["실행 순서", "집계", "윈도 함수"],
    questions: [
      {
        id: "sql-result-01",
        sourceNumber: 5,
        question: "SELECT 문의 논리적 실행 순서를 설명하세요.",
        hint: "FROM에서 대상을 만든 뒤 필터, 그룹, 출력, 정렬 순으로 떠올리세요.",
        answer: [
          "일반적인 논리 순서는 FROM → JOIN/ON → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT입니다.",
          "그래서 SELECT에서 만든 별칭은 보통 그보다 먼저 실행되는 WHERE에서 사용할 수 없습니다.",
        ],
        difficulty: "기초",
        keywords: ["실행 순서", "SELECT", "WHERE", "ORDER BY"],
      },
      {
        id: "sql-result-02",
        sourceNumber: 6,
        question: "WHERE와 HAVING의 차이는 무엇인가요?",
        hint: "그룹화 전의 행과 그룹화 후의 집계 결과를 구분하세요.",
        answer: [
          "WHERE는 GROUP BY 전에 개별 행을 걸러내고, HAVING은 그룹화 이후 만들어진 그룹을 집계 조건으로 걸러냅니다.",
          "집계와 무관한 조건은 가능한 한 WHERE에 두어 처리할 행을 먼저 줄이는 편이 일반적으로 유리합니다.",
        ],
        code: "SELECT customer_id, COUNT(*) AS order_count\nFROM orders\nWHERE status = 'PAID'\nGROUP BY customer_id\nHAVING COUNT(*) >= 10;",
        difficulty: "기초",
        keywords: ["WHERE", "HAVING", "GROUP BY"],
      },
      {
        id: "sql-result-03",
        sourceNumber: 30,
        question: "GROUP BY를 사용할 때 SELECT 절 컬럼에는 어떤 규칙이 있나요?",
        hint: "그룹을 대표할 수 있는 값인지 생각하세요.",
        answer: [
          "SELECT에는 일반적으로 GROUP BY에 포함된 컬럼이나 SUM·COUNT 같은 집계 결과만 올 수 있습니다.",
          "그룹 안에서 여러 값을 가질 수 있는 비집계 컬럼을 임의로 선택하면 결과를 하나로 결정할 수 없기 때문입니다. 세부 허용 규칙은 DBMS 설정에 따라 다를 수 있습니다.",
        ],
        difficulty: "기초",
        keywords: ["GROUP BY", "집계 함수"],
      },
      {
        id: "sql-result-04",
        sourceNumber: 31,
        question: "CASE WHEN은 어떤 문제를 해결하나요?",
        hint: "조회 결과 안에서 조건별 값을 분류하거나 조건부 집계를 만들 때 사용합니다.",
        answer: [
          "CASE WHEN은 SQL 결과에서 조건에 따라 다른 값을 반환하는 분기 표현식입니다.",
          "등급 분류, 상태명 변환, SUM(CASE WHEN ... THEN 1 ELSE 0 END) 형태의 조건부 집계 등에 사용합니다.",
        ],
        code: "SELECT order_id,\n       CASE WHEN amount >= 100000 THEN 'VIP'\n            ELSE 'NORMAL' END AS grade\nFROM orders;",
        difficulty: "기초",
        keywords: ["CASE WHEN", "조건 분기"],
      },
      {
        id: "sql-result-05",
        sourceNumber: 32,
        question: "윈도 함수와 GROUP BY의 결과 행 수 차이를 설명하세요.",
        hint: "GROUP BY는 행을 그룹당 하나로 줄이지만 윈도 함수는 원래 행을 유지합니다.",
        answer: [
          "GROUP BY는 여러 행을 그룹별 집계 행으로 축약합니다.",
          "윈도 함수는 PARTITION 안의 여러 행을 참고해 순위·누적합 등을 계산하지만 원래의 각 행은 유지합니다.",
        ],
        difficulty: "중급",
        keywords: ["윈도 함수", "GROUP BY", "PARTITION BY"],
      },
      {
        id: "sql-result-06",
        sourceNumber: 33,
        question: "ROW_NUMBER, RANK, DENSE_RANK가 동점에서 어떻게 다른가요?",
        hint: "급여가 100, 100, 90일 때 각 순위를 적어보세요.",
        answer: [
          "ROW_NUMBER는 동점이어도 1, 2, 3처럼 고유 순번을 부여합니다.",
          "RANK는 동점에 같은 순위를 주고 다음 순위를 건너뛰어 1, 1, 3이 됩니다.",
          "DENSE_RANK는 동점에 같은 순위를 주되 건너뛰지 않아 1, 1, 2가 됩니다.",
        ],
        difficulty: "중급",
        keywords: ["ROW_NUMBER", "RANK", "DENSE_RANK"],
      },
      {
        id: "sql-result-07",
        sourceNumber: 35,
        question: "부서별 급여 상위 3명을 구하는 SQL을 작성하세요.",
        hint: "부서로 PARTITION하고 급여 내림차순 순위를 만든 뒤 바깥에서 3 이하를 거르세요.",
        answer: [
          "부서별 윈도 순위를 먼저 계산하고 바깥 쿼리에서 순위를 필터링합니다.",
          "동점자를 모두 포함할지는 요구사항에 따라 ROW_NUMBER, RANK, DENSE_RANK 중 선택해야 합니다.",
        ],
        code: "WITH ranked AS (\n  SELECT e.*,\n         DENSE_RANK() OVER (\n           PARTITION BY department_id\n           ORDER BY salary DESC\n         ) AS salary_rank\n  FROM employees e\n)\nSELECT *\nFROM ranked\nWHERE salary_rank <= 3;",
        difficulty: "중급",
        keywords: ["Top N", "DENSE_RANK", "CTE"],
      },
      {
        id: "sql-result-08",
        sourceNumber: 36,
        question: "주문 수가 10건 이상인 고객을 조회하는 SQL을 작성하세요.",
        hint: "고객별로 묶고 집계 결과는 HAVING으로 거르세요.",
        answer: [
          "orders를 customer_id로 그룹화하고 COUNT(*)에 HAVING 조건을 적용합니다.",
        ],
        code: "SELECT customer_id, COUNT(*) AS order_count\nFROM orders\nGROUP BY customer_id\nHAVING COUNT(*) >= 10;",
        difficulty: "기초",
        keywords: ["COUNT", "GROUP BY", "HAVING"],
      },
      {
        id: "sql-result-09",
        sourceNumber: 37,
        question: "각 고객의 주문 금액 누적합을 구하는 SQL을 작성하세요.",
        hint: "고객별로 나누고 주문 시각과 고유 키로 안정적으로 정렬하세요.",
        answer: [
          "SUM을 윈도 함수로 사용해 고객별 파티션 안에서 현재 행까지 누적합니다.",
          "같은 시각의 주문이 있을 수 있으므로 order_id 같은 고유 키를 정렬 기준에 함께 두면 결과가 안정적입니다.",
        ],
        code: "SELECT order_id, customer_id, ordered_at, amount,\n       SUM(amount) OVER (\n         PARTITION BY customer_id\n         ORDER BY ordered_at, order_id\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ) AS running_total\nFROM orders;",
        difficulty: "중급",
        keywords: ["SUM OVER", "누적합", "윈도 프레임"],
      },
      {
        id: "sql-result-10",
        sourceNumber: 38,
        question: "각 주문 행에 같은 고객의 직전 주문 금액을 표시하세요.",
        hint: "이전 행 값을 가져오는 LAG를 사용하세요.",
        answer: [
          "LAG(amount)를 고객별 주문 순서에 적용하면 행을 유지하면서 직전 금액을 가져올 수 있습니다.",
          "첫 주문에는 이전 행이 없으므로 결과가 NULL입니다.",
        ],
        code: "SELECT order_id, customer_id, amount,\n       LAG(amount) OVER (\n         PARTITION BY customer_id\n         ORDER BY ordered_at, order_id\n       ) AS previous_amount\nFROM orders;",
        difficulty: "중급",
        keywords: ["LAG", "윈도 함수", "이전 행"],
      },
    ],
  },

  "join-questions": {
    title: "JOIN 결과 예측",
    description:
      "조인 종류보다 중요한 것은 기준 테이블, 조건 위치, 관계의 카디널리티입니다.",
    focus: ["외부 조인", "ON vs WHERE", "행 증가"],
    questions: [
      {
        id: "join-01",
        sourceNumber: 20,
        question: "INNER JOIN과 LEFT JOIN의 결과 차이를 설명하세요.",
        hint: "매칭되지 않은 왼쪽 행이 결과에 남는지 확인하세요.",
        answer: [
          "INNER JOIN은 조인 조건이 양쪽에서 일치하는 행만 반환합니다.",
          "LEFT JOIN은 왼쪽 테이블의 모든 행을 보존하고 오른쪽에 매칭이 없으면 오른쪽 컬럼을 NULL로 채웁니다.",
        ],
        difficulty: "기초",
        keywords: ["INNER JOIN", "LEFT JOIN", "NULL"],
      },
      {
        id: "join-02",
        sourceNumber: 21,
        question: "RIGHT, FULL OUTER, CROSS JOIN은 언제 사용하나요?",
        hint: "오른쪽 보존, 양쪽 보존, 모든 조합으로 구분하세요.",
        answer: [
          "RIGHT JOIN은 오른쪽 테이블을 모두 보존하며 테이블 순서를 바꾼 LEFT JOIN으로 표현할 수도 있습니다.",
          "FULL OUTER JOIN은 양쪽의 불일치 행까지 모두 보존하고, CROSS JOIN은 두 테이블의 모든 조합을 만듭니다.",
          "CROSS JOIN은 행 수가 두 입력 행 수의 곱만큼 늘 수 있으므로 의도와 규모를 반드시 확인해야 합니다.",
        ],
        difficulty: "기초",
        keywords: ["RIGHT JOIN", "FULL OUTER JOIN", "CROSS JOIN"],
      },
      {
        id: "join-03",
        sourceNumber: 22,
        question:
          "LEFT JOIN의 오른쪽 조건을 ON과 WHERE에 둘 때 결과가 왜 달라지나요?",
        hint: "매칭 실패로 생성된 NULL 행이 WHERE를 통과할 수 있는지 생각하세요.",
        answer: [
          "ON에 오른쪽 조건을 두면 조건에 맞는 행만 연결하면서도 왼쪽의 모든 행은 유지됩니다.",
          "WHERE에 오른쪽 조건을 두면 매칭 실패로 생긴 NULL 행이 조건을 통과하지 못해 제거되므로 결과가 INNER JOIN처럼 바뀔 수 있습니다.",
        ],
        code: "-- 모든 고객 유지\nLEFT JOIN orders o\n  ON o.customer_id = c.customer_id\n AND o.status = 'PAID'\n\n-- 결제 주문이 있는 고객만 유지\nLEFT JOIN orders o ON o.customer_id = c.customer_id\nWHERE o.status = 'PAID'",
        difficulty: "중급",
        keywords: ["LEFT JOIN", "ON", "WHERE"],
      },
      {
        id: "join-04",
        sourceNumber: 23,
        question:
          "조인 결과 행이 예상보다 많아지는 원인과 점검 방법은 무엇인가요?",
        hint: "조건 누락과 1:N·N:M 관계를 확인하세요. DISTINCT부터 붙이지 마세요.",
        answer: [
          "조인 조건이 누락되면 카테시안 곱이 생기고, 조인 키가 한쪽 또는 양쪽에서 중복되면 한 행이 여러 행과 매칭됩니다.",
          "각 테이블의 키 유일성, 관계의 카디널리티, ON 조건을 먼저 확인해야 하며 DISTINCT로 결과만 숨기면 원인을 놓칠 수 있습니다.",
        ],
        difficulty: "중급",
        keywords: ["카디널리티", "카테시안 곱", "DISTINCT"],
      },
      {
        id: "join-05",
        sourceNumber: 24,
        question: "Self Join은 어떤 상황에 사용하나요?",
        hint: "한 테이블 안에서 행끼리 관계를 맺는 직원-관리자 구조를 떠올리세요.",
        answer: [
          "Self Join은 같은 테이블을 서로 다른 별칭으로 두 번 참조해 행 사이 관계를 조회할 때 사용합니다.",
          "employees.manager_id가 employees.employee_id를 참조하는 조직도, 카테고리 상하 관계 등이 대표 사례입니다.",
        ],
        code: "SELECT e.employee_name, m.employee_name AS manager_name\nFROM employees e\nLEFT JOIN employees m\n  ON m.employee_id = e.manager_id;",
        difficulty: "기초",
        keywords: ["SELF JOIN", "자기 참조"],
      },
      {
        id: "join-06",
        sourceNumber: 25,
        question: "서브쿼리와 JOIN 중 무엇을 선택해야 하나요?",
        hint: "무조건적인 성능 우열 대신 의도, 결과 형태, 실행 계획을 이야기하세요.",
        answer: [
          "존재 여부나 단일 집계 결과를 조건으로 쓸 때는 서브쿼리가 의도를 잘 드러낼 수 있고, 여러 테이블의 컬럼을 결합해야 한다면 JOIN이 자연스럽습니다.",
          "옵티마이저가 서로 비슷한 계획으로 변환할 수도 있으므로 문법만으로 성능을 단정하지 말고 가독성과 실제 실행 계획을 함께 봐야 합니다.",
        ],
        difficulty: "중급",
        keywords: ["서브쿼리", "JOIN", "실행 계획"],
      },
      {
        id: "join-07",
        sourceNumber: 26,
        question: "상관 서브쿼리란 무엇이며 어떤 비용을 주의해야 하나요?",
        hint: "안쪽 쿼리가 바깥 행의 값을 참조합니다.",
        answer: [
          "상관 서브쿼리는 내부 쿼리가 외부 쿼리의 현재 행 값을 참조하는 형태입니다.",
          "논리적으로 외부 행마다 평가될 수 있어 데이터가 크면 비용이 커질 수 있지만, 실제 처리는 옵티마이저와 인덱스에 따라 달라집니다.",
        ],
        difficulty: "중급",
        keywords: ["상관 서브쿼리", "Correlated Subquery"],
      },
      {
        id: "join-08",
        sourceNumber: 27,
        question: "EXISTS와 IN의 차이와 사용 기준을 설명하세요.",
        hint: "존재 여부와 값 목록 포함 여부라는 의도 차이부터 설명하세요.",
        answer: [
          "IN은 값이 목록이나 서브쿼리 결과에 포함되는지를 표현하고, EXISTS는 조건을 만족하는 행이 하나라도 존재하는지 검사합니다.",
          "실제 성능은 통계, 인덱스, 데이터 분포와 옵티마이저에 좌우되므로 EXISTS가 언제나 빠르다고 단정할 수 없습니다.",
        ],
        difficulty: "중급",
        keywords: ["EXISTS", "IN", "서브쿼리"],
      },
      {
        id: "join-09",
        sourceNumber: 29,
        question: "CTE(WITH)는 무엇이며 서브쿼리에 비해 어떤 장점이 있나요?",
        hint: "복잡한 중간 결과에 이름을 붙여 단계별로 읽는다는 관점으로 답하세요.",
        answer: [
          "CTE는 WITH 절로 이름을 붙인 쿼리 범위 내 임시 결과 집합입니다.",
          "복잡한 쿼리를 단계별로 분리해 가독성과 재사용성을 높이고 재귀 쿼리에도 활용할 수 있습니다.",
          "CTE가 항상 물리적으로 저장되거나 항상 더 빠른 것은 아니며 구체적인 실행 전략은 DBMS와 버전에 따라 다릅니다.",
        ],
        difficulty: "중급",
        keywords: ["CTE", "WITH", "가독성"],
      },
    ],
  },

  "null-questions": {
    title: "NULL과 조건식 문제",
    description:
      "NULL은 값이 아니라 ‘알 수 없음’을 나타냅니다. SQL의 3값 논리를 중심으로 결과를 예측하세요.",
    focus: ["3값 논리", "NOT IN", "COUNT"],
    questions: [
      {
        id: "null-01",
        sourceNumber: 8,
        question: "NULL은 무엇이며 왜 = NULL 대신 IS NULL을 사용하나요?",
        hint: "NULL과의 일반 비교 결과는 TRUE가 아니라 UNKNOWN입니다.",
        answer: [
          "NULL은 0이나 빈 문자열이 아니라 값이 없거나 알 수 없음을 의미합니다.",
          "NULL = NULL을 포함한 일반 비교는 UNKNOWN이 되며 WHERE는 TRUE인 행만 통과시키므로, NULL 여부는 IS NULL 또는 IS NOT NULL로 검사합니다.",
        ],
        code: "SELECT *\nFROM orders\nWHERE cancelled_at IS NULL;",
        difficulty: "기초",
        keywords: ["NULL", "IS NULL", "UNKNOWN"],
      },
      {
        id: "null-02",
        sourceNumber: 28,
        question:
          "NOT IN의 서브쿼리 결과에 NULL이 있으면 왜 결과가 사라질 수 있나요?",
        hint: "x NOT IN (1, NULL)을 x <> 1 AND x <> NULL로 풀어보세요.",
        answer: [
          "NOT IN은 각 값과 다르다는 조건의 결합으로 볼 수 있는데, NULL과의 비교는 UNKNOWN입니다.",
          "TRUE AND UNKNOWN은 TRUE가 아니므로 WHERE를 통과하지 못할 수 있습니다. 존재하지 않음을 확인하려면 NULL을 제거하거나 NOT EXISTS를 고려합니다.",
        ],
        code: "SELECT c.*\nFROM customers c\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM orders o\n  WHERE o.customer_id = c.customer_id\n);",
        difficulty: "중급",
        keywords: ["NOT IN", "NOT EXISTS", "3값 논리"],
      },
      {
        id: "null-03",
        question: "col <> 10 조건은 col이 NULL인 행을 반환할까요?",
        hint: "NULL <> 10의 결과가 TRUE인지 생각하세요.",
        answer: [
          "반환하지 않습니다. NULL <> 10은 TRUE가 아니라 UNKNOWN이므로 WHERE 조건을 통과하지 못합니다.",
          "NULL도 포함하려면 col <> 10 OR col IS NULL처럼 의도를 명시해야 합니다.",
        ],
        difficulty: "기초",
        keywords: ["NULL", "비교 연산", "UNKNOWN"],
      },
      {
        id: "null-04",
        question: "COALESCE의 역할과 사용할 때 주의할 점을 설명하세요.",
        hint: "왼쪽부터 NULL이 아닌 첫 값을 반환합니다. WHERE 컬럼에 적용할 때 인덱스도 생각하세요.",
        answer: [
          "COALESCE(a, b, c)는 왼쪽부터 평가해 NULL이 아닌 첫 값을 반환하며 표시 기본값이나 NULL 대체에 유용합니다.",
          "WHERE에서 인덱스 컬럼을 COALESCE 같은 함수로 감싸면 일반 인덱스를 효율적으로 활용하지 못할 수 있고, NULL과 실제 기본값을 같은 의미로 취급해도 되는지 확인해야 합니다.",
        ],
        difficulty: "중급",
        keywords: ["COALESCE", "NULL 대체", "인덱스"],
      },
    ],
  },

  "normalization-questions": {
    title: "정규화 문제",
    description:
      "키와 함수적 종속성을 먼저 찾고, 어떤 중복과 이상 현상을 제거하는지 설명하세요.",
    focus: ["키", "관계", "1NF·2NF·3NF"],
    questions: [
      {
        id: "normalization-01",
        sourceNumber: 11,
        question: "Primary Key와 Foreign Key의 역할과 차이를 설명하세요.",
        hint: "행 식별과 다른 테이블 참조로 구분하세요.",
        answer: [
          "PK는 테이블의 각 행을 고유하게 식별하며 중복과 NULL을 허용하지 않습니다.",
          "FK는 다른 테이블의 PK 또는 Unique Key를 참조해 테이블 간 관계와 참조 무결성을 보장합니다.",
        ],
        difficulty: "기초",
        keywords: ["Primary Key", "Foreign Key", "참조 무결성"],
      },
      {
        id: "normalization-02",
        sourceNumber: 12,
        question: "슈퍼키, 후보키, 기본키, 대체키, 복합키를 구분하세요.",
        hint: "유일성, 최소성, 대표 선택 여부, 컬럼 개수를 기준으로 정리하세요.",
        answer: [
          "슈퍼키는 행을 유일하게 식별하는 컬럼 집합이고, 후보키는 그중 불필요한 컬럼이 없는 최소 슈퍼키입니다.",
          "기본키는 후보키 중 대표로 선택한 키, 대체키는 선택되지 않은 후보키입니다.",
          "복합키는 둘 이상의 컬럼을 묶어 식별하는 키입니다.",
        ],
        difficulty: "기초",
        keywords: ["슈퍼키", "후보키", "기본키", "복합키"],
      },
      {
        id: "normalization-03",
        sourceNumber: 13,
        question: "참조 무결성이란 무엇이며 삭제 정책에는 무엇이 있나요?",
        hint: "자식 FK가 존재하지 않는 부모를 가리키지 못하게 하는 규칙입니다.",
        answer: [
          "참조 무결성은 자식의 FK가 NULL이거나 부모의 유효한 키를 참조하도록 보장하는 규칙입니다.",
          "부모 삭제 시 거부(RESTRICT/NO ACTION), 자식도 삭제(CASCADE), FK를 NULL로 변경(SET NULL) 같은 정책을 업무 규칙에 따라 선택합니다.",
        ],
        difficulty: "중급",
        keywords: ["참조 무결성", "CASCADE", "FOREIGN KEY"],
      },
      {
        id: "normalization-04",
        sourceNumber: 14,
        question: "1:1, 1:N, N:M 관계를 테이블로 어떻게 모델링하나요?",
        hint: "FK를 어느 쪽에 두고 어떤 제약을 추가하는지 답하세요.",
        answer: [
          "1:1은 한쪽 FK에 UNIQUE를 추가하거나 PK를 공유해 표현할 수 있습니다.",
          "1:N은 N 쪽 테이블에 1 쪽을 참조하는 FK를 둡니다.",
          "N:M은 양쪽 PK를 FK로 가진 연결 테이블로 풀어내며 두 FK 조합에 유일성 또는 복합 PK를 둘 수 있습니다.",
        ],
        difficulty: "기초",
        keywords: ["1:1", "1:N", "N:M", "연결 테이블"],
      },
      {
        id: "normalization-05",
        sourceNumber: 16,
        question: "정규화는 무엇이며 왜 필요한가요?",
        hint: "중복과 삽입·갱신·삭제 이상을 중심으로 답하세요.",
        answer: [
          "정규화는 함수적 종속성을 기준으로 테이블을 분리해 데이터 중복과 이상 현상을 줄이는 설계 과정입니다.",
          "무조건 테이블 수를 늘리는 작업이 아니라 한 사실을 가능한 한 한 곳에서 관리해 일관성을 높이는 것이 목적입니다.",
        ],
        difficulty: "기초",
        keywords: ["정규화", "함수적 종속", "중복"],
      },
      {
        id: "normalization-06",
        sourceNumber: 17,
        question: "1NF, 2NF, 3NF를 간단한 예와 함께 설명하세요.",
        hint: "원자값 → 부분 종속 제거 → 이행 종속 제거 순서입니다.",
        answer: [
          "1NF는 한 컬럼에 여러 전화번호처럼 반복 집합을 두지 않고 값을 원자화합니다.",
          "2NF는 복합키의 일부에만 종속된 컬럼을 분리합니다. 예를 들어 (학생, 과목) 키에서 학생 이름은 학생에만 종속됩니다.",
          "3NF는 비키 컬럼이 다른 비키 컬럼을 결정하는 이행 종속을 제거합니다. 예를 들어 사원→부서ID→부서명에서 부서 정보를 분리합니다.",
        ],
        difficulty: "중급",
        keywords: ["1NF", "2NF", "3NF", "함수적 종속"],
      },
      {
        id: "normalization-07",
        sourceNumber: 18,
        question: "삽입 이상, 갱신 이상, 삭제 이상을 설명하세요.",
        hint: "한 테이블에 여러 사실을 중복 저장할 때 생기는 문제입니다.",
        answer: [
          "삽입 이상은 다른 데이터가 없어 필요한 사실만 새로 저장할 수 없는 문제입니다.",
          "갱신 이상은 중복된 같은 사실 중 일부만 바꿔 값이 불일치하는 문제입니다.",
          "삭제 이상은 한 행을 지우면서 보존해야 할 다른 사실까지 함께 사라지는 문제입니다.",
        ],
        difficulty: "기초",
        keywords: ["삽입 이상", "갱신 이상", "삭제 이상"],
      },
      {
        id: "normalization-08",
        sourceNumber: 19,
        question: "역정규화는 언제 고려하며 어떤 비용이 있나요?",
        hint: "측정된 조회 병목과 데이터 일관성 유지 비용을 함께 말하세요.",
        answer: [
          "역정규화는 조인 비용이 실제 병목으로 확인되거나 읽기 중심 집계 결과를 빠르게 제공해야 할 때 의도적으로 중복을 허용하는 선택입니다.",
          "쓰기 로직과 저장 공간이 늘고 같은 사실을 여러 곳에서 일관되게 갱신해야 하므로, 측정과 동기화 전략 없이 먼저 적용하면 안 됩니다.",
        ],
        difficulty: "심화",
        keywords: ["역정규화", "일관성", "성능"],
      },
    ],
  },

  "index-questions": {
    title: "인덱스 설계 문제",
    description:
      "인덱스는 공짜가 아닙니다. 읽기 이득과 쓰기·저장 비용을 실제 쿼리 패턴으로 설명하세요.",
    focus: ["B-Tree", "복합 인덱스", "선택도"],
    questions: [
      {
        id: "index-01",
        sourceNumber: 39,
        question: "인덱스가 조회 성능을 높이는 원리를 설명하세요.",
        hint: "전체 행을 읽는 대신 정렬된 보조 구조에서 탐색 범위를 줄입니다.",
        answer: [
          "인덱스는 검색 키와 행 위치를 별도 자료구조에 저장해 전체 테이블을 읽지 않고 후보 행의 범위를 빠르게 좁힙니다.",
          "다만 결과 비율이 매우 높거나 테이블이 작으면 전체 스캔이 더 저렴할 수 있습니다.",
        ],
        difficulty: "기초",
        keywords: ["인덱스", "탐색", "Full Scan"],
      },
      {
        id: "index-02",
        sourceNumber: 40,
        question: "인덱스의 장점과 단점을 설명하세요.",
        hint: "조회·정렬·조인과 저장 공간·쓰기 비용을 비교하세요.",
        answer: [
          "적절한 인덱스는 필터, 조인, 정렬, 범위 조회의 읽기 비용을 줄일 수 있습니다.",
          "인덱스도 저장 공간을 차지하며 INSERT·DELETE와 인덱스 키 UPDATE 때 함께 유지해야 하므로 쓰기 비용이 증가합니다.",
        ],
        difficulty: "기초",
        keywords: ["읽기 성능", "쓰기 비용", "저장 공간"],
      },
      {
        id: "index-03",
        sourceNumber: 41,
        question: "B-Tree 인덱스가 범위 검색에 적합한 이유는 무엇인가요?",
        hint: "키가 정렬되어 있고 리프 노드를 순차 탐색할 수 있습니다.",
        answer: [
          "B-Tree 계열 인덱스는 균형 잡힌 트리에서 정렬된 키를 유지해 시작점을 로그 수준 탐색으로 찾을 수 있습니다.",
          "시작점을 찾은 뒤 연속된 리프 영역을 순차적으로 읽을 수 있어 =뿐 아니라 >, <, BETWEEN 같은 범위 검색에 적합합니다.",
        ],
        difficulty: "중급",
        keywords: ["B-Tree", "범위 검색", "리프 노드"],
      },
      {
        id: "index-04",
        sourceNumber: 42,
        question: "어떤 컬럼에 인덱스를 만들지 어떻게 판단하나요?",
        hint: "자주 실행되는 WHERE·JOIN·ORDER BY와 선택도, 쓰기 빈도를 함께 보세요.",
        answer: [
          "빈도가 높고 중요한 쿼리의 WHERE, JOIN, ORDER BY 조건부터 관찰하고 선택도와 데이터 분포를 확인합니다.",
          "쓰기 빈도, 테이블 크기, 반환 행 비율, 기존 인덱스와의 중복까지 고려한 뒤 실행 계획과 실제 측정으로 검증합니다.",
        ],
        difficulty: "중급",
        keywords: ["선택도", "카디널리티", "쿼리 패턴"],
      },
      {
        id: "index-05",
        sourceNumber: 43,
        question: "복합 인덱스에서 컬럼 순서가 중요한 이유는 무엇인가요?",
        hint: "(a, b, c)는 a부터 정렬된 구조입니다.",
        answer: [
          "복합 인덱스 (a, b, c)는 a, 그 안의 b, 그 안의 c 순으로 정렬된 구조이므로 일반적으로 선두 컬럼부터 조건에 사용할 때 효율적입니다.",
          "단순히 선택도가 높은 컬럼을 맨 앞에 두는 규칙만 적용하지 말고 동등 조건, 범위 조건, 정렬, 실제 쿼리 조합을 함께 고려해야 합니다.",
        ],
        difficulty: "중급",
        keywords: ["복합 인덱스", "선두 컬럼", "정렬"],
      },
      {
        id: "index-06",
        sourceNumber: 44,
        question:
          "인덱스가 있어도 Full Table Scan이 선택되는 경우는 언제인가요?",
        hint: "많은 행 반환, 함수·형 변환, 작은 테이블, 통계를 떠올리세요.",
        answer: [
          "조건이 많은 행을 반환하거나 테이블이 작아 랜덤 접근보다 순차 전체 읽기가 싸면 옵티마이저가 Full Scan을 선택할 수 있습니다.",
          "인덱스 컬럼에 함수나 암시적 형 변환을 적용하거나 선두 컬럼 조건이 빠진 경우에도 인덱스를 효율적으로 쓰지 못할 수 있습니다.",
        ],
        difficulty: "중급",
        keywords: ["Full Table Scan", "함수", "암시적 형 변환"],
      },
    ],
  },

  "execution-plan-questions": {
    title: "실행 계획 문제",
    description:
      "느리다는 감 대신 읽은 행 수, 추정 오차, 접근 방식과 고비용 연산을 근거로 진단하세요.",
    focus: ["Scan·Seek", "추정 행 수", "튜닝"],
    questions: [
      {
        id: "plan-01",
        sourceNumber: 45,
        question: "실행 계획은 무엇이고 어떤 순서로 확인하나요?",
        hint: "접근 방식, 행 수, 조인, 정렬·임시 작업 순으로 살펴보세요.",
        answer: [
          "실행 계획은 옵티마이저가 선택한 테이블 접근, 조인 순서와 방식, 정렬 등의 실행 전략을 보여줍니다.",
          "Scan/Seek 여부, 예상과 실제 행 수 차이, 조인 방식, 큰 정렬·임시 공간·키 조회, 조건이 적용되는 시점을 확인합니다.",
        ],
        difficulty: "중급",
        keywords: ["Execution Plan", "예상 행 수", "실제 행 수"],
      },
      {
        id: "plan-02",
        sourceNumber: 46,
        question: "SELECT *를 실무에서 지양하는 이유를 설명하세요.",
        hint: "네트워크, 메모리, Covering Index, 스키마 변경을 생각하세요.",
        answer: [
          "필요 없는 컬럼까지 읽고 전송해 I/O, 네트워크, 메모리 사용을 늘리며 Covering Index만으로 처리할 기회를 잃을 수 있습니다.",
          "컬럼 추가와 순서 변경에 결과 구조가 불필요하게 영향을 받고 같은 이름의 컬럼 충돌도 커지므로 필요한 컬럼을 명시하는 편이 계약이 분명합니다.",
        ],
        difficulty: "기초",
        keywords: ["SELECT *", "I/O", "Covering Index"],
      },
      {
        id: "plan-03",
        question:
          "예상 행 수와 실제 행 수가 크게 다른 계획은 무엇을 의미하나요?",
        hint: "옵티마이저가 잘못된 규모를 전제로 조인 방식과 순서를 골랐을 수 있습니다.",
        answer: [
          "통계가 오래됐거나 컬럼 값이 편향됐거나 컬럼 간 상관관계를 충분히 추정하지 못했을 가능성이 있습니다.",
          "잘못된 추정은 부적절한 조인 순서와 알고리즘, 메모리 할당을 유발할 수 있으므로 통계와 조건, 실제 데이터 분포를 점검합니다.",
        ],
        difficulty: "심화",
        keywords: ["카디널리티 추정", "통계", "데이터 편향"],
      },
      {
        id: "plan-04",
        question: "Nested Loop, Hash, Merge Join의 적합한 상황을 비교하세요.",
        hint: "작은 입력+인덱스, 큰 동등 조인, 정렬된 입력으로 구분하세요.",
        answer: [
          "Nested Loop는 바깥 입력이 작고 안쪽 조인 키 인덱스가 있을 때 효과적입니다.",
          "Hash Join은 비교적 큰 입력의 동등 조인에 유리할 수 있고, Merge Join은 양쪽이 조인 키로 정렬되어 있을 때 순차 병합이 가능합니다.",
          "개발자가 이름만 보고 고르기보다 옵티마이저의 선택과 실제 행 수·비용을 확인해야 합니다.",
        ],
        difficulty: "심화",
        keywords: ["Nested Loop", "Hash Join", "Merge Join"],
      },
      {
        id: "plan-05",
        question:
          "OFFSET 페이징이 뒤로 갈수록 느려지는 이유와 대안을 설명하세요.",
        hint: "앞 행을 버리기 위해서도 읽어야 합니다. 마지막 키 이후를 찾는 Seek를 떠올리세요.",
        answer: [
          "큰 OFFSET은 반환하지 않을 앞쪽 행도 찾아 건너뛰어야 하므로 뒤 페이지일수록 읽기 비용이 증가할 수 있습니다.",
          "연속 조회라면 마지막으로 본 정렬 키 이후를 조건으로 조회하는 Keyset/Seek 페이징으로 큰 건너뛰기 비용을 줄일 수 있습니다.",
          "정렬 값이 중복될 수 있으면 (ordered_at, order_id)처럼 고유한 보조 키를 포함해야 누락과 중복을 막을 수 있습니다.",
        ],
        code: "SELECT order_id, ordered_at, amount\nFROM orders\nWHERE (ordered_at, order_id) > (:last_time, :last_id)\nORDER BY ordered_at, order_id\nLIMIT 20;",
        difficulty: "심화",
        keywords: ["OFFSET", "Keyset", "Seek 페이징"],
      },
    ],
  },

  "transaction-questions": {
    title: "트랜잭션과 락 문제",
    description:
      "현상 이름뿐 아니라 어떤 격리와 락 전략을 선택하고 실패를 어떻게 다룰지 설명하세요.",
    focus: ["ACID", "격리 수준", "락·데드락"],
    questions: [
      {
        id: "transaction-01",
        sourceNumber: 47,
        question: "트랜잭션이란 무엇이며 경계를 어떻게 정해야 하나요?",
        hint: "모두 성공하거나 모두 실패해야 하는 하나의 업무 단위입니다.",
        answer: [
          "트랜잭션은 데이터 일관성을 위해 여러 DB 작업을 전부 반영하거나 전부 취소하는 논리적 작업 단위입니다.",
          "하나의 업무 규칙을 만족하는 최소 범위로 잡고, 락을 오래 유지하지 않도록 외부 API나 긴 계산을 트랜잭션 안에 두지 않는 것이 좋습니다.",
        ],
        difficulty: "기초",
        keywords: ["트랜잭션", "원자성", "경계"],
      },
      {
        id: "transaction-02",
        sourceNumber: 48,
        question: "ACID 네 특성을 설명하세요.",
        hint: "전부/전무, 유효한 상태, 동시 실행 격리, 커밋 결과 보존입니다.",
        answer: [
          "Atomicity는 작업이 전부 반영되거나 전부 취소됨, Consistency는 전후에 제약과 업무 규칙을 만족함을 뜻합니다.",
          "Isolation은 동시 트랜잭션이 중간 상태에 부적절하게 영향을 주지 않음, Durability는 커밋 결과가 장애 후에도 복구 가능함을 뜻합니다.",
        ],
        difficulty: "기초",
        keywords: ["ACID", "Atomicity", "Isolation"],
      },
      {
        id: "transaction-03",
        sourceNumber: 49,
        question: "COMMIT, ROLLBACK, SAVEPOINT의 차이는 무엇인가요?",
        hint: "확정, 전체 취소, 중간 복구 지점으로 구분하세요.",
        answer: [
          "COMMIT은 트랜잭션 변경을 확정하고, ROLLBACK은 미확정 변경을 취소합니다.",
          "SAVEPOINT는 트랜잭션 안에 중간 지점을 만들어 전체가 아닌 해당 지점 이후만 되돌릴 수 있게 합니다. 구체적인 동작은 DBMS와 DDL 처리에 따라 다를 수 있습니다.",
        ],
        difficulty: "기초",
        keywords: ["COMMIT", "ROLLBACK", "SAVEPOINT"],
      },
      {
        id: "transaction-04",
        sourceNumber: 50,
        question: "Dirty Read, Non-repeatable Read, Phantom Read를 구분하세요.",
        hint: "미커밋 값, 같은 행의 값 변경, 조건 결과 행 집합 변경입니다.",
        answer: [
          "Dirty Read는 다른 트랜잭션의 커밋되지 않은 값을 읽는 현상입니다.",
          "Non-repeatable Read는 같은 행을 다시 읽었을 때 커밋된 수정으로 값이 달라지는 현상입니다.",
          "Phantom Read는 같은 조건 조회에서 다른 트랜잭션의 삽입·삭제로 행 집합이 달라지는 현상입니다.",
        ],
        difficulty: "중급",
        keywords: ["Dirty Read", "Non-repeatable Read", "Phantom Read"],
      },
      {
        id: "transaction-05",
        sourceNumber: 51,
        question: "공유 락과 배타 락의 차이는 무엇인가요?",
        hint: "읽기와 변경, 서로 호환 가능한지를 설명하세요.",
        answer: [
          "공유 락은 읽기를 위한 락으로 여러 트랜잭션이 함께 가질 수 있지만 일반적으로 배타 락과 충돌합니다.",
          "배타 락은 변경을 위한 락으로 다른 공유·배타 락과 충돌해 같은 데이터를 동시에 변경하지 못하게 합니다.",
        ],
        difficulty: "중급",
        keywords: ["공유 락", "배타 락", "락 호환성"],
      },
      {
        id: "transaction-06",
        sourceNumber: 52,
        question: "데드락은 왜 발생하고 어떻게 예방·대응하나요?",
        hint: "서로가 가진 자원을 반대 순서로 기다리는 순환 대기입니다.",
        answer: [
          "둘 이상의 트랜잭션이 서로 보유한 락을 기다리는 순환 대기가 생기면 데드락이 발생합니다.",
          "자원을 항상 같은 순서로 접근하고 트랜잭션을 짧게 유지하며 적절한 인덱스로 잠금 범위를 줄입니다.",
          "DB가 희생 트랜잭션을 중단할 수 있으므로 애플리케이션은 멱등성과 백오프를 고려한 제한적 재시도도 준비해야 합니다.",
        ],
        difficulty: "중급",
        keywords: ["데드락", "순환 대기", "재시도"],
      },
      {
        id: "transaction-07",
        sourceNumber: 53,
        question: "낙관적 락과 비관적 락의 차이와 적합한 상황을 설명하세요.",
        hint: "충돌을 나중에 감지하는 버전 검사와 먼저 막는 FOR UPDATE를 비교하세요.",
        answer: [
          "낙관적 락은 충돌이 드물다고 보고 version 조건이 여전히 같은지 UPDATE 시 검사합니다. 동시 처리에 유리하지만 충돌 시 재시도나 사용자 안내가 필요합니다.",
          "비관적 락은 충돌 가능성이 높다고 보고 SELECT ... FOR UPDATE 등으로 먼저 잠급니다. 충돌을 직접 막지만 대기와 데드락 가능성이 커집니다.",
        ],
        code: "UPDATE products\nSET stock = stock - 1, version = version + 1\nWHERE product_id = :id\n  AND version = :expected_version;",
        difficulty: "심화",
        keywords: ["낙관적 락", "비관적 락", "version"],
      },
      {
        id: "transaction-08",
        sourceNumber: 54,
        question: "SQL Injection의 원인과 방어 방법을 설명하세요.",
        hint: "사용자 입력을 SQL 문자열에 이어 붙이는 것이 원인입니다.",
        answer: [
          "사용자 입력을 SQL 문자열에 직접 연결하면 입력이 데이터가 아니라 SQL 구문으로 해석되어 인증 우회·조회·변조가 발생할 수 있습니다.",
          "Prepared Statement와 파라미터 바인딩을 기본으로 사용하고, 동적 식별자는 허용 목록으로 검증하며 DB 계정 최소 권한과 안전한 오류 처리를 함께 적용합니다.",
          "문자열 이스케이프만 수동으로 처리하는 방식은 실수와 DB별 차이에 취약합니다.",
        ],
        difficulty: "기초",
        keywords: ["SQL Injection", "Prepared Statement", "최소 권한"],
      },
    ],
  },

  "practical-questions": {
    title: "실무 상황형 문제",
    description:
      "공통 스키마를 바탕으로 먼저 직접 쿼리를 작성한 뒤 모범 답안과 비교하세요.",
    focus: ["요구사항 해석", "윈도 함수", "EXISTS"],
    questions: [
      {
        id: "practical-01",
        question: "주문 이력이 없는 고객을 조회하세요.",
        hint: "고객별로 주문이 존재하지 않는지를 검사하세요.",
        answer: [
          "NOT EXISTS는 ‘주문이 존재하지 않는 고객’이라는 의도를 직접 표현하며 NULL 함정도 피할 수 있습니다.",
        ],
        code: "SELECT c.*\nFROM customers c\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM orders o\n  WHERE o.customer_id = c.customer_id\n);",
        difficulty: "중급",
        keywords: ["NOT EXISTS", "안티 조인"],
      },
      {
        id: "practical-02",
        question: "고객별 가장 최근 주문 한 건을 조회하세요.",
        hint: "고객별 내림차순 순번을 만들고 1번만 선택하세요.",
        answer: [
          "ROW_NUMBER로 고객별 순번을 부여합니다. ordered_at 동점에 대비해 order_id를 보조 정렬 키로 둡니다.",
        ],
        code: "WITH ranked AS (\n  SELECT o.*,\n         ROW_NUMBER() OVER (\n           PARTITION BY customer_id\n           ORDER BY ordered_at DESC, order_id DESC\n         ) AS rn\n  FROM orders o\n)\nSELECT * FROM ranked WHERE rn = 1;",
        difficulty: "중급",
        keywords: ["ROW_NUMBER", "최신 행", "Top 1"],
      },
      {
        id: "practical-03",
        question: "전체 평균 주문 금액보다 큰 주문을 조회하세요.",
        hint: "전체 AVG는 스칼라 서브쿼리로 구할 수 있습니다.",
        answer: [
          "WHERE에서 전체 평균을 반환하는 스칼라 서브쿼리와 각 주문 금액을 비교합니다.",
        ],
        code: "SELECT *\nFROM orders\nWHERE amount > (SELECT AVG(amount) FROM orders);",
        difficulty: "기초",
        keywords: ["AVG", "스칼라 서브쿼리"],
      },
      {
        id: "practical-04",
        question: "각 부서에서 두 번째로 높은 급여를 받는 직원을 조회하세요.",
        hint: "동점자를 포함하려면 DENSE_RANK가 자연스럽습니다.",
        answer: [
          "부서별 급여 내림차순 DENSE_RANK를 만들고 2위인 행을 선택하면 두 번째 급여의 동점자도 모두 포함합니다.",
        ],
        code: "WITH ranked AS (\n  SELECT e.*,\n         DENSE_RANK() OVER (\n           PARTITION BY department_id\n           ORDER BY salary DESC\n         ) AS salary_rank\n  FROM employees e\n)\nSELECT * FROM ranked WHERE salary_rank = 2;",
        difficulty: "중급",
        keywords: ["DENSE_RANK", "부서별 순위"],
      },
      {
        id: "practical-05",
        question: "월별 매출과 전월 대비 매출 증감액을 조회하세요.",
        hint: "먼저 월별로 집계하고 그 결과에 LAG를 적용하세요.",
        answer: [
          "월별 매출 CTE를 만든 뒤 LAG로 이전 달 매출을 가져와 차감합니다.",
          "월 추출 문법은 DBMS별로 다르므로 아래 DATE_TRUNC는 PostgreSQL 예시입니다.",
        ],
        code: "WITH monthly AS (\n  SELECT DATE_TRUNC('month', ordered_at) AS month,\n         SUM(amount) AS sales\n  FROM orders\n  GROUP BY DATE_TRUNC('month', ordered_at)\n)\nSELECT month, sales,\n       sales - LAG(sales) OVER (ORDER BY month) AS change\nFROM monthly\nORDER BY month;",
        difficulty: "심화",
        keywords: ["월별 집계", "LAG", "DATE_TRUNC"],
      },
      {
        id: "practical-06",
        question: "동일한 이름을 가진 고객을 찾아 중복 여부를 확인하세요.",
        hint: "이름별로 묶고 2건 이상인 그룹을 찾으세요.",
        answer: [
          "GROUP BY와 HAVING으로 같은 이름이 두 번 이상 나온 그룹을 찾습니다.",
          "이름이 같다고 동일 인물이라는 뜻은 아니므로 실제 중복 판정에는 이메일·전화번호 등 업무 식별 기준이 추가로 필요합니다.",
        ],
        code: "SELECT customer_name, COUNT(*) AS duplicate_count\nFROM customers\nGROUP BY customer_name\nHAVING COUNT(*) >= 2;",
        difficulty: "기초",
        keywords: ["중복", "GROUP BY", "HAVING"],
      },
      {
        id: "practical-07",
        question: "한 번도 주문이 취소되지 않은 고객을 조회하세요.",
        hint: "고객에게 CANCELLED 주문이 존재하지 않아야 합니다.",
        answer: [
          "취소 주문의 부재를 NOT EXISTS로 검사합니다.",
          "주문 자체가 없는 고객도 포함되는 해석입니다. 주문 경험이 있는 고객만 원한다면 별도의 EXISTS 조건을 추가해야 합니다.",
        ],
        code: "SELECT c.*\nFROM customers c\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM orders o\n  WHERE o.customer_id = c.customer_id\n    AND o.status = 'CANCELLED'\n);",
        difficulty: "중급",
        keywords: ["NOT EXISTS", "요구사항 해석"],
        followUp:
          "주문 이력은 반드시 한 건 이상 있어야 한다는 조건을 추가해보세요.",
      },
      {
        id: "practical-08",
        question: "고객별 주문 금액 상위 2건을 조회하세요.",
        hint: "고객별 금액 내림차순 순번을 만든 뒤 2 이하를 선택하세요.",
        answer: [
          "정확히 두 행만 원하면 ROW_NUMBER를, 2위와 동점인 주문을 모두 포함하려면 RANK 또는 DENSE_RANK를 선택합니다.",
        ],
        code: "WITH ranked AS (\n  SELECT o.*,\n         ROW_NUMBER() OVER (\n           PARTITION BY customer_id\n           ORDER BY amount DESC, order_id\n         ) AS rn\n  FROM orders o\n)\nSELECT * FROM ranked WHERE rn <= 2;",
        difficulty: "중급",
        keywords: ["ROW_NUMBER", "Top N", "PARTITION BY"],
      },
    ],
  },
};
