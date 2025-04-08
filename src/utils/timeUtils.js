export function timeAgo(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now - past) / 1000);

    const units = [
        { unit: '년', seconds: 31536000 },
        { unit: '개월', seconds: 2592000 },
        { unit: '일', seconds: 86400 },
        { unit: '시간', seconds: 3600 },
        { unit: '분', seconds: 60 },
        { unit: '초', seconds: 1 }
    ];

    for (const { unit, seconds } of units) {
        const value = Math.floor(diffInSeconds / seconds);
        if (value >= 1) {
            return `${value}${unit} 전`;
        }
    }

    return "방금 전";
}