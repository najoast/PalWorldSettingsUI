
function parseConfig() {
	event.preventDefault(); // 阻止表单的默认提交行为
	var configText = document.getElementById("configText").value;
	var lines = configText.split('\n');
	var configStart = false;
	var configItems = [];

	for (var i = 0; i < lines.length; i++) {
		var line = lines[i].trim();
		if (line.startsWith(";") || line === "") {
			continue; // 忽略注释行和空行
		}
		if (!configStart) {
			if (line !== "[/Script/Pal.PalGameWorldSettings]") {
				alert("不支持的配置格式");
				return;
			}
			configStart = true;
		} else {
			const startIndex = line.indexOf('(') + 1; // 获取左括号的索引位置
			const endIndex = line.lastIndexOf(')'); // 获取右括号的索引位置

			if (startIndex >= 0 && endIndex >= 0 && endIndex > startIndex) {
				const content = line.substring(startIndex, endIndex);
				var options = content.split(",");
				for (var j = 0; j < options.length; j++) {
					const option = options[j];
					const keyValue = option.split("=");
					if (keyValue.length === 2) {
						var key = keyValue[0].trim();
						var value = keyValue[1].trim();
						configItems.push({ key: key, value: value });
					}
				}
			} else {
				console.log('未找到括号内的内容');
			}
		}
	}

	displayConfigItems(configItems);
}

function renderWithoutMeta(configItem, row) {
	const keyCell = document.createElement('td');
	keyCell.textContent = configItem.key;
	row.appendChild(keyCell);

	const labelCell = document.createElement('td');
	row.appendChild(labelCell);

	const valueCell = document.createElement('td');

	var input = document.createElement("input");
	var valueLabel;

	if (isNaN(configItem.value)) {
		if (configItem.value == "True" || configItem.value == "False") {
			input.type = "checkbox";
			input.checkd = (configItem.value == "True");
		} else {
			input.type = "text";
			input.value = configItem.value;
		}
	} else {
		input.type = "range";
		input.max = configItem.value * 2;
		if (configItem.value <= 10) {
			input.min = "0.1";
			input.step = "0.1";
		} else {
			input.min = "1";
			input.step = "1";
		}
		input.value = configItem.value;

		valueLabel = document.createElement("label");
		valueLabel.innerHTML = formatFloatValue(configItem.value);
		labelCell.appendChild(valueLabel);

		input.oninput = function() {
			updateConfigValue(input, valueLabel);
		};
	}

	valueCell.appendChild(input);
	row.appendChild(valueCell);
}

function renderWithMeta(configItem ,meta, row) {
	const keyCell = document.createElement('td');
	keyCell.textContent = meta.name;
	row.appendChild(keyCell);

	const labelCell = document.createElement('td');
	row.appendChild(labelCell);

	const valueCell = document.createElement('td');

	var input, select, valueLabel;

	switch (meta.type) {
		case "range":
			input = document.createElement("input");
			input.type = meta.type;
			input.min = meta.min;
			input.max = meta.max;
			input.step = meta.step;
			input.value = configItem.value;
			valueLabel = document.createElement("label");
			valueLabel.innerHTML = formatFloatValue(configItem.value);
			input.oninput = function() {
				updateConfigValue(input, valueLabel);
			};
			break;
		case "select":
			select = document.createElement('select');
			const optionValues = meta.min.split(";");
			const optionTexts = meta.max.split(";");
			for (let i = 0; i < optionValues.length; i++) {
				const option = document.createElement('option');
				option.value = optionValues[i];
				option.text = optionTexts[i];
				select.appendChild(option);
			}
			break;
		case "bool":
			input = document.createElement("input");
			input.type = "checkbox";
			input.checkd = (configItem.value == "True");
			break;
		case "string":
			input = document.createElement("input");
			input.type = "text";
			input.style.width = "280px";
			input.value = trimString(configItem.value, '"');
			break;
		default:
			console.log("Unsupported setting type! " + meta);
	}
	if (input) {
		valueCell.appendChild(input);
	}
	if (select) {
		valueCell.appendChild(select);
	}
	if (valueLabel) {
		labelCell.appendChild(valueLabel);
	}
	row.appendChild(valueCell);
}

function renderSetting(configItem, metaMap, table) {
	const row = document.createElement('tr');
	const meta = metaMap.get(configItem.key);
	if (meta == null) {
		renderWithoutMeta(configItem, row);
	} else {
		renderWithMeta(configItem ,meta, row);
	}
	table.appendChild(row);
}

function displayConfigItems(configItems) {
	const metaMap = getMetaMap();

	var configItemsDiv = document.getElementById("configItems");
	configItemsDiv.innerHTML = "";

	const table = document.createElement('table');
	for (var i = 0; i < configItems.length; i++) {
		renderSetting(configItems[i], metaMap, table);
	}
	configItemsDiv.appendChild(table);
}

function updateConfigValue(input, valueLabel) {
	valueLabel.innerHTML = input.value;
}
