import type { Vacancy } from "../types/types";

const VacanciesData: Vacancy[] = [
{ id: "1",
name: "Frontend‑разработчик (React/TypeScript)",
url: "https://example.com/vacancy/001",
salary: {
from: 140000,
to: 200000,
currency: "RUR",
gross: true
},
area: {
id: "area-001",
name: "Москва"
},
experience: {
id: "exp-002",
name: "От 1 года до 3 лет"
},
schedule: {
id: "schedule-001",
name: "Полный день"
},
employer: {
id: "employer-001",
name: "TechSolutions Inc.",
employerDescription: "Продуктовая IT‑компания, разрабатывающая высоконагруженные веб‑сервисы для корпоративных клиентов. Используем современный стек и практики CI/CD.",
logo_urls: {
"90": "https://example.com/logo-90-001.png",
"240": "https://example.com/logo-240-001.png",
original: "https://example.com/logo-orig-001.png"
}
},
snippet: {
requirement: "TypeScript, React, Redux, уверенное знание HTML/CSS, опыт работы с REST API.",
responsibility: "Разработка и поддержка SPA, участие в проектировании архитектуры фронтенда, код‑ревью и написание тестов."
},
alternate_url: "https://hh.ru/vacancy/1001",
description: "Ищем фронтенд‑разработчика в продуктовую команду, которая развивает личный кабинет клиентов. Работаем по Scrum, релизы каждые две недели. Ожидаем инициативности и готовности предлагать решения."
},
{ id: "2",
name: "Fullstack‑разработчик (Node.js/React)",
url: "https://example.com/vacancy/002",
salary: {
from: 160000,
to: 230000,
currency: "RUR",
gross: false
},
area: {
id: "area-001",
name: "Москва"
},
experience: {
id: "exp-003",
name: "От 3 до 6 лет"
},
schedule: {
id: "schedule-003",
name: "Гибкий график"
},
employer: {
id: "employer-002",
name: "CloudWorks",
employerDescription: "Компания, разрабатывающая облачные решения для автоматизации бизнес‑процессов. Небольшие кросс‑функциональные команды и сильная инженерная культура.",
logo_urls: {
"90": "https://example.com/logo-90-002.png",
"240": "https://example.com/logo-240-002.png"
}
},
snippet: {
requirement: "Опыт работы с React, TypeScript, Redux, Node.js, PostgreSQL.",
responsibility: "Разработка новых модулей личного кабинета и API, интеграция со сторонними сервисами, участие в планировании спринтов."
},
alternate_url: "https://hh.ru/vacancy/1002",
description: "Ищем опытного fullstack‑разработчика, который сможет вести задачи как по фронтенду, так и по backend. Проект — b2b‑платформа для автоматизации внутренних процессов клиентов. Большой простор для влияния на архитектуру и технологические решения."
},
{ id: "3",
name: "QA‑инженер (автоматизация тестирования)",
salary: {
from: 110000,
to: 150000,
currency: "RUR",
gross: true
},
area: {
id: "area-002",
name: "Санкт‑Петербург"
},
experience: {
id: "exp-002",
name: "От 1 года до 3 лет"
},
schedule: {
id: "schedule-001",
name: "Полный день"
},
employer: {
id: "employer-003",
name: "QualityFirst",
employerDescription: "Аутсорс‑компания, специализирующаяся на построении процессов тестирования и автоматизации для крупных заказчиков. Работаем с веб‑ и мобильными продуктами."
},
snippet: {
requirement: "Опыт написания автотестов на JavaScript/TypeScript, знание одного из фреймворков (Playwright, Cypress, Jest).",
responsibility: "Поддержка и развитие автотестов для веб‑приложений, анализ результатов прогонов, взаимодействие с командой разработки."
},
alternate_url: "https://hh.ru/vacancy/1003",
description: "Ищем QA‑инженера, который поможет развивать покрытие автотестами крупного продукта. Ставим качество и стабильность релизов в приоритет. Есть возможность влиять на процессы тестирования и стек инструментов."
},
{ id: "4",
name: "Продуктовый аналитик",
salary: {
from: 130000,
to: 190000,
currency: "RUR",
gross: false
},
area: {
id: "area-002",
name: "Санкт‑Петербург"
},
experience: {
id: "exp-003",
name: "От 3 до 6 лет"
},
schedule: {
id: "schedule-003",
name: "Гибкий график"
},
employer: {
id: "employer-004",
name: "Insight Metrics",
employerDescription: "Продуктовая компания, создающая аналитические веб‑панели и инструменты для визуализации бизнес‑показателей. Работаем с данными крупных e‑commerce и fintech‑проектов."
},
snippet: {
requirement: "Опыт продуктовой аналитики, владение SQL, знание основных продуктовых метрик и юнит‑экономики.",
responsibility: "Анализ поведения пользователей, формирование гипотез, подготовка дашбордов и рекомендаций для продуктовой команды."
},
alternate_url: "https://hh.ru/vacancy/1004",
description: "Ищем продуктового аналитика в команду, которая развивает аналитическую платформу. Предстоит плотно работать с продукт‑менеджерами и разработчиками, развивать систему метрик и помогать принимать продуктовые решения на основе данных."
},
{ id: "5",
name: "Системный администратор Linux",
salary: {
from: 90000,
to: 130000,
currency: "RUR",
gross: true
},
area: {
id: "area-004",
name: "Екатеринбург"
},
experience: {
id: "exp-002",
name: "От 1 года до 3 лет"
},
schedule: {
id: "schedule-001",
name: "Полный день"
},
employer: {
id: "employer-005",
name: "IT Service Corp",
employerDescription: "Интегратор и сервисная компания, поддерживающая инфраструктуру для среднего и крупного бизнеса. В команде — инженеры по сетям, системные администраторы и DevOps‑специалисты."
},
snippet: {
requirement: "Опыт администрирования Linux‑серверов, базовые знания сетей, умение работать с системами мониторинга.",
responsibility: "Поддержка серверной инфраструктуры клиентов, настройка сервисов, участие в миграциях и обновлениях."
},
alternate_url: "https://hh.ru/vacancy/1005",
description: "Приглашаем системного администратора для поддержки и развития инфраструктуры клиентов. В работе много практики, нет излишней бюрократии и есть возможность развиваться в сторону DevOps."
},
{ id: "6",
name: "Backend‑разработчик (Node.js)",
url: "https://example.com/vacancy/006",
salary: {
from: 150000,
to: 210000,
currency: "RUR",
gross: true
},
area: {
id: "area-001",
name: "Москва"
},
experience: {
id: "exp-003",
name: "От 3 до 6 лет"
},
schedule: {
id: "schedule-001",
name: "Полный день"
},
employer: {
id: "employer-006",
name: "FinTech Systems",
employerDescription: "Финтех‑компания, которая разрабатывает платёжные и антифрод‑решения для банков и онлайн‑сервисов. Много высоконагруженных интеграций и реального трафика.",
logo_urls: {
"90": "https://example.com/logo-90-006.png",
"240": "https://example.com/logo-240-006.png"
}
},
snippet: {
requirement: "Опыт разработки на Node.js от 3 лет, знание SQL и NoSQL, опыт построения REST и gRPC API.",
responsibility: "Проектирование и разработка микросервисов, оптимизация производительности, участие в ревью архитектурных решений."
},
alternate_url: "https://hh.ru/vacancy/1006",
description: "Ищем backend‑разработчика в команду, которая отвечает за ядро платёжной платформы. Работайте с высокими нагрузками и требовательными к доступности сервисами. Предусмотрены гибкий график и возможность удалённой работы."
},
{ id: "7",
name: "Разработчик интерфейсов (React)",
url: "https://example.com/vacancy/007",
salary: {
from: 130000,
to: 180000,
currency: "RUR",
gross: false
},
area: {
id: "area-002",
name: "Санкт‑Петербург"
},
experience: {
id: "exp-002",
name: "От 1 года до 3 лет"
},
schedule: {
id: "schedule-003",
name: "Гибкий график"
},
employer: {
id: "employer-007",
name: "Digital Harbor",
employerDescription: "Агентство, которое делает сложные веб‑интерфейсы для крупных сервисов: от личных кабинетов до внутренних CRM. Небольшие автономные команды и современный стек.",
logo_urls: {
"90": "https://example.com/logo-90-007.png",
"240": "https://example.com/logo-240-007.png"
}
},
snippet: {
requirement: "TypeScript, React, Redux, опыт работы с REST/GraphQL API, уверенное владение Git.",
responsibility: "Разработка и поддержка UI‑компонентов, работа с дизайн‑системой, оптимизация производительности и UX."
},
alternate_url: "https://hh.ru/vacancy/1007",
description: "Нужен разработчик интерфейсов в команду, которая создаёт и развивает дизайн‑систему для нескольких продуктов. Много задач по переиспользуемым компонентам, а также по интеграции с существующими приложениями."
},
{ id: "8",
name: "DevOps‑инженер",
salary: {
from: 160000,
to: 230000,
currency: "RUR",
gross: true
},
area: {
id: "area-001",
name: "Москва"
},
experience: {
id: "exp-003",
name: "От 3 до 6 лет"
},
schedule: {
id: "schedule-003",
name: "Гибкий график"
},
employer: {
id: "employer-008",
name: "CloudOps Group",
employerDescription: "Команда экспертов по инфраструктуре, которая помогает продуктовым компаниям строить CI/CD, мониторинг и отказоустойчивые кластеры. Работаем в основном с Kubernetes и облаками.",
logo_urls: {
"90": "https://example.com/logo-90-008.png",
"240": "https://example.com/logo-240-008.png"
}
},
snippet: {
requirement: "Опыт работы с Kubernetes, Docker, GitLab CI или аналогами, базовые знания Python или Bash.",
responsibility: "Поддержка и развитие инфраструктуры проектов, настройка пайплайнов CI/CD, мониторинг и реагирование на инциденты."
},
alternate_url: "https://hh.ru/vacancy/1008",
description: "Ищем DevOps‑инженера, который усилит команду инфраструктуры. Предстоит много автоматизации, настройка процессов доставки и мониторинга. Ожидаем инициативности и готовности предлагать улучшения."
},
{ id: "9",
name: "Маркетолог‑аналитик",
salary: {
from: 90000,
to: 130000,
currency: "RUR",
gross: true
},
area: {
id: "area-005",
name: "Тула"
},
experience: {
id: "exp-002",
name: "От 1 года до 3 лет"
},
schedule: {
id: "schedule-002",
name: "Удаленная работа"
},
employer: {
id: "employer-009",
name: "GrowthPoint",
employerDescription: "Агентство по перформанс‑маркетингу, которое работает с e‑commerce и онлайн‑сервисами. Строим воронки, оптимизируем рекламу и помогаем клиентам расти по выручке.",
logo_urls: {
"90": "https://example.com/logo-90-009.png",
"240": "https://example.com/logo-240-009.png"
}
},
snippet: {
requirement: "Опыт работы с рекламными кабинетами, знание основ веб‑аналитики и Excel/Google Sheets.",
responsibility: "Анализ эффективности рекламных кампаний, подготовка отчётов и рекомендаций, работа с креативами и гипотезами."
},
alternate_url: "https://hh.ru/vacancy/1009",
description: "Ищем маркетолога‑аналитика для работы с проектами в регионах. Много задач по анализу каналов и поиску точек роста. Можно работать удалённо, график обсуждается."
},
{ id: "10",
name: "Инженер технической поддержки (L2)",
salary: {
from: 70000,
to: 100000,
currency: "RUR",
gross: false
},
area: {
id: "area-004",
name: "Екатеринбург"
},
experience: {
id: "exp-002",
name: "От 1 года до 3 лет"
},
schedule: {
id: "schedule-001",
name: "Полный день"
},
employer: {
id: "employer-010",
name: "SupportLine",
employerDescription: "Сервисная компания, которая берёт на себя техническую поддержку SaaS‑решений. Работаем по SLA и много общаемся с инженерными командами заказчиков.",
logo_urls: {
"90": "https://example.com/logo-90-010.png",
"240": "https://example.com/logo-240-010.png"
}
},
snippet: {
requirement: "Опыт работы в техподдержке, базовые знания сетей и ОС, умение разбирать логи и описывать баги.",
responsibility: "Обработка обращений второго уровня, воспроизведение инцидентов, эскалация и взаимодействие с разработчиками."
},
alternate_url: "https://hh.ru/vacancy/1010",
description: "В команду технической поддержки ищем инженера L2. Предстоит работать с инцидентами от крупных клиентов, разбираться в причинах проблем и помогать командам разработки закрывать их быстрее."
},
{ id: "11",
name: "Frontend‑разработчик (Middle, React/TypeScript)",
url: "https://example.com/vacancy/011",
salary: {
from: 150000,
to: 210000,
currency: "RUR",
gross: true
},
area: {
id: "area-001",
name: "Москва"
},
experience: {
id: "exp-003",
name: "От 3 до 6 лет"
},
schedule: {
id: "schedule-003",
name: "Гибкий график"
},
employer: {
id: "employer-011",
name: "SkyApps",
employerDescription: "Продуктовая компания, создающая веб‑ и мобильные приложения для миллионов пользователей. Ставим ставку на качество интерфейсов и удобство использования.",
logo_urls: {
"90": "https://example.com/logo-90-011.png",
"240": "https://example.com/logo-240-011.png"
}
},
snippet: {
requirement: "TypeScript, React, Redux, опыт работы с REST API и современным стеком сборки (Webpack/Vite).",
responsibility: "Развитие клиентских приложений, участие в проектировании архитектуры фронтенда, оптимизация производительности."
},
alternate_url: "https://hh.ru/vacancy/1011",
description: "Ищем middle‑frontend‑разработчика в продуктовую команду. Предстоит много работы с дизайн‑системой и сложными интерфейсами. Ожидаем инициативности и умения самостоятельно доводить задачи до результата."
},
{ id: "12",
name: "Backend‑разработчик (Python/Django)",
url: "https://example.com/vacancy/012",
salary: {
from: 140000,
to: 190000,
currency: "RUR",
gross: false
},
area: {
id: "area-002",
name: "Санкт‑Петербург"
},
experience: {
id: "exp-003",
name: "От 3 до 6 лет"
},
schedule: {
id: "schedule-001",
name: "Полный день"
},
employer: {
id: "employer-012",
name: "DataFlow Labs",
employerDescription: "Команда, которая занимается разработкой аналитических сервисов и API для работы с большими данными. Используем Python, Django и современный стек для обработки данных.",
logo_urls: {
"90": "https://example.com/logo-90-012.png",
"240": "https://example.com/logo-240-012.png"
}
},
snippet: {
requirement: "Уверенное знание Python, Django/DRF, PostgreSQL, опыт написания тестов.",
responsibility: "Разработка и поддержка backend‑части продукта, интеграция со сторонними сервисами, участие в ревью кода."
},
alternate_url: "https://hh.ru/vacancy/1012",
description: "Приглашаем backend‑разработчика в команду аналитического продукта. Предстоит много задач по оптимизации запросов и построению устойчивой архитектуры API. Работа в связке с аналитиками и фронтенд‑командой."
},
{ id: "13",
name: "UI/UX‑дизайнер",
url: "https://example.com/vacancy/013",
salary: {
from: 110000,
to: 150000,
currency: "RUR",
gross: true
},
area: {
id: "area-002",
name: "Санкт‑Петербург"
},
experience: {
id: "exp-002",
name: "От 1 года до 3 лет"
},
schedule: {
id: "schedule-003",
name: "Гибкий график"
},
employer: {
id: "employer-013",
name: "Creative Studio X",
employerDescription: "Дизайн‑студия, которая делает интерфейсы и айдентику для IT‑продуктов. Работаем небольшими командами и много общаемся с заказчиками напрямую.",
logo_urls: {
"90": "https://example.com/logo-90-013.png",
"240": "https://example.com/logo-240-013.png"
}
},
snippet: {
requirement: "Опыт работы в Figma, понимание принципов UX, знание гайдлайнов для веба и мобильных платформ.",
responsibility: "Проектирование пользовательских сценариев, отрисовка макетов и прототипов, участие в исследованиях и тестировании."
},
alternate_url: "https://hh.ru/vacancy/1013",
description: "Ищем UI/UX‑дизайнера для работы над интерфейсами веб‑приложений. Предстоит участвовать во всех этапах: от исследования до финальной вёрстки макетов. Важны внимание к деталям и умение аргументировать свои решения."
},
{ id: "14",
name: "Системный администратор",
salary: {
from: 80000,
to: 110000,
currency: "RUR",
gross: true
},
area: {
id: "area-004",
name: "Екатеринбург"
},
experience: {
id: "exp-002",
name: "От 1 года до 3 лет"
},
schedule: {
id: "schedule-001",
name: "Полный день"
},
employer: {
id: "employer-014",
name: "OfficeTech",
employerDescription: "Компания, которая занимается обслуживанием офисной IT‑инфраструктуры: сервера, сети, рабочие станции. Работаем с небольшими и средними бизнесами."
},
snippet: {
requirement: "Опыт администрирования Windows и Linux, базовые знания сетевых протоколов, умение работать с мониторингом.",
responsibility: "Поддержка рабочих станций и серверов, настройка сетевого оборудования, помощь пользователям."
},
alternate_url: "https://hh.ru/vacancy/1014",
description: "В команду технической поддержки ищем системного администратора. Много живого общения с пользователями и практических задач. Поможем прокачаться в сторону автоматизации и скриптов."
},
{ id: "15",
name: "Менеджер по продажам B2B",
salary: {
from: null,
to: 160000,
currency: "RUR",
gross: false
},
area: {
id: "area-005",
name: "Тула"
},
experience: {
id: "exp-002",
name: "От 1 года до 3 лет"
},
schedule: {
id: "schedule-003",
name: "Гибкий график"
},
employer: {
id: "employer-015",
name: "SalesPro Ltd",
employerDescription: "Компания, специализирующаяся на B2B‑продажах IT‑услуг и оборудования. Обучаем продукту и поддерживаем менеджеров на сделках."
},
snippet: {
requirement: "Опыт активных продаж, умение вести переговоры, грамотная устная и письменная речь.",
responsibility: "Поиск и развитие клиентов, проведение презентаций, сопровождение сделок на всех этапах."
},
alternate_url: "https://hh.ru/vacancy/1015",
description: "Ищем менеджера по продажам для работы с корпоративными клиентами. Предложим понятную систему обучения и прозрачную мотивацию. Важны настойчивость и готовность работать с возражениями."
},
{ id: "16",
name: "Разработчик мобильных приложений (React Native)",
url: "https://example.com/vacancy/016",
salary: {
from: 140000,
to: 200000,
currency: "RUR",
gross: true
},
area: {
id: "area-001",
name: "Москва"
},
experience: {
id: "exp-002",
name: "От 1 года до 3 лет"
},
schedule: {
id: "schedule-003",
name: "Гибкий график"
},
employer: {
id: "employer-016",
name: "MobileCraft",
employerDescription: "Компания, занимающаяся разработкой кроссплатформенных мобильных приложений для банков и ритейла. Работаем по Agile и много экспериментируем с новыми фичами.",
logo_urls: {
"90": "https://example.com/logo-90-016.png",
"240": "https://example.com/logo-240-016.png"
}
},
snippet: {
requirement: "Опыт разработки на React Native, знание TypeScript и React, понимание принципов работы мобильных платформ.",
responsibility: "Разработка новых экранов и функциональности, оптимизация производительности приложений, участие в релизах."
},
alternate_url: "https://hh.ru/vacancy/1016",
description: "Ищем разработчика мобильных приложений в продуктовую команду. Предстоит работать над клиентскими приложениями с большой аудиторией и помогать развивать существующий функционал."
},
{ id: "17",
name: "Frontend‑разработчик (React/TypeScript, junior)",
url: "https://example.com/vacancy/017",
salary: {
from: 90000,
to: 130000,
currency: "RUR",
gross: true
},
area: {
id: "area-002",
name: "Санкт‑Петербург"
},
experience: {
id: "exp-001",
name: "Нет опыта"
},
schedule: {
id: "schedule-002",
name: "Удаленная работа"
},
employer: {
id: "employer-017",
name: "StartUp Hub",
employerDescription: "Акселератор и студия стартапов, где команды создают MVP и выводят продукты на рынок. Много живых проектов и быстрых циклов обратной связи.",
logo_urls: {
"90": "https://example.com/logo-90-017.png",
"240": "https://example.com/logo-240-017.png"
}
},
snippet: {
requirement: "Базовые знания TypeScript, React, Redux, понимание принципов работы REST API и браузера.",
responsibility: "Разработка небольших фич под руководством менторов, фиксы багов, участие в код‑ревью и улучшении UI."
},
alternate_url: "https://hh.ru/vacancy/1017",
description: "Ищем начинающего фронтенд‑разработчика, который хочет расти в продуктовой среде. Даём наставника, понятные задачи и возможность быстро прокачаться на реальных проектах."
},
{ id: "18",
name: "Инженер по данным (Data Engineer)",
salary: {
from: 170000,
to: 230000,
currency: "RUR",
gross: false
},
area: {
id: "area-001",
name: "Москва"
},
experience: {
id: "exp-003",
name: "От 3 до 6 лет"
},
schedule: {
id: "schedule-001",
name: "Полный день"
},
employer: {
id: "employer-018",
name: "DataBridge",
employerDescription: "Компания, специализирующаяся на построении data‑платформ и витрин для крупных клиентов. Работаем с большими объёмами данных и современным стеком.",
logo_urls: {
"90": "https://example.com/logo-90-018.png",
"240": "https://example.com/logo-240-018.png"
}
},
snippet: {
requirement: "Опыт работы с ETL‑процессами, знание SQL, Python, опыт работы с хранилищами данных.",
responsibility: "Разработка и поддержка пайплайнов, загрузка и трансформация данных, оптимизация запросов и хранений."
},
alternate_url: "https://hh.ru/vacancy/1018",
description: "В команду data‑платформы ищем инженера по данным. Предстоит строить устойчивые пайплайны, работать с витринами и помогать аналитикам получать данные в нужном виде."
},
{ id: "19",
name: "Инженер по информационной безопасности",
salary: {
from: 150000,
to: 210000,
currency: "RUR",
gross: true
},
area: {
id: "area-004",
name: "Екатеринбург"
},
experience: {
id: "exp-003",
name: "От 3 до 6 лет"
},
schedule: {
id: "schedule-001",
name: "Полный день"
},
employer: {
id: "employer-019",
name: "SecureTech",
employerDescription: "Компания, которая строит комплексные решения по защите информации для банков и госсектора. В штате эксперты по ИБ и инфраструктуре.",
logo_urls: {
"90": "https://example.com/logo-90-019.png",
"240": "https://example.com/logo-240-019.png"
}
},
snippet: {
requirement: "Опыт работы в области ИБ, знание основных стандартов и средств защиты, базовые навыки администрирования.",
responsibility: "Анализ уязвимостей, настройка средств защиты, подготовка отчётов и рекомендаций по повышению уровня безопасности."
},
alternate_url: "https://hh.ru/vacancy/1019",
description: "Ищем инженера по информационной безопасности, который поможет развивать внутренние процессы и внедрять новые решения. Предстоит работать с инфраструктурой клиентов и внутренними системами компании."
},
{ id: "20",
name: "Менеджер проектов (IT)",
salary: {
from: 120000,
to: 170000,
currency: "RUR",
gross: false
},
area: {
id: "area-005",
name: "Тула"
},
experience: {
id: "exp-003",
name: "От 3 до 6 лет"
},
schedule: {
id: "schedule-003",
name: "Гибкий график"
},
employer: {
id: "employer-020",
name: "ProjectLine",
employerDescription: "Аутсорс‑компания, которая ведёт проекты по разработке и внедрению IT‑решений для среднего бизнеса. Ставим в приоритет прозрачность процессов и сроки.",
logo_urls: {
"90": "https://example.com/logo-90-020.png",
"240": "https://example.com/logo-240-020.png"
}
},
snippet: {
requirement: "Опыт управления IT‑проектами, базовое понимание разработки и тестирования, навыки ведения переговоров.",
responsibility: "Планирование и контроль задач, взаимодействие с заказчиком и командой, управление рисками и сроками."
},
alternate_url: "https://hh.ru/vacancy/1020",
description: "Ищем менеджера проектов для ведения нескольких параллельных IT‑инициатив. Предстоит много общения с заказчиками, планирования спринтов и координации работы команды."
},
{ id: "21",
name: "Разработчик внутренних инструментов (React)",
url: "https://example.com/vacancy/021",
salary: {
from: 130000,
to: 175000,
currency: "RUR",
gross: true
},
area: {
id: "area-001",
name: "Москва"
},
experience: {
id: "exp-002",
name: "От 1 года до 3 лет"
},
schedule: {
id: "schedule-001",
name: "Полный день"
},
employer: {
id: "employer-021",
name: "OfficeTools",
employerDescription: "Компания разрабатывает внутренние сервисы и порталы для автоматизации процессов в крупных организациях. Небольшие кросс‑функциональные команды и фокус на качестве продукта.",
logo_urls: {
"90": "https://example.com/logo-90-021.png",
"240": "https://example.com/logo-240-021.png"
}
},
snippet: {
requirement: "TypeScript, React, Redux, практический опыт работы с формами и таблицами данных.",
responsibility: "Разработка внутренних веб‑инструментов, интеграция с API, участие в обсуждении и проработке требований."
},
alternate_url: "https://hh.ru/vacancy/1021",
description: "Ищем фронтенд‑разработчика для работы над внутренними порталами и консолями. Много задач по улучшению UX и внедрению дизайн‑системы. Ожидаем аккуратный код и внимательность к деталям."
},
{ id: "22",
name: "Разработчик микросервисов (Go)",
url: "https://example.com/vacancy/022",
salary: {
from: 160000,
to: 220000,
currency: "RUR",
gross: false
},
area: {
id: "area-002",
name: "Санкт‑Петербург"
},
experience: {
id: "exp-003",
name: "От 3 до 6 лет"
},
schedule: {
id: "schedule-003",
name: "Гибкий график"
},
employer: {
id: "employer-022",
name: "HighLoad Systems",
employerDescription: "Инженерная команда, строящая высоконагруженные сервисы для онлайн‑бизнеса: биллинг, очереди, системы уведомлений.",
logo_urls: {
"90": "https://example.com/logo-90-022.png",
"240": "https://example.com/logo-240-022.png"
}
},
snippet: {
requirement: "Опыт разработки на Go, знание очередей и брокеров сообщений, понимание принципов распределённых систем.",
responsibility: "Проектирование и разработка микросервисов, оптимизация производительности, участие в проектировании архитектуры."
},
alternate_url: "https://hh.ru/vacancy/1022",
description: "Нужен разработчик на Go для работы над высоконагруженной backend‑платформой. Проект с большим количеством транзакций и строгими требованиями к надёжности."
},
{ id: "23",
name: "Инженер по тестированию (manual QA)",
salary: {
from: 80000,
to: 110000,
currency: "RUR",
gross: true
},
area: {
id: "area-005",
name: "Тула"
},
experience: {
id: "exp-001",
name: "Нет опыта"
},
schedule: {
id: "schedule-002",
name: "Удаленная работа"
},
employer: {
id: "employer-023",
name: "SoftTest Lab",
employerDescription: "Аутсорс‑компания, предоставляющая услуги по ручному и автоматизированному тестированию веб‑ и мобильных приложений.",
logo_urls: {
"90": "https://example.com/logo-90-023.png",
"240": "https://example.com/logo-240-023.png"
}
},
snippet: {
requirement: "Понимание жизненного цикла разработки, базовые навыки тестирования, внимательность к деталям.",
responsibility: "Тестирование функционала веб‑приложений по чек‑листам и тест‑кейсам, заведение баг‑репортов, перепроверка исправлений."
},
alternate_url: "https://hh.ru/vacancy/1023",
description: "Ищем начинающего тестировщика, готового учиться на реальных проектах. Дадим обучение, понятные процессы и поддержку опытных коллег."
},
{ id: "24",
name: "Product Owner",
salary: {
from: 150000,
to: 210000,
currency: "RUR",
gross: true
},
area: {
id: "area-001",
name: "Москва"
},
experience: {
id: "exp-003",
name: "От 3 до 6 лет"
},
schedule: {
id: "schedule-003",
name: "Гибкий график"
},
employer: {
id: "employer-024",
name: "BizSuite",
employerDescription: "Создаём SaaS‑платформу для малого и среднего бизнеса: CRM, задачи, финансы в одном окне. Работаем по Scrum, ценим прозрачность и обратную связь.",
logo_urls: {
"90": "https://example.com/logo-90-024.png",
"240": "https://example.com/logo-240-024.png"
}
},
snippet: {
requirement: "Опыт работы продукт‑менеджером/PO, понимание метрик продукта и UX, умение приоритизировать backlog.",
responsibility: "Формирование roadmap, постановка задач команде разработки, общение с пользователями и стейкхолдерами."
},
alternate_url: "https://hh.ru/vacancy/1024",
description: "В продуктовую команду ищем Product Owner, который поможет развивать SaaS‑платформу. Важны системное мышление и умение принимать решения на основе данных."
},
{ id: "25",
name: "Системный аналитик",
salary: {
from: 120000,
to: 170000,
currency: "RUR",
gross: false
},
area: {
id: "area-004",
name: "Екатеринбург"
},
experience: {
id: "exp-003",
name: "От 3 до 6 лет"
},
schedule: {
id: "schedule-001",
name: "Полный день"
},
employer: {
id: "employer-025",
name: "Enterprise Solutions",
employerDescription: "Внедряем и дорабатываем корпоративные системы для крупных промышленных и сервисных компаний. Работаем в тесной связке с бизнесом и IT‑подразделениями клиентов.",
logo_urls: {
"90": "https://example.com/logo-90-025.png",
"240": "https://example.com/logo-240-025.png"
}
},
snippet: {
requirement: "Опыт описания бизнес‑процессов, написания ТЗ, понимание интеграций и архитектуры корпоративных систем.",
responsibility: "Сбор и анализ требований, описание интерфейсов и интеграций, сопровождение задач от идеи до релиза."
},
alternate_url: "https://hh.ru/vacancy/1025",
description: "Ищем системного аналитика для проектов по автоматизации в крупном бизнесе. Много общения с заказчиками и возможность влиять на конечное решение."
},
{ id: "26",
name: "Frontend‑разработчик (React, дизайн‑система)",
url: "https://example.com/vacancy/026",
salary: {
from: 140000,
to: 190000,
currency: "RUR",
gross: true
},
area: {
id: "area-001",
name: "Москва"
},
experience: {
id: "exp-002",
name: "От 1 года до 3 лет"
},
schedule: {
id: "schedule-003",
name: "Гибкий график"
},
employer: {
id: "employer-026",
name: "UI Systems",
employerDescription: "Компания разрабатывает дизайн‑системы и UI‑библиотеки для крупных веб‑проектов. В командах сильные фронтенд‑разработчики и дизайнеры.",
logo_urls: {
"90": "https://example.com/logo-90-026.png",
"240": "https://example.com/logo-240-026.png"
}
},
snippet: {
requirement: "TypeScript, React, Redux, опыт разработки переиспользуемых компонентов и работы с дизайн‑системой.",
responsibility: "Разработка и поддержка UI‑китов, интеграция компонентов в продукты, участие в обсуждении UX‑решений."
},
alternate_url: "https://hh.ru/vacancy/1026",
description: "Ищем фронтенд‑разработчика, который любит аккуратные интерфейсы и компоненты. Предстоит участвовать в создании и развитии дизайн‑систем для нескольких продуктов."
},
{ id: "27",
name: "Python‑разработчик (ETL/скрипты)",
url: "https://example.com/vacancy/027",
salary: {
from: 120000,
to: 160000,
currency: "RUR",
gross: false
},
area: {
id: "area-002",
name: "Санкт‑Петербург"
},
experience: {
id: "exp-002",
name: "От 1 года до 3 лет"
},
schedule: {
id: "schedule-002",
name: "Удаленная работа"
},
employer: {
id: "employer-027",
name: "DataScripts",
employerDescription: "Небольшая команда, которая помогает клиентам автоматизировать отчётность и обработку данных с помощью Python‑скриптов и ETL‑процессов.",
logo_urls: {
"90": "https://example.com/logo-90-027.png",
"240": "https://example.com/logo-240-027.png"
}
},
snippet: {
requirement: "Python, опыт работы с Pandas или аналогами, базовые знания SQL.",
responsibility: "Разработка скриптов для обработки данных, настройка простых ETL‑процессов, документирование решений."
},
alternate_url: "https://hh.ru/vacancy/1027",
description: "Ищем Python‑разработчика, которому интересна работа с данными. Много прикладных задач, связанных с отчётами и автоматизацией рутинных процессов."
},
{ id: "28",
name: "Разработчик CRM‑систем (Fullstack)",
url: "https://example.com/vacancy/028",
salary: {
from: 150000,
to: 210000,
currency: "RUR",
gross: true
},
area: {
id: "area-001",
name: "Москва"
},
experience: {
id: "exp-003",
name: "От 3 до 6 лет"
},
schedule: {
id: "schedule-001",
name: "Полный день"
},
employer: {
id: "employer-028",
name: "CRM Factory",
employerDescription: "Компания разрабатывает и внедряет кастомные CRM‑решения для отделов продаж и поддержки. Много интеграций и нетривиальной логики.",
logo_urls: {
"90": "https://example.com/logo-90-028.png",
"240": "https://example.com/logo-240-028.png"
}
},
snippet: {
requirement: "TypeScript, React, Redux, один из backend‑языков (Node.js/Java), опыт работы с REST API.",
responsibility: "Разработка функциональности CRM, доработка существующих модулей, участие в интеграциях со сторонними сервисами."
},
alternate_url: "https://hh.ru/vacancy/1028",
description: "Нужен fullstack‑разработчик для развития CRM‑системы. Предстоит работать и с фронтендом, и с backend, плотно взаимодействовать с командой аналитиков и заказчиком."
},
{ id: "29",
name: "Frontend‑разработчик (React, маркетинговые лендинги)",
url: "https://example.com/vacancy/029",
salary: {
from: 90000,
to: 130000,
currency: "RUR",
gross: true
},
area: {
id: "area-005",
name: "Тула"
},
experience: {
id: "exp-001",
name: "Нет опыта"
},
schedule: {
id: "schedule-002",
name: "Удаленная работа"
},
employer: {
id: "employer-029",
name: "LandingPro",
employerDescription: "Агентство по разработке маркетинговых лендингов и промо‑страниц. Много креативных задач и быстрых релизов.",
logo_urls: {
"90": "https://example.com/logo-90-029.png",
"240": "https://example.com/logo-240-029.png"
}
},
snippet: {
requirement: "Базовые знания React и верстки, понимание адаптивного дизайна, желание развиваться во фронтенде.",
responsibility: "Верстка и доработка лендингов, интеграция с формами и аналитикой, фиксы багов по результатам A/B‑тестов."
},
alternate_url: "https://hh.ru/vacancy/1029",
description: "Ищем начинающего фронтенд‑разработчика для работы над лендингами. Подойдет тем, кто хочет быстро набрать практику и поработать с маркетинговыми задачами."
},
{ id: "30",
name: "Инженер техподдержки (SaaS‑сервис)",
url: "https://example.com/vacancy/030",
salary: {
from: 75000,
to: 105000,
currency: "RUR",
gross: false
},
area: {
id: "area-002",
name: "Санкт‑Петербург"
},
experience: {
id: "exp-002",
name: "От 1 года до 3 лет"
},
schedule: {
id: "schedule-003",
name: "Гибкий график"
},
employer: {
id: "employer-030",
name: "HelpDesk Cloud",
employerDescription: "SaaS‑сервис для обработки обращений клиентов и автоматизации поддержки. Работаем с компаниями по всему миру и развиваем продукт на основе обратной связи.",
logo_urls: {
"90": "https://example.com/logo-90-030.png",
"240": "https://example.com/logo-240-030.png"
}
},
snippet: {
requirement: "Опыт работы в техподдержке, базовые знания веб‑технологий и умение понятно объяснять технические вещи.",
responsibility: "Обработка обращений пользователей, воспроизведение проблем, составление баг‑репортов и взаимодействие с командой разработки."
},
alternate_url: "https://hh.ru/vacancy/1030",
description: "В команду SaaS‑сервиса по поддержке клиентов ищем инженера поддержки. Предстоит общаться с клиентами, помогать разбираться с продуктом и собирать обратную связь для команды."
}
];

export default VacanciesData