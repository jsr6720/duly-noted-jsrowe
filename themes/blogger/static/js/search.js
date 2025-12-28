(() => {
  const input = document.querySelector('[data-search-input]');
  if (!input) {
    return;
  }

  const countEl = document.querySelector('[data-search-count]');
  const emptyEl = document.querySelector('[data-search-empty]');
  const clearBtn = document.querySelector('[data-search-clear]');
  const loadAllBtn = document.querySelector('[data-load-all]');
  const infiniteControls = document.querySelector('[data-infinite-controls]');
  let allPostsLoaded = false;

  const parseSearchQuery = (query) => {
    const terms = [];
    const regex = /"([^"]+)"|(\S+)/g;
    let match;
    while ((match = regex.exec(query)) !== null) {
      terms.push(match[1] || match[2]);
    }
    return terms.map(term => term.toLowerCase());
  };

  const applyDomFilter = (query) => {
    const needle = query.trim();
    const searchTerms = parseSearchQuery(needle);
    const items = Array.from(document.querySelectorAll('[data-search-item]'));
    let visible = 0;

    items.forEach((item) => {
      const haystack = (item.getAttribute('data-search') || '').toLowerCase();
      const match = searchTerms.length === 0 || searchTerms.every(term => haystack.includes(term));
      item.style.display = match ? '' : 'none';
      if (match) {
        visible += 1;
      }
    });

    if (countEl) {
      if (needle) {
        const postWord = visible === 1 ? 'post' : 'posts';
        countEl.textContent = `${visible} ${postWord} found`;
      } else {
        countEl.textContent = '';
      }
    }

    if (emptyEl) {
      emptyEl.hidden = visible !== 0;
    }

    // Hide "Load all" button during search since we auto-load everything
    if (infiniteControls) {
      infiniteControls.style.display = needle ? 'none' : '';
    }
  };

  const waitForPostsLoaded = (callback, maxAttempts = 100) => {
    const statusEl = document.querySelector('[data-load-status]');
    const items = document.querySelectorAll('[data-search-item]');

    // Check if status says "All X loaded"
    if (statusEl && statusEl.textContent.startsWith('All ')) {
      callback();
      return;
    }

    // Or check if Load All button is disabled (meaning all loaded)
    if (loadAllBtn && loadAllBtn.disabled) {
      callback();
      return;
    }

    // Still loading, wait and retry
    if (maxAttempts > 0) {
      setTimeout(() => waitForPostsLoaded(callback, maxAttempts - 1), 100);
    } else {
      // Timeout - just filter what we have
      console.warn('Timeout waiting for posts to load, filtering current posts');
      callback();
    }
  };

  const applyIndexFilter = (query) => {
    const needle = query.trim();

    // Update URL hash without creating history entries
    if (needle) {
      const newUrl = `${window.location.pathname}#q=${encodeURIComponent(needle)}`;
      history.replaceState(null, '', newUrl);
    } else {
      history.replaceState(null, '', window.location.pathname);
    }

    // Auto-load all posts when search starts so we can search everything
    if (needle && !allPostsLoaded) {
      // Wait for infinite scroll to initialize
      setTimeout(() => {
        if (loadAllBtn && !loadAllBtn.disabled) {
          loadAllBtn.click();
          allPostsLoaded = true;
          // Wait for all posts to actually load
          waitForPostsLoaded(() => applyDomFilter(query));
        } else {
          // Already loaded or no button
          allPostsLoaded = true;
          applyDomFilter(query);
        }
      }, 100);
      return;
    }

    applyDomFilter(query);
  };

  input.addEventListener('input', (event) => {
    applyIndexFilter(event.target.value);
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      input.value = '';
      history.replaceState(null, '', window.location.pathname);
      applyIndexFilter('');
      input.focus();
    });
  }

  // Handle #q= hash parameter for pre-filled searches
  const hash = window.location.hash.substring(1); // Remove #
  const hashParams = new URLSearchParams(hash);
  const preset = hashParams.get('q');
  if (preset) {
    input.value = preset;
    applyIndexFilter(preset);
  }
})();
