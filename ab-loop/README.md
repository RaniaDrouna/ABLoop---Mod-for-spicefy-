# AB Loop for Spicetify

A simple Spicetify extension that adds A-B loop functionality to Spotify, you can now repeat specific sections of a song. perfect for musicians, language learners, and anyone who wants to master a particular part of a track.


## Features

- **Loop any section** of a song by setting start and end points
-  **Simple interface** - one button in the top bar
- **Flexible time input** - supports both `MM:SS` format (e.g., `1:30`) or seconds (e.g., `90`)
- **Auto-stop on song change** - loops automatically stop when you skip to a new track
- **Lightweight** - no performance impact on Spotify

### Prerequisites

- [Spicetify](https://spicetify.app/) must be installed and working
- Spotify desktop client

### Steps

1. **Download the extension files**
   - Clone this repository or download the files directly

2. **Create the extension folder**
   ```bash
   # Navigate to your Spicetify Extensions folder
   # Windows: %appdata%\spicetify\Extensions
   # macOS/Linux: ~/.config/spicetify/Extensions

   ```

3. **Copy the files**
   - Place `ABloop.js` and `manifest.json` into the `Extensions` folder 

4. **Enable the extension**
   ```bash
   spicetify config extensions ABloop.js
   spicetify apply
   ```

5. **Restart Spotify**
   - The AB Loop button should now appear in your top bar!

### Setting Up a Loop

1. **Play a song** in Spotify
2. **Click the AB Loop button** in the top bar (loop icon)
3. **Enter your loop points** in the format `start-end`
   - Example: `1:30-2:45` (loops from 1 minute 30 seconds to 2 minutes 45 seconds)
   - Example: `90-165` (loops from 90 seconds to 165 seconds)
4. **Press OK** - the loop will start immediately!

### Stopping a Loop

- **Click the AB Loop button again** while a loop is active
- The loop will stop and the button will return to its normal state