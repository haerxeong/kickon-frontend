import axiosInstance from "../apis/axios-instance.js";

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

        // presigned URL, 실제 접근 URL 추출
        const { presignedUrl, sUrl } = presignedRes.data.data;

        // S3에 파일 업로드 (PUT)
        await axiosInstance.put(
            presignedUrl,
            file,
            {
                headers: {
                    "Content-Type": file.type,
                    "x-amz-acl": "public-read",
                },
                baseURL: "", // presignedUrl은 절대경로
            }
        );

        // 업로드된 파일 URL 반환
        return sUrl;
    } catch (error) {
        console.error("이미지 S3 업로드 실패:", error);
        throw error;
    }
};