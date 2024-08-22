import type { PageContent, PageDefinition } from '@src/config-schema'

export const id = 'privacy-and-security'

const content: PageContent[] = [
  {
    kind: 'custom-component',
    name: 'PrivacyCard',
  },
  {
    kind: 'card',
    header: {
      title: 'Firefox Privacy Protection',
      description:
        'Firefox is designed to protect your privacy. Learn more about the features that help keep your personal information safe.',
    },
    content: [
      {
        kind: 'box-group',
        config: [
          {
            groupKind: 'item',
            kind: 'settings-box',
            content: [
              {
                kind: 'branch',
                pref: 'browser.contentblocking.category',
                conditions: [
                  {
                    match: 'standard',
                    content: [
                      {
                        kind: 'text',
                        heading: 'Standard (Default)',
                        description:
                          "Blocks known trackers and cookies, helping protect your privacy without affecting most websites' functionality.",
                      },
                    ],
                  },
                  {
                    match: 'strict',
                    content: [
                      {
                        kind: 'text',
                        heading: 'Increased Protection',
                        description:
                          'Uses advanced techniques to block more trackers and cookies, offering stronger privacy protection. However, it may cause some websites to not function properly.',
                      },
                    ],
                  },
                  {
                    match: 'custom',
                    content: [
                      {
                        kind: 'text',
                        heading: 'Custom',
                        description:
                          'Choose which trackers and cookies to block.',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            groupKind: 'item',
            kind: 'subpage-button',
            pageId: 'privacy-and-security-advanced',
            props: {
              label: 'Advanced settings',
            },
          },
        ],
      },
    ],
  },
  {
    kind: 'card',
    content: [
      {
        kind: 'fieldset',
        props: {
          title: 'Optional protections',
          content: [
            {
              kind: 'toggleable',
              pref: 'privacy.globalprivacycontrol.enabled',
              props: {
                label: 'Auto-dismiss cookie banners where possible',
              },
            },
            {
              kind: 'toggleable',
              pref: 'privacy.donottrackheader.enabled',
              props: {
                label: 'Send websites a “Do Not Track” request',
              },
            },
          ],
        },
      },
    ],
  },
  {
    kind: 'card',
    header: {
      title: 'DNS over HTTPS',
      description:
        'Do not let your internet provider monitor and control the websites you visit. Enable DNS over HTTPS to encrypt your DNS requests.',
      learnMore: '#',
    },
    content: [
      {
        kind: 'box-group',
        config: [
          {
            groupKind: 'item',
            kind: 'settings-box',
            content: [
              {
                kind: 'branch',
                pref: 'network.trr.mode',
                conditions: [
                  {
                    match: 0,
                    content: [
                      {
                        kind: 'text',
                        heading: 'Default Protection',
                        description:
                          'Firefox decides when to use secure DNS to protect your privacy.',
                      },
                    ],
                  },
                  {
                    match: 2,
                    content: [
                      {
                        kind: 'text',
                        heading: 'Increased Protection',
                        description:
                          'You control when to use secure DNS and choose your provider.',
                      },
                    ],
                  },
                  {
                    match: 3,
                    content: [
                      {
                        kind: 'text',
                        heading: 'Max Protection',
                        description:
                          "Firefox will always use secure DNS. You'll see a security risk warning before we use your system DNS.",
                      },
                    ],
                  },
                  {
                    match: 5,
                    content: [
                      {
                        kind: 'text',
                        heading: 'Off',
                        description: 'Use your default DNS resolver',
                      },
                    ],
                  },
                ],
              },
            ],
          },
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
  title: 'Privacy & Security',
  icon: 'lock-16',
  content,
}
