const KEY = 'igarcia-learn-progress';

function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === 'string');
  } catch {
    return [];
  }
}

function write(ids: string[]) {
  localStorage.setItem(KEY, JSON.stringify(ids));
}

function render() {
  const done = new Set(read());
  document.querySelectorAll<HTMLButtonElement>('[data-progress-toggle]').forEach((button) => {
    const id = button.dataset.lessonId;
    if (!id) return;
    const complete = done.has(id);
    button.setAttribute('aria-pressed', String(complete));
    button.textContent = complete ? 'Completada' : 'Marcar como completada';
  });
  document.querySelectorAll<HTMLElement>('[data-progress-summary]').forEach((node) => {
    const ids = (node.dataset.lessonIds ?? '').split(',').filter(Boolean);
    const count = ids.filter((id) => done.has(id)).length;
    const label = node.querySelector('[data-progress-count]');
    if (label) label.textContent = String(count);
  });
  document.querySelectorAll<HTMLElement>('[data-lesson-status]').forEach((node) => {
    const id = node.dataset.lessonStatus;
    if (!id) return;
    node.textContent = done.has(id) ? 'Completada' : 'Pendiente';
  });
}

document.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement) || !target.matches('[data-progress-toggle]')) return;
  const id = target.dataset.lessonId;
  if (!id) return;
  const done = new Set(read());
  if (done.has(id)) done.delete(id);
  else done.add(id);
  try {
    write([...done]);
  } catch {
    return;
  }
  render();
});

render();
