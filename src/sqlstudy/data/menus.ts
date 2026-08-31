export type PageType =
  | "database"
  | "sql"
  | "data-modeling-and-normalization"
  | "index-and-performance"
  | "transaction-and-concurrency"
  | "authorization-and-security"
  | "advanced-database-operations"
  | "interview-questions";

export type SubMenu = {
  id: string;
  label: string;
};

export const menus: {
  id: PageType;
  label: string;
  subMenus: SubMenu[];
}[] = [
  {
    id: "database",
    label: "데이터베이스 기초",
    subMenus: [
      { id: "database-and-dbms", label: "데이터베이스와 DBMS" },
      { id: "database-structure", label: "데이터베이스 기본 구조" },
      { id: "schema-table-row-column", label: "스키마, 테이블, 행과 열" },
      { id: "rdbms-and-nosql", label: "RDBMS와 NoSQL" },
      { id: "relational-database", label: "관계형 데이터베이스의 특징" },
    ],
  },
  {
    id: "sql",
    label: "SQL",
    subMenus: [
      { id: "sql-command-types", label: "SQL 명령어 분류" },
      { id: "ddl", label: "DDL: 데이터 구조 정의" },
      { id: "dml", label: "DML: 데이터 입력과 변경" },
      { id: "select-basics", label: "SELECT 기본 조회" },
      { id: "conditions-and-null", label: "조건식과 NULL" },
      { id: "joins", label: "JOIN" },
      { id: "aggregation", label: "집계와 GROUP BY" },
      { id: "set-operations", label: "집합 연산" },
      { id: "subquery-and-cte", label: "서브쿼리와 CTE" },
      { id: "window-functions", label: "윈도 함수" },
      { id: "sql-execution-order", label: "SQL 논리적 실행 순서" },
    ],
  },
  {
    id: "data-modeling-and-normalization",
    label: "데이터 모델링과 정규화",
    subMenus: [
      { id: "keys", label: "키의 종류" },
      { id: "constraints", label: "제약조건" },
      { id: "referential-integrity", label: "참조 무결성" },
      { id: "table-relationships", label: "테이블 관계" },
      { id: "erd", label: "ERD와 데이터 모델링" },
      { id: "data-anomalies", label: "데이터 이상 현상" },
      { id: "first-normal-form", label: "제1정규형" },
      { id: "second-normal-form", label: "제2정규형" },
      { id: "third-normal-form", label: "제3정규형" },
      { id: "denormalization", label: "역정규화" },
    ],
  },
  {
    id: "index-and-performance",
    label: "인덱스와 성능",
    subMenus: [
      { id: "index-basics", label: "인덱스의 개념과 원리" },
      { id: "single-and-composite-index", label: "단일 인덱스와 복합 인덱스" },
      { id: "selectivity-and-cardinality", label: "선택도와 카디널리티" },
      { id: "covering-index", label: "커버링 인덱스" },
      { id: "index-limitations", label: "인덱스를 활용하지 못하는 경우" },
      { id: "full-scan-and-index-scan", label: "Full Scan과 Index Scan" },
      { id: "execution-plan", label: "실행 계획" },
      { id: "physical-join-algorithms", label: "물리 조인 알고리즘" },
      { id: "sql-tuning", label: "SQL 튜닝 기초" },
      { id: "pagination", label: "Offset과 Seek 페이징" },
    ],
  },
  {
    id: "transaction-and-concurrency",
    label: "트랜잭션과 동시성",
    subMenus: [
      { id: "transaction-basics", label: "트랜잭션의 개념" },
      { id: "acid", label: "ACID" },
      { id: "transaction-control", label: "COMMIT, ROLLBACK, SAVEPOINT" },
      { id: "isolation-levels", label: "트랜잭션 격리 수준" },
      { id: "concurrency-problems", label: "동시성 문제" },
      { id: "shared-and-exclusive-locks", label: "공유 락과 배타 락" },
      {
        id: "optimistic-and-pessimistic-locks",
        label: "낙관적 락과 비관적 락",
      },
      { id: "mvcc", label: "MVCC" },
      { id: "deadlock", label: "데드락" },
      { id: "stock-concurrency", label: "재고 차감 동시성 예제" },
    ],
  },
  {
    id: "authorization-and-security",
    label: "권한과 보안",
    subMenus: [
      { id: "users-and-roles", label: "사용자와 역할" },
      { id: "grant-and-revoke", label: "GRANT와 REVOKE" },
      { id: "least-privilege", label: "최소 권한 원칙" },
      { id: "sql-injection", label: "SQL Injection" },
      { id: "prepared-statements", label: "Prepared Statement" },
      { id: "input-validation", label: "입력값 검증" },
      { id: "sensitive-information", label: "민감 정보와 오류 관리" },
    ],
  },
  {
    id: "advanced-database-operations",
    label: "데이터베이스 운영 심화",
    subMenus: [
      { id: "partitioning", label: "파티셔닝" },
      { id: "sharding", label: "샤딩" },
      { id: "replication", label: "복제" },
      { id: "high-availability", label: "고가용성" },
      { id: "backup-and-recovery", label: "백업과 복구" },
      { id: "transaction-log", label: "트랜잭션 로그" },
      { id: "rpo-and-rto", label: "RPO와 RTO" },
    ],
  },
  {
    id: "interview-questions",
    label: "면접 문제",
    subMenus: [
      { id: "database-questions", label: "데이터베이스 기본 문제" },
      { id: "sql-result-questions", label: "SQL 결과 예측" },
      { id: "join-questions", label: "JOIN 결과 예측" },
      { id: "null-questions", label: "NULL과 조건식 문제" },
      { id: "normalization-questions", label: "정규화 문제" },
      { id: "index-questions", label: "인덱스 설계 문제" },
      { id: "execution-plan-questions", label: "실행 계획 문제" },
      { id: "transaction-questions", label: "트랜잭션과 락 문제" },
      { id: "practical-questions", label: "실무 상황형 문제" },
    ],
  },
];
