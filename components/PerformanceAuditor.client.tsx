// Performance audit initialization client component
// Auto-loads performance monitoring for real Safari testing

'use client';

import { useEffect } from 'react';

export default function PerformanceAuditor() {
  useEffect(() => {
    // Check URL parameters for automated measurement
    const urlParams = new URLSearchParams(window.location.search);
    const shouldMeasure = urlParams.get('measure') === '1';
    const shouldScroll = urlParams.get('scroll') === '1';

    // Only run in development or when explicitly enabled
    const shouldRunAudit =
      process.env.NODE_ENV === 'development' ||
      typeof window !== 'undefined' && (
        window.location.search.includes('audit=true') ||
        shouldMeasure
      );

    if (!shouldRunAudit) return;

    // Dynamic import to avoid SSR issues
    import('@/lib/utils/performanceAudit').then(({ initializePerformanceAudit, runAutomatedAudit }) => {
      // Initialize the auditor
      const auditor = initializePerformanceAudit();

      // Check if we should auto-run the audit
      if (shouldMeasure && shouldScroll) {
        console.log('🤖 AUTO-STARTING Performance Audit (measure=1&scroll=1 detected)');
        console.log('📊 Automated sequence will begin...');

        // Run automated audit after a brief delay to ensure app is fully loaded
        setTimeout(() => {
          runAutomatedAudit().then((results) => {
            console.log('🎉 AUTOMATED AUDIT COMPLETE!');
            console.log('📋 Copy these results for analysis:');
            console.log('='.repeat(60));
            console.log(JSON.stringify(results, null, 2));
            console.log('='.repeat(60));

            // Also make results easily accessible
            (window as any).auditResults = results;
            console.log('💾 Results saved to window.auditResults');
          }).catch((error) => {
            console.error('❌ Automated audit failed:', error);
          });
        }, 500); // Brief delay to ensure everything is loaded
      } else {
        console.log('🔍 Performance Auditor loaded!');
        console.log('📋 Available commands:');
        console.log('- window.PerformanceAudit.initialize() - Initialize manual audit');
        console.log('- window.PerformanceAudit.runAutomated() - Run full automated sequence');
        console.log('- window.performanceAuditResults - View last audit results');
        console.log('');
        console.log('🤖 For automated audit, visit:');
        console.log('   ' + window.location.origin + window.location.pathname + '?measure=1&scroll=1');
        console.log('');
        console.log('📊 Manual sequence:');
        console.log('   window.PerformanceAudit.runAutomated()');
      }
    });
  }, []);

  return null; // This component doesn't render anything
}