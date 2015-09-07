'use strict';

/**
 * This array generates the top navigation
 */

exports = module.exports = [
  { id: 'index', label: 'Home', href: '/' },
  // { id: 'community', label: 'Community', href: '/community.html' },
  { id: 'docs', label: 'Docs', href: '/docs.html' },
  { id: 'github', label: 'Github', items: [
    { label: 'Apex Core', href: 'https://github.com/apache/incubator-apex-core' },
    { label: 'Apex Malhar', href: 'https://github.com/apache/incubator-apex-malhar' }
  ] },
  { id: 'apache', label: 'Apache', items: [
    { label: 'Status Page', href: 'http://incubator.apache.org/projects/apex.html' },
    { label: 'Apache Foundation', href: 'http://www.apache.org/foundation/how-it-works.html' },
    { label: 'Apache License', href: 'http://www.apache.org/licenses/' },
    { label: 'Sponsorship', href: 'http://www.apache.org/foundation/sponsorship.html' },
    { label: 'Thanks', href: 'http://www.apache.org/foundation/thanks.html' }
  ]}
];