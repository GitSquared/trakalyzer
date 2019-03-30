# trakalyzer
###### (trackerjacker-analyzer)


A little CLI script that displays a summary of the information contained in a [trackerjacker](https://github.com/calebmadrigal/trackerjacker)'s mapping output file.

Head over to the [Releases page](https://github.com/GitSquared/trakalyzer/releases) to download pred-built binaries.


Usage:
```
             trakalyzer Commands & Help

    --help    or -h   Display this message.
    --version or -v   Display version information.
    --file    or -f   Choose a file to parse.
                      Defaults to wifi_map.yaml.
```

Sample output:
![Screenshot](https://raw.githubusercontent.com/GitSquared/trakalyzer/v1.0.0/doc_resources/screenshot_100.png)

npm-related commands:

- Start from source with sample file: `npm start`
- Build binary for your target system: `npm build`
- Run [xojs](https://github.com/xojs/xo) lint tests: `npm test`


*Disclaimer: the sample wifi scan included in this repo (wifi_map_sample.yaml) is a test run I generated on a French high-speed rail (TGV) trip. It might contain some personal-ish data, for example from iPhone wifi sharing networks who uses the phone owner's name in the SSID. I can and I will purge the file from this repository if any issues arise out of this.
You can contact me by email at gabriel@saillard.dev for any questions/requests.*