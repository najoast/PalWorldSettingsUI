# PalWorldSettingsUI

![preview](https://github.com/najoast/PalWorldSettingsUI/assets/14048531/96969980-324c-4452-8890-ffc20a87e5b7)

PalWorldSettingsUI is an open source web tool designed to help Palworld gamers visually modify game configuration settings. This tool is able to parse all configuration items in the PalWorldSettings.ini file and generate the corresponding user interface (UI), allowing players to intuitively modify various settings of the game.

The main function:

* Configuration parsing: PalWorldSettingsUI can parse all configuration items in the PalWorldSettings.ini file, including various settings and options in the game.
* Visual modification: PalWorldSettingsUI provides an intuitive way to modify the configuration of a Palworld game by generating a user interface (UI). Players can change configurations through simple interface operations without manually editing configuration files.
* Real-time preview: PalWorldSettingsUI provides a real-time preview function, allowing players to immediately see the effects when modifying configurations, thereby better adjusting game settings.
* Open Source Project: PalWorldSettingsUI is an open source project and the code is available on GitHub. This means players are free to use, modify and contribute code to suit personal needs and improve tool functionality.

With the PalWorldSettingsUI, players can easily customize the configuration of their Palworld games to suit their personal preferences and gaming needs. No matter which option you are adjusting, PalWorldSettingsUI provides a convenient and intuitive way to make changes.

Through the open source project of PalWorldSettingsUI, we hope to provide Palworld gamers with a powerful tool that allows them to better personalize and optimize their gaming experience. Welcome to join our project, contribute and improve this tool, and make it more complete and applicable.

### How to add new options

After the official adds new options to the configuration file, this project needs to be updated synchronously. The update steps are as follows:

1. Make sure Palworld Dedicated Server is updated to the latest version.
2. Open the `...\SteamLibrary\steamapps\common\PalServer\DefaultPalWorldSettings.ini` file and copy the latest options to the output box of the tool.
3. The newly added options will still appear in the interface, but they are in English. These are the newly added options.
4. Add the Chinese name and configuration type of the new option to the `_settingsMeta` variable in the `js/meta.js` file.
5. Paste the latest configuration completely into the default value of the `index.html` configuration box.

I don't know when the game will be updated. If any players find that the options have been updated, please raise an issue or directly raise a PR. You can also leave a message to me on Bilibili.

# 中文说明
PalWorldSettingsUI 是一个开源的网页工具，旨在帮助 Palworld 游戏玩家可视化地修改游戏配置设置。该工具能够解析 PalWorldSettings.ini 文件中的所有配置项，并生成相应的用户界面 (UI)，使玩家能够直观地修改游戏的各种设置。

主要功能：

* 配置解析：PalWorldSettingsUI 能够解析 PalWorldSettings.ini 文件中的所有配置项，包括游戏中的各种设置和选项。
* 可视化修改：通过生成用户界面 (UI)，PalWorldSettingsUI 提供了一种直观的方式来修改 Palworld 游戏的配置。玩家可以通过简单的界面操作来更改配置，而无需手动编辑配置文件。
* 实时预览：PalWorldSettingsUI 提供实时预览功能，使玩家能够在修改配置时立即看到效果，从而更好地调整游戏设置。
* 开源项目：PalWorldSettingsUI 是一个开源项目，代码可在 GitHub 上获取。这意味着玩家可以自由使用、修改和贡献代码，以满足个人需求和改进工具功能。

通过 PalWorldSettingsUI，玩家可以轻松地自定义 Palworld 游戏的配置，使其符合个人喜好和游戏需求。无论是调整哪个选项，PalWorldSettingsUI 都能提供一个便捷而直观的方式来进行修改。

我们希望通过 PalWorldSettingsUI 的开源项目，为 Palworld 游戏玩家提供一个强大的工具，使他们能够更好地个性化和优化游戏体验。欢迎加入我们的项目，一起贡献和改进这个工具，让它变得更加完善和适用。

### 如何添加新选项

官方在配置文件内增加新选项后，本项目需要同步更新，更新步骤如下：
1. 确保 Palworld Dedicated Server 更到最新。
2. 打开 `...\SteamLibrary\steamapps\common\PalServer\DefaultPalWorldSettings.ini` 文件，复制最新选项到工具的输出框内。
3. 新增加的选项仍然会出现在界面里，但是是英文名，这些就是新增的选项了。
4. 在 `js/meta.js` 文件中的 `_settingsMeta` 变量中添加新选项的中文名和配置类型。
5. 把最新配置完整粘到 `index.html` 配置框的默认值里。

我不知道什么时候游戏更新，如果有玩家发现选项更新了，欢迎提 issue 或直接提 PR，B站上跟我留言也行。
