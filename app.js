const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputDir = "./images"; // 設定輸入目錄
const outputDir = "./webp"; // 設定輸出目錄

const main = () => {
	// 確保輸出目錄存在
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir);
	}
	if (!fs.existsSync(inputDir)) {
		fs.mkdirSync(inputDir);
	}

	// 讀取輸入目錄下的所有檔案
	fs.readdir(inputDir, (err, files) => {
		if (err) {
			console.error("無法讀取目錄:", err);
			return;
		}

		files.forEach((file) => {
			const inputFilePath = path.join(inputDir, file);
			const type = file.split(".")[1];
			const outputFilePath = path.join(
				outputDir,
				file.replace(`.${type}`, ".webp")
			);

			// 轉換圖檔
			sharp(inputFilePath)
				.toFormat("webp")
				.toFile(outputFilePath)
				.then(() => {
					console.log(`${file} 已轉換為 ${outputFilePath}`);
				})
				.catch((err) => {
					console.error("轉換錯誤:", err);
				});
		});
	});
};

main();
