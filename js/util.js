
function parseCSV(csvString) {
	const rows = csvString.split('\n');// 使用换行符将字符串拆分成行
	const header = rows[0].split(',');// 解析表头

	// 解析数据行
	const data = [];
	for (let i = 1; i < rows.length; i++) {
		if (rows[i].trim() === '')
			continue;// 忽略空行
		const row = rows[i].split(',');
		data.push(row);
	}

	// 构建结果对象
	const result = [];
	for (let i = 0; i < data.length; i++) {
		const obj = {};
		for (let j = 0; j < header.length; j++) {
		obj[header[j]] = data[i][j];
		}
		result.push(obj);
	}

	return result;
}

function trimString(str, char) {
	if (str.startsWith(char) && str.endsWith(char)) {
		return str.slice(1, -1);
	}
	return str;
}
