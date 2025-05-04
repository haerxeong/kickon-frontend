import axiosInstance from "../apis/axios-instance.js";
import axios from "axios";

export const uploadImageToS3 = async (file) => {
    try {
        // Presigned URL 요청
        const presignedRes = await axiosInstance.post(
            "/api/aws/presigned-url",
            {
                type: "news-images",
                fileName: file.name,
            }
        );

        console.log("Presigned Response Data:", presignedRes.data);

        const { presignedUrl, s3Url } = presignedRes.data;

        if (!presignedUrl || !s3Url) {
            throw new Error("Presigned URL 또는 s3Url 데이터가 누락되었습니다.");
        }

        console.log("Presigned URL:", presignedUrl);
        console.log("Actual File URL (s3Url):", s3Url);

        // S3에 파일 업로드
        console.log("File Info:", {
            name: file.name,
            type: file.type,
            size: file.size,
        });

        await axios.put(
            presignedUrl,
            file,
            {
                headers: {
                    "Content-Type": file.type || "application/octet-stream",
                    "x-amz-acl": "public-read",
                },
            }
        );

        console.log("파일 업로드 성공:", s3Url);

        // 업로드된 파일 URL 반환
        return s3Url;
    } catch (error) {
        console.error("이미지 S3 업로드 실패:", error.response?.data || error.message);
        throw error;
    }
};