import type { StudyContentMap } from "./types";

export const databaseContents = {
  "database-and-dbms": {
    id: "database-and-dbms",
    category: "데이터베이스 기초",
    title: "데이터베이스와 DBMS",
    summary:
      "데이터베이스는 구조화된 데이터의 집합이고, DBMS는 그 데이터를 안전하고 효율적으로 관리하는 소프트웨어입니다.",
    tags: ["Database", "DBMS", "RDBMS"],
    sections: [
      {
        title: "데이터와 관리 시스템을 구분하기",
        blocks: [
          {
            type: "table",
            headers: ["용어", "역할", "예시"],
            rows: [
              ["데이터베이스", "목적에 맞게 구조화해 저장한 데이터 집합", "쇼핑몰의 상품·회원·주문 데이터"],
              ["DBMS", "저장, 조회, 수정, 권한, 동시성, 복구를 담당하는 소프트웨어", "MySQL, PostgreSQL, Oracle Database"],
            ],
          },
          {
            type: "text",
            paragraphs: [
              "엑셀 파일에 값을 저장하는 것과 달리 DBMS는 여러 사용자의 동시 접근을 조정하고, 제약조건으로 잘못된 데이터를 막으며, 장애 후 복구할 수 있도록 로그와 백업 기능을 제공합니다.",
              "SQL은 관계형 DBMS에 무엇을 원하는지 전달하는 선언형 언어입니다. 개발자는 결과를 표현하고, 실제 읽기 순서와 접근 방식은 옵티마이저가 결정합니다.",
            ],
          },
        ],
      },
      {
        title: "DBMS가 해결하는 문제",
        blocks: [
          {
            type: "list",
            items: [
              "중복 저장과 데이터 불일치를 제약조건과 트랜잭션으로 줄입니다.",
              "여러 사용자가 동시에 읽고 쓸 때 락과 MVCC로 충돌을 조정합니다.",
              "계정과 권한을 통해 데이터 접근 범위를 제한합니다.",
              "트랜잭션 로그와 백업으로 장애 이후의 복구를 지원합니다.",
            ],
          },
          {
            type: "callout",
            tone: "tip",
            title: "면접에서의 설명 순서",
            content:
              "DBMS를 단순한 저장 프로그램이라고만 설명하기보다 저장·무결성·동시성·보안·복구를 함께 관리하는 시스템이라고 설명하면 핵심이 잘 드러납니다.",
          },
        ],
      },
    ],
  },
  "database-structure": {
    id: "database-structure",
    category: "데이터베이스 기초",
    title: "데이터베이스 기본 구조",
    summary:
      "DBMS 안에서 데이터베이스, 스키마, 테이블이 계층을 이루며 실제 데이터는 행과 열로 표현됩니다.",
    tags: ["Database", "Schema", "Table"],
    sections: [
      {
        title: "큰 범위에서 작은 범위로",
        blocks: [
          {
            type: "code",
            language: "text",
            title: "개념적 계층",
            code: "DBMS\n└─ Database\n   └─ Schema\n      └─ Table\n         ├─ Row\n         └─ Column",
          },
          {
            type: "list",
            items: [
              "DBMS는 데이터 저장과 접근을 관리하는 전체 소프트웨어입니다.",
              "Database는 관련 데이터를 업무나 서비스 단위로 묶은 논리적 공간입니다.",
              "Schema는 테이블·컬럼·관계·제약조건 같은 구조 정의를 묶습니다.",
              "Table은 같은 구조를 가진 데이터를 행 단위로 저장합니다.",
            ],
          },
        ],
      },
      {
        title: "제품마다 다른 경계",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "Database와 Schema의 구분은 DBMS마다 다릅니다. PostgreSQL은 한 데이터베이스 안에 여러 스키마를 두는 방식이 일반적이고, MySQL에서는 database와 schema를 사실상 같은 의미로 사용하는 경우가 많습니다.",
              "따라서 구조를 설명할 때는 개념적 역할과 실제 사용 중인 DBMS의 구현을 나누어 말해야 합니다.",
            ],
          },
          {
            type: "callout",
            tone: "warning",
            title: "제품별 문법 확인",
            content:
              "스키마 선택, 객체 이름 해석, 권한 범위는 제품마다 다르므로 실제 프로젝트에서는 해당 DBMS의 공식 문서를 기준으로 확인합니다.",
          },
        ],
      },
    ],
  },
  "schema-table-row-column": {
    id: "schema-table-row-column",
    category: "데이터베이스 기초",
    title: "스키마, 테이블, 행과 열",
    summary:
      "스키마는 데이터의 설계도이고, 테이블은 그 설계에 맞춰 행을 저장하며, 열은 각 속성의 의미와 자료형을 정의합니다.",
    tags: ["Schema", "Row", "Column", "Data type"],
    sections: [
      {
        title: "회원 테이블로 이해하기",
        blocks: [
          {
            type: "code",
            language: "sql",
            title: "테이블 구조 예시",
            code: "CREATE TABLE members (\n  member_id BIGINT PRIMARY KEY,\n  name VARCHAR(50) NOT NULL,\n  email VARCHAR(255) UNIQUE,\n  joined_at TIMESTAMP NOT NULL\n);",
          },
          {
            type: "table",
            headers: ["구성 요소", "회원 테이블에서의 예", "의미"],
            rows: [
              ["스키마", "members의 컬럼과 제약조건", "허용할 데이터 모양을 정의"],
              ["테이블", "members", "같은 구조의 회원 데이터를 모음"],
              ["행", "member_id가 101인 회원 한 명", "하나의 개체 또는 사건"],
              ["열", "email VARCHAR(255)", "속성의 이름과 자료형"],
            ],
          },
        ],
      },
      {
        title: "좋은 열 정의의 기준",
        blocks: [
          {
            type: "list",
            items: [
              "한 열에는 하나의 의미를 담고 이름만으로 용도를 짐작할 수 있게 합니다.",
              "금액, 날짜, 문자열 등 의미에 맞는 자료형과 크기를 선택합니다.",
              "반드시 필요한 값은 NOT NULL로 명시합니다.",
              "업무상 중복될 수 없는 값에는 UNIQUE 등 무결성 규칙을 둡니다.",
            ],
          },
          {
            type: "callout",
            tone: "info",
            title: "행의 순서는 보장되지 않습니다",
            content:
              "테이블에 먼저 저장된 행이 항상 먼저 조회된다고 가정하면 안 됩니다. 결과 순서가 필요하면 SELECT에 ORDER BY를 명시해야 합니다.",
          },
        ],
      },
    ],
  },
  "rdbms-and-nosql": {
    id: "rdbms-and-nosql",
    category: "데이터베이스 기초",
    title: "RDBMS와 NoSQL",
    summary:
      "RDBMS와 NoSQL의 선택은 유행이 아니라 관계, 정합성, 조회 패턴, 확장 요구사항의 조합으로 결정합니다.",
    tags: ["RDBMS", "NoSQL", "Scale-out"],
    sections: [
      {
        title: "두 접근 방식 비교",
        blocks: [
          {
            type: "table",
            headers: ["기준", "RDBMS", "NoSQL"],
            rows: [
              ["데이터 모델", "테이블과 관계", "Key-Value, Document, Column Family, Graph 등"],
              ["스키마", "미리 정의하고 제약조건으로 보호", "제품에 따라 유연하거나 접근 패턴 중심"],
              ["강점", "SQL, 조인, 트랜잭션, 정합성", "수평 확장, 유연한 구조, 특정 조회 최적화"],
              ["대표 고려사항", "복잡한 분산 확장 설계", "중복·일관성·조인 대체 전략"],
              ["잘 맞는 예", "결제, 주문, 계좌", "캐시, 세션, 이벤트, 문서, 그래프"],
            ],
          },
        ],
      },
      {
        title: "선택 질문",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "데이터 사이의 관계가 복잡하고 조인이 자주 필요한가?",
              "여러 변경을 하나의 트랜잭션으로 강하게 묶어야 하는가?",
              "주요 조회 경로가 고정되어 있고 매우 큰 수평 확장이 필요한가?",
              "스키마 변경 빈도와 허용 가능한 일관성 수준은 어느 정도인가?",
            ],
          },
          {
            type: "callout",
            tone: "tip",
            title: "혼합 사용도 정상입니다",
            content:
              "핵심 주문은 RDBMS에 저장하고 세션이나 캐시는 Key-Value 저장소에 두는 것처럼, 한 서비스가 목적별로 여러 저장소를 사용할 수 있습니다.",
          },
        ],
      },
    ],
  },
  "relational-database": {
    id: "relational-database",
    category: "데이터베이스 기초",
    title: "관계형 데이터베이스의 특징",
    summary:
      "관계형 데이터베이스는 테이블, 키, 제약조건과 집합 기반 연산으로 데이터 관계와 정합성을 표현합니다.",
    tags: ["Relation", "Integrity", "Set-based"],
    sections: [
      {
        title: "관계형 모델의 중심",
        blocks: [
          {
            type: "list",
            items: [
              "각 테이블은 한 종류의 개체나 사건을 행의 집합으로 표현합니다.",
              "기본키는 행을 식별하고 외래키는 테이블 사이의 관계를 표현합니다.",
              "NOT NULL, UNIQUE, CHECK 같은 제약조건이 잘못된 상태를 데이터베이스 단계에서 막습니다.",
              "SQL은 행을 하나씩 지시하기보다 원하는 결과 집합을 선언합니다.",
            ],
          },
          {
            type: "code",
            language: "sql",
            title: "관계를 이용한 조회",
            code: "SELECT c.customer_name, o.order_id, o.amount\nFROM customers AS c\nJOIN orders AS o\n  ON o.customer_id = c.customer_id\nWHERE o.status = 'PAID';",
          },
        ],
      },
      {
        title: "관계형이라고 해서 생기는 보장은 자동이 아닙니다",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "테이블을 사용한다고 데이터 품질이 자동으로 좋아지는 것은 아닙니다. 적절한 키와 제약조건, 트랜잭션 경계를 설계해야 관계형 DBMS의 장점을 얻을 수 있습니다.",
              "조인 결과가 예상보다 많다면 DISTINCT로 숨기기 전에 관계의 카디널리티와 조인 조건이 올바른지 확인해야 합니다.",
            ],
          },
          {
            type: "callout",
            tone: "warning",
            title: "애플리케이션 검증만으로 충분하지 않은 이유",
            content:
              "여러 애플리케이션이나 배치가 같은 DB를 사용하면 검증 코드가 서로 다를 수 있습니다. 핵심 무결성 규칙은 가능한 한 DB 제약조건으로도 보호합니다.",
          },
        ],
      },
    ],
  },
} satisfies StudyContentMap;
