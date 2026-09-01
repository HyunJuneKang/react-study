import type { StudyContentMap } from "./types";

export const transactionContents = {
  "transaction-basics": {
    id: "transaction-basics",
    category: "트랜잭션과 동시성",
    title: "트랜잭션의 개념",
    summary:
      "트랜잭션은 여러 읽기와 변경을 모두 성공하거나 모두 실패해야 하는 하나의 논리적 작업 단위로 묶습니다.",
    tags: ["Transaction", "Commit", "Rollback"],
    sections: [
      {
        title: "계좌 이체는 한 작업입니다",
        blocks: [
          {
            type: "code",
            language: "sql",
            title: "두 변경을 하나로 묶기",
            code: "BEGIN;\n\nUPDATE accounts\nSET balance = balance - 10000\nWHERE account_id = 1\n  AND balance >= 10000;\n\nUPDATE accounts\nSET balance = balance + 10000\nWHERE account_id = 2;\n\nCOMMIT;",
          },
          {
            type: "text",
            paragraphs: [
              "출금만 성공하고 입금이 실패하면 돈이 사라진 것처럼 보입니다. 두 UPDATE를 한 트랜잭션으로 묶고 중간 오류가 생기면 모두 되돌려 업무 단위의 일관성을 지킵니다.",
            ],
          },
        ],
      },
      {
        title: "좋은 트랜잭션 경계",
        blocks: [
          {
            type: "list",
            items: [
              "하나의 업무 규칙을 만족하는 데 필요한 DB 작업을 함께 묶습니다.",
              "락을 오래 유지하지 않도록 범위를 짧게 합니다.",
              "사용자 입력 대기나 느린 외부 API 호출을 트랜잭션 안에 두지 않습니다.",
              "실패 시 재시도해도 안전한지와 중복 처리 방식을 설계합니다.",
            ],
          },
          {
            type: "callout",
            tone: "warning",
            title: "여러 시스템의 원자성",
            content:
              "DB 트랜잭션만으로 메시지 브로커나 외부 결제 API까지 자동으로 한 번에 롤백되지는 않습니다. Outbox, 보상 트랜잭션, 멱등성 같은 별도 패턴이 필요할 수 있습니다.",
          },
        ],
      },
    ],
  },
  acid: {
    id: "acid",
    category: "트랜잭션과 동시성",
    title: "ACID",
    summary:
      "ACID는 트랜잭션이 신뢰할 수 있는 작업 단위가 되기 위한 원자성·일관성·격리성·지속성의 네 특성입니다.",
    tags: ["Atomicity", "Consistency", "Isolation", "Durability"],
    sections: [
      {
        title: "네 가지 특성",
        blocks: [
          {
            type: "table",
            headers: ["특성", "핵심 질문", "의미"],
            rows: [
              ["Atomicity", "일부만 반영되는가?", "모두 반영하거나 모두 취소"],
              ["Consistency", "규칙을 만족하는가?", "트랜잭션 전후 유효한 상태 유지"],
              ["Isolation", "중간 상태가 섞이는가?", "동시 트랜잭션의 부적절한 영향 차단"],
              ["Durability", "커밋 결과가 사라지는가?", "장애 후에도 커밋 결과 복구 가능"],
            ],
          },
        ],
      },
      {
        title: "DB와 애플리케이션의 책임",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "원자성과 지속성은 로그와 복구 메커니즘의 도움을 받고, 격리성은 락과 MVCC 및 격리 수준으로 조정합니다. 일관성에는 DB 제약조건뿐 아니라 잔액은 음수가 될 수 없다는 업무 로직도 포함됩니다.",
            ],
          },
          {
            type: "callout",
            tone: "info",
            title: "Consistency와 복제 일관성은 다른 문맥",
            content:
              "ACID의 Consistency는 정의한 불변식과 제약을 만족하는 유효 상태를 뜻합니다. 분산 시스템에서 말하는 강한 일관성·최종 일관성과 구분해 설명합니다.",
          },
        ],
      },
    ],
  },
  "transaction-control": {
    id: "transaction-control",
    category: "트랜잭션과 동시성",
    title: "COMMIT, ROLLBACK, SAVEPOINT",
    summary:
      "COMMIT은 변경을 확정하고 ROLLBACK은 취소하며 SAVEPOINT는 트랜잭션 안에서 일부만 되돌릴 복구 지점을 만듭니다.",
    tags: ["TCL", "COMMIT", "ROLLBACK", "SAVEPOINT"],
    sections: [
      {
        title: "트랜잭션 제어 흐름",
        blocks: [
          {
            type: "code",
            language: "sql",
            title: "중간 지점까지 되돌리기",
            code: "BEGIN;\n\nUPDATE orders\nSET status = 'PAID'\nWHERE order_id = 1001;\n\nSAVEPOINT after_order_update;\n\nINSERT INTO reward_points (customer_id, points)\nVALUES (10, 100);\n\n-- 포인트 처리만 취소하고 주문 변경은 유지\nROLLBACK TO SAVEPOINT after_order_update;\n\nCOMMIT;",
          },
          {
            type: "table",
            headers: ["명령", "역할"],
            rows: [
              ["COMMIT", "현재 트랜잭션 변경 확정"],
              ["ROLLBACK", "현재 트랜잭션 변경 취소"],
              ["SAVEPOINT", "부분 롤백을 위한 이름 있는 지점 생성"],
            ],
          },
        ],
      },
      {
        title: "자동 커밋과 예외 처리",
        blocks: [
          {
            type: "callout",
            tone: "warning",
            title: "클라이언트 설정 확인",
            content:
              "많은 DB 클라이언트와 드라이버는 기본적으로 자동 커밋을 사용합니다. 트랜잭션이 필요한 코드에서는 시작·종료·예외 시 롤백을 프레임워크 설정과 함께 확인합니다.",
          },
          {
            type: "text",
            paragraphs: [
              "SAVEPOINT가 외부 시스템 호출까지 되돌리는 것은 아닙니다. 또한 지원 문법과 DDL의 트랜잭션 참여 여부는 DBMS마다 다릅니다.",
            ],
          },
        ],
      },
    ],
  },
  "isolation-levels": {
    id: "isolation-levels",
    category: "트랜잭션과 동시성",
    title: "트랜잭션 격리 수준",
    summary:
      "격리 수준은 동시 트랜잭션 사이에서 허용할 읽기 현상과 처리량 사이의 균형을 정합니다.",
    tags: ["READ COMMITTED", "REPEATABLE READ", "SERIALIZABLE"],
    sections: [
      {
        title: "표준 격리 수준",
        blocks: [
          {
            type: "table",
            headers: ["격리 수준", "Dirty Read", "Non-repeatable Read", "Phantom Read"],
            rows: [
              ["READ UNCOMMITTED", "가능", "가능", "가능"],
              ["READ COMMITTED", "방지", "가능", "가능"],
              ["REPEATABLE READ", "방지", "방지", "표준상 가능"],
              ["SERIALIZABLE", "방지", "방지", "방지"],
            ],
          },
          {
            type: "callout",
            tone: "info",
            title: "구현은 표보다 복잡합니다",
            content:
              "MVCC, 스냅샷 읽기, 갭 락 등 DBMS 구현에 따라 실제 현상 방지 방식이 달라질 수 있습니다. 사용하는 제품의 기본 격리 수준과 문서를 확인합니다.",
          },
        ],
      },
      {
        title: "높을수록 무조건 좋은가?",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "격리 수준을 높이면 보이는 동시성 현상은 줄지만 락 대기, 직렬화 실패, 충돌과 처리량 저하가 커질 수 있습니다. 업무가 필요한 보장과 충돌 재시도 가능성을 함께 고려합니다.",
            ],
          },
          {
            type: "list",
            items: [
              "단순 목록 조회와 결제 확정은 필요한 보장이 다릅니다.",
              "격리 수준만 올리기 전에 원자적 UPDATE와 명시적 락을 검토합니다.",
              "장시간 트랜잭션은 어떤 격리 수준에서도 자원 정리를 방해할 수 있습니다.",
            ],
          },
        ],
      },
    ],
  },
  "concurrency-problems": {
    id: "concurrency-problems",
    category: "트랜잭션과 동시성",
    title: "동시성 문제",
    summary:
      "동시에 읽고 쓸 때 커밋되지 않은 값, 바뀐 행, 새로 생긴 행 또는 갱신 분실 같은 문제가 나타날 수 있습니다.",
    tags: ["Dirty Read", "Non-repeatable Read", "Phantom Read", "Lost Update"],
    sections: [
      {
        title: "대표 읽기 현상",
        blocks: [
          {
            type: "table",
            headers: ["현상", "상황"],
            rows: [
              ["Dirty Read", "다른 트랜잭션이 아직 커밋하지 않은 값을 읽음"],
              ["Non-repeatable Read", "같은 행을 다시 읽었는데 커밋된 수정으로 값이 달라짐"],
              ["Phantom Read", "같은 조건을 다시 조회했는데 행의 개수나 구성이 달라짐"],
              ["Lost Update", "두 요청이 같은 값을 읽고 각각 저장해 한쪽 변경이 사라짐"],
            ],
          },
        ],
      },
      {
        title: "읽고 계산한 뒤 저장하는 위험",
        blocks: [
          {
            type: "code",
            language: "text",
            title: "갱신 분실 예",
            code: "초기 stock = 1\n\n트랜잭션 A: stock 1 읽음\n트랜잭션 B: stock 1 읽음\n트랜잭션 A: stock 0 저장\n트랜잭션 B: stock 0 저장\n\n두 번 주문했지만 1만 감소한 것처럼 보임",
          },
          {
            type: "callout",
            tone: "tip",
            title: "문제에 맞는 도구",
            content:
              "원자적 조건 UPDATE, 낙관적 버전 검사, SELECT FOR UPDATE, 적절한 격리 수준 중 업무 충돌 빈도와 실패 처리 방식에 맞는 방법을 선택합니다.",
          },
        ],
      },
    ],
  },
  "shared-and-exclusive-locks": {
    id: "shared-and-exclusive-locks",
    category: "트랜잭션과 동시성",
    title: "공유 락과 배타 락",
    summary:
      "공유 락은 읽기를 함께 허용하고 배타 락은 변경을 독점해 같은 데이터에 대한 충돌을 조정합니다.",
    tags: ["Shared Lock", "Exclusive Lock", "Lock compatibility"],
    sections: [
      {
        title: "락 호환성의 직관",
        blocks: [
          {
            type: "table",
            headers: ["현재 보유", "새 공유 락", "새 배타 락"],
            rows: [
              ["공유 락", "일반적으로 허용", "대기 또는 충돌"],
              ["배타 락", "대기 또는 충돌", "대기 또는 충돌"],
            ],
          },
          {
            type: "text",
            paragraphs: [
              "공유 락은 여러 트랜잭션이 같은 데이터를 읽도록 허용하지만 변경과는 충돌합니다. 배타 락은 같은 데이터를 다른 트랜잭션이 읽거나 변경하는 범위를 더 강하게 제한합니다.",
              "정확한 잠금 범위와 일반 SELECT의 락 사용 여부는 격리 수준, MVCC와 DBMS 구현에 따라 다릅니다.",
            ],
          },
        ],
      },
      {
        title: "락 범위를 작게 유지하기",
        blocks: [
          {
            type: "list",
            items: [
              "적절한 인덱스로 검색 및 잠금 대상을 좁힙니다.",
              "트랜잭션 안의 사용자 대기와 네트워크 호출을 제거합니다.",
              "여러 자원은 일관된 순서로 접근합니다.",
              "락 대기 시간과 블로킹 세션을 모니터링합니다.",
            ],
          },
          {
            type: "callout",
            tone: "info",
            title: "용어의 층위",
            content:
              "공유·배타 락은 DB가 획득하는 락 종류이고, 낙관적·비관적 락은 애플리케이션이 충돌을 다루는 전략입니다.",
          },
        ],
      },
    ],
  },
  "optimistic-and-pessimistic-locks": {
    id: "optimistic-and-pessimistic-locks",
    category: "트랜잭션과 동시성",
    title: "낙관적 락과 비관적 락",
    summary:
      "낙관적 락은 수정 시 충돌을 검출하고, 비관적 락은 읽는 시점부터 잠가 충돌을 미리 차단합니다.",
    tags: ["Optimistic Lock", "Pessimistic Lock", "Version"],
    sections: [
      {
        title: "전략 비교",
        blocks: [
          {
            type: "table",
            headers: ["기준", "낙관적 락", "비관적 락"],
            rows: [
              ["가정", "충돌이 드묾", "충돌 가능성이 높음"],
              ["방법", "version 등으로 수정 시 충돌 검출", "SELECT FOR UPDATE 등으로 선점"],
              ["장점", "락 대기가 적고 동시 처리에 유리", "충돌 작업을 미리 직렬화"],
              ["비용", "실패 시 재시도·병합 필요", "대기·데드락·긴 트랜잭션 위험"],
            ],
          },
        ],
      },
      {
        title: "SQL 예시",
        blocks: [
          {
            type: "code",
            language: "sql",
            title: "낙관적 버전 검사",
            code: "UPDATE products\nSET stock = stock - 1,\n    version = version + 1\nWHERE product_id = 1\n  AND version = 5;\n-- 영향받은 행이 0이면 충돌 또는 대상 없음",
          },
          {
            type: "code",
            language: "sql",
            title: "비관적 잠금",
            code: "BEGIN;\nSELECT stock\nFROM products\nWHERE product_id = 1\nFOR UPDATE;\n-- 검증 후 변경하고 빠르게 COMMIT",
          },
          {
            type: "callout",
            tone: "warning",
            title: "이름과 달리 둘 다 설계가 필요합니다",
            content:
              "낙관적 락은 version 조건과 실패 처리가 빠지면 보호되지 않고, 비관적 락은 트랜잭션 경계와 접근 순서가 잘못되면 처리량과 안정성이 나빠집니다.",
          },
        ],
      },
    ],
  },
  mvcc: {
    id: "mvcc",
    category: "트랜잭션과 동시성",
    title: "MVCC",
    summary:
      "MVCC는 데이터의 여러 버전과 가시성 규칙을 이용해 독자가 일관된 과거 버전을 읽도록 하여 읽기와 쓰기 충돌을 줄입니다.",
    tags: ["MVCC", "Snapshot", "Visibility"],
    sections: [
      {
        title: "버전을 이용한 읽기",
        blocks: [
          {
            type: "code",
            language: "text",
            title: "개념적 흐름",
            code: "T1이 상품 재고 버전 A를 읽음\nT2가 재고를 수정해 버전 B를 만들고 COMMIT\nT1은 자신의 스냅샷 규칙에 따라 계속 A를 볼 수 있음\n새 트랜잭션은 B를 봄",
          },
          {
            type: "list",
            items: [
              "독자는 트랜잭션이 볼 수 있는 일관된 버전을 선택합니다.",
              "작성자는 기존 독자를 즉시 덮어쓰는 대신 새 버전을 만듭니다.",
              "읽기와 쓰기의 직접 충돌이 줄어 동시성이 높아질 수 있습니다.",
            ],
          },
        ],
      },
      {
        title: "MVCC도 비용이 있습니다",
        blocks: [
          {
            type: "list",
            items: [
              "오래된 버전을 저장하고 정리할 공간과 작업이 필요합니다.",
              "장시간 트랜잭션은 오래된 버전 정리를 지연시킬 수 있습니다.",
              "쓰기끼리의 충돌이 사라지는 것은 아닙니다.",
              "스냅샷 생성 시점과 가시성 규칙은 DBMS와 격리 수준마다 다릅니다.",
            ],
          },
          {
            type: "callout",
            tone: "info",
            title: "구현 세부는 제품별로",
            content:
              "PostgreSQL의 튜플 버전, InnoDB의 undo 정보처럼 저장과 정리 방식이 다릅니다. MVCC라는 이름만으로 모든 읽기 동작을 동일하게 가정하지 않습니다.",
          },
        ],
      },
    ],
  },
  deadlock: {
    id: "deadlock",
    category: "트랜잭션과 동시성",
    title: "데드락",
    summary:
      "데드락은 트랜잭션들이 서로 보유한 락을 순환 대기해 아무도 진행할 수 없는 상태입니다.",
    tags: ["Deadlock", "Lock order", "Retry"],
    sections: [
      {
        title: "순환 대기",
        blocks: [
          {
            type: "code",
            language: "text",
            title: "두 계좌를 반대 순서로 잠근 경우",
            code: "트랜잭션 A: 계좌 1 잠금 → 계좌 2 대기\n트랜잭션 B: 계좌 2 잠금 → 계좌 1 대기\n\nA와 B가 서로의 락 해제를 기다려 진행 불가",
          },
          {
            type: "text",
            paragraphs: [
              "DBMS는 보통 데드락을 감지하면 한 트랜잭션을 희생시켜 롤백하고 순환을 해제합니다. 따라서 애플리케이션은 해당 오류를 실패의 끝으로만 보지 말고 안전한 재시도 가능성을 검토해야 합니다.",
            ],
          },
        ],
      },
      {
        title: "예방과 대응",
        blocks: [
          {
            type: "list",
            items: [
              "여러 테이블과 행을 항상 같은 순서로 접근합니다.",
              "트랜잭션을 짧게 유지하고 외부 API 호출을 밖으로 뺍니다.",
              "인덱스로 검색·잠금 범위를 줄입니다.",
              "데드락 로그에서 관련 SQL과 잠금 자원을 확인합니다.",
              "멱등성이 보장되는 작업에 제한된 횟수와 백오프로 재시도합니다.",
            ],
          },
          {
            type: "callout",
            tone: "warning",
            title: "데드락과 단순 대기는 다릅니다",
            content:
              "락 대기는 선행 트랜잭션이 끝나면 진행될 수 있지만 데드락은 순환 때문에 자동 진행할 수 없습니다. 모니터링에서 두 현상을 구분합니다.",
          },
        ],
      },
    ],
  },
  "stock-concurrency": {
    id: "stock-concurrency",
    category: "트랜잭션과 동시성",
    title: "재고 차감 동시성 예제",
    summary:
      "재고 차감은 검증과 변경을 하나의 원자적 SQL로 묶고 영향 행 수를 확인하면 간단한 초과 판매 경쟁을 막을 수 있습니다.",
    tags: ["Stock", "Atomic UPDATE", "Concurrency"],
    sections: [
      {
        title: "검사와 차감을 한 문장으로",
        blocks: [
          {
            type: "code",
            language: "sql",
            title: "조건부 원자적 UPDATE",
            code: "UPDATE products\nSET stock = stock - :quantity\nWHERE product_id = :product_id\n  AND stock >= :quantity;",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "영향받은 행이 1이면 재고 조건을 만족해 차감에 성공했습니다.",
              "영향받은 행이 0이면 상품이 없거나 재고가 부족합니다.",
              "주문 생성과 재고 차감이 같은 DB라면 한 트랜잭션으로 묶습니다.",
            ],
          },
          {
            type: "callout",
            tone: "danger",
            title: "SELECT 후 UPDATE의 빈틈",
            content:
              "애플리케이션에서 stock을 읽고 충분한지 확인한 뒤 별도 UPDATE를 하면 그 사이 다른 요청도 같은 재고를 읽을 수 있습니다. 조건을 UPDATE에 포함하거나 적절한 락·버전 검사를 사용합니다.",
          },
        ],
      },
      {
        title: "실무에서 추가로 결정할 것",
        blocks: [
          {
            type: "list",
            items: [
              "주문 실패나 결제 취소 시 재고 복원 시점과 중복 복원 방지",
              "한정 판매처럼 충돌이 매우 높을 때 대기열이나 재고 예약 도입",
              "데드락 또는 낙관적 충돌의 재시도 횟수와 사용자 메시지",
              "DB와 메시지 브로커 사이의 이벤트 유실을 막는 Outbox 같은 패턴",
            ],
          },
          {
            type: "callout",
            tone: "tip",
            title: "정답은 부하 특성에 따라 다릅니다",
            content:
              "충돌이 드문 일반 상품과 수천 명이 동시에 누르는 한정 상품은 같은 전략을 쓰지 않을 수 있습니다. 정확성 보장을 먼저 정의하고 부하 테스트로 처리량을 검증합니다.",
          },
        ],
      },
    ],
  },
} satisfies StudyContentMap;
