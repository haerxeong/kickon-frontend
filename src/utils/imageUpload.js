import axiosInstance from "../apis/axios-instance.js"

/**
 * presigned URL을 발급받아 S3에 파일 업로드 후, 접근 가능한 이미지 URL을 반환합니다.
 * @param {File} file - 업로드할 파일 객체
 * @returns {Promise<string>} - 업로드된 이미지의 S3 URL
 */
export const uploadImageToS3 = async (file) => {
    try {
        // presigned URL 요청
        const presignedRes = await axiosInstance.post(
            "/api/aws/presigned-url",
            {
                type: "news-images",
                fileName: file.name,
            },
            {
                headers: {
                    "x-amz-adl": "public-read",
                },
            }
        );

        // presigned URL, 실제 접근 URL 추출 (API 응답 구조에 따라 key 수정)
        const { presignedUrl, fileUrl } = presignedRes.data;

        // S3에 파일 업로드 (PUT)
        await axiosInstance.put(
            presignedUrl,
            file,
            {
                headers: {
                    "Content-Type": file.type,
                    "x-amz-acl": "public-read",
                },
                // baseURL 무시 필요시:
                baseURL: "", // presignedUrl은 절대경로이므로 axiosInstance의 baseURL 무시
            }
        );

        // 업로드된 파일 URL 반환
        return fileUrl;
    } catch (error) {
        console.error("이미지 S3 업로드 실패:", error);
        throw error;
    }
};
