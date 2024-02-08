const _settingsMeta =`key,name,desc,type,min,max,step,default,server_only
Difficulty,难度,,select,Casual;Normal;Hard;None,休闲;普通;困难;自定义,,,0
DayTimeSpeedRate,白天流逝速度,,range,0.1,5,0.1,1,0
NightTimeSpeedRate,夜晚流逝速度,,range,0.1,5,0.1,1,0
ExpRate,经验值倍率,,range,0.1,20,0.1,1,0
PalCaptureRate,捕获概率倍率,,range,0.5,2,0.1,1,0
PalSpawnNumRate,帕鲁出现数量倍率,提高帕鲁出现数量将导致游戏性能下降,range,0.5,3,0.1,1,0
PalDamageRateAttack,帕鲁攻击伤害倍率,,range,0.1,5,0.1,1,0
PalDamageRateDefense,帕鲁承受伤害倍率,,range,0.1,5,0.1,1,0
PlayerDamageRateAttack,玩家攻击伤害倍率,,range,0.1,5,0.1,1,0
PlayerDamageRateDefense,玩家承受伤害倍率,,range,0.1,5,0.1,1,0
PlayerStomachDecreaceRate,玩家饱食度降低倍率,,range,0.1,5,0.1,1,0
PlayerStaminaDecreaceRate,玩家耐力降低倍率,,range,0.1,5,0.1,1,0
PlayerAutoHPRegeneRate,玩家生命值自然回复倍率,,range,0.1,5,0.1,1,0
PlayerAutoHpRegeneRateInSleep,玩家睡眠时生命值回复倍率,,range,0.1,5,0.1,1,0
PalStomachDecreaceRate,帕鲁饱食度降低倍率,,range,0.1,5,0.1,1,0
PalStaminaDecreaceRate,帕鲁耐力降低倍率,,range,0.1,5,0.1,1,0
PalAutoHPRegeneRate,帕鲁生命值自然回复倍率,,range,0.1,5,0.1,1,0
PalAutoHpRegeneRateInSleep,帕鲁睡眠时生命值回复倍率,帕鲁终端中的生命值回复倍率,range,0.1,5,0.1,1,0
BuildObjectDamageRate,对建筑伤害倍率,,range,0.5,3,0.1,1,0
BuildObjectDeteriorationDamageRate,建筑特的劣化速度倍率,,range,0,10,0.1,1,0
CollectionDropRate,可采集物品采集量倍率,,range,0.5,3,0.1,1,0
CollectionObjectHpRate,可采集物品生命值倍率,,range,0.5,3,0.1,1,0
CollectionObjectRespawnSpeedRate,可采集物品刷新间隔,,range,0.5,3,0.1,1,0
EnemyDropItemRate,道具掉落量倍率,,range,0.5,3,0.1,1,0
DeathPenalty,死亡惩罚,,select,None;Item;ItemAndEquipment;All,不掉落任何东西;掉落装备以外的道具;掉落所有道具;掉落所有道具及队伍内的帕鲁,,All,0
bEnablePlayerToPlayerDamage,允许玩家对玩家造成伤害,,bool,,,,FALSE,1
bEnableFriendlyFire,允许对友方单位造成伤害,比如可以攻击在基地工作的帕鲁,bool,,,,FALSE,1
bEnableInvaderEnemy,是否会发生袭击事件,,bool,,,,TRUE,0
bActiveUNKO,是否打开夜间仿制品(UNKO)功能?,不确定UNKO是什么,bool,,,,FALSE,1
bEnableAimAssistPad,启用手柄瞄准辅助,,bool,,,,TRUE,1
bEnableAimAssistKeyboard,启用键盘瞄准辅助,,bool,,,,FALSE,1
DropItemMaxNum,世界内的掉落物上限,,range,0,5000,1,3000,0
DropItemMaxNum_UNKO,世界内的夜间仿制品(UNKO)掉落物上限,,range,0,500,1,100,1
BaseCampMaxNum,据点数量上限,,range,1,500,1,128,1
BaseCampWorkerMaxNum,可分派至据点工作的帕鲁数量上限,,range,1,20,1,15,0
DropItemAliveMaxHours,掉落物品存活时间（小时）,,range,1,10,1,1,1
bAutoResetGuildNoOnlinePlayers,无在线玩家时是否自动重置公会,,bool,,,,FALSE,1
AutoResetGuildTimeNoOnlinePlayers,无在线玩家多少小时后自动重置公会,,range,1,300,1,72,1
GuildPlayerMaxNum,公会人数上限,,range,1,100,1,20,0
PalEggDefaultHatchingTime,帕鲁蛋孵化所需时间（小时）,,range,0,240,1,72,0
WorkSpeedRate,工作速度倍率,,range,0.1,5,0.1,1,1
bIsMultiplay,是否是多人游戏,,bool,,,,FALSE,0
bIsPvP,是否开启PVP模式,,bool,,,,FALSE,1
bCanPickupOtherGuildDeathPenaltyDrop,是否可以拾取其他公会成员的死亡掉落,,bool,,,,FALSE,1
bEnableNonLoginPenalty,是否开启离线惩罚,如果开启下线后饥饿度会随着时间的流逝而增加，就像在线时一样。,bool,,,,TRUE,1
bEnableFastTravel,是否开启传送功能,,bool,,,,TRUE,1
bIsStartLocationSelectByMap,启用地图上起始位置选择,,bool,,,,TRUE,1
bExistPlayerAfterLogout,玩家下线后是否仍存在于游戏中,,bool,,,,FALSE,1
bEnableDefenseOtherGuildPlayer,启用公会玩家互相防御?,可能是：允许公会玩家互相防御：这个选项启用时，公会成员可以相互进行防御，保护彼此免受其他公会或敌对玩家的攻击。这可能涉及公会内部的团队合作和互助，使公会成员能够共同面对敌对势力。,bool,,,,FALSE,1
CoopPlayerMaxNum,主机模式玩家数量上限,,range,1,32,1,4,1
ServerPlayerMaxNum,专用服务器玩家数量上限,,range,1,32,1,32,1
ServerName,服务器名字,,string,,,,Default Palworld Server,1
ServerDescription,服务器描述,,string,,,,,1
AdminPassword,管理员密码,,string,,,,,1
ServerPassword,服务器密码,,string,,,,,1
PublicPort,端口,,range,1024,49151,1,8211,1
PublicIP,IP地址,,string,,,,,1
RCONEnabled,启用远程控制台,启用或禁用远程控制台 (RCON) 以进行服务器管理。RCON = Remote Console,bool,,,,FALSE,1
RCONPort,远程控制台端口,,range,1024,49151,1,25575,1
Region,服务器所在区域,,string,,,,,1
bUseAuth,是否使用身份验证,,bool,,,,TRUE,1
BanListURL,封禁名单URL,,string,,,,https://api.palworldgame.com/api/banlist.txt,1`;

function getMetaMap() {
	// console.log("getMetaMap");
	const rows = parseCSV(_settingsMeta);
	return new Map(rows.map(row => [row.key, row]));
}

const _metaMap = getMetaMap();
