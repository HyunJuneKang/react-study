import type { StudyContentMap } from "./types";

export const securityContents = {
  "users-and-roles": {
    id: "users-and-roles",
    category: "권한과 보안",
    title: "사용자와 역할",
    summary:
      "DB 사용자는 접속 주체이고 역할은 여러 권한을 업무 단위로 묶어 사용자 관리와 감사를 단순하게 합니다.",
    tags: ["User", "Role", "Authentication"],
    sections: [
      {
        title: "계정과 권한 묶음",
        blocks: [
          {
            type: "table",
            headers: ["개념", "역할", "예"],
            rows: [
              ["사용자", "DB에 인증하고 작업을 수행하는 주체", "app_user, analyst_user"],
              ["역할", "여러 권한을 이름 있는 묶음으로 관리", "order_reader, order_writer"],
              ["권한", "객체에 허용된 구체적인 작업", "orders 테이블 SELECT"],
            ],
          },
          {
            type: "text",
            paragraphs: [
              "사람마다 개별 권한을 반복해서 부여하기보다 직무별 역할에 권한을 부여하고 사용자를 역할에 연결하면 입사·이동·퇴사 때 변경 범위가 명확해집니다.",
            ],
          },
        ],
      },
      {
        title: "계정 분리 원칙",
        blocks: [
          {
            type: "list",
            items: [
              "애플리케이션, 배치, 분석, 운영자 계정을 목적별로 분리합니다.",
              "사람이 공용 관리자 계정을 함께 쓰지 않도록 합니다.",
              "서비스별 자격 증명을 분리해 사고 범위를 제한합니다.",
              "휴면 계정과 불필요한 역할을 정기적으로 회수합니다.",
              "접속과 권한 변경 이력을 감사할 수 있게 기록합니다.",
            ],
          },
          {
            type: "callout",
            tone: "warning",
            title: "애플리케이션에 관리자 계정 사용 금지",
            content:
              "일반 API 서버가 스키마 삭제나 모든 테이블 접근 권한을 가질 이유는 거의 없습니다. 계정 탈취와 SQL Injection의 피해 범위를 최소 권한으로 줄입니다.",
          },
        ],
      },
    ],
  },
  "grant-and-revoke": {
    id: "grant-and-revoke",
    category: "권한과 보안",
    title: "GRANT와 REVOKE",
    summary:
      "GRANT는 필요한 권한을 부여하고 REVOKE는 더 이상 필요하지 않은 권한을 회수합니다.",
    tags: ["GRANT", "REVOKE", "Privilege"],
    sections: [
      {
        title: "권한 부여와 회수",
        blocks: [
          {
            type: "code",
            language: "sql",
            title: "개념적인 권한 관리 예",
            code: "GRANT SELECT ON orders TO order_reader;\nGRANT SELECT, INSERT, UPDATE ON orders TO order_writer;\n\nREVOKE UPDATE ON orders FROM order_writer;",
          },
          {
            type: "text",
            paragraphs: [
              "실제 사용자·역할 생성, 스키마 한정, 권한 상속 문법은 DBMS마다 다릅니다. 운영 표준에서는 권한 요청 사유, 승인자, 만료 시점도 함께 관리합니다.",
            ],
          },
        ],
      },
      {
        title: "주의할 권한",
        blocks: [
          {
            type: "list",
            items: [
              "다른 사용자에게 다시 권한을 나눠 줄 수 있는 권한",
              "DROP·ALTER 같은 스키마 변경 권한",
              "파일 시스템 또는 외부 프로그램에 접근하는 기능",
              "모든 스키마와 향후 생성될 객체까지 포함하는 광범위 권한",
            ],
          },
          {
            type: "callout",
            tone: "tip",
            title: "부여만큼 회수가 중요합니다",
            content:
              "프로젝트 종료, 직무 변경, 임시 장애 대응이 끝났을 때 권한을 회수하지 않으면 실제 필요보다 권한이 계속 누적됩니다.",
          },
        ],
      },
    ],
  },
  "least-privilege": {
    id: "least-privilege",
    category: "권한과 보안",
    title: "최소 권한 원칙",
    summary:
      "최소 권한은 주체가 현재 업무를 수행하는 데 필요한 대상과 작업, 기간만 허용해 사고의 최대 피해를 줄이는 원칙입니다.",
    tags: ["Least Privilege", "Defense in depth", "Audit"],
    sections: [
      {
        title: "세 가지 범위를 줄이기",
        blocks: [
          {
            type: "table",
            headers: ["범위", "질문", "예"],
            rows: [
              ["대상", "어떤 DB·스키마·테이블이 필요한가?", "주문 서비스는 orders만"],
              ["행위", "읽기·입력·수정·삭제 중 무엇이 필요한가?", "리포트 계정은 SELECT만"],
              ["시간", "언제까지 필요한가?", "장애 대응 권한은 만료 시간 설정"],
            ],
          },
          {
            type: "text",
            paragraphs: [
              "최소 권한은 정상 기능을 막는 것이 목적이 아니라 계정 오용, 실수, Injection 발생 시 공격자가 할 수 있는 일을 제한하는 방어 계층입니다.",
            ],
          },
        ],
      },
      {
        title: "운영 체크리스트",
        blocks: [
          {
            type: "list",
            items: [
              "운영과 개발 DB 계정 및 자격 증명을 분리합니다.",
              "애플리케이션 런타임 계정에서 DDL 권한을 제거합니다.",
              "읽기 복제본을 쓰는 분석 계정에는 쓰기 권한을 주지 않습니다.",
              "권한 변경을 코드 또는 승인된 자동화로 추적합니다.",
              "정기적으로 실제 사용 권한과 부여 권한의 차이를 검토합니다.",
            ],
          },
          {
            type: "callout",
            tone: "info",
            title: "보안은 계층적으로",
            content:
              "파라미터 바인딩이 Injection을 막더라도 최소 권한을 함께 적용합니다. 하나의 방어가 실패했을 때 다른 방어가 피해를 제한해야 합니다.",
          },
        ],
      },
    ],
  },
  "sql-injection": {
    id: "sql-injection",
    category: "권한과 보안",
    title: "SQL Injection",
    summary:
      "SQL Injection은 사용자 입력이 SQL 코드의 일부로 해석되어 공격자가 원래 의도와 다른 조건이나 명령을 실행하게 하는 취약점입니다.",
    tags: ["SQL Injection", "Parameterized Query", "OWASP"],
    sections: [
      {
        title: "문자열 연결의 위험",
        blocks: [
          {
            type: "code",
            language: "text",
            title: "취약한 애플리케이션 코드의 개념",
            code: "sql = \"SELECT * FROM users \" +\n      \"WHERE email = '\" + userInput + \"'\";\n\n// 입력이 데이터가 아니라 SQL 문법으로 섞일 수 있음",
          },
          {
            type: "list",
            items: [
              "인증 조건을 우회해 다른 사용자의 데이터에 접근할 수 있습니다.",
              "DB 계정 권한에 따라 수정·삭제나 메타데이터 노출로 이어질 수 있습니다.",
              "오류 메시지와 응답 시간 차이를 이용해 정보를 추론할 수도 있습니다.",
            ],
          },
        ],
      },
      {
        title: "방어 원칙",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "값은 Prepared Statement 또는 Parameterized Query로 바인딩합니다.",
              "컬럼명·정렬 방향처럼 바인딩하기 어려운 구조 요소는 허용 목록으로 선택합니다.",
              "DB 계정에 최소 권한을 적용합니다.",
              "내부 SQL과 스택 정보를 사용자 오류 응답에 노출하지 않습니다.",
              "보안 테스트와 코드 리뷰로 동적 SQL 생성 지점을 찾습니다.",
            ],
          },
          {
            type: "callout",
            tone: "danger",
            title: "이스케이프만 믿지 않습니다",
            content:
              "문자열 치환과 블랙리스트는 인코딩, DBMS 문법, 우회 표현 때문에 취약할 수 있습니다. 값과 SQL 구조를 분리하는 파라미터 바인딩을 기본으로 사용합니다.",
          },
        ],
      },
    ],
  },
  "prepared-statements": {
    id: "prepared-statements",
    category: "권한과 보안",
    title: "Prepared Statement",
    summary:
      "Prepared Statement는 SQL 구조와 사용자 값을 분리해 값이 SQL 문법으로 실행되지 않도록 합니다.",
    tags: ["Prepared Statement", "Bind parameter", "Parameterized Query"],
    sections: [
      {
        title: "SQL과 값을 분리하기",
        blocks: [
          {
            type: "code",
            language: "sql",
            title: "파라미터 자리표시자 예",
            code: "SELECT user_id, name\nFROM users\nWHERE email = :email\n  AND status = :status;",
          },
          {
            type: "text",
            paragraphs: [
              "애플리케이션은 SQL 템플릿과 email·status 값을 드라이버에 별도로 전달합니다. 드라이버와 DB는 바인딩 값을 데이터로 취급하므로 따옴표나 연산자가 들어 있어도 SQL 구조를 바꾸지 않습니다.",
            ],
          },
        ],
      },
      {
        title: "바인딩할 수 없는 부분",
        blocks: [
          {
            type: "code",
            language: "text",
            title: "정렬 컬럼은 허용 목록으로 변환",
            code: "const allowedSort = {\n  newest: \"created_at DESC\",\n  priceLow: \"price ASC\"\n};\n\nconst orderBy = allowedSort[userChoice] ?? allowedSort.newest;",
          },
          {
            type: "callout",
            tone: "warning",
            title: "식별자는 보통 값 파라미터가 아닙니다",
            content:
              "테이블명, 컬럼명, ASC·DESC 같은 SQL 구조 요소는 일반 바인드 파라미터로 대체할 수 없는 경우가 많습니다. 사용자가 보낸 문자열을 그대로 붙이지 말고 서버가 정의한 허용 목록으로 매핑합니다.",
          },
        ],
      },
    ],
  },
  "input-validation": {
    id: "input-validation",
    category: "권한과 보안",
    title: "입력값 검증",
    summary:
      "입력 검증은 형식·길이·범위·업무 규칙을 확인해 잘못된 데이터를 일찍 거부하지만 파라미터 바인딩을 대신하지는 않습니다.",
    tags: ["Validation", "Allowlist", "Data quality"],
    sections: [
      {
        title: "검증할 네 층",
        blocks: [
          {
            type: "table",
            headers: ["층", "예"],
            rows: [
              ["형식", "날짜, 이메일, UUID 문법"],
              ["길이·범위", "이름 1~50자, 수량 1~100"],
              ["허용 목록", "상태는 CREATED, PAID, CANCELLED 중 하나"],
              ["업무 규칙", "취소 가능한 주문 상태인지 확인"],
            ],
          },
          {
            type: "text",
            paragraphs: [
              "클라이언트 검증은 사용자 경험을 개선하지만 우회할 수 있으므로 서버에서도 검증해야 합니다. DB의 자료형과 CHECK·FK·UNIQUE 제약은 마지막 무결성 방어가 됩니다.",
            ],
          },
        ],
      },
      {
        title: "보안과 데이터 품질을 구분하기",
        blocks: [
          {
            type: "callout",
            tone: "warning",
            title: "검증했으니 문자열 결합해도 되는 것은 아닙니다",
            content:
              "정상 형식만 허용하는 입력 검증은 중요한 보조 방어이지만 SQL Injection의 기본 방어는 Prepared Statement입니다. 두 방법을 함께 사용합니다.",
          },
          {
            type: "list",
            items: [
              "정규식 하나로 모든 이메일이나 이름의 의미를 과도하게 제한하지 않습니다.",
              "숫자 변환 전 빈 값, NaN, 상·하한을 확인합니다.",
              "검색·페이지 크기에도 상한을 두어 자원 고갈을 막습니다.",
              "오류는 사용자가 수정할 수 있을 만큼 구체적이되 내부 구현은 숨깁니다.",
            ],
          },
        ],
      },
    ],
  },
  "sensitive-information": {
    id: "sensitive-information",
    category: "권한과 보안",
    title: "민감 정보와 오류 관리",
    summary:
      "민감 데이터는 수집부터 저장·조회·로그·오류 응답·폐기까지 노출 범위를 최소화해야 합니다.",
    tags: ["Sensitive data", "Error handling", "Logging"],
    sections: [
      {
        title: "노출 경로 줄이기",
        blocks: [
          {
            type: "list",
            items: [
              "필요한 개인정보만 수집하고 보존 기간이 끝나면 안전하게 삭제합니다.",
              "전송 구간과 저장 데이터에 적절한 암호화를 적용합니다.",
              "로그에 비밀번호, 토큰, 카드번호, 전체 주민번호를 남기지 않습니다.",
              "운영 조회 화면에는 마스킹과 역할 기반 접근 제어를 적용합니다.",
              "백업과 복제본에도 본 시스템과 같은 보안 정책을 적용합니다.",
            ],
          },
          {
            type: "callout",
            tone: "danger",
            title: "비밀번호는 복호화 저장 대상이 아닙니다",
            content:
              "사용자 비밀번호는 적절한 전용 해시 알고리즘과 솔트로 검증 가능하게 저장하고, 평문 또는 일반 암호화로 보관하지 않습니다.",
          },
        ],
      },
      {
        title: "안전한 오류 응답",
        blocks: [
          {
            type: "table",
            headers: ["사용자에게", "내부 진단에"],
            rows: [
              ["요청을 처리하지 못했다는 안전한 메시지와 추적 ID", "추적 ID, 오류 종류, 필요한 문맥"],
              ["SQL 문장·테이블명·스택 추적은 숨김", "접근 통제된 로그에 상세 원인 기록"],
              ["인증 실패 원인을 과도하게 구분하지 않음", "계정 존재 여부 노출 없이 감사 이벤트 기록"],
            ],
          },
          {
            type: "callout",
            tone: "tip",
            title: "로그도 데이터 저장소입니다",
            content:
              "디버깅 편의를 위해 입력 전체를 남기면 원본 DB보다 더 넓게 개인정보가 복제될 수 있습니다. 로그 스키마와 보존·접근 정책도 설계합니다.",
          },
        ],
      },
    ],
  },
} satisfies StudyContentMap;
