// ─────────────────────────────────────────────────────────────────
// Shared project data — consumed by Work.jsx grid & ProjectTemplate.jsx
// ─────────────────────────────────────────────────────────────────
//
// Card-level fields (used on Work page grid):
//   id, slug, title, tags, desc, src, imgH, cardW, comingSoon, category
//
// Template-level fields (used on ProjectTemplate detail page):
//   heroImage, date, tagline, introText, clientLogo, skillset,
//   bannerImage, painPoints[], gallery{}, testimonial{}
// ─────────────────────────────────────────────────────────────────

export const PROJECTS = [
  {
    id: 'p-1',
    slug: 'locusverse',
    title: 'Locusverse',
    tags: ['Brand Identity', 'Strategy'],
    desc: 'Lorem ipsum dolor sit amet consectetur. Mollis metus eget quam hendrerit. Nec malesuada massa in porta proin quisque facilisi. Risus morbi dolor libero velit scelerisque enim.',
    src: '/src/assets/project-1.png',
    imgH: 463,
    cardW: 623,
    comingSoon: true,
    category: 'Brand Identity',

    // ── Template fields ──
    heroImage: null,
    date: 'Jun 2024',
    tagline: 'An Immersive Digital Platform Aimed At Boosting Community Engagement For Music Entrepreneurs Through Play.',
    introText:
      'Lorem ipsum dolor sit amet consectetur. Mollis metus eget quam hendrerit. Nec malesuada massa in porta proin quisque facilisi. Risus morbi dolor libero velit scelerisque enim.\n\nEn masse consectetur morbi blandit facilisi tincidunt amet pellentesque. Ipsum nisl sed fermentum cursus. Sit purus sagittis feugiat vel nunc sit viverra. Egestas dui feugiat in arcu pellentesque blandit.\n\nQuis vitae lobortis amet. Nulla egestas consequat. Morbi vel malesuada fames ac turpis egestas. Integer tristique vel magna amet porta.',
    clientLogo: 'Locusverse',
    skillset: 'Brand Identity, Ui/Ux Design, Social media template, Product design, and Illustration',
    bannerImage: null,
    painPoints: [
      {
        title: 'User Pain Point',
        text: 'Lorem ipsum dolor sit amet consectetur. Mollis metus eget quam hendrerit. Nec malesuada massa in porta proin quisque facilisi. Risus morbi dolor libero velit scelerisque enim.\n\nEn masse consectetur morbi blandit facilisi tincidunt amet pellentesque. Ipsum nisl sed fermentum cursus. Sit purus sagittis feugiat vel nunc sit viverra.',
        image: null,
      },
      {
        title: 'User Pain Point',
        text: 'Lorem ipsum dolor sit amet consectetur. Mollis metus eget quam hendrerit. Nec malesuada massa in porta proin quisque facilisi. Risus morbi dolor libero velit scelerisque enim.\n\nEn masse consectetur morbi blandit facilisi tincidunt amet pellentesque. Ipsum nisl sed fermentum cursus. Sit purus sagittis feugiat vel nunc sit viverra.',
        image: null,
      },
    ],
    gallery: {
      fullWidth: null,
      pair: [null, null],
      bottom: null,
    },
    testimonial: {
      text: '"Studione completely transformed our brand presence. The results speak for themselves — our community engagement has more than doubled since launch. Their understanding of design and strategy made the process effortless."',
      author: 'Jane Doe',
      role: 'CEO, Locusverse',
      avatar: null,
    },
  },
  {
    id: 'p-2',
    slug: 'website-builderh-ds',
    title: 'Website Builderh',
    tags: ['Design System'],
    desc: 'Lorem ipsum dolor sit amet consectetur. Mollis metus eget quam hendrerit. Nec malesuada massa in porta proin quisque facilisi. Risus morbi dolor libero velit scelerisque enim.',
    src: '/src/assets/project-2.png',
    imgH: 260,
    cardW: 472,
    comingSoon: false,
    category: 'Design System',

    heroImage: null,
    date: 'Mar 2024',
    tagline: 'Creating A Scalable, Modular Design System For A Fast-Growing Fintech Platform.',
    introText:
      'Lorem ipsum dolor sit amet consectetur. Mollis metus eget quam hendrerit. Nec malesuada massa in porta proin quisque facilisi. Risus morbi dolor libero velit scelerisque enim.\n\nEn masse consectetur morbi blandit facilisi tincidunt amet pellentesque. Ipsum nisl sed fermentum cursus. Sit purus sagittis feugiat vel nunc sit viverra. Egestas dui feugiat in arcu pellentesque blandit.\n\nQuis vitae lobortis amet. Nulla egestas consequat. Morbi vel malesuada fames ac turpis egestas. Integer tristique vel magna amet porta.',
    clientLogo: 'àkawó',
    skillset: 'Design System, Component Library, Token Architecture, Documentation',
    bannerImage: null,
    painPoints: [
      {
        title: 'User Pain Point',
        text: 'Lorem ipsum dolor sit amet consectetur. Mollis metus eget quam hendrerit. Nec malesuada massa in porta proin quisque facilisi. Risus morbi dolor libero velit scelerisque enim.\n\nEn masse consectetur morbi blandit facilisi tincidunt amet pellentesque. Ipsum nisl sed fermentum cursus.',
        image: null,
      },
      {
        title: 'User Pain Point',
        text: 'Lorem ipsum dolor sit amet consectetur. Mollis metus eget quam hendrerit. Nec malesuada massa in porta proin quisque facilisi. Risus morbi dolor libero velit scelerisque enim.\n\nEn masse consectetur morbi blandit facilisi tincidunt amet pellentesque. Ipsum nisl sed fermentum cursus.',
        image: null,
      },
    ],
    gallery: {
      fullWidth: null,
      pair: [null, null],
      bottom: null,
    },
    testimonial: {
      text: '"The design system has completely changed how our engineering team works. Components that used to take days now take minutes. Studione delivered something truly exceptional."',
      author: 'John Smith',
      role: 'CTO, Builderh',
      avatar: null,
    },
  },
  {
    id: 'p-3',
    slug: 'website-builderh-strategy',
    title: 'Website Builderh',
    tags: ['Strategy'],
    desc: 'Lorem ipsum dolor sit amet consectetur. Mollis metus eget quam hendrerit. Nec malesuada massa in porta proin quisque facilisi. Risus morbi dolor libero velit scelerisque enim.',
    src: '/src/assets/project-3.png',
    imgH: 463,
    cardW: 488,
    comingSoon: false,
    category: 'Strategy',

    heroImage: null,
    date: 'Jan 2024',
    tagline: 'Repositioning An Established Brand For A New Generation Of Digital-First Consumers.',
    introText:
      'Lorem ipsum dolor sit amet consectetur. Mollis metus eget quam hendrerit. Nec malesuada massa in porta proin quisque facilisi. Risus morbi dolor libero velit scelerisque enim.\n\nEn masse consectetur morbi blandit facilisi tincidunt amet pellentesque. Ipsum nisl sed fermentum cursus. Sit purus sagittis feugiat vel nunc sit viverra. Egestas dui feugiat in arcu pellentesque blandit.\n\nQuis vitae lobortis amet. Nulla egestas consequat. Morbi vel malesuada fames ac turpis egestas.',
    clientLogo: 'Builderh',
    skillset: 'Brand Strategy, Market Research, Positioning, Competitive Analysis',
    bannerImage: null,
    painPoints: [
      {
        title: 'User Pain Point',
        text: 'Lorem ipsum dolor sit amet consectetur. Mollis metus eget quam hendrerit. Nec malesuada massa in porta proin quisque facilisi.\n\nEn masse consectetur morbi blandit facilisi tincidunt amet pellentesque. Ipsum nisl sed fermentum cursus.',
        image: null,
      },
      {
        title: 'User Pain Point',
        text: 'Lorem ipsum dolor sit amet consectetur. Mollis metus eget quam hendrerit. Nec malesuada massa in porta proin quisque facilisi.\n\nEn masse consectetur morbi blandit facilisi tincidunt amet pellentesque. Ipsum nisl sed fermentum cursus.',
        image: null,
      },
    ],
    gallery: {
      fullWidth: null,
      pair: [null, null],
      bottom: null,
    },
    testimonial: {
      text: '"Working with Studione on our brand strategy was transformative. They brought clarity to our vision and helped us connect with a completely new audience."',
      author: 'Sarah Chen',
      role: 'Founder, Builderh',
      avatar: null,
    },
  },
  {
    id: 'p-4',
    slug: 'website-builderh-bi',
    title: 'Website Builderh',
    tags: ['Brand Identity', 'Strategy'],
    desc: 'Lorem ipsum dolor sit amet consectetur. Mollis metus eget quam hendrerit. Nec malesuada massa in porta proin quisque facilisi. Risus morbi dolor libero velit scelerisque enim.',
    src: '/src/assets/Hero Image.png',
    imgH: 463,
    cardW: 607,
    comingSoon: false,
    category: 'Brand Identity',

    heroImage: null,
    date: 'Nov 2023',
    tagline: 'Crafting A Bold, Distinctive Identity That Bridges Strategy And Visual Impact.',
    introText:
      'Lorem ipsum dolor sit amet consectetur. Mollis metus eget quam hendrerit. Nec malesuada massa in porta proin quisque facilisi. Risus morbi dolor libero velit scelerisque enim.\n\nEn masse consectetur morbi blandit facilisi tincidunt amet pellentesque. Ipsum nisl sed fermentum cursus. Sit purus sagittis feugiat vel nunc sit viverra. Egestas dui feugiat in arcu pellentesque blandit.',
    clientLogo: 'Builderh',
    skillset: 'Brand Identity, Visual Design, Strategy, Print & Digital Assets',
    bannerImage: null,
    painPoints: [
      {
        title: 'User Pain Point',
        text: 'Lorem ipsum dolor sit amet consectetur. Mollis metus eget quam hendrerit. Nec malesuada massa in porta proin quisque facilisi.\n\nEn masse consectetur morbi blandit facilisi tincidunt amet pellentesque.',
        image: null,
      },
      {
        title: 'User Pain Point',
        text: 'Lorem ipsum dolor sit amet consectetur. Mollis metus eget quam hendrerit. Nec malesuada massa in porta proin quisque facilisi.\n\nEn masse consectetur morbi blandit facilisi tincidunt amet pellentesque.',
        image: null,
      },
    ],
    gallery: {
      fullWidth: null,
      pair: [null, null],
      bottom: null,
    },
    testimonial: {
      text: '"The brand identity work exceeded every expectation. Studione understood our vision deeply and translated it into something that truly resonates with our audience."',
      author: 'Alex Rivera',
      role: 'CMO, Builderh',
      avatar: null,
    },
  },
]

export const FILTERS = [
  'All',
  'Brand Identity',
  'Design System',
  'Digital Design',
  'Brand Narratives',
  'Strategy',
]
