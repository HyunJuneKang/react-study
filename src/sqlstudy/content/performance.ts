import type { StudyContentMap } from "./types";

export const performanceContents = {
  "index-basics": {
    id: "index-basics",
    category: "인덱스와 성능",
    title: "인덱스의 개념과 원리",
    summary:
      "인덱스는 원하는 행의 위치를 빠르게 찾기 위한 보조 자료구조이며 읽기 성능과 쓰기 비용을 교환합니다.",
    tags: ["Index", "B-tree", "Read/Write trade-off"],
    sections: [
      {
        title: "책의 색인처럼 찾기",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "테이블을 처음부터 끝까지 읽는 대신 정렬된 키와 행 위치를 가진 인덱스를 탐색하면 필요한 범위로 빠르게 이동할 수 있습니다. 범용 DBMS의 일반적인 인덱스는 B-tree 계열이지만 해시, 전문 검색 등 목적별 구조도 있습니다.",
              "인덱스는 WHERE 필터뿐 아니라 조인 키 탐색, ORDER BY, GROUP BY에도 도움을 줄 수 있습니다. 실제 사용 여부는 옵티마이저가 비용을 비교해 결정합니다.",
            ],
          },
          {
            type: "code",
            language: "sql",
            title: "주문 상태와 생성 시각 인덱스",
            code: "CREATE INDEX idx_orders_status_created_at\nON orders (status, created_at);\n\nSELECT order_id, created_at\nFROM orders\nWHERE status = 'PAID'\nORDER BY created_at DESC;",
          },
        ],
      },
      {
        title: "인덱스의 비용",
        blocks: [
          {
            type: "list",
            items: [
              "인덱스 페이지만큼 저장 공간과 메모리 캐시를 사용합니다.",
              "INSERT 시 새 키를 추가하고 구조를 유지해야 합니다.",
              "인덱스 컬럼 UPDATE는 기존 키 제거와 새 키 추가 비용이 생깁니다.",
              "DELETE도 인덱스 항목 정리가 필요합니다.",
              "유사한 인덱스가 많으면 옵티마이저 선택과 운영 관리도 복잡해집니다.",
            ],
          },
          {
            type: "callout",
            tone: "warning",
            title: "많을수록 좋은 것이 아닙니다",
            content:
              "실제 조회 패턴과 실행 계획을 근거로 필요한 인덱스를 설계하고, 사용되지 않거나 중복된 인덱스는 쓰기 비용까지 포함해 검토합니다.",
          },
        ],
      },
    ],
  },
  "single-and-composite-index": {
    id: "single-and-composite-index",
    category: "인덱스와 성능",
    title: "단일 인덱스와 복합 인덱스",
    summary:
      "복합 인덱스는 여러 컬럼을 정해진 순서로 묶으므로 자주 쓰는 조건과 정렬을 기준으로 선두 컬럼을 선택해야 합니다.",
    tags: ["Composite Index", "Leftmost prefix", "Column order"],
    sections: [
      {
        title: "컬럼 순서가 만드는 차이",
        blocks: [
          {
            type: "code",
            language: "sql",
            title: "(customer_id, created_at) 복합 인덱스",
            code: "CREATE INDEX idx_orders_customer_created\nON orders (customer_id, created_at DESC);\n\n-- 두 선두 조건과 정렬을 함께 활용하기 좋은 형태\nSELECT order_id, created_at\nFROM orders\nWHERE customer_id = 101\n  AND created_at >= '2026-01-01'\nORDER BY created_at DESC;",
          },
          {
            type: "table",
            headers: ["조건", "일반적인 활용 가능성"],
            rows: [
              ["customer_id = ?", "선두 컬럼 탐색 가능"],
              ["customer_id = ? AND created_at >= ?", "두 컬럼으로 범위 탐색 가능"],
              ["created_at >= ? 만 사용", "선두 컬럼이 없어 효율적 탐색이 제한될 수 있음"],
            ],
          },
        ],
      },
      {
        title: "순서 결정 질문",
        blocks: [
          {
            type: "list",
            items: [
              "어떤 조건 조합이 실제로 가장 자주 호출되는가?",
              "동등 조건과 범위 조건은 어떤 순서로 사용되는가?",
              "ORDER BY 또는 GROUP BY 순서를 인덱스로 지원할 수 있는가?",
              "기존 단일 인덱스와 중복되는가?",
              "값 분포와 조회 범위는 충분히 좁은가?",
            ],
          },
          {
            type: "callout",
            tone: "info",
            title: "공식은 출발점일 뿐",
            content:
              "선택도가 높은 컬럼을 무조건 앞에 둔다는 한 줄 공식보다 실제 쿼리의 동등·범위·정렬 조건과 DBMS 실행 계획을 함께 봐야 합니다.",
          },
        ],
      },
    ],
  },
  "selectivity-and-cardinality": {
    id: "selectivity-and-cardinality",
    category: "인덱스와 성능",
    title: "선택도와 카디널리티",
    summary:
      "카디널리티는 서로 다른 값의 수를, 선택도는 조건이 전체 행 중 얼마나 좁은 범위를 선택하는지를 설명합니다.",
    tags: ["Selectivity", "Cardinality", "Statistics"],
    sections: [
      {
        title: "두 용어 구분",
        blocks: [
          {
            type: "table",
            headers: ["개념", "질문", "예"],
            rows: [
              ["카디널리티", "서로 다른 값이 몇 개인가?", "회원 ID는 행 수에 가깝고 성별 코드는 값 종류가 적음"],
              ["선택도", "조건이 전체 중 몇 행을 선택하는가?", "PK = 10은 매우 좁고 status = 'ACTIVE'는 넓을 수 있음"],
            ],
          },
          {
            type: "text",
            paragraphs: [
              "일반적으로 적은 행을 찾는 조건은 인덱스로 랜덤 접근하는 이점이 큽니다. 반대로 대부분의 행을 읽는 조건은 인덱스를 거쳐 테이블을 반복 접근하는 것보다 전체 스캔이 저렴할 수 있습니다.",
            ],
          },
        ],
      },
      {
        title: "통계와 데이터 분포",
        blocks: [
          {
            type: "list",
            items: [
              "옵티마이저는 통계로 조건 결과 행 수를 추정합니다.",
              "값이 균등하지 않으면 단순한 서로 다른 값 개수만으로 실제 선택도를 설명하기 어렵습니다.",
              "통계가 오래되면 예상 행 수가 틀려 잘못된 조인 순서나 접근 방식을 선택할 수 있습니다.",
            ],
          },
          {
            type: "callout",
            tone: "tip",
            title: "선택도는 쿼리 조건의 속성",
            content:
              "같은 컬럼도 조건값과 시점에 따라 선택도가 달라집니다. status 컬럼이라도 희귀한 ERROR 상태를 찾는 조건과 대부분인 ACTIVE 상태를 찾는 조건은 비용이 다릅니다.",
          },
        ],
      },
    ],
  },
  "covering-index": {
    id: "covering-index",
    category: "인덱스와 성능",
    title: "커버링 인덱스",
    summary:
      "커버링 인덱스는 쿼리에 필요한 조건과 출력 컬럼을 인덱스만으로 충족해 테이블 본문 접근을 줄입니다.",
    tags: ["Covering Index", "Index-only scan", "Lookup"],
    sections: [
      {
        title: "테이블 접근 생략하기",
        blocks: [
          {
            type: "code",
            language: "sql",
            title: "목록 조회를 커버하는 예",
            code: "CREATE INDEX idx_orders_customer_created_status\nON orders (customer_id, created_at, status);\n\nSELECT created_at, status\nFROM orders\nWHERE customer_id = 101\nORDER BY created_at DESC;",
          },
          {
            type: "text",
            paragraphs: [
              "인덱스에 customer_id, created_at, status가 모두 있으므로 DBMS가 조건 확인과 결과 반환을 인덱스에서 끝낼 가능성이 생깁니다. 실제 동작과 이름은 DBMS 구현에 따라 다릅니다.",
            ],
          },
        ],
      },
      {
        title: "무엇이든 포함하지 않기",
        blocks: [
          {
            type: "list",
            items: [
              "인덱스가 넓어지면 디스크와 메모리를 더 사용합니다.",
              "쓰기마다 유지해야 할 데이터가 늘어납니다.",
              "인덱스 한 페이지에 들어가는 항목 수가 줄어 탐색 구조가 커질 수 있습니다.",
              "SELECT *를 커버하려는 설계는 대개 비용이 지나치게 큽니다.",
            ],
          },
          {
            type: "callout",
            tone: "warning",
            title: "핵심 목록 쿼리에 제한적으로",
            content:
              "호출 빈도가 높고 반환 컬럼이 적은 조회에서 측정 후 적용합니다. 커버링 여부만 보지 말고 전체 쓰기 부하와 캐시 효율을 함께 비교합니다.",
          },
        ],
      },
    ],
  },
  "index-limitations": {
    id: "index-limitations",
    category: "인덱스와 성능",
    title: "인덱스를 활용하지 못하는 경우",
    summary:
      "인덱스가 존재해도 조건 표현, 자료형 변환, 선두 컬럼 누락, 넓은 조회 범위 때문에 효율적으로 탐색하지 못할 수 있습니다.",
    tags: ["SARGable", "Implicit conversion", "Function"],
    sections: [
      {
        title: "탐색 가능한 조건 만들기",
        blocks: [
          {
            type: "table",
            headers: ["피해야 할 수 있는 표현", "개선 방향"],
            rows: [
              ["WHERE YEAR(created_at) = 2026", "created_at >= '2026-01-01' AND created_at < '2027-01-01'"],
              ["WHERE CAST(user_id AS CHAR) = '10'", "파라미터를 컬럼 자료형에 맞춤"],
              ["WHERE name LIKE '%sql%'", "선두 와일드카드가 필요한 검색은 전문 검색 등 검토"],
              ["(a, b) 인덱스에서 b만 조건", "실제 쿼리에 맞는 인덱스 순서 검토"],
            ],
          },
          {
            type: "callout",
            tone: "info",
            title: "함수 기반 인덱스도 있습니다",
            content:
              "컬럼 함수가 무조건 불가능하다는 뜻은 아닙니다. DBMS가 함수·표현식 인덱스를 지원하고 쿼리가 그 표현과 일치하면 활용할 수 있으므로 제품 기능을 확인합니다.",
          },
        ],
      },
      {
        title: "인덱스가 있어도 선택하지 않는 경우",
        blocks: [
          {
            type: "list",
            items: [
              "조건이 전체 행의 큰 비율을 반환합니다.",
              "테이블이 작아 순차 읽기가 더 저렴합니다.",
              "통계가 부정확해 비용을 잘못 추정합니다.",
              "인덱스로 찾은 뒤 많은 테이블 페이지를 랜덤 접근해야 합니다.",
              "ORDER BY와 필터 조건을 동시에 만족할 다른 계획이 더 저렴합니다.",
            ],
          },
          {
            type: "callout",
            tone: "warning",
            title: "인덱스 사용 여부가 목표는 아닙니다",
            content:
              "최종 목표는 쿼리의 응답 시간과 자원 사용을 개선하는 것입니다. 전체 스캔이 선택됐다는 사실만으로 잘못된 계획이라고 단정하지 않습니다.",
          },
        ],
      },
    ],
  },
  "full-scan-and-index-scan": {
    id: "full-scan-and-index-scan",
    category: "인덱스와 성능",
    title: "Full Scan과 Index Scan",
    summary:
      "전체 스캔과 인덱스 접근은 각각 순차 읽기와 선택적 탐색에 강점이 있으며 데이터 양과 반환 범위가 선택을 좌우합니다.",
    tags: ["Table Scan", "Index Scan", "Index Seek"],
    sections: [
      {
        title: "접근 방식 비교",
        blocks: [
          {
            type: "table",
            headers: ["방식", "동작", "유리할 수 있는 상황"],
            rows: [
              ["Full Table Scan", "테이블 전체 페이지를 읽음", "작은 테이블, 대부분의 행 필요, 순차 읽기 유리"],
              ["Index Scan", "인덱스 범위 또는 전체를 순서대로 읽음", "인덱스 순서·커버링을 활용"],
              ["Index Seek", "키 범위의 시작점으로 직접 탐색", "선택도가 높은 동등·범위 조건"],
            ],
          },
          {
            type: "text",
            paragraphs: [
              "용어는 DBMS 실행 계획마다 조금 다릅니다. 핵심은 몇 페이지를 어떤 순서로 읽고, 인덱스 탐색 후 테이블 본문을 몇 번 다시 찾는지입니다.",
            ],
          },
        ],
      },
      {
        title: "전체 스캔도 정상적인 선택",
        blocks: [
          {
            type: "callout",
            tone: "tip",
            title: "대부분을 읽는 집계",
            content:
              "월 전체 매출처럼 많은 행이 필요한 쿼리는 전체 스캔과 순차 I/O가 수많은 인덱스 조회보다 효율적일 수 있습니다.",
          },
          {
            type: "list",
            items: [
              "실제 반환 행 수와 읽은 행 수를 비교합니다.",
              "랜덤 I/O와 순차 I/O의 비용 차이를 고려합니다.",
              "인덱스가 필요한 컬럼을 모두 포함하는지도 확인합니다.",
              "반복 호출되는 OLTP 쿼리인지 일회성 분석 쿼리인지 구분합니다.",
            ],
          },
        ],
      },
    ],
  },
  "execution-plan": {
    id: "execution-plan",
    category: "인덱스와 성능",
    title: "실행 계획",
    summary:
      "실행 계획은 옵티마이저가 선택한 접근 방식, 조인 순서와 예상 비용을 보여 주어 SQL 튜닝의 근거가 됩니다.",
    tags: ["EXPLAIN", "Estimated rows", "Actual rows"],
    sections: [
      {
        title: "확인 순서",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "Table Scan인지 Index Scan 또는 Seek인지 확인합니다.",
              "예상 행 수와 실제 행 수의 차이가 큰 연산을 찾습니다.",
              "조인 방식과 조인 순서, 각 입력 크기를 확인합니다.",
              "Sort, 임시 공간, Key Lookup 같은 비용 큰 연산을 찾습니다.",
              "필터가 가능한 한 일찍 적용되고 불필요한 행이 흐르지 않는지 봅니다.",
            ],
          },
          {
            type: "code",
            language: "sql",
            title: "제품별 세부 문법은 다를 수 있음",
            code: "EXPLAIN\nSELECT customer_id, SUM(amount)\nFROM orders\nWHERE status = 'PAID'\nGROUP BY customer_id;",
          },
        ],
      },
      {
        title: "추정과 실제",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "옵티마이저는 통계를 기반으로 행 수와 비용을 추정합니다. 실제 행 수가 추정과 크게 다르면 오래된 통계, 상관된 컬럼, 치우친 값 분포, 파라미터 값 차이를 의심할 수 있습니다.",
              "실제 실행 정보를 수집하는 명령은 쿼리를 정말 실행할 수 있으므로 UPDATE·DELETE나 무거운 SELECT에서 안전성을 먼저 확인합니다.",
            ],
          },
          {
            type: "callout",
            tone: "warning",
            title: "비용 숫자의 한계",
            content:
              "계획의 cost는 같은 옵티마이저 내부에서 비교하는 추정 단위이지 밀리초가 아닙니다. 실제 응답 시간, 읽기 페이지, CPU와 호출 빈도를 함께 측정합니다.",
          },
        ],
      },
    ],
  },
  "physical-join-algorithms": {
    id: "physical-join-algorithms",
    category: "인덱스와 성능",
    title: "물리 조인 알고리즘",
    summary:
      "옵티마이저는 입력 크기, 정렬 상태, 인덱스, 메모리와 조건 종류를 바탕으로 Nested Loop·Hash·Merge Join을 선택합니다.",
    tags: ["Nested Loop", "Hash Join", "Merge Join"],
    sections: [
      {
        title: "세 가지 대표 방식",
        blocks: [
          {
            type: "table",
            headers: ["알고리즘", "방식", "유리할 수 있는 상황", "주의점"],
            rows: [
              ["Nested Loop", "한쪽 행마다 다른 쪽 탐색", "바깥 입력이 작고 안쪽 키 인덱스가 좋음", "바깥 행이 많으면 반복 탐색 증가"],
              ["Hash Join", "한쪽 키로 해시 테이블 생성 후 탐색", "큰 입력의 동등 조인", "메모리 부족 시 디스크 사용 가능"],
              ["Merge Join", "정렬된 두 입력을 함께 순회", "양쪽이 조인 키 순서로 준비됨", "정렬이 없으면 추가 정렬 비용"],
            ],
          },
        ],
      },
      {
        title: "SQL과 물리 계획을 구분하기",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "INNER JOIN 같은 SQL 문법은 어떤 결과가 필요한지를 표현하고, 물리 조인 알고리즘은 그 결과를 어떻게 계산할지를 표현합니다. 같은 SQL도 통계와 파라미터, 인덱스에 따라 다른 알고리즘을 사용할 수 있습니다.",
            ],
          },
          {
            type: "callout",
            tone: "tip",
            title: "힌트는 마지막 수단",
            content:
              "개발자가 조인 방식을 강제로 지정하기 전에 잘못된 행 수 추정, 누락된 인덱스, 불필요한 입력 행 같은 원인을 먼저 해결합니다.",
          },
        ],
      },
    ],
  },
  "sql-tuning": {
    id: "sql-tuning",
    category: "인덱스와 성능",
    title: "SQL 튜닝 기초",
    summary:
      "SQL 튜닝은 감으로 문법을 바꾸는 일이 아니라 병목을 측정하고 읽는 행과 데이터 이동을 줄이는 반복 과정입니다.",
    tags: ["Query tuning", "Measurement", "SARGable"],
    sections: [
      {
        title: "튜닝 절차",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "느린 쿼리와 호출 빈도, 목표 응답 시간을 수집합니다.",
              "실행 계획에서 읽은 행 수, 추정 오차, 조인과 정렬 비용을 찾습니다.",
              "반환할 행과 컬럼을 필요한 만큼만 줄입니다.",
              "조건식과 조인 키를 수정하고 적절한 인덱스를 검토합니다.",
              "동일한 데이터와 부하에서 전후 성능과 쓰기 비용을 비교합니다.",
            ],
          },
        ],
      },
      {
        title: "기본 점검 목록",
        blocks: [
          {
            type: "list",
            items: [
              "불필요한 SELECT *와 중복 DISTINCT가 있는가?",
              "필터와 조인 컬럼의 자료형이 일치하는가?",
              "조건 컬럼에 불필요한 함수나 연산을 적용했는가?",
              "N+1 쿼리처럼 같은 조회를 과도하게 반복하는가?",
              "큰 OFFSET, 불안정한 정렬, 필요 없는 조인이 있는가?",
              "인덱스 추가가 다른 쓰기와 쿼리에 미치는 영향은 무엇인가?",
            ],
          },
          {
            type: "callout",
            tone: "warning",
            title: "한 쿼리의 최고 속도가 전부가 아닙니다",
            content:
              "힌트나 넓은 인덱스로 한 SQL만 빠르게 만들면 전체 쓰기 처리량과 다른 쿼리가 느려질 수 있습니다. 시스템 전체의 자원 사용과 유지보수성을 함께 봅니다.",
          },
        ],
      },
    ],
  },
  pagination: {
    id: "pagination",
    category: "인덱스와 성능",
    title: "Offset과 Seek 페이징",
    summary:
      "Offset 방식은 임의 페이지 이동이 쉽고 Seek 방식은 마지막 키 이후를 탐색해 깊은 페이지의 건너뛰기 비용을 줄입니다.",
    tags: ["Pagination", "OFFSET", "Keyset", "Seek"],
    sections: [
      {
        title: "두 방식 비교",
        blocks: [
          {
            type: "code",
            language: "sql",
            title: "Offset 방식",
            code: "SELECT order_id, created_at\nFROM orders\nORDER BY order_id\nLIMIT 20 OFFSET 100000;",
          },
          {
            type: "code",
            language: "sql",
            title: "Seek 방식",
            code: "SELECT order_id, created_at\nFROM orders\nWHERE order_id > :last_order_id\nORDER BY order_id\nLIMIT 20;",
          },
          {
            type: "table",
            headers: ["기준", "Offset", "Seek / Keyset"],
            rows: [
              ["깊은 페이지", "앞 행을 많이 건너뛸 수 있음", "인덱스에서 마지막 키 이후 탐색"],
              ["임의 페이지 이동", "쉬움", "일반적으로 어려움"],
              ["데이터 변경 중 안정성", "중복·누락 가능", "안정적 키를 쓰면 상대적으로 유리"],
              ["잘 맞는 UI", "페이지 번호", "더 보기·무한 스크롤"],
            ],
          },
        ],
      },
      {
        title: "안정적인 복합 정렬",
        blocks: [
          {
            type: "code",
            language: "sql",
            title: "created_at 동률을 order_id로 구분",
            code: "SELECT order_id, created_at\nFROM orders\nWHERE (created_at, order_id) < (:last_created_at, :last_order_id)\nORDER BY created_at DESC, order_id DESC\nLIMIT 20;",
          },
          {
            type: "callout",
            tone: "warning",
            title: "정렬 키는 유일해야 합니다",
            content:
              "created_at만으로 정렬하면 같은 시각의 행 경계가 모호합니다. 기본키 같은 고유한 컬럼을 마지막 정렬 기준과 커서에 포함하고, DBMS의 튜플 비교 지원 여부에 따라 조건을 풀어 씁니다.",
          },
        ],
      },
    ],
  },
} satisfies StudyContentMap;
