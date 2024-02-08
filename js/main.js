
function parseConfig() {
	var configText = document.getElementById("configText").value;
	var lines = configText.split('\n');
	var configStart = false;
	var configItems = [];

	for (var i = 0; i < lines.length; i++) {
		var line = lines[i].trim();
		if (line.startsWith(";") || line === "") {
			continue; // Ignore comment lines and blank lines
		}
		if (!configStart) {
			if (line !== "[/Script/Pal.PalGameWorldSettings]") {
				alert("Unsupported configuration format");
				return;
			}
			configStart = true;
		} else {
			const startIndex = line.indexOf('(') + 1; // Get the index position of the left parenthesis
			const endIndex = line.lastIndexOf(')'); // Get the index position of the right parenthesis

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
				console.log('No content found in parentheses');
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
	keyCell.dataset.key = configItem.key;
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
				onSettingChanged();
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
				if (optionValues[i] == configItem.value) {
					select.selectedIndex = i;
				}
			}
			if (configItem.key == "Difficulty") {
				select.onchange = function() {
					changeDifficulty(this.value);
					onSettingChanged();
				}
			} else {
				select.onchange = onSettingChanged;
			}
			break;
		case "bool":
			input = document.createElement("input");
			input.type = "checkbox";
			input.checked = (configItem.value == "True");
			input.onchange = onSettingChanged;
			break;
		case "string":
			input = document.createElement("input");
			input.type = "text";
			input.style.width = "280px";
			input.value = trimString(configItem.value, '"');
			input.onchange = onSettingChanged;
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
	var configItemsDiv = document.getElementById("configItems");
	configItemsDiv.innerHTML = "";

	const table = document.createElement('table');
	for (var i = 0; i < configItems.length; i++) {
		renderSetting(configItems[i], _metaMap, table);
	}
	configItemsDiv.appendChild(table);
}

function updateConfigValue(input, valueLabel) {
	valueLabel.innerHTML = input.value;
}

// Traverse the <table> in <configItems> and write the results back to <configText> in the same format
function updateConfigText() {
	var configItems = [];

	var configItemsDiv = document.getElementById("configItems");
	var table = configItemsDiv.getElementsByTagName("table")[0];
	var rows = table.rows;
	for (var i = 0; i < rows.length; i++) {
		const key = rows[i].cells[0].dataset.key;
		const valueElement = rows[i].cells[2].children[0];
		const meta = _metaMap.get(key);
		configItems.push(key + "=" + adjustWritebackValue(meta, valueElement));
	}

	var result = "[/Script/Pal.PalGameWorldSettings]\nOptionSettings=(" + configItems.join(",") + ")\n";
	document.getElementById("configText").value = result;
}

function onSettingChanged() {
	updateConfigText();
}

function adjustWritebackValue(meta, valueElement) {
	switch (meta.type) {
		case 'bool':
			return valueElement.checked ? "True" : "False";
		case 'string':
			return '"' + valueElement.value + '"';
		default:
			return valueElement.value;
	}
}

function copyResult() {
	var copyText = document.getElementById("configText");
	copyText.select();
	copyText.setSelectionRange(0, 99999); /* For mobile devices */
	document.execCommand("copy");

	var button = document.getElementById("copyResult");
	let oldText = button.value;
	button.value = "已复制";
	button.disabled = true;

	setTimeout(function() {
		button.value = oldText;
		button.disabled = false;
	}, 1000);
}

function changeDifficulty(difficulty) {
	const preset = getPreset(difficulty);
	if (!preset) {
		console.error("Difficulty not found: " + difficulty);
		return;
	}
	// Traverse preset values
	var configItemsDiv = document.getElementById("configItems");
	var table = configItemsDiv.getElementsByTagName("table")[0];
	var rows = table.rows;
	for (var i = 0; i < rows.length; i++) {
		const key = rows[i].cells[0].dataset.key;
		const presetValue = preset.get(key);
		if (presetValue) {
			const labelElement = rows[i].cells[1].children[0];
			const valueElement = rows[i].cells[2].children[0];
			const meta = _metaMap.get(key);
			switch (meta.type) {
				case "range":
					valueElement.value = presetValue;
					updateConfigValue(valueElement, labelElement);
					break;
				case "string":
					valueElement.value = presetValue;
					break;
				case "select":
					valueElement.selectedIndex = presetValue;
					break;
				case "bool":
					valueElement.checked = presetValue;
					break;
				default:
					console.error("Unsupported type in preset value:" + meta);
			}
		}
	}
}
