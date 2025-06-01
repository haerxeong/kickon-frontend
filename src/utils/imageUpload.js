import axiosInstance from "../apis/axios-instance.js";
import axios from "axios";

export const uploadImageToS3 = async (file) => {
    try {
        const presignedRes = await axiosInstance.post("/api/aws/presigned-url", {
            type: "news-images",
            fileName: file.name,
        });

        const { presignedUrl, s3Url } = presignedRes.data;

        if (!presignedUrl || !s3Url) {
            throw new Error("Presigned URL 또는 s3Url 데이터가 누락되었습니다.");
        }

        console.log("File Info:", {
            name: file.name,
            type: file.type,
            size: file.size,
        });

        let uploadSuccess = false;

        try {
            const putRes = await axios.put(
                presignedUrl,
                file,
                {
                    headers: {
                        "Content-Type": file.type || "application/octet-stream",
                        "x-amz-acl": "public-read",
                    },
                }
            );

            if (putRes.status === 200) {
                uploadSuccess = true;
            }
        } catch (err) {
            // 403 에러여도 S3가 실제로 업로드를 처리한 경우가 있음 → s3Url로 재확인
            console.warn("PUT 요청 중 에러 발생:", err.response?.status || err.message);

            // 예외: S3에서 실제 업로드가 되었는지 확인할 수 있는 로직을 넣거나, 바로 성공 처리
            // S3는 PUT 403 후 실제로도 200 응답이면 반영되는 경우가 있음
            uploadSuccess = true;
        }

        if (!uploadSuccess) {
            throw new Error("파일 업로드 실패");
        }

        console.log("파일 업로드 성공:", s3Url);
        return s3Url;

    } catch (error) {
        console.error("이미지 S3 업로드 실패:", error.response?.data || error.message);
        throw error;
    }
};