// 유저 스테이터스 초기값
export const STATUS = {
    level:  1,  // 레벨
    exp:    0,  // 경험치
    hp:     50, // 체력
    def:    1,  // 방어력
    atk:    1,  // 공격
    int:    1,  // 버프 및 힐링
    dex:    1,  // 회피
    agi:    1,  // 크리티컬 확률
    luk:    1,  // 크리티컬 피해량 & 랜덤 치명타
    point:  10, // 스테이터스 포인트
};

// 유저 착용 정보 초기값
export const EQUIP_STAT_POINT = {
    hp: 0,
    def: 0,
    atk: 0,
    int: 0,
    dex: 0,
    agi: 0,
    luk: 0,
}

// 유저 아이템 착용 정보 초기값
export const EQUIP = {
weapon: {},
armor: {},
jewelry: {}
}

// 레벨업 구간 > 임시이므로 수정 필요
export const LEVEL_UP_POINT = {
    1: 100,
    2: 200,
    3: 300,
    4: 400,
    5: 500
}