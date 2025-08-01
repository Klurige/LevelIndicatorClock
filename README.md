[![Buy Me A Coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoffee.com/klurige)

# Level Indicator Clock
[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/v/release/klurige/levelindicatorclock?style=for-the-badge)](https://github.com/Klurige/levelindicatorclock/releases)
[![GitHub Issues](https://img.shields.io/github/issues/klurige/levelindicatorclock?style=for-the-badge)](https://github.com/Klurige/levelindicatorclock/issues)

This card shows an analogue clock that presents current time and electricity price level for the next twelve hours.

It is tightly coupled with the **[electricitypricelevels](https://github.com/Klurige/electricitypricelevels)** integration.

<img alt="Clock Image" src="./clock_image.png"/>

The outer circle shows red for high, yellow for medium and green for low electricity price levels.

There is also a white delimiter marking the breakpoint between the past and the future.

## Prerequisites
This card is tightly coupled with the **[electricitypricelevels](https://github.com/Klurige/electricitypricelevels)** integration.
Install that integration, including its dependencies, first.

## Installation
### HACS (Home Assistant Community Store)
1. Go to HACS -> Frontend -> and click the 3-dots in the top right and select "Custom Repositories".
2. Add the URL to this repository in the "Repository" field, select the "Lovelace" category, and click "ADD".
3. The `Level Indicator Clock` card will now be available in HACS. Click on it and proceed with the installation.
4. Restart Home Assistant.

### Manual Installation
1. Download the `LevelIndicatorClock.js` file from the [latest release](https://github.com/Klurige/levelindicatorclock/releases).
2. Place the file in your `config/www` folder.
3. Add the following to your `ui-lovelace.yaml` or via the UI under `Configuration` -> `Lovelace Dashboards` -> `Resources`:
   ```yaml
   resources:
     - url: /local/LevelIndicatorClock.js
       type: module
   ```
4. Restart Home Assistant.

## Configuration
Add the card to your Lovelace dashboard:
```yaml
type: custom:level-indicator-clock-card
entity: sensor.electricitypricelevels
```

| Name | Type | Default | Description |
|------|------|---------|-------------|
| type | string | **required** | `custom:level-indicator-clock-card` |
| entity | string | **required** | The entity from the `electricitypricelevels` integration. |

## Development
### Setup
Follow these tutorials to setup your environment: 
  * Setup a devcontainer: https://github.com/home-assistant-tutorials/01.development-environment
  * Install HACS: https://github.com/home-assistant-tutorials/07.toggle-card-to-hacs

Once you've got your devcontainer running, you should install the dependencies as above.

Clone this repository: `git clone https://github.com/Klurige/levelindicatorclock.git`

Modify the `.devcontainers/devcontainer.json` file and include a mount :
```
{
"name": "Home Assistant Dev",
"mounts": [
"source=<PATH/TO/GIT/levelindicatorclock/dist,target=/workspaces/home-assistant-core/config/www/levelindicatorclock,type=bind,consistency=cached"
],
...
}
```
Rebuild the devcontainer and restart it.

Go to Settings -> Dashboards and click on the kebab icon in the top right corner to add resources.
Add the following resource:
```
local/levelindicatorclock/LevelIndicatorClock.js
```

You can now add the card to your dashboard as usual.

### Development
To continuously build the card when you make changes to the source code, run the following command in the terminal:
```bash
npm run watch
```
This will rebuild the card whenever you make changes to the source code.

To update the card in the browser, you will need to hard-refresh the browser.
For Google Chrome: Open the Inspect window and press: `Ctrl+Shift+R`.
Other browsers may have different shortcuts.

## Troubleshooting
If you have issues, please [open an issue on GitHub](https://github.com/Klurige/levelindicatorclock/issues).

## Contributing
Contributions are welcome! Please open a pull request with your changes.

## License
This project is licensed under the GNU General Public License (GPL). See the [LICENSE](LICENSE) file for details.

## Say Thanks
If you like this project, please consider supporting me.

[![Buy Me A Coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoffee.com/klurige)
