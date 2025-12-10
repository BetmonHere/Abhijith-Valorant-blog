// ==================== MOBILE MENU TOGGLE ====================
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ==================== NEWSLETTER FORM ====================
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailRegex.test(email)) {
            showNotification('Thanks for subscribing! Check your email.', 'success');
            this.reset();
        } else {
            showNotification('Please enter a valid email address.', 'error');
        }
    });
}

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.article-card, .category-card, .stat-card').forEach(el => {
    observer.observe(el);
});

// ==================== NOTIFICATION SYSTEM ====================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#00d4aa' : '#ff4655'};
        color: #0a0e11;
        padding: 15px 25px;
        border-radius: 4px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInUp 0.3s ease;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// ==================== LAZY LOADING IMAGES ====================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ==================== SCROLL PROGRESS INDICATOR ====================
window.addEventListener('scroll', function() {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    // Can be used with a progress bar if needed
});

// ==================== ACTIVE LINK HIGHLIGHTING ====================
window.addEventListener('scroll', function() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        const targetId = link.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const rect = targetElement.getBoundingClientRect();
                if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                    navLinks.forEach(l => l.style.color = '');
                    link.style.color = 'var(--primary)';
                }
            }
        }
    });
});

// Article Modal Functionality
const articleModal = document.getElementById('articleModal');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');

// Article data for modal
const articleData = {
  'agent-guide': {
    title: 'Complete Agent Guide: Roles & Abilities Explained',
    content: `Valorant's agent roster is one of the game's most dynamic features. With over 20 agents, each with unique abilities, understanding each character's role and kit is essential for competitive play. Every agent serves a specific purpose on the team, and mastering their mechanics can be the difference between climbing ranks and stagnating. This comprehensive guide breaks down every agent's strengths, abilities, and how to use them effectively across different game situations. Whether you're new to the game or looking to expand your agent pool, understanding roles and synergies will accelerate your improvement dramatically.\n\nValorant divides agents into four distinct roles, each serving a specific purpose on the team. Duelists are designed for entry fragging and securing kills, requiring high mechanical skill and aggressive positioning. Controllers command map control through smokes and area denial, and they're critical for site executes and creating safe passages for your team. Initiators gather information and breach enemy defenses, enabling team plays by revealing enemy locations and creating openings. Finally, Sentinels provide defensive utility and protection, serving as the backbone of strong defensive setups and retakes. Understanding these roles is foundational because every competitive match relies on proper role distribution. A team with two duelists and no controllers will struggle to execute organized plays, while a team with proper balance can adapt to any situation the enemy throws at them.\n\nDuelists are the aggressive force of any team. Agents like Jett, Reyna, Raze, and Phoenix excel at taking fights and securing first kills. These agents have abilities that enhance their combat effectiveness, making them ideal for entry frags and creating momentum. Mastering a duelist requires strong aim, positioning, and timing. They thrive when the team supports their plays with utility and info. Controllers like Omen, Viper, and Brimstone shape the battlefield through smokes and area denial. They're crucial for executing organized site takes and creating safe passages for your team to move through dangerous areas. A well-coordinated team will provide smoke cover for their duelist's entry, gather intel on enemy positions, and rotate quickly to capitalize on the duelist's success.`
  },
  'aim-mechanics': {
    title: 'Mastering Aim Mechanics: Crosshair Settings & Sensitivity',
    content: `Aim is one of the most fundamental skills in Valorant. While game sense and strategy matter, the ability to land shots consistently separates casual players from competitive threats. This guide explores the science behind crosshair placement, sensitivity optimization, and proven techniques used by pro players to maintain elite-level aim. Your mouse sensitivity directly impacts your aim precision. Most pro players use lower sensitivity settings (200-400 eDPI) to maintain control and consistency during long spray transfers and clutch moments. Finding your sweet spot requires starting with a sensitivity that allows you to comfortably flick across the map without over-adjusting. Lower sensitivity demands more arm movement but rewards precision, while higher sensitivity allows faster reactions but sacrifices consistency. Once you find a sensitivity you're comfortable with, stick with it for at least 50 hours of gameplay because muscle memory requires consistency.\n\nProfessional players don't rely on flick shots alone. They pre-aim common enemy positions based on map knowledge and positioning patterns, which drastically reduces reaction time and increases your chances of landing the first shot. Always position your crosshair at head level, centered on common angles. As you move through the map, anticipate where enemies might be and aim accordingly. Valorant offers extensive crosshair customization options that you should experiment with. Consider the size of your crosshair—a clear, visible crosshair helps track moving targets. Choose a color that contrasts with most map environments, such as cyan or magenta. An outlined crosshair provides better visibility in bright areas, and many pros use a center dot for precise positioning reference. Copy crosshair settings from your favorite pro players and adjust based on your preferences. Consistency is more important than perfection, so find a setup that feels comfortable and commit to it.\n\nEach weapon in Valorant has a unique spray pattern, and mastering spray control separates average players from sharpshooters. Practice the spray patterns of your main weapons—Phantom, Vandal, and Classic—in practice ranges regularly. The key is controlling the weapon's natural recoil by moving your mouse downward as you fire. Spend 10 minutes each day in the practice range refining spray control because it's one of the best returns on investment for aim improvement. Many players neglect crosshair placement, which makes even perfect flick shots harder and should be a priority in your training routine.`
  },
  'vct-preview': {
    title: 'VCT 2025 Season Preview: Teams, Meta, & Predictions',
    content: `The VCT 2025 season is shaping up to be one of the most competitive years in Valorant esports history. With multiple regions strengthening their rosters and new teams emerging as contenders, the competitive landscape has never been more balanced. This comprehensive analysis breaks down the major teams, meta predictions, and my championship pick for the upcoming season. Understanding the team compositions, player talent levels, and strategic approaches will help you follow professional play more intelligently and predict outcomes more accurately.\n\nThe meta entering 2025 shows a shift toward aggressive initiator play and flexible controller setups. Teams are experimenting with double controller compositions on specific maps, and the rise of Chamber as a sentinel has changed defensive setups significantly. Pro teams are prioritizing communication and coordination over pure mechanical skill, leading to more structured executes and coordinated retakes. The meta also emphasizes economy management and ability usage efficiency, with teams punishing poor utility spending more severely than ever before. Teams that adapt quickly to patch changes and maintain strong fundamentals will have the advantage over those that stick rigidly to one playstyle.\n\nLooking at the major regions, EMEA continues to produce world-class talent with teams like FNC and Heretics pushing boundaries. The Americas region has become increasingly competitive, with teams like SEN and LOUD fighting for supremacy. The Pacific region remains a wildcard, with teams like PRX and T1 capable of competing at the highest level. My championship prediction is based on team synergy, player form, and strategic flexibility. The team that wins will likely be one that can adapt mid-series, maintain mental resilience through long tournaments, and execute under pressure. Following these teams throughout the season will provide valuable insights into high-level Valorant strategy and team coordination.`
  },
  'pro-income': {
    title: 'How Pro Valorant Players Make Money: Complete Guide',
    content: `Professional Valorant players earn money through multiple streams, and understanding these income sources is crucial for aspiring esports athletes. The primary income comes from team salaries, which vary significantly based on team prestige, region, and league participation. Teams competing in franchised leagues like VCT offer higher salaries compared to open circuit teams. Prize money from tournaments provides additional income, with international tournaments offering substantial prize pools. Major VCT events distribute millions of dollars among competing teams, making tournament success a significant income source for professional players.\n\nBeyond competition, sponsorships represent a major income stream for professional players. Esports organizations, peripheral manufacturers, and energy drink brands pay players for endorsements and product usage. Content creation through streaming and YouTube has become increasingly lucrative, with top players earning substantial revenue from ads and subscriptions. Many pro players maintain Twitch channels or YouTube channels where they stream gameplay, analysis, and educational content. Building a personal brand through content creation creates long-term income stability beyond tournament winnings.\n\nOther income sources include team organization salary cuts, coaching and content creation, and brand partnerships. Some players offer coaching services to aspiring players, charging hourly rates for gameplay analysis and strategy sessions. Organizations also provide performance bonuses for tournament wins and playoff appearances, incentivizing high-level play. Understanding these income streams helps aspiring players plan their esports careers strategically. Success in professional Valorant requires not just mechanical skill but also personal branding, consistency, and adaptability to maintain relevance and income in a competitive ecosystem. The most successful players diversify their income sources rather than relying solely on tournament winnings.`
  }
};

// Open modal
function openArticleModal(articleKey) {
  const article = articleData[articleKey];
  if (article) {
    modalTitle.textContent = article.title;
    modalContent.textContent = article.content;
    articleModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
  }
}

// Close modal
function closeArticleModal() {
  articleModal.classList.remove('active');
  document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Event listeners
modalClose.addEventListener('click', closeArticleModal);

// Close modal when clicking outside the content
articleModal.addEventListener('click', function(e) {
  if (e.target === articleModal) {
    closeArticleModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && articleModal.classList.contains('active')) {
    closeArticleModal();
  }
});

// Prevent modal close when clicking inside modal-content
document.querySelector('.modal-content').addEventListener('click', function(e) {
  e.stopPropagation();
});