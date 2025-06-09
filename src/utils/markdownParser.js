import { marked } from 'marked';

// ✨ 옵션 설정 (딱 한 번만)
marked.setOptions({
    breaks: true,   // 줄바꿈을 <br>로 처리
    gfm: true,      // 체크박스, 표, strikethrough 등 GFM 지원
});

// 마크다운을 HTML로 변환하는 함수
export const parseMarkdownToHtml = (markdown) => {
    return marked(markdown);
};