/**
 * 유튜브 URL을 iframe 임베드 코드로 변환하는 함수
 * @param {string} html - 변환할 HTML 문자열
 * @returns {string} - iframe이 포함된 HTML 문자열
 */
export const youtubeUrlToIframe = (html) => {
    if (!html) return "";
    // 다양한 유튜브 URL 패턴을 iframe으로 변환
    return html.replace(
      // watch?v=, youtu.be, embed 등 다양한 패턴 지원
      /(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/g,
      (match, p1, p2, p3, videoId) =>
        `<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen class="youtube-iframe" title="YouTube video"></iframe>`
    );
  };
  