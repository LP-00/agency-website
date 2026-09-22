import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const repository = "LP-00/agency-website";
const branch = "codex/pages";
const origin = "https://lp-00.github.io/agency-website/";
const root = process.cwd();
const version = JSON.parse(readFileSync("package.json", "utf8")).version;
const gitAuth = ["-c", "credential.helper=", "-c", "credential.helper=!gh auth git-credential"];
const run = (executable, args, options = {}) => execFileSync(executable, args, { cwd: root, encoding: "utf8", ...options });
if (!process.env.npm_execpath) throw new Error("Run this script with npm run deploy.");

run(process.execPath, [process.env.npm_execpath, "run", "lint"], { stdio: "inherit" });
run(process.execPath, [process.env.npm_execpath, "run", "typecheck"], { stdio: "inherit" });
run(process.execPath, [process.env.npm_execpath, "run", "build"], { stdio: "inherit", env: { ...process.env, NEXT_PUBLIC_BASE_PATH: "/agency-website", NEXT_PUBLIC_SITE_URL: origin } });

const sourceCommit = run("git", ["rev-parse", "HEAD"]).trim();
writeFileSync("out/.nojekyll", "");
writeFileSync("out/deployment.json", JSON.stringify({ version, sourceCommit, builtAt: new Date().toISOString() }, null, 2));

// A separate Git index publishes only out/, without switching branches or touching source files.
const indexEnv = { ...process.env, GIT_INDEX_FILE: resolve(".git/agency-pages.index"), GIT_WORK_TREE: resolve("out") };
run("git", ["read-tree", "--empty"], { env: indexEnv });
run("git", ["add", "--all", "--", "."], { cwd: resolve("out"), env: indexEnv });
const tree = run("git", ["write-tree"], { env: indexEnv }).trim();
const remote = run("git", [...gitAuth, "ls-remote", "origin", `refs/heads/${branch}`]).trim();
const parent = remote.split(/\s/)[0];
if (parent) run("git", [...gitAuth, "fetch", "origin", branch]);
const commit = run("git", ["commit-tree", tree, ...(parent ? ["-p", parent] : []), "-m", `deploy: agency v${version} from ${sourceCommit.slice(0, 7)}`]).trim();
run("git", [...gitAuth, "push", "origin", `${commit}:refs/heads/${branch}`], { stdio: "inherit" });
const settings = resolve(".git/agency-pages-settings.json");
writeFileSync(settings, JSON.stringify({ build_type: "legacy", source: { branch, path: "/" } }));
run("gh", ["api", "--method", "PUT", `repos/${repository}/pages`, "--input", settings], { stdio: "ignore" });
console.log(`Export published to ${branch}. GitHub Pages is processing the deployment: ${origin}`);
console.log("Check completion with: gh run list --limit 3");
