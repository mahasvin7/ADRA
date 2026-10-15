/**
 * CENTRALIZED DATA ARCHITECTURE — ADRA ECOSYSTEM (VANILLA JS EDITION)
 * ============================================================================
 * Edit this file to change:
 * - Brand names, taglines, edition labels
 * - The 4 Divisions (names, descriptions, accent colours, logos)
 * - The 20 Startups (names, taglines, narratives, purpose statements, colors)
 * - About, Vision, Mission, Goals, Contact options, and Thank-You screen
 *
 * NOTE: Set `logoUrl` to an image file (e.g. "logos/my-startup.svg")
 * or leave as "" to use the procedural architectural monograph emblem.
 */

window.SITE_CONTENT = {
  brand: {
    name: 'ADRA',
    descriptor: 'Parent Venture Ecosystem',
    editionLabel: 'Architectural Monograph — Vol. I',
    logoUrl: '',
    tagline: {
      firstPart: 'One vision.',
      italicPart: 'Many possibilities.',
      full: 'One vision. Many possibilities.',
    },
    heroSummary:
      'ADRA is a parent company and venture architecture uniting four foundational divisions and twenty independent startups within one disciplined ecosystem.',
    heroFootnote:
      '[Editable Placeholder: Replace with official founding location, year, or holding mandate.]',
    primaryCtaLabel: 'Enter the ADRA Universe',
    secondaryCtaLabel: 'Explore Divisions',
  },

  navigation: [
    { id: 'universe', label: 'Ecosystem', number: '01' },
    { id: 'showcase', label: 'Showcase', number: '02' },
    { id: 'about', label: 'About', number: '03' },
    { id: 'vision', label: 'Vision', number: '04' },
    { id: 'contact', label: 'Contact', number: '05' },
  ],

  universeSection: {
    eyebrow: 'Section 01 — Symmetrical Venture Architecture',
    title: 'The ADRA Universe',
    subtitle:
      'Four autonomous divisions revolve around the central ADRA core. Select any division node in the orbit below to inspect its startup showcase and venture dossier.',
    orbitInstruction:
      'Hover or focus any division card to pause orbital motion. Click a division to transition into its startup showcase.',
  },

  showcaseSection: {
    eyebrow: 'Section 02 — Coordinated Division Showcase',
    title: 'Venture Rotation Stage',
    subtitle:
      'Each division houses five specialized startups. The stage rotates automatically every four seconds—click the primary frame at any moment to open the full alternating editorial dossier.',
    openDetailsCta: 'Open Full Division Dossier',
  },

  divisions: [
    {
      id: 'division-one',
      code: 'DIV—01',
      romanIndex: 'I',
      name: 'Division One',
      subtitle: 'Foundational Systems & Venture Infrastructure',
      shortDescription:
        'Architecting resilient core platforms and operational frameworks for emerging ventures. [Editable Division One Description]',
      editorialOverview:
        'Division One serves as the structural backbone of the ADRA ecosystem. Replace this placeholder paragraph with the specific sector focus, thesis, and operational scope of Division One.',
      accentColor: '#C7B58A', // Champagne
      surfaceTint: '#191B16',
      orbitAngleDeg: 0,
      logoUrl: '',
      emblemVariant: 'meridian',
      startups: [
        {
          id: 'd1-startup-1',
          indexLabel: '01',
          name: 'Startup One',
          monogram: 'S·01',
          logoUrl: '',
          emblemVariant: 'meridian',
          tagline: 'Precision structural systems for next-generation operations.',
          shortIntro:
            '[Placeholder — Division One / Startup One] Replace with a concise two-sentence introduction describing this venture’s core offering.',
          description:
            'This is an editable placeholder description for Startup One under Division One. Update `js/data.js` with the definitive narrative, product architecture, and market positioning once finalized.',
          purpose:
            'Addresses fragmentation in foundational enterprise workflows by unifying disparate operational layers into one coherent interface. [Editable Problem/Purpose Statement]',
          showcaseBgColor: '#151814',
          stageTint: 'rgba(199, 181, 138, 0.14)',
          stagePlaceholder: 'Venture Slot 01 · Division One',
          links: { website: '#', socialLabel: 'LinkedIn / X Placeholder', socialUrl: '#' },
        },
        {
          id: 'd1-startup-2',
          indexLabel: '02',
          name: 'Startup Two',
          monogram: 'S·02',
          logoUrl: '',
          emblemVariant: 'prism',
          tagline: 'Autonomous coordination across distributed teams and assets.',
          shortIntro:
            '[Placeholder — Division One / Startup Two] A focused venture rethinking how complex organizations synchronize decisions.',
          description:
            'Editable placeholder copy for Startup Two in Division One. This block supports multi-sentence editorial storytelling and automatically alternates sides in the Division Details view.',
          purpose:
            'Eliminates coordination latency between independent operational units through transparent protocol design. [Editable Problem/Purpose Statement]',
          showcaseBgColor: '#181A15',
          stageTint: 'rgba(185, 201, 181, 0.13)',
          stagePlaceholder: 'Venture Slot 02 · Division One',
          links: { website: '#', socialLabel: 'Social Profile Placeholder', socialUrl: '#' },
        },
        {
          id: 'd1-startup-3',
          indexLabel: '03',
          name: 'Startup Three',
          monogram: 'S·03',
          logoUrl: '',
          emblemVariant: 'aperture',
          tagline: 'High-integrity data lineage and verification architecture.',
          shortIntro:
            '[Placeholder — Division One / Startup Three] Built to bring clarity and auditability to mission-critical records.',
          description:
            'Editable placeholder copy for Startup Three in Division One. Replace with the authentic origin story, technical capabilities, and strategic role within ADRA.',
          purpose:
            'Solves trust and verification bottlenecks across multi-party institutional workflows. [Editable Problem/Purpose Statement]',
          showcaseBgColor: '#141715',
          stageTint: 'rgba(199, 181, 138, 0.16)',
          stagePlaceholder: 'Venture Slot 03 · Division One',
          links: { website: '#', socialLabel: 'Social Profile Placeholder', socialUrl: '#' },
        },
        {
          id: 'd1-startup-4',
          indexLabel: '04',
          name: 'Startup Four',
          monogram: 'S·04',
          logoUrl: '',
          emblemVariant: 'compass',
          tagline: 'Adaptive resource allocation and intelligent scheduling.',
          shortIntro:
            '[Placeholder — Division One / Startup Four] Designing calm, predictive control rooms for complex logistics.',
          description:
            'Editable placeholder copy for Startup Four in Division One. Designed to accommodate concise, scannable product details without visual clutter.',
          purpose:
            'Reduces operational waste caused by static planning tools in rapidly shifting environments. [Editable Problem/Purpose Statement]',
          showcaseBgColor: '#1A1C17',
          stageTint: 'rgba(155, 158, 150, 0.15)',
          stagePlaceholder: 'Venture Slot 04 · Division One',
          links: { website: '#', socialLabel: 'Social Profile Placeholder', socialUrl: '#' },
        },
        {
          id: 'd1-startup-5',
          indexLabel: '05',
          name: 'Startup Five',
          monogram: 'S·05',
          logoUrl: '',
          emblemVariant: 'lattice',
          tagline: 'Modular identity and secure access fabric.',
          shortIntro:
            '[Placeholder — Division One / Startup Five] Safeguarding ecosystem interactions with frictionless verification.',
          description:
            'Editable placeholder copy for Startup Five in Division One. Replace this text and `logoUrl` in `js/data.js` when final brand assets are supplied.',
          purpose:
            'Addresses security complexity by replacing fragmented credential silos with a unified access layer. [Editable Problem/Purpose Statement]',
          showcaseBgColor: '#161916',
          stageTint: 'rgba(199, 181, 138, 0.15)',
          stagePlaceholder: 'Venture Slot 05 · Division One',
          links: { website: '#', socialLabel: 'Social Profile Placeholder', socialUrl: '#' },
        },
      ],
    },
    {
      id: 'Adra Marketplace',
      code: 'DIV—02',
      romanIndex: 'IIIIIII',
      name: 'Division Two',
      subtitle: 'Applied Intelligence & Digital Products',
      shortDescription:
        'Crafting human-centric software, analytical instruments, and intelligent interfaces. [Editable Division Two Description]',
      editorialOverview:
        'Division Two focuses on applied digital craftsmanship and intelligent product experiences. Update this placeholder overview with Division Two’s exact domain and portfolio thesis.',
      accentColor: '#B9C9B5', // Sage
      surfaceTint: '#141915',
      orbitAngleDeg: 90,
      logoUrl: '',
      emblemVariant: 'prism',
      startups: [
        {
          id: 'd2-startup-1',
          indexLabel: '01',
          name: 'Startup One',
          monogram: 'D2·01',
          logoUrl: '',
          emblemVariant: 'axis',
          tagline: 'Human-first decision workspaces for domain specialists.',
          shortIntro:
            '[Placeholder — Division Two / Startup One] Augmenting human judgment with calm, transparent analytical tools.',
          description:
            'Editable placeholder description for Startup One under Division Two. Swap in the real venture name, logo asset, and product summary in `js/data.js`.',
          purpose:
            'Addresses cognitive overload in data-heavy professions through quiet, context-aware software design. [Editable Problem/Purpose Statement]',
          showcaseBgColor: '#131814',
          stageTint: 'rgba(185, 201, 181, 0.16)',
          stagePlaceholder: 'Venture Slot 01 · Division Two',
          links: { website: '#', socialLabel: 'Social Profile Placeholder', socialUrl: '#' },
        },
        {
          id: 'd2-startup-2',
          indexLabel: '02',
          name: 'Startup Two',
          monogram: 'D2·02',
          logoUrl: '',
          emblemVariant: 'eclipse',
          tagline: 'Bespoke synthesis engines for research and discovery.',
          shortIntro:
            '[Placeholder — Division Two / Startup Two] Turning unstructured archives into navigable knowledge graphs.',
          description:
            'Editable placeholder description for Startup Two under Division Two. Built for seamless replacement without touching layout or animation code.',
          purpose:
            'Bridges the gap between vast institutional knowledge repositories and actionable daily insight. [Editable Problem/Purpose Statement]',
          showcaseBgColor: '#161C17',
          stageTint: 'rgba(199, 181, 138, 0.13)',
          stagePlaceholder: 'Venture Slot 02 · Division Two',
          links: { website: '#', socialLabel: 'Social Profile Placeholder', socialUrl: '#' },
        },
        {
          id: 'd2-startup-3',
          indexLabel: '03',
          name: 'Startup Three',
          monogram: 'D2·03',
          logoUrl: '',
          emblemVariant: 'cadence',
          tagline: 'Real-time signal interpretation and pattern telemetry.',
          shortIntro:
            '[Placeholder — Division Two / Startup Three] Precision monitoring designed for clarity under pressure.',
          description:
            'Editable placeholder description for Startup Three under Division Two. Replace with official venture copy when available.',
          purpose:
            'Eliminates alert fatigue by distilling noisy telemetry streams into high-confidence operational signals. [Editable Problem/Purpose Statement]',
          showcaseBgColor: '#121613',
          stageTint: 'rgba(185, 201, 181, 0.17)',
          stagePlaceholder: 'Venture Slot 03 · Division Two',
          links: { website: '#', socialLabel: 'Social Profile Placeholder', socialUrl: '#' },
        },
        {
          id: 'd2-startup-4',
          indexLabel: '04',
          name: 'Startup Four',
          monogram: 'D2·04',
          logoUrl: '',
          emblemVariant: 'meridian',
          tagline: 'Collaborative design and simulation environments.',
          shortIntro:
            '[Placeholder — Division Two / Startup Four] Enabling multidisciplinary teams to prototype complex scenarios together.',
          description:
            'Editable placeholder description for Startup Four under Division Two. Ready for custom SVG/PNG branding and product links.',
          purpose:
            'Replaces disconnected static handoffs with a shared, interactive modeling canvas. [Editable Problem/Purpose Statement]',
          showcaseBgColor: '#171B17',
          stageTint: 'rgba(155, 158, 150, 0.16)',
          stagePlaceholder: 'Venture Slot 04 · Division Two',
          links: { website: '#', socialLabel: 'Social Profile Placeholder', socialUrl: '#' },
        },
        {
          id: 'd2-startup-5',
          indexLabel: '05',
          name: 'Startup Five',
          monogram: 'D2·05',
          logoUrl: '',
          emblemVariant: 'aperture',
          tagline: 'Adaptive commerce and digital experience architecture.',
          shortIntro:
            '[Placeholder — Division Two / Startup Five] Elevating digital interactions through speed, restraint, and precision.',
          description:
            'Editable placeholder description for Startup Five under Division Two. Update in `js/data.js`.',
          purpose:
            'Solves digital friction in high-consideration customer journeys through bespoke interface architecture. [Editable Problem/Purpose Statement]',
          showcaseBgColor: '#141815',
          stageTint: 'rgba(185, 201, 181, 0.15)',
          stagePlaceholder: 'Venture Slot 05 · Division Two',
          links: { website: '#', socialLabel: 'Social Profile Placeholder', socialUrl: '#' },
        },
      ],
    },
    {
      id: 'division-three',
      code: 'DIV—03',
      romanIndex: 'III',
      name: 'Division Three',
      subtitle: 'Sustainable Commerce & Physical Ventures',
      shortDescription:
        'Bridging physical craft, circular supply chains, and tactile modern living. [Editable Division Three Description]',
      editorialOverview:
        'Division Three connects digital precision with the physical world—spanning material innovation, supply chain stewardship, and tangible consumer experiences. [Editable Placeholder]',
      accentColor: '#D6C7A9', // Warm champagne-ivory
      surfaceTint: '#191815',
      orbitAngleDeg: 180,
      logoUrl: '',
      emblemVariant: 'compass',
      startups: [
        {
          id: 'd3-startup-1',
          indexLabel: '01',
          name: 'Startup One',
          monogram: 'D3·01',
          logoUrl: '',
          emblemVariant: 'compass',
          tagline: 'Traceable material sourcing and circular logistics.',
          shortIntro:
            '[Placeholder — Division Three / Startup One] Bringing verifiable provenance to physical production networks.',
          description:
            'Editable placeholder description for Startup One under Division Three. Replace with the startup’s official story and visual identity.',
          purpose:
            'Addresses opacity in global supply chains by documenting material lifecycle from origin to end use. [Editable Problem/Purpose Statement]',
          showcaseBgColor: '#181714',
          stageTint: 'rgba(214, 199, 169, 0.15)',
          stagePlaceholder: 'Venture Slot 01 · Division Three',
          links: { website: '#', socialLabel: 'Social Profile Placeholder', socialUrl: '#' },
        },
        {
          id: 'd3-startup-2',
          indexLabel: '02',
          name: 'Startup Two',
          monogram: 'D3·02',
          logoUrl: '',
          emblemVariant: 'lattice',
          tagline: 'Architectural objects and considered living systems.',
          shortIntro:
            '[Placeholder — Division Three / Startup Two] Designing enduring physical goods with minimal environmental footprint.',
          description:
            'Editable placeholder description for Startup Two under Division Three. Supports local image paths or SVG emblems.',
          purpose:
            'Counters disposable product culture with repairable, timeless industrial design. [Editable Problem/Purpose Statement]',
          showcaseBgColor: '#1A1815',
          stageTint: 'rgba(199, 181, 138, 0.15)',
          stagePlaceholder: 'Venture Slot 02 · Division Three',
          links: { website: '#', socialLabel: 'Social Profile Placeholder', socialUrl: '#' },
        },
        {
          id: 'd3-startup-3',
          indexLabel: '03',
          name: 'Startup Three',
          monogram: 'D3·03',
          logoUrl: '',
          emblemVariant: 'prism',
          tagline: 'Clean-energy micro-infrastructure for urban spaces.',
          shortIntro:
            '[Placeholder — Division Three / Startup Three] Modular energy resilience tailored for modern districts.',
          description:
            'Editable placeholder description for Startup Three under Division Three. Update in `js/data.js`.',
          purpose:
            'Solves localized energy bottlenecks through quiet, architecturally integrated storage and distribution units. [Editable Problem/Purpose Statement]',
          showcaseBgColor: '#151714',
          stageTint: 'rgba(185, 201, 181, 0.14)',
          stagePlaceholder: 'Venture Slot 03 · Division Three',
          links: { website: '#', socialLabel: 'Social Profile Placeholder', socialUrl: '#' },
        },
        {
          id: 'd3-startup-4',
          indexLabel: '04',
          name: 'Startup Four',
          monogram: 'D3·04',
          logoUrl: '',
          emblemVariant: 'eclipse',
          tagline: 'Next-generation cold-chain and preservation technology.',
          shortIntro:
            '[Placeholder — Division Three / Startup Four] Protecting perishable essentials with intelligent thermal control.',
          description:
            'Editable placeholder description for Startup Four under Division Three. Replace with final company details.',
          purpose:
            'Reduces spoilage and transit loss in regional distribution networks. [Editable Problem/Purpose Statement]',
          showcaseBgColor: '#171613',
          stageTint: 'rgba(214, 199, 169, 0.14)',
          stagePlaceholder: 'Venture Slot 04 · Division Three',
          links: { website: '#', socialLabel: 'Social Profile Placeholder', socialUrl: '#' },
        },
        {
          id: 'd3-startup-5',
          indexLabel: '05',
          name: 'Startup Five',
          monogram: 'D3·05',
          logoUrl: '',
          emblemVariant: 'axis',
          tagline: 'Regenerative packaging and bio-derived materials.',
          shortIntro:
            '[Placeholder — Division Three / Startup Five] Developing high-performance alternatives to single-use synthetics.',
          description:
            'Editable placeholder description for Startup Five under Division Three. Update `js/data.js` anytime.',
          purpose:
            'Eliminates persistent packaging waste for premium commercial brands without compromising protection. [Editable Problem/Purpose Statement]',
          showcaseBgColor: '#161814',
          stageTint: 'rgba(185, 201, 181, 0.15)',
          stagePlaceholder: 'Venture Slot 05 · Division Three',
          links: { website: '#', socialLabel: 'Social Profile Placeholder', socialUrl: '#' },
        },
      ],
    },
    {
      id: 'division-four',
      code: 'DIV—04',
      romanIndex: 'IV',
      name: 'Division Four',
      subtitle: 'Creative Media, Culture & Future Labs',
      shortDescription:
        'Incubating cultural storytelling, spatial experiences, and frontier research ventures. [Editable Division Four Description]',
      editorialOverview:
        'Division Four explores the intersection of narrative, design, and frontier experimentation. Replace this placeholder text with Division Four’s definitive scope and creative mandate.',
      accentColor: '#9FB3A4', // Slate-sage
      surfaceTint: '#141817',
      orbitAngleDeg: 270,
      logoUrl: '',
      emblemVariant: 'aperture',
      startups: [
        {
          id: 'd4-startup-1',
          indexLabel: '01',
          name: 'Startup One',
          monogram: 'D4·01',
          logoUrl: '',
          emblemVariant: 'aperture',
          tagline: 'Editorial publishing and interactive documentary studio.',
          shortIntro:
            '[Placeholder — Division Four / Startup One] Crafting long-form digital monographs and visual narratives.',
          description:
            'Editable placeholder description for Startup One under Division Four. Replace with actual startup information in `js/data.js`.',
          purpose:
            'Restores depth and permanence to digital media in an era of ephemeral feeds. [Editable Problem/Purpose Statement]',
          showcaseBgColor: '#131716',
          stageTint: 'rgba(159, 179, 164, 0.16)',
          stagePlaceholder: 'Venture Slot 01 · Division Four',
          links: { website: '#', socialLabel: 'Social Profile Placeholder', socialUrl: '#' },
        },
        {
          id: 'd4-startup-2',
          indexLabel: '02',
          name: 'Startup Two',
          monogram: 'D4·02',
          logoUrl: '',
          emblemVariant: 'cadence',
          tagline: 'Spatial acoustics and bespoke sonic environments.',
          shortIntro:
            '[Placeholder — Division Four / Startup Two] Designing restorative soundscapes for architecture and digital spaces.',
          description:
            'Editable placeholder description for Startup Two under Division Four. Supports custom logos and external links.',
          purpose:
            'Addresses acoustic fatigue in modern hospitality, workspace, and digital environments. [Editable Problem/Purpose Statement]',
          showcaseBgColor: '#151918',
          stageTint: 'rgba(199, 181, 138, 0.14)',
          stagePlaceholder: 'Venture Slot 02 · Division Four',
          links: { website: '#', socialLabel: 'Social Profile Placeholder', socialUrl: '#' },
        },
        {
          id: 'd4-startup-3',
          indexLabel: '03',
          name: 'Startup Three',
          monogram: 'D4·03',
          logoUrl: '',
          emblemVariant: 'eclipse',
          tagline: 'Experimental interface and tactile hardware research.',
          shortIntro:
            '[Placeholder — Division Four / Startup Three] Investigating calm, screen-minimal instruments for creative work.',
          description:
            'Editable placeholder description for Startup Three under Division Four. Ready for real copy and asset paths.',
          purpose:
            'Challenges screen dependency by pairing tactile physical controls with modern computation. [Editable Problem/Purpose Statement]',
          showcaseBgColor: '#121615',
          stageTint: 'rgba(159, 179, 164, 0.15)',
          stagePlaceholder: 'Venture Slot 03 · Division Four',
          links: { website: '#', socialLabel: 'Social Profile Placeholder', socialUrl: '#' },
        },
        {
          id: 'd4-startup-4',
          indexLabel: '04',
          name: 'Startup Four',
          monogram: 'D4·04',
          logoUrl: '',
          emblemVariant: 'lattice',
          tagline: 'Archival preservation for contemporary design and art.',
          shortIntro:
            '[Placeholder — Division Four / Startup Four] High-resolution cataloguing and provenance systems for cultural institutions.',
          description:
            'Editable placeholder description for Startup Four under Division Four. Update anytime in `js/data.js`.',
          purpose:
            'Prevents the loss of contemporary creative archives through standardized, future-proof preservation formats. [Editable Problem/Purpose Statement]',
          showcaseBgColor: '#161A18',
          stageTint: 'rgba(185, 201, 181, 0.15)',
          stagePlaceholder: 'Venture Slot 04 · Division Four',
          links: { website: '#', socialLabel: 'Social Profile Placeholder', socialUrl: '#' },
        },
        {
          id: 'd4-startup-5',
          indexLabel: '05',
          name: 'Startup Five',
          monogram: 'D4·05',
          logoUrl: '',
          emblemVariant: 'meridian',
          tagline: 'Fellowship incubator for independent founders and thinkers.',
          shortIntro:
            '[Placeholder — Division Four / Startup Five] Providing early-stage structure, design direction, and shared research.',
          description:
            'Editable placeholder description for Startup Five under Division Four. Replace with final startup details.',
          purpose:
            'Gives unconventional early-stage ideas the patient capital and design rigour needed to mature into standalone ventures. [Editable Problem/Purpose Statement]',
          showcaseBgColor: '#141816',
          stageTint: 'rgba(199, 181, 138, 0.15)',
          stagePlaceholder: 'Venture Slot 05 · Division Four',
          links: { website: '#', socialLabel: 'Social Profile Placeholder', socialUrl: '#' },
        },
      ],
    },
  ],

  about: {
    eyebrow: 'Section 03 — The Parent Architecture',
    headlineFirst: 'A unified house for',
    headlineItalic: 'independent ambition.',
    leadParagraph:
      'ADRA exists to bridge the distance between bold early-stage conviction and enduring institutional scale. Rather than operating as a disconnected holding entity, ADRA functions as a shared architectural foundation.',
    editorialColumns: [
      {
        index: '01',
        title: 'Why the Ecosystem Exists',
        body: '[Editable Placeholder] Replace with ADRA’s founding story. Explain how bringing multiple ventures together under one disciplined roof creates shared operational clarity, design standards, and long-term resilience.',
      },
      {
        index: '02',
        title: 'How the Four Divisions Fit Together',
        body: '[Editable Placeholder] Each division addresses a distinct domain while drawing from ADRA’s central ethos. Discoveries in one division inform capabilities in the others—creating compound momentum without sacrificing autonomy.',
      },
      {
        index: '03',
        title: 'Autonomy With Shared Gravity',
        body: '[Editable Placeholder] Every startup within ADRA retains its own identity, leadership, and mission while remaining anchored to the parent company’s ethical, aesthetic, and strategic standards.',
      },
    ],
    pullQuote:
      '“Structure should never constrain imagination; it should give imagination the stability to endure.”',
    pullQuoteAttribution: 'ADRA Founding Charter [Editable Placeholder]',
  },

  visionMissionGoals: {
    eyebrow: 'Section 04 — Strategic Direction',
    sectionTitle: 'Principles of Permanence',
    vision: {
      roman: 'I',
      label: 'Our Vision',
      statementFirst: 'To cultivate an enduring constellation of ventures where',
      statementItalic: 'clarity, craft, and purpose',
      statementLast: 'converge to shape the next generation of industry.',
      supportingNote:
        '[Editable Vision Placeholder] Replace with ADRA’s official vision statement in `js/data.js`.',
    },
    mission: {
      roman: 'II',
      label: 'Our Mission',
      statement:
        'To build, steward, and connect specialized divisions and high-conviction startups—providing the structural governance, design excellence, and patient ecosystem support required for transformative ideas to thrive.',
      supportingNote:
        '[Editable Mission Placeholder] Replace with ADRA’s official mission statement in `js/data.js`.',
    },
    goals: {
      roman: 'III',
      label: 'Our Goals',
      intro:
        'All strategic objectives below are data-driven placeholders containing zero fabricated metrics or unverified claims.',
      items: [
        {
          index: '01',
          title: 'Cross-Division Synergy',
          summary:
            'Establish seamless technical, creative, and operational collaboration across all four divisions so each startup benefits from the collective ecosystem.',
          placeholderNote: '[Editable Goal 01]',
        },
        {
          index: '02',
          title: 'Disciplined Venture Incubation',
          summary:
            'Support each division’s portfolio of startups from foundational concept through sustainable, self-sufficient operation.',
          placeholderNote: '[Editable Goal 02]',
        },
        {
          index: '03',
          title: 'Uncompromising Design & Engineering Quality',
          summary:
            'Maintain a shared benchmark of human-centred design, reliability, and ethical responsibility across every venture bearing the ADRA lineage.',
          placeholderNote: '[Editable Goal 03]',
        },
        {
          index: '04',
          title: 'Long-Horizon Stewardship',
          summary:
            'Prioritize durable value creation and meaningful problem-solving over short-term cycles.',
          placeholderNote: '[Editable Goal 04]',
        },
      ],
    },
  },

  contact: {
    eyebrow: 'Section 05 — Initiate Dialogue',
    titleFirst: 'Engage with the',
    titleItalic: 'ADRA Ecosystem.',
    subtitle:
      'Whether you are a founder with a high-conviction thesis, a builder seeking to join a venture, or an institutional partner, select a pathway below.',
    backendTransparencyNote:
      'Local Storage Active: Submissions are validated and stored in browser memory/localStorage (`adra_inquiries`). No third-party network required for this prototype.',
    directPlaceholders: {
      generalEmail: 'dialogue@adra-ecosystem.placeholder',
      pressEmail: 'editorial@adra-ecosystem.placeholder',
      locationPlaceholder: '[Editable HQ Location — e.g., London / Bengaluru / New York]',
    },
    tracks: [
      {
        id: 'pitch',
        index: '01',
        label: 'Pitch an Idea',
        headline: 'Propose a New Venture or Thesis',
        description:
          'Share an early-stage startup concept or research thesis aligned with one of ADRA’s four divisions.',
        organizationLabel: 'Venture / Working Title',
        organizationPlaceholder: 'e.g., Project Meridian',
        messageLabel: 'Venture Thesis & Problem Addressed',
        messagePlaceholder:
          'Outline the problem being solved, why it belongs within the ADRA ecosystem, and current stage...',
        submitLabel: 'Transmit Venture Brief',
      },
      {
        id: 'join',
        index: '02',
        label: 'Join the Ecosystem',
        headline: 'Collaborate as a Builder, Operator, or Partner',
        description:
          'Express interest in leadership, engineering, design, or strategic partnership across ADRA’s portfolio.',
        organizationLabel: 'Current Discipline / Affiliation',
        organizationPlaceholder: 'e.g., Systems Architect / Studio Partner',
        messageLabel: 'Area of Contribution & Background',
        messagePlaceholder:
          'Share your background, preferred division or startup, and how you wish to contribute...',
        submitLabel: 'Submit Ecosystem Profile',
      },
      {
        id: 'contact',
        index: '03',
        label: 'Contact the Team',
        headline: 'Direct Inquiry to the Parent Office',
        description:
          'Reach the ADRA leadership and editorial team for institutional, media, or general ecosystem inquiries.',
        organizationLabel: 'Organization / Institution',
        organizationPlaceholder: 'e.g., Horizon Partners',
        messageLabel: 'Inquiry Details',
        messagePlaceholder: 'Write your message to the ADRA team...',
        submitLabel: 'Send Correspondence',
      },
    ],
  },

  thankYou: {
    eyebrow: 'Correspondence Logged — ADRA Registry',
    headlineFirst: 'Thank you for reaching into',
    headlineItalic: 'the ADRA Universe.',
    message:
      'Your dispatch has been recorded in the local registry. Our team reviews every venture brief and inquiry with deliberate care.',
    animationSlotNote:
      'Modular Animation Stage: Ready for custom reference video or bespoke keyframe sequence inside `#thank-you-anim-stage`.',
    returnButtonLabel: 'Return to the ADRA Homepage',
    returnToEcosystemLabel: 'Return to Orbital Universe',
  },

  footer: {
    colophon:
      'ADRA is a parent company and venture ecosystem. All division and startup entries marked as placeholders are structured for seamless content replacement via js/data.js.',
    copyright: `© ${new Date().getFullYear()} ADRA Holding Ecosystem. All rights reserved.`,
    socialPlaceholders: [
      { label: 'LinkedIn [Placeholder]', href: '#contact' },
      { label: 'X / Twitter [Placeholder]', href: '#contact' },
      { label: 'Editorial Monograph [Placeholder]', href: '#about' },
    ],
  },
};
