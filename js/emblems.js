/**
 * PROCEDURAL ARCHITECTURAL SVG MONOGRAPH GENERATOR (VANILLA JS)
 * ============================================================================
 */

window.renderEmblemHTML = function (item, size) {
  const sizeMap = { sm: 36, md: 64, lg: 112, xl: 148 };
  const px = sizeMap[size || 'md'] || 64;
  const accent = item.accentColor || '#C7B58A';

  if (item.logoUrl && item.logoUrl.trim() !== '') {
    return `
      <div style="width:${px}px; height:${px}px; display:inline-flex; align-items:center; justify-content:center;">
        <img src="${item.logoUrl}" alt="${item.name} logo" style="max-width:100%; max-height:100%; object-fit:contain;" />
      </div>
    `;
  }

  const v = item.emblemVariant || 'meridian';
  let innerPaths = '';

  if (v === 'meridian') {
    innerPaths = `
      <circle cx="60" cy="60" r="42" stroke="${accent}" stroke-width="1.2" />
      <ellipse cx="60" cy="60" rx="22" ry="42" stroke="rgba(237, 235, 227, 0.45)" stroke-width="1" />
      <line x1="12" y1="60" x2="108" y2="60" stroke="${accent}" stroke-width="1" stroke-dasharray="3 3" />
      <circle cx="60" cy="18" r="3" fill="${accent}" />
      <circle cx="60" cy="102" r="3" fill="${accent}" />
    `;
  } else if (v === 'prism') {
    innerPaths = `
      <polygon points="60,16 102,94 18,94" stroke="${accent}" stroke-width="1.25" fill="none" />
      <polygon points="60,34 86,84 34,84" stroke="rgba(237, 235, 227, 0.4)" stroke-width="1" fill="none" />
      <line x1="60" y1="16" x2="60" y2="94" stroke="${accent}" stroke-width="0.9" />
    `;
  } else if (v === 'aperture') {
    innerPaths = `
      <circle cx="60" cy="60" r="40" stroke="rgba(237, 235, 227, 0.35)" stroke-width="1" />
      <circle cx="60" cy="60" r="26" stroke="${accent}" stroke-width="1.3" />
      <line x1="60" y1="12" x2="60" y2="30" stroke="${accent}" stroke-width="1.2" />
      <line x1="60" y1="90" x2="60" y2="108" stroke="${accent}" stroke-width="1.2" />
      <line x1="12" y1="60" x2="30" y2="60" stroke="${accent}" stroke-width="1.2" />
      <line x1="90" y1="60" x2="108" y2="60" stroke="${accent}" stroke-width="1.2" />
    `;
  } else if (v === 'compass') {
    innerPaths = `
      <rect x="60" y="16" width="62" height="62" transform="rotate(45 60 16)" stroke="${accent}" stroke-width="1.2" />
      <circle cx="60" cy="60" r="20" stroke="rgba(237, 235, 227, 0.5)" stroke-width="1" />
      <circle cx="60" cy="60" r="3.5" fill="${accent}" />
    `;
  } else if (v === 'lattice') {
    innerPaths = `
      <rect x="22" y="22" width="76" height="76" stroke="${accent}" stroke-width="1.2" />
      <rect x="38" y="38" width="44" height="44" stroke="rgba(237, 235, 227, 0.45)" stroke-width="1" />
      <line x1="22" y1="22" x2="98" y2="98" stroke="rgba(237, 235, 227, 0.22)" stroke-width="1" />
      <line x1="98" y1="22" x2="22" y2="98" stroke="rgba(237, 235, 227, 0.22)" stroke-width="1" />
    `;
  } else if (v === 'axis') {
    innerPaths = `
      <circle cx="60" cy="60" r="42" stroke="rgba(237, 235, 227, 0.28)" stroke-width="1" />
      <path d="M26 94 L94 26" stroke="${accent}" stroke-width="1.4" />
      <circle cx="76" cy="44" r="14" stroke="${accent}" stroke-width="1.2" />
      <circle cx="44" cy="76" r="8" stroke="rgba(237, 235, 227, 0.55)" stroke-width="1" />
    `;
  } else if (v === 'eclipse') {
    innerPaths = `
      <circle cx="54" cy="60" r="36" stroke="${accent}" stroke-width="1.3" />
      <circle cx="68" cy="60" r="28" stroke="rgba(237, 235, 227, 0.45)" stroke-width="1" />
      <circle cx="42" cy="60" r="3" fill="${accent}" />
    `;
  } else if (v === 'cadence') {
    innerPaths = `
      <line x1="26" y1="36" x2="94" y2="36" stroke="rgba(237, 235, 227, 0.35)" stroke-width="1" />
      <line x1="20" y1="60" x2="100" y2="60" stroke="${accent}" stroke-width="1.4" />
      <line x1="26" y1="84" x2="94" y2="84" stroke="rgba(237, 235, 227, 0.35)" stroke-width="1" />
      <circle cx="44" cy="36" r="4" fill="${accent}" />
      <circle cx="74" cy="60" r="4.5" fill="#EDEBE3" />
      <circle cx="52" cy="84" r="4" fill="${accent}" />
    `;
  }

  const monogramHTML =
    item.monogram && size !== 'sm'
      ? `<span style="position:absolute; bottom:${size === 'xl' ? '12px' : '6px'}; right:${size === 'xl' ? '14px' : '8px'}; font-family:var(--font-sans); font-size:${size === 'xl' ? '0.7rem' : '0.58rem'}; letter-spacing:0.14em; color:${accent}; background-color:rgba(17,20,17,0.85); padding:1px 5px;">${item.monogram}</span>`
      : '';

  return `
    <div style="position:relative; width:${px}px; height:${px}px; display:inline-flex; align-items:center; justify-content:center; flex-shrink:0;">
      <svg width="${px}" height="${px}" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="6" width="108" height="108" stroke="rgba(237, 235, 227, 0.16)" stroke-width="1" />
        ${innerPaths}
      </svg>
      ${monogramHTML}
    </div>
  `;
};
