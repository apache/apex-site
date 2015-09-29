'use strict';

/**
 * This array generates the top navigation
 */

exports = module.exports = [
  { id: 'index', label: 'Home', href: '/' },
  { id: 'community', label: 'Community', href: '/community.html' },
  { id: 'docs', label: 'Docs', href: '/docs.html' },
  { id: 'source', label: 'Source', items: [
    { label: 'Apex Core (ASF)', href: 'https://git-wip-us.apache.org/repos/asf?p=incubator-apex-core.git' },
    { label: 'Apex Core (Github Mirror)', href: 'https://github.com/apache/incubator-apex-core' },
    { label: 'Apex Malhar (ASF)', href: 'https://git-wip-us.apache.org/repos/asf?p=incubator-apex-malhar.git' },
    { label: 'Apex Malhar (Github Mirror)', href: 'https://github.com/apache/incubator-apex-malhar' }
  ] },
  { id: 'apache', label: 'Apache', items: [
    { label: 'Status Page', href: 'http://incubator.apache.org/projects/apex.html' },
    { label: 'Apache Foundation', href: 'http://www.apache.org/foundation/how-it-works.html' },
    { label: 'Apache License', href: 'http://www.apache.org/licenses/' },
    { label: 'Sponsorship', href: 'http://www.apache.org/foundation/sponsorship.html' },
    { label: 'Thanks', href: 'http://www.apache.org/foundation/thanks.html' }
  ]}
];