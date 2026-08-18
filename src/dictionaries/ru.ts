export const ru = {
  header: {
    allUnitsTab: "Все",
    sceneUnitsTab: "Сцена",
    sortSceneByInitiative: "Отсортировать по инициативе",
  },
  createUnit: {
    title: "Создать участника",
    selectUnitType: "Выберите тип участника",
    selectClan: "Выберите клан",
    editKindred: "Настройка сородича",
    editGhoul: "Настройка гуля",
    editHuman: "Настройка человека",
    editCreature: "Настройка существа",
    clanCurse: "Клановое проклятие",
    physical: "Физические",
    social: "Социальные",
    mental: "Ментальные",
    talents: "Таланты",
    skills: "Навыки",
    knowledges: "Знания",
    backgrounds: "Факты биографии",
    mentalStability: "Добродетели",
    merits: "Достоинства",
    flaws: "Недостатки",
    humanityOrPathRating: "Человечность/Путь",
    health: "Здоровье",
    damages: "Раны",
    healthLevels: "Настройка уровней здоровья",
  },
  details: {
    title: "Карточка персонажа",
  },
  unitRow: {
    remove: "Удалить",
    removeUnitConfirmingMessage: "Вы действительно хотите удалить участника?",
    initiative: "Инициатива",
  },
  confirmWindow: {
    confirm: "Да",
    cancel: "Отмена",
  },
  unitTypes: {
    kindred: "Сородич",
    human: "Человек",
    creature: "Существо",
    ghoul: "Гуль",
  },
  fields: {
    name: "Имя",
    player: "Игрок",
    chronicle: "Хроника",
    nature: "Натура",
    demeanor: "Маска",
    role: "Амплуа",
    clan: "Клан",
    initialGeneration: "Исходное поколение",
    sire: "Сир",
    domitor: "Домитор",
    attributes: "Характеристики",
    abilities: "Способности",
    disciplines: "Дисциплины",
    acquiredDisciplines: "Обретённые дисциплины",
    humanityOrPathRating: "Человечность/Путь",
    pillar: "Столп",
    maxWillpower: "Макс. запас воли",
    willpower: "Воля",
    maxBloodPool: "Максимум",
    bloodConsumptionLimitPerTurn: "Предел траты",
    bloodPool: "Запас крови",
  },
  calculatedFields: {
    fortitude: "Стойкость",
  },
  attributes: {
    strength: "Сила",
    dexterity: "Ловкость",
    stamina: "Выносливость",
    charisma: "Обаяние",
    manipulation: "Манипуляция",
    appearance: "Привлекательность",
    perception: "Восприятие",
    intelligence: "Интеллект",
    wits: "Смекалка",
  },
  abilities: {
    athletics: "Атлетика",
    alertness: "Бдительность",
    brawl: "Драка",
    intimidation: "Запугивание",
    expression: "Красноречие",
    leadership: "Лидерство",
    streetwise: "Уличное чутьё",
    subterfuge: "Хитрость",
    awareness: "Шестое чувство",
    empathy: "Эмпатия",
    drive: "Вождение",
    larceny: "Воровство",
    survival: "Выживание",
    performance: "Исполнение",
    animal_ken: "Обращение с животными",
    crafts: "Ремесло",
    stealth: "Скрытность",
    firearms: "Стрельба",
    melee: "Фехтование",
    etiquette: "Этикет",
    academics: "Гуманитарные науки",
    science: "Естественные науки",
    law: "Законы",
    computer: "Информатика",
    medicine: "Медицина",
    occult: "Оккультизм",
    politics: "Политика",
    investigation: "Расследование",
    finance: "Финансы",
    electronics: "Электроника",
  },
  editKindred: {
    editButton: "Редактировать",
    title: "Редактировать сородича",
  },
  editClan: {
    confirmTitle: "Изменить клан",
    attention: "Внимание!",
    confirmTitleMessage: "При изменении клана, сбросятся все данные формы!",
  },
  clanes: {
    Gangrel: {
      name: "Гангрел",
      curse:
        "Каждый раз, когда охватывает приступ ярости - персонаж временно получает какой-нибудь звериный признак(атавизм) (который может заменить уже существующий временный звериный признак). Атавизм может быть не только физическим, но и поведенческим. Со временем или в исключительных обстоятельствах, атавизмы могут становиться постоянными, и тогда следующий временный атавизм уже не заменит, а дополнит постоянный.",
    },
    Brujah: {
      name: "Бруха",
      curse:
        "Душевные порывы могут разжечь пламя неистовой ярости. Сложность проверок, связанных с попытками сдерживать или контролироватьприступы ярости возрастает на два пункта, вплоть до 10. Бруха не могут тратить пункты воли, чтобы предотвратить приступ ярости, но если приступ ярости уже начался, персонаж, как обычно, может потратить пункт воли, чтобы взять себя в руки на один ход.",
    },
    Malkavian: {
      name: "Малкавиан",
      curse:
        "Перманентное психическое расстройство. Это расстройство действует аналогично другим психическим расстройствам, оно не мешает приобретать другие психические расстройства. Это перманентное психическое расстройство можно временно нейтрализовать при помощи воли, но нельзя исцелить.",
    },
    Nosferatu: {
      name: "Носферату",
      curse:
        "Показатель привлекательности равен нулю. Это невозможно изменить.",
    },
    Toreador: {
      name: "Тореадор",
      curse:
        "При переживании некого действительно прекрасного ощущения (Красивая картина, пейзаж, человек и пр.), должен пройти проверку самоконтроля или инстинктов по сложности 6. Неудача означает, что персонаж замирает, охваченный восторгом до конца сцены, или до момента когда источник восторга пропадает. Персонаж не может действовать, кроме как восхищаться и комментировать свои ощущения. Только если персонаж получает повреждения, он может попытаться стряхнуть оцепенение, пройдя проверку самоконтроля или инстинктов со сложностью 6.",
    },
    Ventrue: {
      name: "Вентру",
      curse:
        "Утончённый вкус - в пищу годится кровь только одной определённой категории смертных. Эту категорию можно выбрать только один раз, при создании персонажа, изменить уже будет нельзя. Категория может быть очень узкой, может быть широкой. Кровь смертных не входящих в эту группу, и животных не пополняет запас пунктов крови. Кровь сородичей не подпадает под эти ограничения.",
    },
    Lasombra: {
      name: "Ласомбра",
      curse:
        "Не отражаются в зеркальных поверхностях. Зеркала, глады воды и пр.",
    },
    Other: {
      name: "Кастомный клан",
      curse: "-",
    },
  },
  disciplines: {
    animalism: {
      name: "Анимализм",
    },
    presence: {
      name: "Величие",
    },
    dominate: {
      name: "Доминирование",
    },
    obtenebration: {
      name: "Затмение",
    },
    protean: {
      name: "Метаморфозы",
    },
    potence: {
      name: "Мощь",
    },
    dementation: {
      name: "Помешательство",
    },
    auspex: {
      name: "Ясновидение",
    },
    obfuscate: {
      name: "Сокрытие",
    },
    celerity: {
      name: "Стремительность",
    },
    fortitude: {
      name: "Стойкость",
    },
  },
  backgrounds: {
    contacts: "Информаторы",
    allies: "Союзники",
    generation: "Поколение",
    resources: "Богатство",
  },
  editAttributes: {
    add: "Добавить характеристику",
  },
  editAbilities: {
    add: "Добавить способность",
  },
  editDisciplines: {
    add: "Добавить дисциплину",
  },
  editBackgrounds: {
    add: "Добавить факт биографии",
  },
  editMeritsAndFlaws: {
    addMerit: "Добавить достоинство",
    addFlaw: "Добавить недостаток",
  },
  editDamages: {
    add: "Добавить урон",
  },
  editHealthLevels: {
    add: "Добавить уровень здоровья",
  },
  editInitiative: {
    title: "Задать инициативу",
    dexterity: "лвк.",
    wits: "смк.",
    commonDiceBonus: "бонус",
    dice: "дайс",
    newInitiative: "инициатива",
  },
  damageUnit: {
    title: "Нанесение урона",
    healCount: "Количество урона",
    description: "Описание",
    calculateDamage: "Расчёт урона",
    complete: "Применить",
  },
  healUnit: {
    title: "Лечение",
    healCount: "Количество исцеления",
    description: "Описание",
  },
  torporAwakeningUnit: {
    title: "Пробудить от торпор",
    description: "Описание",
  },
  mentalStability: {
    morality: "Совесть/решимость",
    selfControl: "Самоконтроль/инстинкты",
    courage: "Смелость",
  },
  merits: {
    charmOfTheTongue: "Чарующий голос",
    familiarFace: "Знакомое лицо",
    introspection: "Рефлексия",
    polyglot: "Полиглот",
    oracle: "Оракул",
    healthyAppearance: "Здоровый вид",
    coldLogic: "Холодная логика",
    eideticMemory: "Эйдетическая память",
  },
  flaws: {
    outsider: "Приезжий",
    fastidious: "Разборчивость",
    potentialRecruit: "Потенциальный рекрут",
    nightmare: "Кошмар",
  },
  health: {
    healthLevels: {
      unimpaired: "Полностью здоров",
      battered: "Помят",
      lightlyWounded: "Легко ранен",
      wounded: "Ранен",
      seriouslyWounded: "Серьёзно ранен",
      heavilyWounded: "Тяжело ранен",
      nearlyDown: "Едва жив",
      incapacitated: "Небоеспособен",
      final: "Финальное состояние (torpor/Окончательная смерть)",
      torpor: "В отключке (torpor)",
      finalDeath: "Окончательная смерть",
    },
    cutExcessDamage: "Отсекает избыточный урон от одного удара",
  },
  damages: {
    bashing: "Обычный урон",
    lethal: "Летальный урон",
    aggravated: "Сверхъестественный урон",
  },
  resources: {
    health: "Здоровье",
    willpower: "Воля",
    bloodPool: "Запас крови",
  },
  parametersEditLevels: {
    "0": "⚪⚪⚪⚪⚪",
    "1": "⚫⚪⚪⚪⚪",
    "2": "⚫⚫⚪⚪⚪",
    "3": "⚫⚫⚫⚪⚪",
    "4": "⚫⚫⚫⚫⚪",
    "5": "⚫⚫⚫⚫⚫",
  },
  dice: {
    dicesToRoll: "Дайсов для броска",
    successes: "Успехов",
  },
};
