# Dependabot Auto-Merge Setup

This repository is now configured with Dependabot auto-merge for dependency updates.

## 🔧 What's Configured

### 1. Dependabot Configuration (`.github/dependabot.yml`)
- Monitors 10 different npm project directories
- Checks for updates weekly
- Creates up to 5 PRs per directory

### 2. CI Workflow (`.github/workflows/node.yml`)
- Runs on all pull requests
- Tests with Node.js versions 18 and 20
- Installs dependencies for each project directory
- **Required for auto-merge to work** (provides the passing checks)

### 3. Auto-Merge Workflow (`.github/workflows/dependabot-automerge.yml`)
- Automatically enables auto-merge for Dependabot PRs
- **Only auto-merges:**
  - ✅ Patch updates (e.g., `1.0.0` → `1.0.1`)
  - ✅ Minor updates (e.g., `1.0.0` → `1.1.0`)
- **Does NOT auto-merge:**
  - ❌ Major updates (e.g., `1.0.0` → `2.0.0`)

## 🚀 How It Works

1. **Dependabot creates a PR** for a dependency update
2. **CI workflow runs** - installs dependencies to verify the update works
3. **Auto-merge workflow activates** (if it's a patch/minor update)
4. **Auto-merge is enabled** on the PR
5. **PR merges automatically** once CI passes

## 🛡️ Safety Features

- Major version updates require manual review
- CI must pass before any merge happens
- Squash merge keeps git history clean
- Works only for PRs created by `dependabot[bot]`

## 📋 What Gets Auto-Merged

Safe updates for dependencies like:
- `mongoose 7.6.0` → `7.6.3` ✅
- `qs 6.11.0` → `6.11.2` ✅
- `body-parser 1.20.1` → `1.20.3` ✅
- `vite 5.0.0` → `5.0.4` ✅

## ⚠️ What Requires Manual Review

- Major version updates (breaking changes)
- Failed CI checks
- Any PR requiring configuration changes

## 🔑 Repository Settings Required

To enable auto-merge, ensure these settings are enabled in GitHub:

1. Go to **Settings** → **General** → **Pull Requests**
2. ✅ Enable **"Allow auto-merge"**
3. ✅ Enable **"Require status checks to pass before merging"** (optional but recommended)

## 🎯 Current Status

- **30 open Dependabot PRs** waiting to be reviewed
- Auto-merge will activate for future PRs automatically
- Existing PRs may need manual merge or can be closed/reopened to trigger the workflow

## 📝 Notes for Learning Repositories

Since this is a learning/tutorial repository:
- Auto-merge is conservative (patch/minor only)
- Major updates that might break examples require manual review
- Each project directory is isolated - updates won't affect other projects
- No tests are run (only dependency installation) since most projects don't have test suites

## 🛠️ Customization

To modify auto-merge behavior, edit `.github/workflows/dependabot-automerge.yml`:

```yaml
# To allow major updates (NOT recommended for production):
if: |
  steps.metadata.outputs.update-type == 'version-update:semver-patch' ||
  steps.metadata.outputs.update-type == 'version-update:semver-minor' ||
  steps.metadata.outputs.update-type == 'version-update:semver-major'
```

## 📚 More Information

- [Dependabot Documentation](https://docs.github.com/en/code-security/dependabot)
- [GitHub Actions Auto-merge](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/automatically-merging-a-pull-request)
