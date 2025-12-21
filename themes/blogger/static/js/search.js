(() => {
  const input = document.querySelector('[data-search-input]');
  if (!input) {
    return;
  }

  const items = Array.from(document.querySelectorAll('[data-search-item]'));
  const postsGrid = document.querySelector('.posts');
  const resultsEl = document.querySelector('[data-search-results]');
  const countEl = document.querySelector('[data-search-count]');
  const emptyEl = document.querySelector('[data-search-empty]');
  const clearBtn = document.querySelector('[data-search-clear]');
  const paginations = Array.from(document.querySelectorAll('[data-search-pagination]'));
  const infiniteControls = document.querySelector('[data-infinite-controls]');
  let index = null;

  const setPaginationVisible = (show) => {
    paginations.forEach((pagination) => {
      pagination.style.display = show ? '' : 'none';
    });
  };

  const renderResults = (matches) => {
    if (!resultsEl) {
      return;
    }
    resultsEl.innerHTML = '';

    matches.forEach((item) => {
      const entry = document.createElement('article');
      entry.className = 'search-result';

      const title = document.createElement('a');
      title.className = 'search-result__title';
      title.href = item.url;
      title.textContent = item.headline || item.title || item.url;

      const meta = document.createElement('div');
      meta.className = 'search-result__meta';
      const metaParts = [];
      if (item.publisher) {
        metaParts.push(item.publisher);
      }
      if (item.date) {
        metaParts.push(item.date);
      }
      if (item.tags && item.tags.length) {
        metaParts.push(item.tags.join(', '));
      }
      meta.textContent = metaParts.join(' • ');

      const note = document.createElement('div');
      note.className = 'search-result__note';
      if (item.headline && item.title) {
        note.textContent = `Note: ${item.title}`;
      } else {
        note.textContent = '';
      }

      entry.append(title);
      if (meta.textContent) {
        entry.append(meta);
      }
      if (note.textContent) {
        entry.append(note);
      }
      resultsEl.append(entry);
    });
  };

  const applyDomFilter = (query) => {
    const needle = query.trim().toLowerCase();
    let visible = 0;

    items.forEach((item) => {
      const haystack = item.getAttribute('data-search') || '';
      const match = needle === '' || haystack.includes(needle);
      item.style.display = match ? '' : 'none';
      if (match) {
        visible += 1;
      }
    });

    if (countEl) {
      countEl.textContent = needle ? `${visible} of ${items.length}` : `${items.length}`;
    }

    if (emptyEl) {
      emptyEl.hidden = visible !== 0;
    }
  };

  const setSearchState = (active) => {
    document.body.dataset.searchActive = active ? 'true' : 'false';
    window.dispatchEvent(new CustomEvent('search-state', { detail: { active } }));
  };

  const applyIndexFilter = (query) => {
    if (!index) {
      applyDomFilter(query);
      return;
    }

    const needle = query.trim().toLowerCase();
    if (needle === '') {
      setSearchState(false);
      if (postsGrid) {
        postsGrid.style.display = '';
      }
      if (resultsEl) {
        resultsEl.hidden = true;
      }
      if (infiniteControls) {
        infiniteControls.style.display = '';
      }
      setPaginationVisible(true);
      if (emptyEl) {
        emptyEl.hidden = true;
      }
      if (countEl) {
        countEl.textContent = `${index.length}`;
      }
      return;
    }

    setSearchState(true);
    const matches = index.filter((item) => item.searchText.includes(needle));
    if (postsGrid) {
      postsGrid.style.display = 'none';
    }
    if (infiniteControls) {
      infiniteControls.style.display = 'none';
    }
    setPaginationVisible(false);
    renderResults(matches);
    if (resultsEl) {
      resultsEl.hidden = false;
    }
    if (countEl) {
      countEl.textContent = `${matches.length} of ${index.length}`;
    }
    if (emptyEl) {
      emptyEl.hidden = matches.length !== 0;
    }
  };

  input.addEventListener('input', (event) => {
    applyIndexFilter(event.target.value);
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      input.value = '';
      applyIndexFilter('');
      input.focus();
    });
  }

  fetch('/index.json')
    .then((response) => response.json())
    .then((data) => {
      index = data.map((item) => {
        const tags = Array.isArray(item.tags) ? item.tags : [];
        const parts = [
          item.title,
          item.headline,
          item.publisher,
          item.author,
          tags.join(' '),
          item.content
        ].filter(Boolean);
        return {
          ...item,
          tags,
          searchText: parts.join(' ').toLowerCase()
        };
      });
      applyIndexFilter(input.value);
    })
    .catch((error) => {
      console.error('Could not load search index:', error);
      applyDomFilter(input.value);
    });

  const params = new URLSearchParams(window.location.search);
  const preset = params.get('q') || params.get('tag') || params.get('publisher');
  if (preset) {
    input.value = preset;
  }
})();
