#!/usr/bin/env node

/**
 * Naming Conventions Audit Script
 *
 * This script checks TypeScript files for naming convention compliance.
 * Run with: npm run audit:naming
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

class NamingAuditor {
  constructor() {
    this.issues = [];
    this.filesChecked = 0;
    this.score = 0;
    this.maxScore = 0;
  }

  log(message, color = colors.reset) {
    console.log(`${color}${message}${colors.reset}`);
  }

  addIssue(file, line, severity, message) {
    this.issues.push({ file, line, severity, message });
  }

  // Check if identifier follows camelCase
  isCamelCase(str) {
    return /^[a-z][a-zA-Z0-9]*$/.test(str);
  }

  // Check if identifier follows PascalCase
  isPascalCase(str) {
    return /^[A-Z][a-zA-Z0-9]*$/.test(str);
  }

  // Check if identifier follows UPPER_SNAKE_CASE
  isUpperSnakeCase(str) {
    return /^[A-Z][A-Z0-9_]*$/.test(str);
  }

  // Check if identifier follows snake_case
  isSnakeCase(str) {
    return /^[a-z][a-z0-9_]*$/.test(str);
  }

  // Check if identifier follows kebab-case
  isKebabCase(str) {
    return /^[a-z][a-z0-9-]*$/.test(str);
  }

  auditFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const relativePath = path.relative(process.cwd(), filePath);

    this.filesChecked++;
    let fileScore = 0;
    let fileMaxScore = 0;

    lines.forEach((line, index) => {
      const lineNum = index + 1;

      // Check for snake_case variables (not in interfaces or for external APIs)
      const varMatch = line.match(/(?:const|let|var)\s+([a-z_][a-z0-9_]*)\s*[=:]/);
      if (varMatch && !line.includes('interface') && !line.includes('export interface')) {
        const varName = varMatch[1];
        fileMaxScore++;
        if (this.isSnakeCase(varName) && varName.includes('_')) {
          this.addIssue(relativePath, lineNum, 'warning',
            `Variable '${varName}' uses snake_case, should use camelCase`);
        } else if (this.isCamelCase(varName) || this.isPascalCase(varName)) {
          fileScore++;
        }
      }

      // Check for constants (should be UPPER_SNAKE_CASE)
      const constMatch = line.match(/(?:const|static readonly)\s+([A-Z][A-Z0-9_]*)\s*[=:]/);
      if (constMatch) {
        const constName = constMatch[1];
        fileMaxScore++;
        if (this.isUpperSnakeCase(constName)) {
          fileScore++;
        } else {
          this.addIssue(relativePath, lineNum, 'warning',
            `Constant '${constName}' should use UPPER_SNAKE_CASE`);
        }
      }

      // Check for class names (should be PascalCase)
      const classMatch = line.match(/(?:class|interface)\s+([A-Za-z][A-Za-z0-9]*)/);
      if (classMatch) {
        const className = classMatch[1];
        fileMaxScore++;
        if (this.isPascalCase(className)) {
          fileScore++;
        } else {
          this.addIssue(relativePath, lineNum, 'error',
            `Class/Interface '${className}' should use PascalCase`);
        }
      }

      // Check for private methods with underscore prefix
      const privateMethodMatch = line.match(/(?:private|protected)\s+(_[a-zA-Z][a-zA-Z0-9]*)\s*\(/);
      if (privateMethodMatch) {
        const methodName = privateMethodMatch[1];
        fileMaxScore++;
        this.addIssue(relativePath, lineNum, 'info',
          `Private method '${methodName}' has underscore prefix (not recommended in TypeScript)`);
      }

      // Check for method names (should be camelCase)
      const methodMatch = line.match(/(?:private|public|protected)?\s*([a-z][a-zA-Z0-9]*)\s*\([^)]*\)\s*[:{]/);
      if (methodMatch && !line.includes('function ')) {
        const methodName = methodMatch[1];
        fileMaxScore++;
        if (this.isCamelCase(methodName)) {
          fileScore++;
        } else if (!['constructor', 'render', 'updated', 'firstUpdated', 'connectedCallback', 'disconnectedCallback'].includes(methodName)) {
          this.addIssue(relativePath, lineNum, 'warning',
            `Method '${methodName}' should use camelCase`);
        }
      }

      // Check for CSS class selectors (should be kebab-case)
      const cssMatch = line.match(/querySelector\(['"]\.([\w-]+)['"]\)/);
      if (cssMatch) {
        const className = cssMatch[1];
        fileMaxScore++;
        if (this.isKebabCase(className)) {
          fileScore++;
        } else {
          this.addIssue(relativePath, lineNum, 'warning',
            `CSS class '${className}' should use kebab-case`);
        }
      }
    });

    this.score += fileScore;
    this.maxScore += fileMaxScore;

    return { fileScore, fileMaxScore };
  }

  auditDirectory(dirPath, extensions = ['.ts', '.tsx']) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      // Skip node_modules, dist, coverage, etc.
      if (entry.isDirectory() && !['node_modules', 'dist', 'coverage', '.git', 'build'].includes(entry.name)) {
        this.auditDirectory(fullPath, extensions);
      } else if (entry.isFile() && extensions.some(ext => entry.name.endsWith(ext))) {
        try {
          this.auditFile(fullPath);
        } catch (error) {
          this.log(`Error auditing ${fullPath}: ${error.message}`, colors.red);
        }
      }
    }
  }

  printReport() {
    this.log('\n' + '='.repeat(80), colors.cyan);
    this.log('NAMING CONVENTIONS AUDIT REPORT', colors.bold + colors.cyan);
    this.log('='.repeat(80), colors.cyan);

    this.log(`\nFiles checked: ${this.filesChecked}`, colors.cyan);

    if (this.issues.length === 0) {
      this.log('\n✅ No naming convention issues found!', colors.green + colors.bold);
      this.log('Score: 100/100', colors.green);
    } else {
      const errors = this.issues.filter(i => i.severity === 'error');
      const warnings = this.issues.filter(i => i.severity === 'warning');
      const info = this.issues.filter(i => i.severity === 'info');

      if (errors.length > 0) {
        this.log(`\n❌ Errors (${errors.length}):`, colors.red + colors.bold);
        errors.forEach(issue => {
          this.log(`  ${issue.file}:${issue.line} - ${issue.message}`, colors.red);
        });
      }

      if (warnings.length > 0) {
        this.log(`\n⚠️  Warnings (${warnings.length}):`, colors.yellow + colors.bold);
        warnings.forEach(issue => {
          this.log(`  ${issue.file}:${issue.line} - ${issue.message}`, colors.yellow);
        });
      }

      if (info.length > 0) {
        this.log(`\nℹ️  Info (${info.length}):`, colors.cyan);
        info.forEach(issue => {
          this.log(`  ${issue.file}:${issue.line} - ${issue.message}`, colors.cyan);
        });
      }

      const percentage = this.maxScore > 0 ? Math.round((this.score / this.maxScore) * 100) : 100;
      const scoreColor = percentage >= 90 ? colors.green : percentage >= 70 ? colors.yellow : colors.red;
      this.log(`\nScore: ${percentage}/100`, scoreColor + colors.bold);

      // Return exit code based on errors
      this.log('\n' + '='.repeat(80), colors.cyan);
      this.log('For detailed naming conventions, see NAMING_CONVENTIONS.md', colors.cyan);
      this.log('='.repeat(80) + '\n', colors.cyan);

      return errors.length > 0 ? 1 : 0;
    }

    this.log('\n' + '='.repeat(80), colors.cyan);
    this.log('For detailed naming conventions, see NAMING_CONVENTIONS.md', colors.cyan);
    this.log('='.repeat(80) + '\n', colors.cyan);

    return 0;
  }
}

// Main execution
const auditor = new NamingAuditor();
const srcPath = path.join(process.cwd(), 'src');

if (!fs.existsSync(srcPath)) {
  console.error('Error: src directory not found');
  process.exit(1);
}

auditor.log('Starting naming conventions audit...', colors.cyan);
auditor.auditDirectory(srcPath);
const exitCode = auditor.printReport();

process.exit(exitCode);
