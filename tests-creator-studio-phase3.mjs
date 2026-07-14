import fs from 'node:fs';

const home=fs.readFileSync('app/HomeExperience.tsx','utf8');
const runtime=fs.readFileSync('components/runtime/WorldStructuredRuntime.tsx','utf8');
const media=fs.readFileSync('components/runtime/RuntimeMediaLayers.tsx','utf8');
const section=fs.readFileSync('components/runtime/StudioRuntimeSection.tsx','utf8');

const checks=[
 ['homepage parses studio structure',home.includes("parseStudioSections(home.labels.sectionStructure,'home')")],
 ['homepage applies studio runtime section',home.includes('<StudioRuntimeSection')],
 ['homepage renders uploaded media',home.includes('<RuntimeMediaLayers')],
 ['world runtime reads studio styles',runtime.includes('readElementStyle')],
 ['world runtime respects visibility',runtime.includes('item.visible')],
 ['world runtime respects order',runtime.includes('left.order - right.order')],
 ['media runtime supports video',media.includes('<video')],
 ['media runtime supports image',media.includes('<img')],
 ['section runtime applies motion',section.includes('motionClass')],
];

const failed=checks.filter(([,ok])=>!ok);
for(const [name,ok] of checks) console.log(`${ok?'PASS':'FAIL'} ${name}`);
if(failed.length) process.exit(1);
console.log('Creator Studio Phase 3 verification passed.');
