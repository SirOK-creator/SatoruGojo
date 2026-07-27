// ==================== ПЕРСОНАЖИ ====================
const IMG_PATH = 'images/characters/';
const IMG_EXT = '.webp';

const characters = [
    // ========== РАДОСТЬ ==========
    { id:"akari_nitta", name:"Акари Нитта", rarity:"SR", element:"радость", limited:false, tags:[], icon:"🌸", stats:{hp:4200, atk:580, def:320, spd:95} },
    { id:"bugman", name:"Бугман", rarity:"SR", element:"радость", limited:false, tags:[], icon:"🐛", stats:{hp:3900, atk:610, def:280, spd:100} },
    { id:"panda", name:"Панда", rarity:"SSR", element:"радость", limited:false, tags:["танк"], icon:"🐼", stats:{hp:6800, atk:720, def:650, spd:85} },
    { id:"ui_ui", name:"Уй Уй", rarity:"SSR", element:"радость", limited:false, tags:["саппорт"], icon:"🌀", stats:{hp:5200, atk:480, def:400, spd:110} },
    { id:"toji_fushiguro", name:"Тодзи Фушигуро", rarity:"SSR", element:"радость", limited:false, tags:["атакующий","физический"], icon:"🗡️", stats:{hp:5500, atk:1100, def:380, spd:108} },
    { id:"toge_inumaki", name:"Тогэ Инумаки", rarity:"SSR", element:"радость", limited:false, tags:["контроль","саппорт"], icon:"🗣️", stats:{hp:4800, atk:520, def:360, spd:105} },

    // ========== ГНЕВ ==========
    { id:"jiro_awasaka", name:"Дзиро Авасака", rarity:"SR", element:"гнев", limited:false, tags:[], icon:"⚡", stats:{hp:4000, atk:620, def:300, spd:92} },
    { id:"tsuko", name:"Цуко", rarity:"SR", element:"гнев", limited:false, tags:[], icon:"🔥", stats:{hp:3800, atk:640, def:270, spd:98} },
    { id:"nobara_kugisaki", name:"Нобара Кугисаки", rarity:"SSR", element:"гнев", limited:false, tags:["атакующий","дальний бой","игнор защиты"], icon:"🔨", stats:{hp:5000, atk:1050, def:350, spd:102} },
    { id:"momo_nishimiya", name:"Момо Нисимия", rarity:"SSR", element:"гнев", limited:false, tags:["саппорт","разведка"], icon:"🧹", stats:{hp:4600, atk:550, def:380, spd:112} },
    { id:"utahime_iori", name:"Утахимэ Иори", rarity:"SSR", element:"гнев", limited:false, tags:["саппорт","бафф"], icon:"🎤", stats:{hp:4900, atk:500, def:420, spd:100} },
    { id:"mahito", name:"Махито", rarity:"SSR", element:"гнев", limited:false, tags:["дебаффер","проклятие"], icon:"👁️", stats:{hp:5300, atk:950, def:400, spd:97} },

    // ========== ПЕЧАЛЬ ==========
    { id:"kon", name:"Кон", rarity:"SR", element:"печаль", limited:false, tags:[], icon:"🐕", stats:{hp:4100, atk:560, def:310, spd:94} },
    { id:"kechitsu", name:"Кечицу", rarity:"SR", element:"печаль", limited:false, tags:[], icon:"💧", stats:{hp:3700, atk:590, def:290, spd:101} },
    { id:"itadori_yuji", name:"Юдзи Итадори", rarity:"SSR", element:"печаль", limited:false, tags:["атакующий","физический","добивание"], icon:"👊", stats:{hp:6200, atk:980, def:500, spd:95} },
    { id:"eso", name:"Эсо", rarity:"SSR", element:"печаль", limited:false, tags:["дебаффер","яд"], icon:"🩸", stats:{hp:5100, atk:880, def:370, spd:99} },
    { id:"mai_zenin", name:"Май Зенин", rarity:"SSR", element:"печаль", limited:false, tags:["атакующий","дальний бой"], icon:"🔫", stats:{hp:4700, atk:920, def:340, spd:104} },
    { id:"junpei_yoshino", name:"Дзюнпей Ешино", rarity:"SSR", element:"печаль", limited:false, tags:["призыв"], icon:"🌊", stats:{hp:4500, atk:850, def:360, spd:96} },

    // ========== ЖАЖДА ==========
    { id:"kiyetaka_ijichi", name:"Киетака Идзити", rarity:"SR", element:"жажда", limited:false, tags:[], icon:"👓", stats:{hp:4300, atk:520, def:330, spd:90} },
    { id:"one_eyed_monk", name:"Одноглазый монах", rarity:"SR", element:"жажда", limited:false, tags:[], icon:"🧘", stats:{hp:4400, atk:500, def:350, spd:88} },
    { id:"megumi_fushiguro", name:"Мегуми Фусигуро", rarity:"SSR", element:"жажда", limited:false, tags:["универсал","шикигами","контроль зоны"], icon:"🐺", stats:{hp:5400, atk:900, def:440, spd:103} },
    { id:"noritoshi_kamo", name:"Норитоши Камо", rarity:"SSR", element:"жажда", limited:false, tags:["атакующий","кровь"], icon:"🩸", stats:{hp:5000, atk:940, def:380, spd:100} },
    { id:"ultimate_mechamaru", name:"Окончательный Мехамару", rarity:"SSR", element:"жажда", limited:false, tags:["механический","дальний бой"], icon:"🤖", stats:{hp:5600, atk:880, def:500, spd:92} },
    { id:"haruto_shigemo", name:"Харуто Шигемо", rarity:"SSR", element:"жажда", limited:false, tags:["атакующий"], icon:"⚔️", stats:{hp:4800, atk:910, def:360, spd:98} },

    // ========== СМЕРТЬ (SP) ==========
    { id:"sukuna_fushiguro", name:"Сукуна Фушигуро", rarity:"SP", element:"смерть", limited:true, tags:["атакующий","AoE","берсерк"], icon:"👑", stats:{hp:7200, atk:1400, def:520, spd:110} },
    { id:"choso", name:"Чосо", rarity:"SP", element:"смерть", limited:true, tags:["атакующий","кровь"], icon:"🩸", stats:{hp:6800, atk:1300, def:480, spd:105} },
    { id:"hanami", name:"Ханами", rarity:"SP", element:"смерть", limited:false, tags:["танк","контроль","природа"], icon:"🌿", stats:{hp:8500, atk:800, def:750, spd:80} },
    { id:"yuta_okkotsu", name:"Юта Оккоцу", rarity:"SP", element:"смерть", limited:false, tags:["атакующий","проклятая энергия","рика"], icon:"💍", stats:{hp:7000, atk:1350, def:500, spd:108} },
    { id:"hajime_kashimo", name:"Хаджиме Кашимо", rarity:"SP", element:"смерть", limited:false, tags:["атакующий","молния"], icon:"⚡", stats:{hp:6600, atk:1380, def:460, spd:115} },
    { id:"suguru_geto", name:"Сугуру Гето", rarity:"SP", element:"смерть", limited:false, tags:["контроль","саппорт","проклятия"], icon:"🐉", stats:{hp:6400, atk:1100, def:540, spd:100} },
    { id:"satoru_gojo", name:"Сатору Годжо", rarity:"SP", element:"смерть", limited:false, tags:["атакующий","неуязвимость","контроль"], icon:"🔵", stats:{hp:7500, atk:1450, def:580, spd:120} },
    { id:"maki", name:"Маки", rarity:"SP", element:"смерть", limited:false, tags:["атакующий","физический","игнор барьеров"], icon:"🗡️", stats:{hp:6900, atk:1320, def:490, spd:112} },
    { id:"hiromi_higuruma", name:"Хироми Хигурума", rarity:"SP", element:"смерть", limited:false, tags:["дебаффер","суд"], icon:"⚖️", stats:{hp:6300, atk:1150, def:520, spd:98} },

    // ========== ЖИЗНЬ (SP) ==========
    { id:"hana_kurusu", name:"Хана Курусу", rarity:"SP", element:"жизнь", limited:true, tags:["саппорт","ангел"], icon:"👼", stats:{hp:6500, atk:700, def:550, spd:105} },
    { id:"sukuna", name:"Сукуна", rarity:"SP", element:"жизнь", limited:false, tags:["атакующий","AoE","берсерк"], icon:"👹", stats:{hp:7800, atk:1500, def:500, spd:108} },
    { id:"kinji_hakari", name:"Кинджи Хакари", rarity:"SP", element:"жизнь", limited:false, tags:["танк","регенерация","гемблинг"], icon:"🎰", stats:{hp:8200, atk:850, def:700, spd:85} },
    { id:"kento_nanami", name:"Кэнто Нанами", rarity:"SP", element:"жизнь", limited:false, tags:["атакующий","крит","уязвимые точки"], icon:"⏰", stats:{hp:6700, atk:1360, def:510, spd:102} },
    { id:"seko_ieiri", name:"Секо Иэйри", rarity:"SP", element:"жизнь", limited:false, tags:["хилер","саппорт"], icon:"💚", stats:{hp:6000, atk:500, def:480, spd:98} },
    { id:"aoi_todo", name:"Аой Тодо", rarity:"SP", element:"жизнь", limited:false, tags:["танк","физический","переключение"], icon:"🤜", stats:{hp:8000, atk:900, def:680, spd:90} },
    { id:"mei_mei", name:"Мэй Мэй", rarity:"SP", element:"жизнь", limited:false, tags:["атакующий","птицы","дальний бой"], icon:"🐦", stats:{hp:6400, atk:1280, def:470, spd:110} },
    { id:"satoru_gojo_shinfan", name:"Сатору Годжо (Синфан)", rarity:"SP", element:"жизнь", limited:true, tags:["атакующий","неуязвимость","лимитка"], icon:"✨", stats:{hp:7600, atk:1480, def:590, spd:122} }
];

// ==================== РЕЖИМЫ ====================
const gameModes = [
    { id:"story", name:"Основной сюжет", type:"pve", subModes:[] },
    { id:"demonic_clash", name:"Демоническая схватка", type:"pve", subModes:[] },
    { id:"dead_end_trials", name:"Тупиковые испытания", type:"pve", subModes:[] },
    { id:"endless_battle", name:"Бесконечная битва", type:"pve", subModes:["Основная","Глава Гнева","Глава Радости","Глава Печали","Глава Жажды"] },
    { id:"endless_bloody_battle", name:"Бесконечная кровавая битва", type:"pve", subModes:[] },
    { id:"special_rank", name:"Покорение особого ранга", type:"pve", subModes:[] },
    { id:"arena", name:"Арена", type:"pvp", subModes:["Бесконечная арена","Магический матч эшелона","Драка Сендая"] },
    { id:"shibuya_station", name:"Станция Сибуя", type:"pve", subModes:[] },
    { id:"magic_duel", name:"Магическая дуэль", type:"pvp", subModes:[] },
    { id:"night_parade", name:"Ночные парады сотни чудовищ", type:"pve_coop", subModes:["Одиночный режим","Групповой режим"] },
    { id:"tech_college_lessons", name:"Уроки Технического колледжа", type:"pve_training", subModes:["Баланс","Оборона","Атаковать","Прочность","Иммунитет к Рукопашному бою","Иммунитет к Проклятой технике","Проклятый предмет"] }
];

// ==================== ШАБЛОНЫ ДЕТАЛЕЙ ====================

// SR: 1 скилл, без сеанса, без обетов
function createSRDetails() {
    return {
        charClass: '—',
        gearType: '—',
        artifacts: [],
        weapon: null,
        equipment: [],
        skills: [
            { id: 'sk1', name: 'Базовая атака', desc: 'Наносит 100% урона цели', img: '' }
        ],
        session: null,
        vows: []
    };
}

// SSR и SP: 4 скилла + сеанс + 4 обета + 5 снаряжения + 4 артефакта + оружие
function createFullDetails() {
    return {
        charClass: '—',
        gearType: '—',
        artifacts: [
            { id: 'art1', name: 'Артефакт 1', desc: '', img: '' },
            { id: 'art2', name: 'Артефакт 2', desc: '', img: '' },
            { id: 'art3', name: 'Артефакт 3', desc: '', img: '' },
            { id: 'art4', name: 'Артефакт 4', desc: '', img: '' }
        ],
        weapon: { id: 'wpn1', name: 'Оружие', desc: '', img: '' },
        equipment: [
            { id: 'eq1', name: 'Снаряжение 1', desc: '', img: '' },
            { id: 'eq2', name: 'Снаряжение 2', desc: '', img: '' },
            { id: 'eq3', name: 'Снаряжение 3', desc: '', img: '' },
            { id: 'eq4', name: 'Снаряжение 4', desc: '', img: '' },
            { id: 'eq5', name: 'Снаряжение 5', desc: '', img: '' }
        ],
        skills: [
            { id: 'sk1', name: 'Скилл 1', desc: '', img: '' },
            { id: 'sk2', name: 'Скилл 2', desc: '', img: '' },
            { id: 'sk3', name: 'Скилл 3', desc: '', img: '' },
            { id: 'sk4', name: 'Ультимейт', desc: '', img: '' }
        ],
        session: { id: 'ses1', name: 'Сеанс', desc: '', img: '' },
        vows: [
            { id: 'vow1', name: 'Обет 1', desc: '', img: '' },
            { id: 'vow2', name: 'Обет 2', desc: '', img: '' },
            { id: 'vow3', name: 'Обет 3', desc: '', img: '' },
            { id: 'vow4', name: 'Обет 4', desc: '', img: '' }
        ]
    };
}

// ==================== ЗАПОЛНЯЕМ ВСЕХ ====================
const charDetails = {};

characters.forEach(c => {
    if (c.rarity === 'SR') {
        charDetails[c.id] = createSRDetails();
    } else {
        charDetails[c.id] = createFullDetails();
    }
});

// ==================== САТОРУ ГОДЖО (ОБРАЗЕЦ ЗАПОЛНЕНИЯ) ====================
charDetails['satoru_gojo'] = {
    charClass: 'Стрелок',
    gearType: 'Снаряжение Ловкости',
    artifacts: [
        { id: 'art1', name: 'Проклятый дух', desc: 'Сет на урон проклятой техникой', img: '' },
        { id: 'art2', name: 'Проклятый дух', desc: 'Сет на урон проклятой техникой', img: '' },
        { id: 'art3', name: 'Глаз всевидящего', desc: 'Сет на скорость', img: '' },
        { id: 'art4', name: 'Глаз всевидящего', desc: 'Сет на скорость', img: '' }
    ],
    weapon: { id: 'wpn1', name: 'Печать бесконечности', desc: 'Усиливает проклятую энергию', img: '' },
    equipment: [
        { id: 'eq1', name: 'Шляпа мудреца', desc: '', img: '' },
        { id: 'eq2', name: 'Мантия звёзд', desc: '', img: '' },
        { id: 'eq3', name: 'Кольцо силы', desc: '', img: '' },
        { id: 'eq4', name: 'Пояс тьмы', desc: '', img: '' },
        { id: 'eq5', name: 'Сапоги скорости', desc: '', img: '' }
    ],
    skills: [
        { id: 'sk1', name: 'Бесконечность', desc: 'Блокирует 40% входящего урона. Пассивная.', img: '' },
        { id: 'sk2', name: 'Синий', desc: 'Притягивает врагов, наносит 200% урона. CD: 2', img: '' },
        { id: 'sk3', name: 'Красный', desc: 'Отталкивает врагов, наносит 250% урона. CD: 3', img: '' },
        { id: 'sk4', name: 'Фиолетовый', desc: '350% урона всем, игнорирует защиту. CD: 6', img: '' }
    ],
    session: { id: 'ses1', name: 'Безграничная пустота', desc: 'Оглушает всех врагов на 1 ход', img: '' },
    vows: [
        { id: 'vow1', name: 'Обет раскрытия', desc: '+25% к урону, враги видят способности', img: '' },
        { id: 'vow2', name: 'Обет скорости', desc: '+15% к скорости, -10% к защите', img: '' },
        { id: 'vow3', name: 'Обет мощи', desc: '+20% к крит. урону', img: '' },
        { id: 'vow4', name: 'Обет стойкости', desc: '+15% к здоровью', img: '' }
    ]
};