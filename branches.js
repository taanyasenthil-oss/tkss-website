import { selectFromSupabase } from './supabase-client.js';

const grid = document.querySelector('[data-branches-grid]');
const icons = ['home', 'clock', 'school', 'blocks', 'book-open-check', 'map-pin', 'landmark'];

function setStatus(message) {
  if (!grid) return;
  grid.replaceChildren();
  const status = document.createElement('p');
  status.className = 'branch-status';
  status.textContent = message;
  grid.append(status);
}

function locationText(branch) {
  return branch.address || branch.location || branch.city || branch.timings || 'Contact TKSS for details.';
}

function actionFor(branch) {
  if (branch.map_url) return { label: 'Directions', href: branch.map_url };
  if (branch.phone) return { label: 'Call TKSS', href: `tel:${String(branch.phone).replace(/[^+\d]/g, '')}` };
  if (branch.email) return { label: 'Email TKSS', href: `mailto:${branch.email}` };
  return { label: 'Contact', href: '#contact' };
}

function makeBranchCard(branch, index) {
  const card = document.createElement('article');
  card.className = 'reveal visible';

  const icon = document.createElement('span');
  icon.dataset.lucide = icons[index % icons.length];
  const title = document.createElement('h3');
  title.textContent = branch.branch_name || branch.name || 'TKSS Location';
  const detail = document.createElement('p');
  detail.textContent = locationText(branch);
  const action = actionFor(branch);
  const link = document.createElement('a');
  link.href = action.href;
  link.textContent = action.label;
  if (action.href.startsWith('http')) {
    link.target = '_blank';
    link.rel = 'noopener';
  }

  card.append(icon, title, detail, link);
  return card;
}

async function loadBranches() {
  if (!grid) return;

  try {
    const branches = await selectFromSupabase('branches', 'select=*');
    const activeBranches = branches
      .filter((branch) => branch.active !== false)
      .sort((a, b) => (a.display_order ?? 9999) - (b.display_order ?? 9999) || String(a.branch_name || a.name || '').localeCompare(String(b.branch_name || b.name || '')));

    if (!activeBranches.length) {
      setStatus('TKSS locations will be announced shortly. Please contact us for the nearest programme.');
      return;
    }

    grid.replaceChildren(...activeBranches.map(makeBranchCard));
    window.lucide?.createIcons();
  } catch (error) {
    console.error('Unable to load TKSS branches from Supabase.', error);
    setStatus('Unable to load locations right now. Please contact TKSS for branch details.');
  }
}

loadBranches();
