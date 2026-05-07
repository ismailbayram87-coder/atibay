import { renameSync, existsSync, rmSync } from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const apiDir = path.join(process.cwd(), 'src', 'app', 'api');
const tempApiDir = path.join(process.cwd(), 'src', 'api_temp');

console.log('Preparing for static export...');

// 1. Rename the API directory if it exists
let apiRenamed = false;
if (existsSync(apiDir)) {
  console.log('Temporarily hiding API routes...');
  renameSync(apiDir, tempApiDir);
  apiRenamed = true;
}

const nextDir = path.join(process.cwd(), '.next');
if (existsSync(nextDir)) {
  console.log('Clearing .next cache...');
  rmSync(nextDir, { recursive: true, force: true });
}

try {
  // 2. Set environment variable and build
  console.log('Running Next.js build...');
  execSync('npx next build', { 
    stdio: 'inherit',
    env: { ...process.env, STATIC_EXPORT: 'true' }
  });
  console.log('Static export completed successfully. Output is in the "out" directory.');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exitCode = 1;
} finally {
  // 3. Restore the API directory
  if (apiRenamed && existsSync(tempApiDir)) {
    console.log('Restoring API routes...');
    renameSync(tempApiDir, apiDir);
  }
}
