const package = require('./package.json');
const fs = require('fs');
const arg = require('arg');
const chalk = require('chalk');

const {stdout} = process;
const args = arg({
	'--help':		Boolean,
	'--version':	Boolean,
	'--file':		String,
	
	'-h': '--help',
	'-v': '--version',
	'-f': '--file'
});

if (args['--version']) {
	stdout.write(`${package.name} v${package.version}\n`);
	process.exit(0);
}

if (args['--help']) {
	stdout.write(
		chalk`{bold.inverse              ${package.name} Commands & Help            }\n\n` +
		chalk`    {bold --help   } {dim or} {bold -h}   Display this message.\n` +
		chalk`    {bold --version} {dim or} {bold -v}   Display version information.\n` +
		chalk`    {bold --file   } {dim or} {bold -f}   Choose a file to parse.\n` +
		chalk`                      Defaults to {bold.yellow wifi_map.yaml}.\n\n` +
		chalk`{bold.inverse   ${package.homepage}  }\n`
	);
	process.exit(0);
}

const filePath = args['--file'] || 'wifi_map.yaml';
stdout.write(chalk`{dim Parsing }${filePath}{dim .... }`);

fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
	if (err) {
		throw err;
	}

	const lines = data.split('\n');
	stdout.write(chalk`{bold ${lines.length}} {dim lines}\n`);

	stdout.write(chalk`{dim Scanning MAC addresses... }`);
	const macs = [];
	let vendors = new Map();

	lines.forEach(line => {
		line = line.trim();
		if (/^[0-f]{2}:{1}[0-f]{2}:{1}[0-f]{2}:{1}[0-f]{2}:{1}[0-f]{2}:{1}[0-f]{2}:{1}$/.test(line)) {
			line = line.slice(0, -1);
			macs.push(line);
		}

		if (/^vendor: .+$/.test(line) && line.slice(8) !== '\'\'') {
			line = line.slice(8);
			if (vendors.has(line)) {
				vendors.set(line, vendors.get(line) + 1);
			} else {
				vendors.set(line, 1);
			}
		}
	});

	stdout.write(chalk`{dim removing duplicates...}\n`);
	macs.filter((value, index) => {
		return (macs.indexOf(value) === index);
	});

	let sum = 0;
	vendors.forEach(e => {
		sum += e;
	});
	const coverage = Math.round((sum / macs.length) * 100);
	stdout.write(chalk`{bold.yellow ${macs.length}} devices detected, with {bold.red ${sum}} of them from {bold.blue ${vendors.size}} known vendors ({bold.green ${coverage}%} identified).\n`);

	stdout.write(chalk`\n{underline MAC addresses sample:}\n`);
	const sampleMax = (macs.length < 5) ? macs.length : 5;
	for (let i = 0; i < sampleMax; i++) {
		const r = Math.floor(Math.random() * macs.length);
		stdout.write(
			chalk`{dim #}` +
			chalk`{yellow ${r.toString().padStart(6)}}` +
			':   ' +
			chalk`{bold.inverse  ${macs[r]} }\n`
		);
	}

	stdout.write(chalk`\n{underline Top vendors:}\n`);
	vendors = [...vendors.entries()].sort((a, b) => {
		return b[1] - a[1];
	});
	const listMax = (vendors.length < 6) ? vendors.length : 5;
	for (let i = 0; i < listMax; i++) {
		stdout.write(
			chalk`{dim #} {blue ${i + 1}}: ` +
			chalk`{bold.blue ${vendors[i][0].padEnd(50, '.')}}` +
			chalk` -- {bold.red ${vendors[i][1]}}\n`);
	}
});
