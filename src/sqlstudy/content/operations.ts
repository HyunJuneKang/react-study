import type { StudyContentMap } from "./types";

export const operationContents = {
  partitioning: {
    id: "partitioning",
    category: "데이터베이스 운영 심화",
    title: "파티셔닝",
    summary:
      "파티셔닝은 하나의 큰 테이블을 날짜·범위·목록·해시 기준의 파티션으로 나눠 조회와 데이터 관리를 돕습니다.",
    tags: ["Partitioning", "Partition pruning", "Data lifecycle"],
    sections: [
      {
        title: "하나의 테이블, 여러 저장 단위",
        blocks: [
          {
            type: "table",
            headers: ["방식", "분할 예", "적합한 접근"],
            rows: [
              ["Range", "월별 created_at 범위", "기간 조회와 오래된 데이터 관리"],
              ["List", "지역 코드별 파티션", "값 집합이 명확한 분리"],
              ["Hash", "user_id 해시", "데이터를 비교적 균등하게 분산"],
            ],
          },
          {
            type: "text",
            paragraphs: [
              "조회 조건에 파티션 키가 포함되면 옵티마이저가 관련 없는 파티션을 제외하는 파티션 프루닝을 적용할 수 있습니다. 파티션 단위 백업·교체·삭제로 수명 주기 관리도 단순해질 수 있습니다.",
            ],
          },
        ],
      },
      {
        title: "분할 자체가 해결책은 아닙니다",
        blocks: [
          {
            type: "list",
            items: [
              "쿼리가 파티션 키를 사용하지 않으면 여러 파티션을 모두 읽을 수 있습니다.",
              "잘못된 키는 특정 파티션에 데이터와 부하를 몰리게 합니다.",
              "파티션이 지나치게 많으면 계획과 메타데이터 관리 비용이 커집니다.",
              "파티션 내부의 인덱스 설계는 여전히 필요합니다.",
            ],
          },
          {
            type: "callout",
            tone: "warning",
            title: "샤딩과 구분",
            content:
              "파티셔닝은 일반적으로 하나의 논리적 DB 시스템 안에서 테이블을 나누고, 샤딩은 데이터를 여러 독립 DB 서버로 나눠 한 서버의 한계를 넘습니다.",
          },
        ],
      },
    ],
  },
  sharding: {
    id: "sharding",
    category: "데이터베이스 운영 심화",
    title: "샤딩",
    summary:
      "샤딩은 데이터를 여러 DB 서버에 수평 분할해 한 서버의 저장 용량과 처리량 한계를 넘는 확장 방식입니다.",
    tags: ["Sharding", "Shard key", "Rebalancing"],
    sections: [
      {
        title: "샤드 키로 데이터 위치 정하기",
        blocks: [
          {
            type: "code",
            language: "text",
            title: "user_id 해시 샤딩의 개념",
            code: "shardNumber = hash(user_id) % 4\n\nShard 0: 일부 사용자와 그 주문\nShard 1: 일부 사용자와 그 주문\nShard 2: 일부 사용자와 그 주문\nShard 3: 일부 사용자와 그 주문",
          },
          {
            type: "list",
            items: [
              "자주 함께 조회하는 데이터를 같은 샤드에 배치할 수 있는 키를 고릅니다.",
              "쓰기와 저장 용량이 특정 샤드에 몰리지 않도록 분포를 봅니다.",
              "요청에서 샤드 키를 알 수 있어 한 샤드로 라우팅할 수 있어야 유리합니다.",
            ],
          },
        ],
      },
      {
        title: "분산으로 생기는 어려움",
        blocks: [
          {
            type: "table",
            headers: ["문제", "이유"],
            rows: [
              ["샤드 간 JOIN", "여러 서버의 데이터를 이동·결합해야 함"],
              ["전역 트랜잭션", "여러 DB의 원자적 합의가 복잡하고 느림"],
              ["전역 유일 ID", "각 서버의 자동 증가만으로 충돌 가능"],
              ["재샤딩", "노드 추가 시 대량 데이터 이동과 라우팅 전환 필요"],
              ["핫스팟", "인기 사용자·시간 기반 키에 부하 집중"],
            ],
          },
          {
            type: "callout",
            tone: "danger",
            title: "너무 일찍 도입하지 않습니다",
            content:
              "인덱스·쿼리·캐시·읽기 복제·수직 확장으로 해결 가능한 단계에서 샤딩을 도입하면 애플리케이션과 운영 복잡도가 크게 증가합니다.",
          },
        ],
      },
    ],
  },
  replication: {
    id: "replication",
    category: "데이터베이스 운영 심화",
    title: "복제",
    summary:
      "복제는 원본 DB의 변경을 하나 이상의 복제본으로 전달해 읽기 부하 분산, 고가용성, 장애 복구에 활용합니다.",
    tags: ["Replication", "Primary", "Replica", "Replication lag"],
    sections: [
      {
        title: "Primary와 Replica",
        blocks: [
          {
            type: "code",
            language: "text",
            title: "대표적인 읽기 분리 구조",
            code: "쓰기 요청 ──> Primary\n                 │\n                 ├── 변경 복제 ──> Replica A ──> 읽기 요청\n                 └── 변경 복제 ──> Replica B ──> 분석 조회",
          },
          {
            type: "list",
            items: [
              "Primary에서 쓰기를 처리하고 복제본에 변경을 전파합니다.",
              "복제본으로 읽기 요청을 분산해 Primary의 부하를 줄일 수 있습니다.",
              "장애 시 승격 가능한 복제본을 두어 복구 시간을 줄일 수 있습니다.",
            ],
          },
        ],
      },
      {
        title: "복제 지연과 일관성",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "비동기 복제에서는 Primary의 커밋과 Replica 반영 사이에 지연이 존재합니다. 방금 생성한 주문을 즉시 복제본에서 읽으면 아직 보이지 않을 수 있습니다.",
            ],
          },
          {
            type: "list",
            items: [
              "쓰기 직후 중요한 읽기는 일정 시간 Primary로 보냅니다.",
              "세션별 읽기 일관성 또는 복제 위치 확인 기능을 검토합니다.",
              "지연 허용 조회와 최신성이 필요한 조회를 분류합니다.",
              "복제 지연과 오류, 적용 중단을 모니터링합니다.",
            ],
          },
          {
            type: "callout",
            tone: "warning",
            title: "복제는 백업이 아닙니다",
            content:
              "실수로 삭제한 변경도 복제될 수 있습니다. 시점 복구가 가능한 독립 백업과 복구 훈련이 별도로 필요합니다.",
          },
        ],
      },
    ],
  },
  "high-availability": {
    id: "high-availability",
    category: "데이터베이스 운영 심화",
    title: "고가용성",
    summary:
      "고가용성은 DB 장애를 빠르게 감지하고 정상 복제본으로 서비스를 전환해 중단 시간을 목표 범위 안으로 줄이는 운영 능력입니다.",
    tags: ["High Availability", "Failover", "Failback"],
    sections: [
      {
        title: "장애 전환의 구성 요소",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "헬스 체크와 모니터링으로 실제 장애를 감지합니다.",
              "데이터가 충분히 최신인 복제본을 새 Primary로 승격합니다.",
              "애플리케이션 연결과 라우팅을 새 Primary로 전환합니다.",
              "이전 Primary의 재합류와 데이터 충돌을 안전하게 처리합니다.",
              "복구 후 원인과 RTO·RPO 달성 여부를 검토합니다.",
            ],
          },
          {
            type: "code",
            language: "text",
            title: "장애 전환 흐름",
            code: "Primary 장애 감지\n→ Replica 승격\n→ 연결 엔드포인트 전환\n→ 쓰기 재개\n→ 이전 노드 격리·복구",
          },
        ],
      },
      {
        title: "자동화의 위험도 함께 다루기",
        blocks: [
          {
            type: "list",
            items: [
              "네트워크 분할을 장애로 오인하면 두 Primary가 생기는 split-brain 위험이 있습니다.",
              "비동기 복제본 승격 시 마지막 변경 일부가 유실될 수 있습니다.",
              "DNS와 커넥션 풀 캐시 때문에 전환 후에도 이전 주소를 볼 수 있습니다.",
              "자동 전환이 있어도 애플리케이션의 연결 재시도와 멱등성이 필요합니다.",
            ],
          },
          {
            type: "callout",
            tone: "tip",
            title: "정기적인 장애 훈련",
            content:
              "구성이 존재하는 것과 실제로 목표 시간 안에 전환되는 것은 다릅니다. 계획된 훈련으로 감지·승격·연결·복구 절차를 검증합니다.",
          },
        ],
      },
    ],
  },
  "backup-and-recovery": {
    id: "backup-and-recovery",
    category: "데이터베이스 운영 심화",
    title: "백업과 복구",
    summary:
      "백업은 데이터 사본을 만드는 작업이고 복구는 장애와 실수 이후 서비스가 사용할 수 있는 상태로 되돌리는 검증된 절차입니다.",
    tags: ["Backup", "Recovery", "PITR"],
    sections: [
      {
        title: "백업 방식",
        blocks: [
          {
            type: "table",
            headers: ["방식", "내용", "고려사항"],
            rows: [
              ["전체 백업", "DB 전체 사본", "복구 기준점이 단순하지만 시간·공간 큼"],
              ["증분 백업", "직전 백업 이후 변경분", "백업은 작지만 복구 체인이 길 수 있음"],
              ["차등 백업", "마지막 전체 백업 이후 변경분", "시간이 갈수록 백업 크기 증가"],
              ["트랜잭션 로그", "변경 로그 연속 보관", "특정 시점 복구에 활용"],
            ],
          },
          {
            type: "text",
            paragraphs: [
              "Point-in-Time Recovery는 전체 백업을 복원한 뒤 로그를 원하는 시점 직전까지 적용해 사용자 실수나 데이터 손상 이전으로 되돌리는 방식입니다.",
            ],
          },
        ],
      },
      {
        title: "복원 가능한 백업 만들기",
        blocks: [
          {
            type: "list",
            items: [
              "운영 DB와 독립된 위치와 권한에 백업을 보관합니다.",
              "백업 파일의 암호화와 무결성을 확인합니다.",
              "보존 기간과 삭제 정책을 법적·업무 요구에 맞춥니다.",
              "격리된 환경에 정기적으로 복원해 데이터와 소요 시간을 검증합니다.",
              "애플리케이션 설정, 스키마, 비밀 정보 등 DB 밖의 복구 요소도 준비합니다.",
            ],
          },
          {
            type: "callout",
            tone: "danger",
            title: "백업 성공 로그만으로 부족합니다",
            content:
              "복원 테스트를 통과하지 않은 백업은 실제 복구 가능성을 보장하지 않습니다. 목표 RTO 안에 전체 절차가 끝나는지도 함께 측정합니다.",
          },
        ],
      },
    ],
  },
  "transaction-log": {
    id: "transaction-log",
    category: "데이터베이스 운영 심화",
    title: "트랜잭션 로그",
    summary:
      "트랜잭션 로그는 데이터 페이지 변경 기록을 순서대로 남겨 원자성·지속성·장애 복구·복제를 지원합니다.",
    tags: ["WAL", "Redo", "Recovery"],
    sections: [
      {
        title: "데이터보다 로그를 먼저 안전하게",
        blocks: [
          {
            type: "code",
            language: "text",
            title: "Write-Ahead Logging의 직관",
            code: "1. 변경 내용을 로그에 기록\n2. 커밋에 필요한 로그를 안전한 저장소에 반영\n3. 데이터 페이지는 이후에 디스크에 기록될 수 있음\n4. 장애 후 로그를 재생해 커밋 변경 복구",
          },
          {
            type: "text",
            paragraphs: [
              "DBMS는 매 변경마다 모든 데이터 페이지를 즉시 디스크에 쓰는 대신 순차적인 로그를 먼저 안전하게 기록할 수 있습니다. 장애 후에는 로그를 이용해 완료된 변경을 재적용하고 미완료 작업을 정리합니다.",
            ],
          },
        ],
      },
      {
        title: "운영에서의 역할과 관리",
        blocks: [
          {
            type: "list",
            items: [
              "비정상 종료 후 crash recovery에 사용합니다.",
              "로그 전달 방식 복제의 변경 소스가 됩니다.",
              "백업과 함께 특정 시점 복구에 사용합니다.",
              "장기 트랜잭션이나 복제 장애로 로그 정리가 지연될 수 있습니다.",
              "로그 저장 공간, 보관 주기, 아카이브 실패를 모니터링합니다.",
            ],
          },
          {
            type: "callout",
            tone: "warning",
            title: "애플리케이션 로그와 다릅니다",
            content:
              "트랜잭션 로그는 DB 내부 변경과 복구를 위한 기록입니다. 사용자 요청과 업무 이벤트를 남기는 애플리케이션 감사 로그와 목적이 다릅니다.",
          },
        ],
      },
    ],
  },
  "rpo-and-rto": {
    id: "rpo-and-rto",
    category: "데이터베이스 운영 심화",
    title: "RPO와 RTO",
    summary:
      "RPO는 허용 가능한 데이터 손실 범위이고 RTO는 장애 이후 서비스를 복구해야 하는 목표 시간입니다.",
    tags: ["RPO", "RTO", "Disaster recovery"],
    sections: [
      {
        title: "손실 범위와 중단 시간",
        blocks: [
          {
            type: "table",
            headers: ["지표", "질문", "예"],
            rows: [
              ["RPO", "어느 시점까지의 데이터 손실을 허용할 수 있는가?", "RPO 5분이면 최대 약 5분 데이터 손실 목표"],
              ["RTO", "장애 후 언제까지 서비스를 재개해야 하는가?", "RTO 30분이면 30분 안에 복구 목표"],
            ],
          },
          {
            type: "code",
            language: "text",
            title: "시간선으로 보기",
            code: "마지막 복구 가능 시점 ──(RPO)── 장애 발생 ──(RTO)── 서비스 복구",
          },
        ],
      },
      {
        title: "목표가 아키텍처를 결정합니다",
        blocks: [
          {
            type: "list",
            items: [
              "짧은 RPO에는 더 잦은 백업·로그 보관·동기 복제 같은 비용이 필요할 수 있습니다.",
              "짧은 RTO에는 자동 장애 전환, 준비된 인프라와 반복 훈련이 필요합니다.",
              "모든 데이터가 같은 목표를 가질 필요는 없으므로 업무 중요도별로 등급을 나눕니다.",
              "문서의 목표가 아니라 실제 복구 훈련 시간을 측정해 달성 가능성을 검증합니다.",
            ],
          },
          {
            type: "callout",
            tone: "info",
            title: "0에 가까울수록 비용이 큽니다",
            content:
              "RPO 0과 매우 짧은 RTO는 기술뿐 아니라 다중 리전, 운영 인력, 자동화, 테스트 비용을 요구합니다. 업무 피해와 구현 비용을 함께 합의합니다.",
          },
        ],
      },
    ],
  },
} satisfies StudyContentMap;
