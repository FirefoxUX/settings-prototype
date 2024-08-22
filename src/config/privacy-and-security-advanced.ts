import type { PageContent, PageDefinition } from '@src/config-schema'

export const id = 'privacy-and-security-advanced'

const content: PageContent[] = [
  {
    kind: 'card',
    header: {
      title: 'Tracking protection',
    },
    content: [
      {
        kind: 'box-group',
        config: [
          {
            groupKind: 'radio-group',
            pref: 'browser.contentblocking.category',
            items: [
              {
                value: 'standard',
                label: 'Standard (Default)',
                description:
                  "Blocks known trackers and cookies, helping protect your privacy without affecting most websites' functionality.",
              },
              {
                value: 'strict',
                label: 'Strict',
                description:
                  'Uses advanced techniques to block more trackers and cookies, offering stronger privacy protection. However, it may cause some websites to not function properly.',
              },
              {
                value: 'custom',
                label: 'Custom',
                description: 'Choose which trackers and cookies to block.',
                subpage: {
                  pageId: 'accessibility',
                  subpageLabel: 'Customize',
                  disabled: {
                    pref: 'browser.contentblocking.category',
                    invert: true,
                    matchValue: 'custom',
                  },
                },
              },
            ],
          },
        ],
      },
      {
        kind: 'box-group',
        config: [
          {
            groupKind: 'item',
            kind: 'subpage-button',
            pageId: 'accessibility',
            props: {
              label: 'Website exceptions',
            },
          },
        ],
      },
    ],
  },
  {
    kind: 'card',
    header: {
      title: 'HTTPS-Only Mode',
      description: 'This is a good explanation for what any of this means!',
      learnMore: '#',
    },
    content: [
      {
        kind: 'radio-group',
        pref: 'dom.security.https_only_mode',
        items: [
          {
            value: 0,
            label: 'Only use HTTPS in all windows',
          },
          {
            value: 0,
            label: 'Only use HTTPS in private windows',
          },
          {
            value: 0,
            label: 'Try HTTPS first, but allow connections that are not secure',
          },
        ],
      },
      {
        kind: 'box-group',
        config: [
          {
            groupKind: 'item',
            kind: 'subpage-button',
            pageId: 'accessibility',
            props: {
              label: 'Website exceptions',
            },
          },
        ],
      },
    ],
  },
  {
    kind: 'card',
    header: {
      title: 'Certificates',
      description: 'This is a good explanation for what any of this means!',
      learnMore: '#',
    },
    content: [
      {
        kind: 'box-group',
        config: [
          {
            groupKind: 'item',
            kind: 'subpage-button',
            pageId: 'accessibility',
            props: {
              label: 'Advanced settings',
            },
          },
        ],
      },
    ],
  },
]

export const pageDefinition: PageDefinition = {
  title: 'Advanced settings',
  content,
}
