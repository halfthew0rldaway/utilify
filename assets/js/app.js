/* ========================================
   UTILIFY V2 — Main Application
   ======================================== */

const App = (() => {
    const FAVORITES_KEY = 'utilify-favorites';
    const RECENTS_KEY = 'utilify-recents';

    // --- Favorites ---
    function getFavorites() {
        try {
            return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
        } catch { return []; }
    }

    function isFavorite(slug) {
        return getFavorites().includes(slug);
    }

    function toggleFavorite(slug) {
        const favs = getFavorites();
        const idx = favs.indexOf(slug);
        if (idx > -1) {
            favs.splice(idx, 1);
        } else {
            favs.push(slug);
        }
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
        updateFavoriteButtons();
    }

    function updateFavoriteButtons() {
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            const slug = btn.dataset.slug;
            btn.classList.toggle('active', isFavorite(slug));
        });
    }

    // --- Recently Used ---
    function getRecent() {
        try {
            return JSON.parse(localStorage.getItem(RECENTS_KEY)) || [];
        } catch { return []; }
    }

    function addRecent(slug) {
        let recents = getRecent();
        recents = recents.filter(r => r !== slug);
        recents.unshift(slug);
        recents = recents.slice(0, 8);
        localStorage.setItem(RECENTS_KEY, JSON.stringify(recents));
    }

    // --- Homepage Logic ---
    function initHomepage() {
        const searchInput = document.getElementById('search-input');
        const categoryTabs = document.querySelectorAll('.category-tab');
        const toolsGrid = document.getElementById('tools-grid');
        if (!toolsGrid) return;

        const allCards = Array.from(toolsGrid.querySelectorAll('.tool-card'));
        let activeCategory = 'all';

        // Category filter
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                categoryTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                activeCategory = tab.dataset.category;
                filterCards();
            });
        });

        // Search filter
        if (searchInput) {
            searchInput.addEventListener('input', () => filterCards());
        }

        function filterCards() {
            const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
            let visibleCount = 0;

            allCards.forEach(card => {
                const name = card.dataset.name || '';
                const category = card.dataset.category || '';
                const keywords = card.dataset.keywords || '';

                const matchesCategory = activeCategory === 'all' || category === activeCategory;
                const matchesSearch = !query || name.includes(query) || category.includes(query) || keywords.includes(query);

                const visible = matchesCategory && matchesSearch;
                card.style.display = visible ? '' : 'none';
                if (visible) visibleCount++;
            });

            // Show/hide empty state
            let emptyState = toolsGrid.parentElement.querySelector('.empty-state');
            if (visibleCount === 0) {
                if (!emptyState) {
                    emptyState = document.createElement('div');
                    emptyState.className = 'empty-state';
                    emptyState.innerHTML = '<p>No tools match your search.</p>';
                    toolsGrid.parentElement.appendChild(emptyState);
                }
                emptyState.style.display = '';
            } else if (emptyState) {
                emptyState.style.display = 'none';
            }
        }

        // Favorite buttons
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(btn.dataset.slug);
                Toast.show(isFavorite(btn.dataset.slug) ? 'Added to favorites' : 'Removed from favorites');
            });
        });

        updateFavoriteButtons();

        // Render recent tools
        renderRecentSection();
    }

    function renderRecentSection() {
        const recentSection = document.getElementById('recent-section');
        const recentGrid = document.getElementById('recent-grid');
        if (!recentSection || !recentGrid) return;

        const recents = getRecent();
        if (recents.length === 0) {
            recentSection.style.display = 'none';
            return;
        }

        recentSection.style.display = '';
        const toolLookup = {};
        CommandPalette.toolList.forEach(t => { toolLookup[t.slug] = t; });

        recentGrid.innerHTML = recents.map(slug => {
            const tool = toolLookup[slug];
            if (!tool) return '';
            return `<a href="pages/${slug}.html" class="tool-card" data-name="${tool.name.toLowerCase()}" data-category="${tool.category.toLowerCase()}" data-keywords="${tool.keywords}">
                <div class="card-category">${tool.category}</div>
                <h3>${tool.name}</h3>
                <span class="card-link">Open Tool <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></span>
            </a>`;
        }).join('');
    }

    // --- Theme toggle binding ---
    function initThemeToggle() {
        document.querySelectorAll('.theme-toggle').forEach(btn => {
            btn.addEventListener('click', () => {
                Theme.toggle();
                Toast.show(`Switched to ${Theme.resolved()} mode`);
            });
        });
    }

    // --- Copy to clipboard helper ---
    function copyText(text, label = 'Copied') {
        navigator.clipboard.writeText(text).then(() => {
            Toast.show(label);
        }).catch(() => {
            Toast.show('Failed to copy');
        });
    }

    // --- Init ---
    function init() {
        initThemeToggle();
        CommandPalette.init();
        Transitions.init();
        initHomepage();
    }

    return { init, copyText, getFavorites, isFavorite, toggleFavorite, getRecent, addRecent, updateFavoriteButtons };
})();

// Boot
document.addEventListener('DOMContentLoaded', App.init);
