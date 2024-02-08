
function parsePresets() {
	const presetsCsv = `key,name,casual,normal,hard
DayTimeSpeedRate,白天流逝速度,1,1,1
NightTimeSpeedRate,夜晚流逝速度,1,1,1
ExpRate,经验值倍率,1.3,1,0.8
PalCaptureRate,捕获概率倍率,2,1,0.8
PalSpawnNumRate,帕鲁出现数量倍率,1,1,1
PalDamageRateAttack,帕鲁攻击伤害倍率,1,1,1
PalDamageRateDefense,帕鲁承受伤害倍率,1,1,1
PlayerDamageRateAttack,玩家攻击伤害倍率,1.5,1,0.5
PlayerDamageRateDefense,玩家承受伤害倍率,0.7,1,4
PlayerStomachDecreaceRate,玩家饱食度降低倍率,1,1,1
PlayerStaminaDecreaceRate,玩家耐力降低倍率,1,1,1
PlayerAutoHPRegeneRate,玩家生命值自然回复倍率,1,1,1
PlayerAutoHpRegeneRateInSleep,玩家睡眠时生命值回复倍率,1,1,1
PalStomachDecreaceRate,帕鲁饱食度降低倍率,1,1,1
PalStaminaDecreaceRate,帕鲁耐力降低倍率,1,1,1
PalAutoHPRegeneRate,帕鲁生命值自然回复倍率,1,1,1
PalAutoHpRegeneRateInSleep,帕鲁睡眠时生命值回复倍率,1,1,1
BuildObjectDamageRate,对建筑伤害倍率,1,1,1
BuildObjectDeteriorationDamageRate,建筑特的劣化速度倍率,1,1,1
CollectionDropRate,可采集物品采集量倍率,2,1,0.5
CollectionObjectHpRate,可采集物品生命值倍率,1,1,1
CollectionObjectRespawnSpeedRate,可采集物品刷新间隔,1,1,1
EnemyDropItemRate,道具掉落量倍率,2,1,0.5
DeathPenalty,死亡惩罚,None,ItemAndEquipment,All
bEnableInvaderEnemy,是否会发生袭击事件,TRUE,TRUE,TRUE
DropItemMaxNum,世界内的掉落物上限,3000,3000,3000
BaseCampWorkerMaxNum,可分派至据点工作的帕鲁数量上限,15,15,15
GuildPlayerMaxNum,公会人数上限,20,20,20
PalEggDefaultHatchingTime,帕鲁蛋孵化所需时间（小时）,0,2,4`;
	const rows = parseCSV(presetsCsv);
	return {
		Casual: createPresetMap(rows, "casual"),
		Normal: createPresetMap(rows, "normal"),
		Hard: createPresetMap(rows, "hard"),
	}
}

function createPresetMap(csvRows, difficulty) {
	const presetMap = new Map();
	for (let i = 0; i < csvRows.length; i++) {
		const csvRow = csvRows[i];
		const meta = _metaMap.get(csvRow.key);
		// console.log(csvRow);
		// console.log(difficulty);
		// console.log(meta);
		let presetValue = csvRow[difficulty];
		switch (meta.type) {
			case "select":
				const optionValues = meta.min.split(";");
				for (let j = 0; j < optionValues.length; j++) {
					if (optionValues[j] == presetValue) {
						presetValue = j;
						break;
					}
				}
				break;
			case "bool":
				presetValue = presetValue == "True";
				break;
		}
		presetMap.set(csvRow.key, presetValue);
	}
	return presetMap;
}

const _presets = parsePresets();

function getPreset(difficulty) {
	// console.log(_presets);
	return _presets[difficulty];
}
