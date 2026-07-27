// ==================== СОСТОЯНИЕ ====================
let activeRarity = 'all';
let activeElement = 'all';
let team = [null, null, null];
const loadedImages = {};

// ==================== УТИЛИТЫ ====================
function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function getImgPath(charId) { return IMG_PATH + charId + IMG_EXT; }

// ==================== КАРТИНКИ КАРТОЧЕК ====================
function getCardImageHTML(char) {
    const imgPath = getImgPath(char.id);
    if (loadedImages[char.id] === true) {
        return `<img src="${imgPath}" alt="${char.name}" loading="lazy">`;
    }
    if (loadedImages[char.id] === false) {
        return `<span class="char-placeholder">${char.icon}</span><span class="no-image-text">нет изображения</span>`;
    }
    return `<img src="${imgPath}" alt="${char.name}" loading="lazy"
                onload="loadedImages['${char.id}']=true;this.nextElementSibling.style.display='none';"
                onerror="loadedImages['${char.id}']=false;this.style.display='none';this.nextElementSibling.style.display='flex';">
            <span class="char-placeholder" style="display:none;">${char.icon}</span>
            <span class="no-image-text" style="display:none;">нет изображения</span>`;
}

// ==================== ОТРИСОВКА ПЕРСОНАЖЕЙ ====================
function renderCharacters() {
    const grid = document.getElementById('character-grid');
    const filtered = characters.filter(c => {
        if (activeRarity !== 'all' && c.rarity !== activeRarity) return false;
        if (activeElement !== 'all' && c.element !== activeElement) return false;
        return true;
    });
    grid.innerHTML = filtered.map(c => `
        <div class="card" data-rarity="${c.rarity}" data-id="${c.id}" onclick="openModal('${c.id}')">
            <div class="card-image">
                ${getCardImageHTML(c)}
                <span class="card-rarity-badge">${c.rarity}</span>
            </div>
            <div class="card-body">
                <span class="card-element element-${c.element}">${capitalize(c.element)}</span>
                <div class="card-name">${c.name}</div>
                <div class="card-tags">
                    ${c.tags.slice(0,3).map(t => `<span class="tag">${t}</span>`).join('')}
                    ${c.limited ? '<span class="tag limited">Лимитка</span>' : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// ==================== МОДАЛЬНОЕ ОКНО ====================
function openModal(charId) {
    const char = characters.find(c => c.id === charId);
    const details = charDetails[charId];
    if (!char || !details) return;

    const overlay = document.getElementById('modal-overlay');
    const center = document.getElementById('modal-center');
    const portraitImg = document.getElementById('modal-portrait-img');
    const imgPath = getImgPath(char.id);

    center.setAttribute('data-rarity', char.rarity);

    // Портрет
    if (loadedImages[char.id] === true) {
        portraitImg.src = imgPath;
        portraitImg.style.display = 'block';
    } else if (loadedImages[char.id] === undefined) {
        portraitImg.src = imgPath;
        portraitImg.style.display = 'block';
        portraitImg.onload = () => { loadedImages[char.id] = true; };
        portraitImg.onerror = () => { loadedImages[char.id] = false; portraitImg.style.display = 'none'; };
    } else {
        portraitImg.style.display = 'none';
    }

    // Бейдж, имя, класс, тип
    document.getElementById('modal-rarity-badge').textContent = char.rarity;
    const limitedTag = document.getElementById('modal-limited-tag');
    if (char.limited) { limitedTag.textContent = 'Лимитка'; limitedTag.style.display = 'inline-block'; }
    else { limitedTag.style.display = 'none'; }

    document.getElementById('modal-name').textContent = char.name;
    document.getElementById('modal-class').textContent = details.charClass;
    document.getElementById('modal-gear-type').textContent = details.gearType;

    // Артефакты + оружие
    const artifactRow = document.getElementById('artifact-row');
    artifactRow.innerHTML = '';
    details.artifacts.forEach(a => artifactRow.innerHTML += renderIconSlot(a));
    if (details.weapon) artifactRow.innerHTML += renderIconSlot(details.weapon);

    // Снаряжение
    const equipRow = document.getElementById('equipment-row');
    equipRow.innerHTML = '';
    details.equipment.forEach(e => equipRow.innerHTML += renderIconSlot(e));

    // Обеты
    const vowRow = document.getElementById('vow-row');
    vowRow.innerHTML = '';
    details.vows.forEach(v => vowRow.innerHTML += renderIconSlot(v));

    // Скиллы
    const skillsGrid = document.getElementById('skills-grid');
    skillsGrid.innerHTML = '';
    details.skills.forEach(s => skillsGrid.innerHTML += renderSkillSlot(s));

    // Сеанс
    const sessionSlot = document.getElementById('session-slot');
    if (details.session) {
        sessionSlot.innerHTML = details.session.img
            ? `<img src="${details.session.img}" alt="${details.session.name}">`
            : `<span class="placeholder">🌀</span>`;
        sessionSlot.onmouseenter = (e) => showTooltip(e, details.session.name, details.session.desc);
        sessionSlot.onmouseleave = hideTooltip;
    } else {
        sessionSlot.innerHTML = `<span class="placeholder">—</span>`;
        sessionSlot.onmouseenter = null;
        sessionSlot.onmouseleave = null;
    }

    switchModalTab('attributes');
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function renderIconSlot(item) {
    const imgTag = item.img ? `<img src="${item.img}" alt="${item.name}">` : '';
    const placeholder = item.img ? `<span class="placeholder" style="display:none;">?</span>` : `<span class="placeholder">?</span>`;
    return `<div class="icon-slot" onmouseenter="showTooltip(event, '${item.name}', '${item.desc || ''}')" onmouseleave="hideTooltip()">${imgTag}${placeholder}</div>`;
}

function renderSkillSlot(skill) {
    const imgTag = skill.img ? `<img src="${skill.img}" alt="${skill.name}">` : `<span class="placeholder">✦</span>`;
    return `<div class="skill-slot" onmouseenter="showTooltip(event, '${skill.name}', '${skill.desc || ''}')" onmouseleave="hideTooltip()">${imgTag}</div>`;
}

// ==================== ПОДСКАЗКИ ====================
function showTooltip(event, title, desc) {
    const tooltip = document.getElementById('tooltip');
    document.getElementById('tooltip-title').textContent = title;
    document.getElementById('tooltip-desc').textContent = desc;
    tooltip.style.display = 'block';
    tooltip.style.left = Math.min(event.clientX + 16, window.innerWidth - 270) + 'px';
    tooltip.style.top = Math.max(event.clientY - 40, 10) + 'px';
}

function hideTooltip() { document.getElementById('tooltip').style.display = 'none'; }

document.addEventListener('mousemove', (e) => {
    const tooltip = document.getElementById('tooltip');
    if (tooltip.style.display === 'block') {
        tooltip.style.left = Math.min(e.clientX + 16, window.innerWidth - 270) + 'px';
        tooltip.style.top = Math.max(e.clientY - 40, 10) + 'px';
    }
});

// ==================== ВКЛАДКИ МОДАЛЬНОГО ОКНА ====================
function switchModalTab(tabName) {
    document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.modal-tab[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById('modal-artifacts').style.display = tabName === 'attributes' ? 'block' : 'none';
    document.getElementById('modal-equipment').style.display = tabName === 'attributes' ? 'block' : 'none';
    document.getElementById('modal-vows').style.display = tabName === 'training' ? 'block' : 'none';
}

document.querySelector('.modal-left').addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-tab')) switchModalTab(e.target.dataset.tab);
});

// ==================== ЗАКРЫТИЕ ====================
function closeModal() {
    document.getElementById('modal-overlay').style.display = 'none';
    document.body.style.overflow = '';
}
document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-overlay').addEventListener('click', (e) => { if (e.target === e.currentTarget) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// ==================== РЕЖИМЫ ====================
function renderModes() {
    const grid = document.getElementById('modes-grid');
    grid.innerHTML = gameModes.map(m => `
        <div class="mode-card">
            <span class="mode-type type-${m.type}">${m.type.toUpperCase()}</span>
            <div class="mode-name">${m.name}</div>
            ${m.subModes.length ? `<ul class="submode-list">${m.subModes.map(s => `<li>${s}</li>`).join('')}</ul>` : ''}
        </div>
    `).join('');
}

// ==================== СОБЫТИЯ ====================
document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
        if (tab.dataset.tab === 'modes') renderModes();
        if (tab.dataset.tab === 'builder') {  }
    });
});

document.getElementById('rarity-filters').addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
        document.querySelectorAll('#rarity-filters .filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        activeRarity = e.target.dataset.rarity;
        renderCharacters();
    }
});

document.getElementById('element-filters').addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
        document.querySelectorAll('#element-filters .filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        activeElement = e.target.dataset.element;
        renderCharacters();
    }
});

// ==================== ГАЧА-ВЕРБОВКА ====================
const gachaIcons = ['🔮', '✨', '💠', '🌀', '⚡'];

function pullGacha(count) {
    const buttons = document.querySelectorAll('.gacha-btn');
    buttons.forEach(b => b.classList.add('disable'));
    
    const resultDiv = document.getElementById('gacha-result');
    resultDiv.innerHTML = `
        <div class="gacha-rolling">
            ${gachaIcons.map(icon => `<div class="rolling-card">${icon}</div>`).join('')}
        </div>
    `;

    setTimeout(() => {
        const results = [];
        for (let i = 0; i < count; i++) {
            results.push(rollCharacter());
        }
        renderGachaResults(results);
        buttons.forEach(b => b.classList.remove('disable'));
    }, count <= 10 ? 1200 : 2000);
}

function rollCharacter() {
    const roll = Math.random() * 100;
    let pool, rarity;
    
    if (roll < 3) {
        pool = characters.filter(c => c.rarity === 'SP');
        rarity = 'SP';
    } else if (roll < 15) {
        pool = characters.filter(c => c.rarity === 'SSR');
        rarity = 'SSR';
    } else if (roll < 50) {
        pool = characters.filter(c => c.rarity === 'SR');
        rarity = 'SR';
    } else {
        pool = characters.filter(c => c.rarity === 'SR');
        rarity = 'R';
    }
    
    const char = pool[Math.floor(Math.random() * pool.length)];
    return { ...char, displayRarity: rarity };
}

function renderGachaResults(results) {
    const resultDiv = document.getElementById('gacha-result');
    
    if (results.length === 1) {
        // Одна карточка по центру
        resultDiv.innerHTML = `
            <div style="display:flex;justify-content:center;align-items:center;width:100%;">
                ${renderGachaCard(results[0])}
            </div>
        `;
        // Фикс ширины одиночной карточки
        const card = resultDiv.querySelector('.gacha-card');
        if (card) card.style.width = '200px';
    } else {
        resultDiv.innerHTML = `<div class="gacha-cards-grid">${results.map(c => renderGachaCard(c)).join('')}</div>`;
    }
    
    // Проверяем картинки
    results.forEach(c => {
        if (loadedImages[c.id] === undefined) {
            const img = new Image();
            img.onload = () => { loadedImages[c.id] = true; updateGachaImages(c.id); };
            img.onerror = () => { loadedImages[c.id] = false; };
            img.src = getImgPath(c.id);
        }
    });
    
    // Искры
    setTimeout(() => {
        document.querySelectorAll('.gacha-card[data-rarity="SSR"] .gacha-sparkles, .gacha-card[data-rarity="SP"] .gacha-sparkles').forEach(el => {
            const rarity = el.closest('.gacha-card').dataset.rarity;
            createSparkles(el, rarity);
        });
    }, 200);
}

function updateGachaImages(charId) {
    const imgPath = getImgPath(charId);
    document.querySelectorAll(`.gacha-card[data-char-id="${charId}"] .gacha-card-image`).forEach(el => {
        if (loadedImages[charId] === true) {
            el.innerHTML = `<img src="${imgPath}" alt="">`;
        }
    });
}

function renderGachaCard(char) {
    const imgPath = getImgPath(char.id);
    const showImg = loadedImages[char.id] === true;
    
    let imageHTML;
    if (showImg) {
        imageHTML = `<img src="${imgPath}" alt="${char.name}">`;
    } else {
        imageHTML = `<span class="char-icon">${char.icon}</span>`;
    }
    
    const showSparkles = char.displayRarity === 'SP' || char.displayRarity === 'SSR';
    
    return `
        <div class="gacha-card" data-rarity="${char.displayRarity}" data-char-id="${char.id}">
            <div class="gacha-card-image">
                ${imageHTML}
                ${showSparkles ? '<div class="gacha-sparkles"></div>' : ''}
            </div>
            <div class="gacha-card-body">
                <div class="gacha-card-rarity">${char.displayRarity}</div>
                <div class="gacha-card-name">${char.name}</div>
                <span class="card-element element-${char.element}">${capitalize(char.element)}</span>
            </div>
        </div>
    `;
}

function createSparkles(container, rarity) {
    const sparkleClass = rarity === 'SP' ? 'silver' : 'gold';
    for (let i = 0; i < 15; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = `sparkle ${sparkleClass}`;
        sparkle.style.left = '50%';
        sparkle.style.top = '50%';
        sparkle.style.setProperty('--dx', (Math.random() - 0.5) * 160 + 'px');
        sparkle.style.setProperty('--dy', (Math.random() - 0.5) * 160 + 'px');
        sparkle.style.animationDelay = Math.random() * 0.4 + 's';
        container.appendChild(sparkle);
    }
}

// ==================== ЗАПУСК ====================
renderCharacters();