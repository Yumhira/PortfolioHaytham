function syncVeilleLayout() {
    const veilleContent = document.querySelector('.veille-content');
    const veilleLayout = document.querySelector('.veille-layout');
    if (!veilleContent || !veilleLayout) return;

    const contentHeight = veilleContent.getBoundingClientRect().height;
    if (contentHeight > 0) {
        veilleLayout.style.setProperty('--veille-content-height', `${contentHeight}px`);
    }
}

// Maintient la colonne RSS à la hauteur du contenu de la veille.
function initVeilleLayout() {
    const veilleContent = document.querySelector('.veille-content');
    if (!veilleContent) return;

    const resizeObserver = new ResizeObserver(() => {
        syncVeilleLayout();
    });

    resizeObserver.observe(veilleContent);
    window.addEventListener('resize', syncVeilleLayout);
}

async function loadVeilleRSS() {
    const rssFeeds = [
        { url: 'https://aws.amazon.com/blogs/devops/feed/', name: 'AWS DevOps' },
        { url: 'https://www.scrum.org/feed', name: 'Scrum.org' },
    ];

    const feedContainer = document.getElementById('rss-feed-container');
    if (!feedContainer) return;

    const feedResults = await Promise.all(rssFeeds.map(async feed => {
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (!response.ok || data.status !== 'ok') {
                throw new Error(data.message || `HTTP ${response.status}`);
            }

            return data.items.map(item => ({
                ...item,
                sourceName: feed.name
            }));
        } catch (error) {
            console.error(`Impossible de charger le flux ${feed.name}:`, error);
            return [];
        }
    }));

    const allItems = feedResults.flat();

    if (allItems.length === 0) {
        feedContainer.innerHTML = '<p style="color: var(--text-secondary); text-align: center;">Les actualités sont temporairement indisponibles. Réessayez plus tard.</p>';
        return;
    }

    allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    const topArticles = allItems.slice(0, 25);
    let html = '';

    topArticles.forEach(item => {
        const date = new Date(item.pubDate);
        const formattedDate = date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
        const description = (item.description || '').replace(/(<([^>]+)>)/gi, '');

        html += `
            <div class="news-card">
                <div class="news-meta">
                    <span>${formattedDate}</span>
                    <span class="news-source">${item.sourceName}</span>
                </div>
                <h4 class="news-title">${item.title}</h4>
                <p class="news-excerpt">${description}</p>
                <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="news-link">
                    Lire l'article
                </a>
            </div>
        `;
    });

    feedContainer.innerHTML = html;
}

setTimeout(loadVeilleRSS, 1000);
