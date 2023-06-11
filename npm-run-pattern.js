const FS = require('fs');
const { spawnSync } = require('child_process');
const packageJson = JSON.parse(FS.readFileSync('package.json').toString());

const pattern = process.argv[2];
if (!pattern) {
    console.error('No pattern provided');
    process.exit(1);
}

const { scripts } = packageJson;

const regex = new RegExp(pattern, 'i');

const matchingScripts = Object.keys(scripts).filter((scriptName) => regex.test(scriptName));

if (matchingScripts.length === 0) {
    console.error(`No scripts found matching ${pattern}`);
    process.exit(1);
}

console.log('Running scripts:');
console.log('\t - ' + matchingScripts.join('\n\t - '));

matchingScripts.forEach((scriptName) => {
    spawnSync('npm', ['run', scriptName], { stdio: 'inherit' });
});

