# Naming Conventions Audit Tool

This automated script checks your TypeScript code for naming convention compliance.

## Quick Start

Run the audit with:

```bash
npm run audit:naming
```

Or directly:

```bash
node scripts/naming-audit.js
```

## What It Checks

The audit script automatically checks for:

### ✅ Variables
- Should use `camelCase`
- Flags: `snake_case` variables (e.g., `my_variable`)

### ✅ Constants
- Should use `UPPER_SNAKE_CASE`
- Flags: constants not following this pattern

### ✅ Classes & Interfaces
- Should use `PascalCase`
- Flags: classes/interfaces with incorrect casing

### ✅ Methods
- Should use `camelCase`
- Flags: methods with underscore prefixes (e.g., `_myMethod`)
- Ignores framework lifecycle methods

### ✅ CSS Selectors
- Should use `kebab-case`
- Flags: selectors not following this pattern

## Output

The script produces a color-coded report:

- 🔴 **Errors**: Critical naming issues (e.g., class names not PascalCase)
- 🟡 **Warnings**: Style issues (e.g., snake_case variables)
- 🔵 **Info**: Suggestions (e.g., underscore prefix on private methods)

### Example Output

```
================================================================================
NAMING CONVENTIONS AUDIT REPORT
================================================================================

Files checked: 7

✅ No naming convention issues found!
Score: 100/100

================================================================================
For detailed naming conventions, see NAMING_CONVENTIONS.md
================================================================================
```

## Exit Codes

- `0`: No errors (warnings/info may exist)
- `1`: Errors found

This makes it perfect for CI/CD pipelines!

## Integration with CI/CD

Add to your GitHub Actions or other CI:

```yaml
- name: Audit naming conventions
  run: npm run audit:naming
```

## Exceptions

The audit script is aware of:

- **External API compatibility**: Interface properties matching Home Assistant format
- **Framework methods**: Lit lifecycle methods (e.g., `firstUpdated`, `connectedCallback`)
- **Test files**: Standard Jest naming patterns

## See Also

- [NAMING_CONVENTIONS.md](../NAMING_CONVENTIONS.md) - Detailed style guide
- [NAMING_AUDIT.md](../NAMING_AUDIT.md) - Manual audit report

