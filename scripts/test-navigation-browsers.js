#!/usr/bin/env node

// Cross-browser navigation testing script
// Runs tests across Chrome, Safari, and other browsers to validate navigation transitions

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const BROWSERS = [
  { name: 'chromium', project: 'Desktop Chrome' },
  { name: 'webkit', project: 'Desktop Safari' },
  { name: 'firefox', project: 'Desktop Firefox' },
];

const MOBILE_BROWSERS = [
  { name: 'Mobile Chrome', project: 'Mobile Chrome' },
  { name: 'Mobile Safari', project: 'Mobile Safari' },
];

class NavigationTestRunner {
  constructor() {
    this.results = {
      timestamp: new Date().toISOString(),
      browsers: {},
      summary: {
        totalTests: 0,
        passedTests: 0,
        failedTests: 0,
      },
    };
  }

  async runTests() {
    console.log('🚀 Starting cross-browser navigation tests...\n');

    // Run desktop tests
    for (const browser of BROWSERS) {
      await this.runBrowserTests(browser);
    }

    // Run mobile tests
    for (const browser of MOBILE_BROWSERS) {
      await this.runBrowserTests(browser, true);
    }

    this.generateReport();
  }

  async runBrowserTests(browser, isMobile = false) {
    console.log(`\n📱 Testing ${browser.name}${isMobile ? ' (Mobile)' : ''}...`);

    const command = 'npx';
    const args = [
      'playwright',
      'test',
      'tests/navigation-transitions.spec.ts',
      '--project',
      browser.project || browser.name,
      '--reporter=json',
    ];

    if (isMobile) {
      args.push('--grep', 'mobile');
    }

    try {
      const result = await this.runCommand(command, args);
      this.processTestResults(browser.name, result, isMobile);
    } catch (error) {
      console.error(`❌ Tests failed for ${browser.name}:`, error.message);
      this.results.browsers[browser.name] = {
        status: 'failed',
        error: error.message,
        isMobile,
      };
    }
  }

  runCommand(command, args) {
    return new Promise((resolve, reject) => {
      const process = spawn(command, args, { stdio: 'pipe' });
      let stdout = '';
      let stderr = '';

      process.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      process.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      process.on('close', (code) => {
        if (code === 0) {
          resolve({ stdout, stderr });
        } else {
          reject(new Error(`Command failed with code ${code}: ${stderr}`));
        }
      });
    });
  }

  processTestResults(browserName, result, isMobile) {
    try {
      // Parse Playwright JSON output
      const testResults = JSON.parse(result.stdout);

      const browserResult = {
        status: 'completed',
        isMobile,
        tests: testResults.tests || [],
        stats: testResults.stats || {},
        duration: testResults.duration || 0,
      };

      this.results.browsers[browserName] = browserResult;

      const passed = browserResult.stats.passed || 0;
      const failed = browserResult.stats.failed || 0;
      const total = passed + failed;

      this.results.summary.totalTests += total;
      this.results.summary.passedTests += passed;
      this.results.summary.failedTests += failed;

      console.log(`✅ ${browserName}: ${passed}/${total} tests passed`);

      if (failed > 0) {
        console.log(`⚠️  ${failed} tests failed in ${browserName}`);
      }
    } catch (error) {
      console.error(`❌ Failed to parse test results for ${browserName}:`, error.message);
      this.results.browsers[browserName] = {
        status: 'parse_error',
        error: error.message,
        isMobile,
      };
    }
  }

  generateReport() {
    console.log('\n📊 Generating test report...');

    const reportPath = path.join(__dirname, '..', 'test-results', 'navigation-browser-report.json');
    const reportDir = path.dirname(reportPath);

    // Ensure report directory exists
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    // Write detailed JSON report
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));

    // Generate summary
    this.printSummary();

    console.log(`\n📄 Detailed report saved to: ${reportPath}`);
  }

  printSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('📈 CROSS-BROWSER NAVIGATION TEST SUMMARY');
    console.log('='.repeat(60));

    console.log(`\n🔢 Overall Stats:`);
    console.log(`   Total Tests: ${this.results.summary.totalTests}`);
    console.log(`   Passed: ${this.results.summary.passedTests}`);
    console.log(`   Failed: ${this.results.summary.failedTests}`);
    console.log(`   Success Rate: ${this.calculateSuccessRate()}%`);

    console.log(`\n🌐 Browser Results:`);
    Object.entries(this.results.browsers).forEach(([browser, result]) => {
      const status = this.getBrowserStatus(result);
      const mobile = result.isMobile ? ' (Mobile)' : '';
      console.log(`   ${browser}${mobile}: ${status}`);

      if (result.stats) {
        const passed = result.stats.passed || 0;
        const failed = result.stats.failed || 0;
        const total = passed + failed;
        if (total > 0) {
          console.log(`     → ${passed}/${total} tests passed (${Math.round((passed / total) * 100)}%)`);
        }
      }
    });

    // Performance insights
    this.printPerformanceInsights();

    console.log('\n' + '='.repeat(60));
  }

  printPerformanceInsights() {
    console.log(`\n⚡ Performance Insights:`);

    const safariResults = Object.entries(this.results.browsers)
      .filter(([name]) => name.toLowerCase().includes('safari'));

    const chromeResults = Object.entries(this.results.browsers)
      .filter(([name]) => name.toLowerCase().includes('chrome'));

    if (safariResults.length > 0 && chromeResults.length > 0) {
      console.log(`   • Safari fallback transitions: ${safariResults.length > 0 ? 'Tested' : 'Not tested'}`);
      console.log(`   • Chrome view transitions: ${chromeResults.length > 0 ? 'Tested' : 'Not tested'}`);
      console.log(`   • Cross-browser consistency: ${this.checkConsistency() ? 'Good' : 'Needs improvement'}`);
    }

    console.log(`   • Mobile compatibility: ${this.checkMobileCompatibility() ? 'Good' : 'Needs improvement'}`);
  }

  calculateSuccessRate() {
    const { totalTests, passedTests } = this.results.summary;
    if (totalTests === 0) return 0;
    return Math.round((passedTests / totalTests) * 100);
  }

  getBrowserStatus(result) {
    switch (result.status) {
      case 'completed':
        const passed = result.stats?.passed || 0;
        const failed = result.stats?.failed || 0;
        return failed === 0 ? '✅ All tests passed' : `⚠️  ${failed} test(s) failed`;
      case 'failed':
        return '❌ Test execution failed';
      case 'parse_error':
        return '❌ Failed to parse results';
      default:
        return '❓ Unknown status';
    }
  }

  checkConsistency() {
    const browsers = Object.values(this.results.browsers);
    const successRates = browsers
      .filter(b => b.stats && b.status === 'completed')
      .map(b => {
        const passed = b.stats.passed || 0;
        const total = (b.stats.passed || 0) + (b.stats.failed || 0);
        return total > 0 ? passed / total : 0;
      });

    if (successRates.length < 2) return true;

    const avg = successRates.reduce((sum, rate) => sum + rate, 0) / successRates.length;
    const variance = successRates.reduce((sum, rate) => sum + Math.pow(rate - avg, 2), 0) / successRates.length;

    // Consider consistent if variance is low (< 0.1)
    return variance < 0.1;
  }

  checkMobileCompatibility() {
    const mobileResults = Object.values(this.results.browsers)
      .filter(b => b.isMobile && b.status === 'completed');

    return mobileResults.length > 0 && mobileResults.every(b => {
      const passed = b.stats?.passed || 0;
      const failed = b.stats?.failed || 0;
      const total = passed + failed;
      return total === 0 || (passed / total) >= 0.8; // 80% success rate
    });
  }
}

// Run tests if called directly
if (require.main === module) {
  const runner = new NavigationTestRunner();
  runner.runTests().catch(error => {
    console.error('❌ Test runner failed:', error);
    process.exit(1);
  });
}

module.exports = NavigationTestRunner;