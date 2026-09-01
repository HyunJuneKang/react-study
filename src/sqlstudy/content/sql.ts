import type { StudyContentMap } from "./types";

export const sqlContents = {
  "sql-command-types": {
    id: "sql-command-types",
    category: "SQL",
    title: "SQL 명령어 분류",
    summary:
      "SQL 명령은 구조 정의, 데이터 처리, 권한 관리, 트랜잭션 제어라는 역할로 나눠 이해할 수 있습니다.",
    tags: ["DDL", "DML", "DQL", "DCL", "TCL"],
    sections: [
      {
        title: "역할별 분류",
        blocks: [
          {
            type: "table",
            headers: ["분류", "역할", "대표 명령어"],
            rows: [
              ["DDL", "데이터 구조 정의", "CREATE, ALTER, DROP, TRUNCATE"],
              ["DML", "데이터 삽입·수정·삭제", "INSERT, UPDATE, DELETE"],
              ["DQL", "데이터 조회", "SELECT"],
              ["DCL", "사용자 권한 제어", "GRANT, REVOKE"],
              ["TCL", "트랜잭션 제어", "COMMIT, ROLLBACK, SAVEPOINT"],
            ],
          },
          {
            type: "callout",
            tone: "info",
            title: "분류 기준은 자료마다 다릅니다",
            content:
              "SELECT를 DML에 포함하는 분류도 있고 DQL로 따로 떼는 분류도 있습니다. 이름 암기보다 각 명령이 구조·데이터·권한·트랜잭션 중 무엇을 바꾸는지 설명하는 것이 중요합니다.",
          },
        ],
      },
      {
        title: "비슷해 보이는 삭제 명령",
        blocks: [
          {
            type: "table",
            headers: ["명령", "제거 대상", "구조 유지", "WHERE"],
            rows: [
              ["DELETE", "선택한 행", "유지", "가능"],
              ["TRUNCATE", "테이블의 전체 행", "유지", "일반적으로 불가능"],
              ["DROP", "테이블 객체 자체", "제거", "불가능"],
            ],
          },
          {
            type: "callout",
            tone: "warning",
            title: "DBMS별 차이",
            content:
              "TRUNCATE의 트랜잭션 처리, 로그 기록, 자동 증가 값 초기화 여부는 DBMS마다 다릅니다. 운영 작업 전에는 제품 문서를 확인해야 합니다.",
          },
        ],
      },
    ],
  },
  ddl: {
    id: "ddl",
    category: "SQL",
    title: "DDL: 데이터 구조 정의",
    summary:
      "DDL은 테이블과 컬럼, 제약조건 같은 데이터의 그릇을 만들고 변경하거나 제거합니다.",
    tags: ["CREATE", "ALTER", "DROP", "TRUNCATE"],
    sections: [
      {
        title: "테이블 만들고 변경하기",
        blocks: [
          {
            type: "code",
            language: "sql",
            title: "CREATE와 ALTER",
            code: "CREATE TABLE products (\n  product_id BIGINT PRIMARY KEY,\n  name VARCHAR(100) NOT NULL,\n  price DECIMAL(12, 2) CHECK (price >= 0)\n);\n\nALTER TABLE products\nADD COLUMN stock INT NOT NULL DEFAULT 0;",
          },
          {
            type: "list",
            items: [
              "CREATE는 테이블·인덱스·뷰 같은 객체를 생성합니다.",
              "ALTER는 운영 중인 객체의 컬럼이나 제약조건을 변경합니다.",
              "TRUNCATE는 구조를 남기고 모든 행을 비웁니다.",
              "DROP은 객체의 정의와 데이터를 함께 제거합니다.",
            ],
          },
        ],
      },
      {
        title: "운영 환경에서의 주의",
        blocks: [
          {
            type: "callout",
            tone: "danger",
            title: "DDL도 배포 작업입니다",
            content:
              "큰 테이블의 컬럼 변경이나 인덱스 생성은 긴 락, 추가 디스크 사용, 복제 지연을 만들 수 있습니다. 실행 전 영향 범위와 롤백 또는 복구 계획을 준비합니다.",
          },
          {
            type: "text",
            paragraphs: [
              "DBMS마다 DDL의 암시적 커밋 여부와 온라인 변경 지원 범위가 다릅니다. 개발 환경에서 성공한 문장을 그대로 운영에 적용하기보다 제품 버전과 데이터 규모를 기준으로 검증해야 합니다.",
            ],
          },
        ],
      },
    ],
  },
  dml: {
    id: "dml",
    category: "SQL",
    title: "DML: 데이터 입력과 변경",
    summary:
      "INSERT, UPDATE, DELETE는 테이블의 실제 행을 만들고 바꾸고 제거하며, 트랜잭션과 조건 검증이 중요합니다.",
    tags: ["INSERT", "UPDATE", "DELETE"],
    sections: [
      {
        title: "입력·수정·삭제",
        blocks: [
          {
            type: "code",
            language: "sql",
            title: "기본 DML 예시",
            code: "INSERT INTO products (product_id, name, price, stock)\nVALUES (101, '키보드', 79000, 10);\n\nUPDATE products\nSET stock = stock - 1\nWHERE product_id = 101\n  AND stock > 0;\n\nDELETE FROM products\nWHERE product_id = 101;",
          },
          {
            type: "list",
            items: [
              "INSERT는 컬럼 목록을 명시하면 스키마 변경에 더 안전하고 의도가 분명합니다.",
              "UPDATE는 기존 값을 이용해 계산할 수 있으며 영향받은 행 수를 확인하는 습관이 좋습니다.",
              "DELETE는 조건에 맞는 행만 제거하고 테이블 구조는 유지합니다.",
            ],
          },
        ],
      },
      {
        title: "안전하게 변경하기",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "같은 WHERE 조건으로 SELECT를 먼저 실행해 대상 행을 확인합니다.",
              "필요하면 트랜잭션을 시작하고 변경합니다.",
              "영향받은 행 수와 변경 결과를 확인합니다.",
              "맞으면 COMMIT, 잘못됐으면 ROLLBACK합니다.",
            ],
          },
          {
            type: "callout",
            tone: "danger",
            title: "WHERE 누락",
            content:
              "UPDATE나 DELETE에서 WHERE를 생략하면 테이블의 모든 행이 대상이 됩니다. 중요한 운영 변경은 쿼리 리뷰와 영향 행 제한 정책을 함께 사용합니다.",
          },
        ],
      },
    ],
  },
  "select-basics": {
    id: "select-basics",
    category: "SQL",
    title: "SELECT 기본 조회",
    summary:
      "SELECT는 원하는 컬럼과 행, 중복 제거, 정렬, 결과 개수를 선언해 필요한 결과 집합을 만듭니다.",
    tags: ["SELECT", "WHERE", "ORDER BY", "DISTINCT"],
    sections: [
      {
        title: "조회문의 기본 뼈대",
        blocks: [
          {
            type: "code",
            language: "sql",
            title: "도시 목록 조회",
            code: "SELECT DISTINCT city\nFROM customers\nWHERE city IN ('서울', '부산')\nORDER BY city ASC\nLIMIT 20;",
          },
          {
            type: "list",
            items: [
              "SELECT는 결과에 표시할 표현식과 컬럼을 선택합니다.",
              "FROM은 데이터를 가져올 테이블이나 서브쿼리를 정합니다.",
              "WHERE는 조건에 맞는 행만 남깁니다.",
              "DISTINCT는 선택한 컬럼 조합이 같은 결과 행의 중복을 제거합니다.",
              "ORDER BY는 결과 순서를 보장하고 LIMIT 계열 문법은 행 수를 제한합니다.",
            ],
          },
        ],
      },
      {
        title: "정렬과 행 제한",
        blocks: [
          {
            type: "table",
            headers: ["DBMS 계열", "대표 행 제한 문법"],
            rows: [
              ["MySQL, PostgreSQL", "LIMIT 20"],
              ["SQL Server", "TOP (20) 또는 OFFSET/FETCH"],
              ["Oracle·표준 계열", "FETCH FIRST 20 ROWS ONLY"],
            ],
          },
          {
            type: "callout",
            tone: "warning",
            title: "보이는 순서는 저장 순서가 아닙니다",
            content:
              "ORDER BY가 없으면 결과 순서는 보장되지 않습니다. 상위 N개나 페이지 조회에는 동률까지 구분할 수 있는 안정적인 정렬 기준을 명시합니다.",
          },
        ],
      },
    ],
  },
  "conditions-and-null": {
    id: "conditions-and-null",
    category: "SQL",
    title: "조건식과 NULL",
    summary:
      "SQL 조건은 TRUE·FALSE·UNKNOWN의 3값 논리를 사용하며 NULL은 반드시 전용 연산자로 다뤄야 합니다.",
    tags: ["NULL", "LIKE", "IN", "CASE", "COALESCE"],
    sections: [
      {
        title: "자주 쓰는 조건",
        blocks: [
          {
            type: "table",
            headers: ["표현", "의미", "주의점"],
            rows: [
              ["LIKE '김%'", "김으로 시작하는 문자열", "%는 길이 0 이상의 문자열"],
              ["LIKE '_A'", "두 글자이며 두 번째가 A", "_는 정확히 한 문자"],
              ["BETWEEN 10 AND 20", "10 이상 20 이하", "날짜·시간의 마지막 경계 주의"],
              ["IN ('A', 'B')", "목록 중 하나와 일치", "NULL이 섞인 NOT IN 주의"],
              ["IS NULL", "값이 없거나 알 수 없음", "= NULL을 사용하지 않음"],
            ],
          },
          {
            type: "code",
            language: "sql",
            title: "NULL 처리와 조건 분기",
            code: "SELECT order_id,\n       COALESCE(coupon_code, '미사용') AS coupon,\n       CASE\n         WHEN amount >= 100000 THEN 'VIP'\n         ELSE 'NORMAL'\n       END AS grade\nFROM orders\nWHERE cancelled_at IS NULL;",
          },
        ],
      },
      {
        title: "3값 논리",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "NULL은 숫자 0이나 빈 문자열이 아니라 값이 존재하지 않거나 알 수 없다는 표시입니다. 따라서 NULL = NULL도 TRUE가 아니라 UNKNOWN입니다.",
              "WHERE는 TRUE인 행만 통과시키므로 FALSE뿐 아니라 UNKNOWN인 행도 결과에서 제외됩니다.",
            ],
          },
          {
            type: "callout",
            tone: "warning",
            title: "NOT IN과 NULL",
            content:
              "NOT IN의 목록이나 서브쿼리 결과에 NULL이 포함되면 비교 결과가 UNKNOWN이 되어 예상과 달리 행이 나오지 않을 수 있습니다. 존재하지 않음을 검사하려면 NOT EXISTS를 고려합니다.",
          },
        ],
      },
    ],
  },
  joins: {
    id: "joins",
    category: "SQL",
    title: "JOIN",
    summary:
      "JOIN은 관련 키를 기준으로 여러 테이블의 행을 결합하며, 종류와 조건 위치에 따라 보존되는 행이 달라집니다.",
    tags: ["INNER JOIN", "LEFT JOIN", "ON", "Cardinality"],
    sections: [
      {
        title: "대표 조인 종류",
        blocks: [
          {
            type: "table",
            headers: ["종류", "결과"],
            rows: [
              ["INNER JOIN", "양쪽 조건이 일치하는 행만 반환"],
              ["LEFT JOIN", "왼쪽 모든 행을 유지하고 불일치한 오른쪽 값을 NULL로 채움"],
              ["RIGHT JOIN", "오른쪽 모든 행을 유지"],
              ["FULL OUTER JOIN", "양쪽 모든 행을 유지하고 불일치한 쪽을 NULL로 채움"],
              ["CROSS JOIN", "두 입력의 모든 조합 생성"],
              ["SELF JOIN", "같은 테이블을 서로 다른 별칭으로 연결"],
            ],
          },
          {
            type: "code",
            language: "sql",
            title: "주문이 없는 고객까지 조회",
            code: "SELECT c.customer_name, o.order_id\nFROM customers AS c\nLEFT JOIN orders AS o\n  ON o.customer_id = c.customer_id;",
          },
        ],
      },
      {
        title: "ON과 WHERE가 결과를 바꾸는 경우",
        blocks: [
          {
            type: "code",
            language: "sql",
            title: "모든 고객을 유지하며 결제 주문만 연결",
            code: "SELECT c.customer_name, o.order_id\nFROM customers AS c\nLEFT JOIN orders AS o\n  ON o.customer_id = c.customer_id\n AND o.status = 'PAID';",
          },
          {
            type: "text",
            paragraphs: [
              "같은 o.status 조건을 WHERE에 두면 매칭되지 않은 행의 o.status는 NULL이므로 제거됩니다. 그 결과 결제 주문이 없는 고객은 사라져 INNER JOIN과 비슷한 결과가 됩니다.",
            ],
          },
          {
            type: "callout",
            tone: "warning",
            title: "행 수가 늘어나는 이유",
            content:
              "조인 키가 한쪽에서 중복되면 한 행이 여러 행과 매칭됩니다. 예상보다 행이 많을 때 DISTINCT부터 붙이지 말고 1:1, 1:N, N:M 관계와 ON 조건을 먼저 확인합니다.",
          },
        ],
      },
    ],
  },
  aggregation: {
    id: "aggregation",
    category: "SQL",
    title: "집계와 GROUP BY",
    summary:
      "GROUP BY는 행을 그룹으로 묶고 집계 함수는 그룹별 개수·합계·평균·최솟값·최댓값을 계산합니다.",
    tags: ["GROUP BY", "HAVING", "COUNT", "SUM"],
    sections: [
      {
        title: "그룹별 주문 요약",
        blocks: [
          {
            type: "code",
            language: "sql",
            title: "결제 주문이 10건 이상인 고객",
            code: "SELECT customer_id,\n       COUNT(*) AS order_count,\n       SUM(amount) AS total_amount\nFROM orders\nWHERE status = 'PAID'\nGROUP BY customer_id\nHAVING COUNT(*) >= 10;",
          },
          {
            type: "list",
            items: [
              "WHERE는 그룹을 만들기 전에 개별 행을 거릅니다.",
              "GROUP BY는 같은 customer_id를 하나의 그룹으로 묶습니다.",
              "HAVING은 집계가 끝난 그룹을 조건으로 거릅니다.",
              "SELECT에는 그룹화한 컬럼 또는 집계한 값을 사용합니다.",
            ],
          },
        ],
      },
      {
        title: "COUNT의 NULL 처리",
        blocks: [
          {
            type: "table",
            headers: ["표현", "세는 대상"],
            rows: [
              ["COUNT(*)", "조건을 통과한 행 자체"],
              ["COUNT(column)", "해당 컬럼이 NULL이 아닌 행"],
              ["COUNT(DISTINCT column)", "NULL을 제외한 서로 다른 값"],
            ],
          },
          {
            type: "callout",
            tone: "tip",
            title: "성능의 첫 단계",
            content:
              "가능한 행 조건은 HAVING보다 WHERE에서 먼저 줄이는 편이 집계할 입력을 감소시킬 수 있습니다. 단, 집계 결과에 대한 조건은 HAVING에 둡니다.",
          },
        ],
      },
    ],
  },
  "set-operations": {
    id: "set-operations",
    category: "SQL",
    title: "집합 연산",
    summary:
      "집합 연산은 컬럼 구조가 호환되는 여러 SELECT 결과를 합집합·교집합·차집합으로 결합합니다.",
    tags: ["UNION", "UNION ALL", "INTERSECT", "EXCEPT"],
    sections: [
      {
        title: "결과 집합 결합하기",
        blocks: [
          {
            type: "code",
            language: "sql",
            title: "현재 회원과 탈퇴 회원 이메일",
            code: "SELECT email FROM current_members\nUNION\nSELECT email FROM withdrawn_members;",
          },
          {
            type: "table",
            headers: ["연산", "의미", "중복 처리"],
            rows: [
              ["UNION", "합집합", "중복 제거"],
              ["UNION ALL", "합집합", "중복 유지"],
              ["INTERSECT", "교집합", "제품별 지원 확인"],
              ["EXCEPT / MINUS", "왼쪽 결과에서 오른쪽 결과를 뺀 차집합", "제품별 이름·지원 확인"],
            ],
          },
        ],
      },
      {
        title: "호환 조건과 비용",
        blocks: [
          {
            type: "list",
            items: [
              "결합하는 SELECT의 컬럼 개수가 같아야 합니다.",
              "같은 위치의 컬럼 자료형이 서로 호환되어야 합니다.",
              "최종 컬럼 이름은 일반적으로 첫 SELECT의 별칭을 따릅니다.",
              "중복 제거가 필요 없다면 UNION ALL이 더 단순하고 대체로 빠릅니다.",
            ],
          },
          {
            type: "callout",
            tone: "warning",
            title: "JOIN과 다른 목적",
            content:
              "JOIN은 관련 행을 옆으로 결합해 컬럼을 늘리고, 집합 연산은 같은 모양의 결과를 위아래로 결합해 행을 늘립니다.",
          },
        ],
      },
    ],
  },
  "subquery-and-cte": {
    id: "subquery-and-cte",
    category: "SQL",
    title: "서브쿼리와 CTE",
    summary:
      "서브쿼리는 SQL 안에 포함된 조회이고, CTE는 복잡한 중간 결과에 이름을 붙여 읽기 쉽게 구성합니다.",
    tags: ["Subquery", "CTE", "WITH", "EXISTS"],
    sections: [
      {
        title: "중간 결과에 이름 붙이기",
        blocks: [
          {
            type: "code",
            language: "sql",
            title: "고객별 매출 CTE",
            code: "WITH customer_sales AS (\n  SELECT customer_id, SUM(amount) AS total_amount\n  FROM orders\n  GROUP BY customer_id\n)\nSELECT customer_id, total_amount\nFROM customer_sales\nWHERE total_amount >= 100000;",
          },
          {
            type: "list",
            items: [
              "스칼라 서브쿼리는 하나의 값을 반환하는 위치에 사용합니다.",
              "인라인 뷰는 FROM 절에서 임시 테이블처럼 사용합니다.",
              "상관 서브쿼리는 바깥 행을 참조하며 행마다 평가되는 형태로 보일 수 있습니다.",
              "CTE는 복잡한 쿼리를 이름 있는 단계로 나눠 가독성을 높입니다.",
            ],
          },
        ],
      },
      {
        title: "IN과 EXISTS",
        blocks: [
          {
            type: "code",
            language: "sql",
            title: "주문이 존재하는 고객",
            code: "SELECT c.customer_id, c.customer_name\nFROM customers AS c\nWHERE EXISTS (\n  SELECT 1\n  FROM orders AS o\n  WHERE o.customer_id = c.customer_id\n);",
          },
          {
            type: "text",
            paragraphs: [
              "IN은 어떤 값이 목록에 포함되는지를 표현하기 좋고, EXISTS는 조건을 만족하는 행이 하나라도 존재하는지를 표현하기 좋습니다.",
              "둘의 성능은 문법 이름만으로 단정할 수 없습니다. 옵티마이저, 통계, 인덱스와 데이터 분포를 실행 계획으로 확인합니다.",
            ],
          },
          {
            type: "callout",
            tone: "warning",
            title: "CTE가 항상 빠른 것은 아닙니다",
            content:
              "CTE는 주로 표현과 구조화 도구입니다. 인라인 처리 또는 물질화 여부는 DBMS와 버전에 따라 달라질 수 있으므로 성능은 실행 계획으로 판단합니다.",
          },
        ],
      },
    ],
  },
  "window-functions": {
    id: "window-functions",
    category: "SQL",
    title: "윈도 함수",
    summary:
      "윈도 함수는 주변 행을 참고해 순위·누적값·이전값을 계산하지만 GROUP BY처럼 원래 행을 줄이지 않습니다.",
    tags: ["OVER", "PARTITION BY", "RANK", "LAG"],
    sections: [
      {
        title: "부서별 급여 순위",
        blocks: [
          {
            type: "code",
            language: "sql",
            title: "DENSE_RANK 예시",
            code: "SELECT employee_name, department_id, salary,\n       DENSE_RANK() OVER (\n         PARTITION BY department_id\n         ORDER BY salary DESC\n       ) AS salary_rank\nFROM employees;",
          },
          {
            type: "list",
            items: [
              "PARTITION BY는 계산 범위를 그룹으로 나눕니다.",
              "윈도 내부 ORDER BY는 각 그룹에서 계산할 순서를 정합니다.",
              "OVER 절이 있어도 결과의 최종 출력 순서를 보장하지 않으므로 필요하면 바깥 ORDER BY를 추가합니다.",
            ],
          },
        ],
      },
      {
        title: "순위와 행 참조 함수",
        blocks: [
          {
            type: "table",
            headers: ["함수", "동점 처리 또는 역할"],
            rows: [
              ["ROW_NUMBER", "동점이어도 서로 다른 연속 번호"],
              ["RANK", "동점은 같은 순위, 다음 순위는 건너뜀"],
              ["DENSE_RANK", "동점은 같은 순위, 다음 순위를 건너뛰지 않음"],
              ["LAG", "현재 행보다 이전 행의 값 참조"],
              ["LEAD", "현재 행보다 다음 행의 값 참조"],
            ],
          },
          {
            type: "callout",
            tone: "tip",
            title: "GROUP BY와의 차이",
            content:
              "GROUP BY는 여러 행을 그룹당 한 행으로 축약하지만 윈도 함수는 원래 행을 유지한 채 그룹별 계산 결과를 옆 컬럼에 붙입니다.",
          },
        ],
      },
    ],
  },
  "sql-execution-order": {
    id: "sql-execution-order",
    category: "SQL",
    title: "SQL 논리적 실행 순서",
    summary:
      "SQL을 작성하는 순서와 논리적으로 평가되는 순서는 다르며, 이 차이를 알면 별칭과 필터 위치를 이해하기 쉽습니다.",
    tags: ["Logical order", "WHERE", "HAVING", "Alias"],
    sections: [
      {
        title: "SELECT의 논리적 흐름",
        blocks: [
          {
            type: "code",
            language: "text",
            title: "대표적인 논리 순서",
            code: "FROM\n→ JOIN / ON\n→ WHERE\n→ GROUP BY\n→ HAVING\n→ SELECT\n→ DISTINCT\n→ ORDER BY\n→ LIMIT",
          },
          {
            type: "text",
            paragraphs: [
              "먼저 데이터 원본과 조인 결과를 만든 뒤 WHERE로 행을 줄이고, GROUP BY와 HAVING으로 그룹을 처리합니다. 그다음 SELECT 표현식을 계산하고 정렬과 행 제한을 적용합니다.",
            ],
          },
        ],
      },
      {
        title: "순서가 설명해 주는 오류",
        blocks: [
          {
            type: "code",
            language: "sql",
            title: "WHERE에서 SELECT 별칭을 바로 쓰지 못하는 예",
            code: "-- total은 SELECT 단계에서 만들어지므로 WHERE보다 늦다.\nSELECT price * quantity AS total\nFROM order_items\nWHERE price * quantity >= 100000;",
          },
          {
            type: "list",
            items: [
              "WHERE는 집계 전의 개별 행 조건에 사용합니다.",
              "HAVING은 GROUP BY 뒤의 집계 결과 조건에 사용합니다.",
              "SELECT 별칭은 보통 WHERE에서 사용할 수 없지만 ORDER BY에서는 사용할 수 있습니다.",
              "논리 순서는 설명 모델이며 실제 물리 실행은 옵티마이저가 동등한 결과를 유지하며 재배치할 수 있습니다.",
            ],
          },
        ],
      },
    ],
  },
} satisfies StudyContentMap;
