const THEME_KEY = 'theme';

function currentTheme(): 'light' | 'dark' {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function paintTheme(theme: 'light' | 'dark') {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.classList.toggle('light', theme === 'light');
  root.style.colorScheme = theme;
  root.style.backgroundColor = theme === 'dark' ? '#121412' : '#f3f0e8';
  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    'content',
    theme === 'dark' ? '#121412' : '#f3f0e8',
  );
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((button) => {
    button.setAttribute('aria-pressed', String(theme === 'dark'));
  });
}

function setMenuOpen(open: boolean) {
  const drawer = document.getElementById('site-drawer');
  const button = document.getElementById('site-menu-button');
  if (!drawer || !button) return;
  drawer.hidden = !open;
  button.setAttribute('aria-expanded', String(open));
  button.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  button.classList.toggle('is-open', open);
  document.body.classList.toggle('overflow-hidden', open);
  if (open) {
    drawer.querySelector<HTMLElement>('a, button')?.focus();
  } else if (document.activeElement instanceof Node && drawer.contains(document.activeElement)) {
    button.focus();
  }
}

paintTheme(currentTheme());

document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((button) => {
  button.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    paintTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* El navegador puede bloquear el almacenamiento. El tema sigue aplicado. */
    }
  });
});

document.getElementById('site-menu-button')?.addEventListener('click', () => {
  const button = document.getElementById('site-menu-button');
  setMenuOpen(button?.getAttribute('aria-expanded') !== 'true');
});

const drawer = document.getElementById('site-drawer');
drawer?.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  if (target.closest('a, [data-close-drawer]')) setMenuOpen(false);
});

drawer?.addEventListener('keydown', (event) => {
  if (event.key !== 'Tab' || drawer.hidden) return;
  const nodes = [...drawer.querySelectorAll<HTMLElement>('a, button')];
  const first = nodes[0];
  const last = nodes[nodes.length - 1];
  if (!first || !last) return;
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenuOpen(false);
});
