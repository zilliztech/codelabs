import github from '../../assets/images/footer/github.svg';
import slack from '../../assets/images/footer/slack.svg';
import twitter from '../../assets/images/footer/twitter.svg';
import youtube from '../../assets/images/footer/youtube.svg';

export const LINK_JSON = [
  {
    title: 'resources',
    children: [
      { name: 'Docs', trans: false, to: 'https://milvus.io/docs' },
      {
        name: 'Blog',
        trans: false,
        to: 'https://milvus.io/blog',
      },
      { name: 'Learn', trans: false, to: 'https://zilliz.com/learn' },
    ],
  },
  {
    title: 'tutorials',
    children: [
      { name: 'bootcamp', trans: true, to: 'https://milvus.io/bootcamp' },
      { name: 'demo', trans: true, to: 'https://milvus.io/milvus-demos' },
      {
        name: 'video',
        trans: true,
        to: 'https://www.youtube.com/c/MilvusVectorDatabase',
      },
    ],
  },
  {
    title: 'tools',
    children: [
      { name: 'Attu', trans: false, to: 'https://github.com/zilliztech/attu' },
      {
        name: 'Milvus_CLI',
        trans: false,
        to: 'https://github.com/zilliztech/milvus_cli',
      },
      { name: 'Sizing Tool', trans: false, to: 'https://milvus.io/tools/sizing' },
    ],
  },
  {
    title: 'community',
    children: [
      { name: 'Get involved', trans: true, to: 'https://milvus.io/community' },
      { name: 'Slack', trans: false, to: 'https://slack.milvus.io' },
      {
        name: 'Github',
        trans: false,
        to: 'https://github.com/milvus-io/milvus',
      },
      { name: 'forum', trans: true, to: 'https://discuss.milvus.io/' },
    ],
  },
];

export const SOCIAL_JSON = [
  {
    icon: github,
    link: 'https://github.com/milvus-io/milvus',
    alt: "GitHub"
  },
  {
    icon: slack,
    link: 'https://slack.milvus.io/',
    alt: "Slack"
  },
  {
    icon: twitter,
    link: 'https://twitter.com/milvusio',
    alt: "Twitter"
  },
  {
    icon: youtube,
    link: 'https://www.youtube.com/channel/UCMCo_F7pKjMHBlfyxwOPw-g',
    alt: 'YouTube'
  },
];
