# Module: MMM-GeminiAIFact

This [MagicMirror](https://github.com/MichMich/MagicMirror) module generates a random fact from the following questions submitted to the Google Gemini AI:

- Tell me a fun fact in 50 words
- Tell me an interesting fact about an animal in <country> in 50 words
- Tell me an interesting fact about the country <country> in 50 words
- Tell me about a famous historical figure from <country> in 50 words
- Tell me about a notable historical event that happened in <country> in 50 words
- Tell me about a notable world record in 50 wordsporting Events
- Tell me an interesting sporting event that happened in <country> in 50 words

Inspired by the quotes shown on the [MagInkDash](https://github.com/speedyg0nz/MagInkDash) project.

![Magic-Mirror Module MMM-GeminiAIFact screenshot](https://raw.githubusercontent.com/mlcampbe/MMM-GeminiAIFact/main/screenshot.png)

Tested with:
- Raspberry Pi

## Dependencies
- An installation of [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)
- npm
- A [Google Gemini API Key](https://aistudio.google.com/apikey)

## Installation

Navigate into your MagicMirror's `modules` folder:
```
cd ~/MagicMirror/modules
```

Clone this repository:
```
git clone https://github.com/mlcampbe/MMM-GeminiAIFact
```

Navigate to the new `MMM-GeminiAIFact` folder and install the node dependencies.
```
cd MMM-GeminiAIFact/ && npm install
```

Configure the module in your `config.js` file.

## Update the module

Navigate into the `MMM-GeminiAIFact` folder with `cd ~/MagicMirror/modules/MMM-GeminiAIFact` and get the latest code from Github with `git pull`.

If you haven't made any manual changes to the module, this should work without any problems. Type `git status` to see your changes and if there are any you can reset them with `git reset --hard`. After that, git pull should be possible.

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
```javascript
modules: [
	{
		module: 'MMM-GeminiAIFact',
		position: 'top_right', // This can be any of the regions.
		config: {
			updateInterval: 3600000, // every 1 hour
			geminiApiKey: " xxxxxx", // your Gemini API Key
		},
	},
]
```

## Configuration options

The following properties can be configured:

<table width="100%">
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>updateInterval</code></td>
			<td>How often does the content needs to be fetched? (Milliseconds)
				<br><b>Possible values:</b> <code>1000</code> - <code>86400000</code>
				<br><b>Default value:</b> <code>3600000</code> (1 hour)
			</td>
		</tr>
		<tr>
			<td><code>geminiApiKey</code></td>
			<td>Your Google Gemini API Key value
				<br><b>Default value:</b> <code>XXXXXX</code> (dummy value, must be set)
			</td>
		</tr>
			</tbody>
</table>


