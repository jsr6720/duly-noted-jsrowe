(() => {
  const postsGrid = document.querySelector('.posts[data-batch-size]');
  if (!postsGrid) {
    return;
  }

  const loadAllBtn = document.querySelector('[data-load-all]');
  const statusEl = document.querySelector('[data-load-status]');
  const sentinel = document.querySelector('[data-load-sentinel]');
  const batchSize = parseInt(postsGrid.getAttribute('data-batch-size') || '30', 10);
  const colorMapEl = document.getElementById('tag-color-map');
  const colorMap = colorMapEl ? JSON.parse(colorMapEl.textContent) : {};
  const colorCount = 6;
  const existingIds = new Set();

  Array.from(postsGrid.querySelectorAll('[data-note-id]')).forEach((item) => {
    existingIds.add(item.getAttribute('data-note-id'));
  });

  const hashTag = (tag) => {
    let hash = 0;
    for (let i = 0; i < tag.length; i += 1) {
      hash = (hash << 5) - hash + tag.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash) % colorCount;
  };

  const tagColorClass = (tag) => {
    if (!tag) {
      return '';
    }
    const key = tag.toLowerCase();
    const mapped = Object.prototype.hasOwnProperty.call(colorMap, key) ? colorMap[key] : null;
    const colorIndex = Number.isInteger(mapped) ? mapped : hashTag(key);
    return `color-${colorIndex}`;
  };

  const buildSearchText = (note) => {
    const parts = [
      note.title,
      note.headline,
      note.publisher,
      note.author,
      Array.isArray(note.tags) ? note.tags.join(' ') : '',
      note.content
    ].filter(Boolean);
    return parts.join(' ').toLowerCase();
  };

  const renderCard = (note) => {
    const link = document.createElement('a');
    const primaryTag = Array.isArray(note.tags) && note.tags.length ? note.tags[0] : '';
    const colorClass = tagColorClass(primaryTag);
    link.href = note.url;
    link.className = `post-summary-link ${colorClass}`.trim();
    link.tabIndex = 0;
    link.setAttribute('data-search-item', '');
    link.setAttribute('data-note-id', note.id || note.url);
    link.setAttribute('data-search', buildSearchText(note));

    const article = document.createElement('article');
    article.className = 'post-summary';

    if (note.headline) {
      const headline = document.createElement('h2');
      headline.className = 'entry-headline';
      headline.textContent = note.headline;
      article.append(headline);

      const byline = document.createElement('div');
      byline.className = 'entry-byline';
      const author = note.author ? `by ${note.author}` : '';
      const publisher = note.publisher ? ` on ${note.publisher}` : '';
      byline.textContent = `${author}${publisher}`.trim() || publisher.trim();
      article.append(byline);

      if (Array.isArray(note.tags) && note.tags.length) {
        const tags = document.createElement('div');
        tags.className = 'tags tags-card';
        note.tags.forEach((tag) => {
          const span = document.createElement('span');
          span.className = 'tag-card';
          span.textContent = tag;
          tags.append(span);
        });
        article.append(tags);
      }

      if (note.title) {
        const noteTitle = document.createElement('div');
        noteTitle.className = 'entry-note';
        noteTitle.textContent = note.title;
        article.append(noteTitle);
      }
    } else {
      const headline = document.createElement('h2');
      headline.className = 'entry-headline';
      headline.textContent = note.title || 'Untitled note';
      article.append(headline);

      if (Array.isArray(note.tags) && note.tags.length) {
        const tags = document.createElement('div');
        tags.className = 'tags tags-card';
        note.tags.forEach((tag) => {
          const span = document.createElement('span');
          span.className = 'tag-card';
          span.textContent = tag;
          tags.append(span);
        });
        article.append(tags);
      }
    }

    if (note.dateDisplay) {
      const date = document.createElement('div');
      date.className = 'entry-date';
      date.textContent = `Noted ${note.dateDisplay}`;
      article.append(date);
    }

    link.append(article);
    return link;
  };

  const updateStatus = (remaining, total) => {
    if (!statusEl) {
      return;
    }
    if (remaining === 0) {
      statusEl.textContent = `All ${total} loaded`;
    } else {
      statusEl.textContent = `${total - remaining} of ${total}`;
    }
  };

  const loadIndex = () => fetch('/index.json').then((response) => response.json());

  let remainingNotes = [];
  let totalNotes = 0;
  let loading = false;
  let paused = false;
  let allowScrollLoads = false;

  const appendBatch = (count) => {
    if (loading || remainingNotes.length === 0 || paused) {
      return;
    }
    loading = true;
    const slice = remainingNotes.splice(0, count);
    slice.forEach((note) => {
      postsGrid.append(renderCard(note));
    });
    updateStatus(remainingNotes.length, totalNotes);
    if (remainingNotes.length === 0 && loadAllBtn) {
      loadAllBtn.disabled = true;
    }
    loading = false;
  };

  loadIndex()
    .then((notes) => {
      remainingNotes = notes.filter((note) => {
        const key = note.id || note.url;
        return key && !existingIds.has(key);
      });
      totalNotes = notes.length;
      updateStatus(remainingNotes.length, totalNotes);
      if (remainingNotes.length === 0 && loadAllBtn) {
        loadAllBtn.disabled = true;
      }

      if (loadAllBtn) {
        loadAllBtn.addEventListener('click', () => {
          appendBatch(remainingNotes.length);
        });
      }

      window.addEventListener('scroll', () => {
        allowScrollLoads = true;
      }, { passive: true });

      window.addEventListener('search-state', (event) => {
        paused = Boolean(event.detail && event.detail.active);
        if (!paused) {
          allowScrollLoads = false;
        }
      });

      if (sentinel && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (!allowScrollLoads) {
                return;
              }
              appendBatch(batchSize);
            }
          });
        }, { rootMargin: '200px' });
        observer.observe(sentinel);
      }
    })
    .catch((error) => {
      console.error('Could not load infinite scroll index:', error);
      if (statusEl) {
        statusEl.textContent = 'Infinite scroll unavailable';
      }
    });
})();
