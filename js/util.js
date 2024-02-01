
function parseCSV(csvString) {
	const rows = csvString.split('\n'); // split the string into rows using the line feed character
	const header = rows[0].split(','); // parse the header

	// parse the data rows
	const data = [];
	for (let i = 1; i < rows.length; i++) {
		if (rows[i].trim() === '')
			continue; // ignore empty lines
		const row = rows[i].split(',');
		data.push(row);
	}

	// build the result object
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

function formatFloatValue(str) {
	const floatValue = parseFloat(str);
	const formattedValue = floatValue % 1 === 0 ? floatValue.toFixed(0) : floatValue.toFixed(1);
	return formattedValue;
}
