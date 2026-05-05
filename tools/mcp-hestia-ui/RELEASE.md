# Release Guide

This guide provides step-by-step instructions for releasing a new version of the Hestia UI MCP Server to npm.

## Pre-Release Checklist

- [ ] Update `version` in `package.json`
- [ ] Update `src/index.ts` version number (HestiaUIServer constructor)
- [ ] Update `CHANGELOG.md` with new version and changes
- [ ] Run tests: `node test-scan.mjs`
- [ ] Build project: `pnpm run build`
- [ ] Code review completed
- [ ] All tests pass
- [ ] Branch is up to date with main
- [ ] No uncommitted changes

## Release Steps

### 1. Prepare the Release

```bash
# Ensure you're on the main branch
git checkout main
git pull origin main

# Verify working directory is clean
git status
```

### 2. Update Version

Choose version number following [Semantic Versioning](https://semver.org/):
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes

Update in three places:

**package.json:**
```json
{
  "version": "0.1.0"
}
```

**src/index.ts:**
```typescript
this.server = new Server({
  name: "hestia-ui",
  version: "0.1.0",  // Update this line
});
```

**CHANGELOG.md:**
```markdown
## [0.1.0] - 2024-01-XX

### Added
- Initial public release
...
```

### 3. Build and Test

```bash
# Build the project
pnpm run build

# Verify no build errors
echo "Build successful"

# Test component scanning
node test-scan.mjs

# Ensure output shows components discovered
```

### 4. Commit Changes

```bash
# Stage all changes
git add .

# Create conventional commit
git commit -m "chore(release): v0.1.0"
```

### 5. Create Git Tag

```bash
# Create annotated tag (recommended)
git tag -a v0.1.0 -m "Release version 0.1.0"

# Verify tag was created
git tag -l -n1 v0.1.0
```

### 6. Push to Repository

```bash
# Push changes to main branch
git push origin main

# Push tags to repository
git push origin v0.1.0
```

### 7. Publish to npm

#### First Time Setup (Package Owner Only)

```bash
# Login to npm
npm login

# Verify credentials
npm whoami
```

#### Publish Command

```bash
# For scoped package (@hestiatechnology/mcp-hestia-ui)
# Ensure package.json has "publishConfig" if needed

# Publish to npm
npm publish

# Tag with version (optional, for npm search)
npm publish --tag latest
```

#### Verify Publication

```bash
# Check npm registry
npm view @hestiatechnology/mcp-hestia-ui

# Install from npm to verify
npm install @hestiatechnology/mcp-hestia-ui@latest
```

### 8. Create GitHub Release

```bash
# Create release via GitHub CLI
gh release create v0.1.0 --title "v0.1.0" --notes "See CHANGELOG.md"

# Or create manually through GitHub web interface:
# 1. Go to Releases page
# 2. Click "Draft a new release"
# 3. Select tag: v0.1.0
# 4. Title: v0.1.0
# 5. Copy from CHANGELOG.md
# 6. Publish release
```

## Post-Release

### Announcements

1. Update project documentation
2. Post to relevant channels (Discord, Twitter, etc.)
3. Notify package users if breaking changes

### Monitoring

- Monitor GitHub issues for bug reports
- Check npm download stats
- Respond to user feedback

## Rollback Procedure

If critical issues are discovered:

1. **Unpublish from npm:**
   ```bash
   npm unpublish @hestiatechnology/mcp-hestia-ui@0.1.0
   ```

2. **Delete Git tag:**
   ```bash
   git tag -d v0.1.0
   git push origin --delete v0.1.0
   ```

3. **Delete GitHub Release:**
   - Go to GitHub Releases page
   - Click the release
   - Click "Delete"

4. **Fix the issue** and repeat release steps

## Version Numbering Examples

### Patch Release (Bug Fix)
```
0.1.0 → 0.1.1
```
When: Small bug fixes, documentation updates
```bash
"version": "0.1.1"
```

### Minor Release (New Feature)
```
0.1.1 → 0.2.0
```
When: New tools, new features, enhancements (backward compatible)
```bash
"version": "0.2.0"
```

### Major Release (Breaking Change)
```
0.2.0 → 1.0.0
```
When: API changes, removed features, significant refactoring
```bash
"version": "1.0.0"
```

## Common Issues & Solutions

### Issue: "npm publish" fails with permission error

**Solution:**
```bash
# Verify you're authenticated
npm whoami

# If not authenticated, login
npm login

# If still failing, check npm configuration
npm config list
```

### Issue: Version already exists

**Solution:**
```bash
# Use a different version number
# Check published versions
npm view @hestiatechnology/mcp-hestia-ui versions

# Pick a higher version
```

### Issue: pnpm vs npm conflicts

**Solution:**
```bash
# Always use npm for publishing
npm publish

# Use pnpm for development
pnpm install
pnpm run build
```

## Package Maintenance

### Regular Updates

Add this to CI/CD pipeline:

```bash
# Check for outdated dependencies
npm outdated

# Update dependencies
npm update
```

### Deprecation

To deprecate a version:

```bash
npm deprecate @hestiatechnology/mcp-hestia-ui@0.1.0 "Use version 1.0.0 instead"
```

## Security

### Signing Releases

For additional security, sign tags:

```bash
git tag -s -a v0.1.0 -m "Release version 0.1.0"
```

### 2FA for Publishing

Enable 2FA on npm for additional security:
- Go to npmjs.com account settings
- Enable 2FA for publication
- Use auth token in CI/CD

## Support

- [npm Documentation](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/)
- [Git Tagging Guide](https://git-scm.com/book/en/v2/Git-Basics-Tagging)
- [GitHub Releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases)

## License

See [LICENSE](./LICENSE)
