import type { Vacancy } from "../types/types";

const VacanciesData: Vacancy[] = [
  {
    id: "1",
    name: "Frontend‑разработчик (React/TypeScript)",
    url: "https://example.com/vacancy/001",
    salary: {
      from: 120000,
      to: 180000,
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
      logo_urls: {
        '90': "https://example.com/logo-90-001.png",
        '240': "https://example.com/logo-240-001.png",
        original: "https://example.com/logo-orig-001.png"
      }
    },
    snippet: {
      requirement: "Опыт работы с React и TypeScript от 1 года, знание Redux, понимание принципов UX/UI.",
      responsibility: "Разработка интерфейсов, оптимизация производительности, участие в код‑ревью."
    },
    alternate_url: "https://hh.ru/vacancy/001",
    description: "Ищем фронтенд‑разработчика для работы над крупным веб‑приложением. Команда 10 человек, Agile."
  },
  {
    id: "2",
    name: "Python‑разработчик (Django)",
    salary: {
      from: 150000,
      to: null,
      currency: "RUR",
      gross: true
    },
    area: {
      id: "area-002",
      name: "Санкт‑Петербург"
    },
    experience: {
      id: "exp-003",
      name: "От 3 до 6 лет"
    },
    schedule: null,
    employer: {
      id: "employer-002",
      name: "DataFlow Labs",
      logo_urls: {
        '90': "https://example.com/logo-90-002.png",
        '240': "https://example.com/logo-240-002.png"
      }
    },
    snippet: {
      requirement: "Django, DRF, PostgreSQL, Docker, опыт работы с REST API.",
      responsibility: "Поддержка и развитие backend‑части сервиса, написание тестов."
    },
    alternate_url: "https://hh.ru/vacancy/002"
  },
  {
    id: "3",
    name: "Графический дизайнер",
    url: "https://example.com/vacancy/003",
    salary: {
      from: 70000,
      to: 90000,
      currency: "RUR",
      gross: false
    },
    area: {
      id: "area-003",
      name: "Новосибирск"
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
      id: "employer-003",
      name: "Creative Studio X"
    },
    snippet: {
      requirement: "Знание Figma, Adobe Photoshop, Illustrator, понимание композиции.",
      responsibility: "Создание баннеров, презентаций, оформление соцсетей."
    },
    alternate_url: "https://hh.ru/vacancy/003",
    description: "Стартап ищет начинающего дизайнера. Гибкий график, интересные задачи."
  },
{
    id: "4",
    name: "Системный администратор",
    salary: { from: 80000, to: 110000, currency: "RUR", gross: true },
    area: { id: "area-004", name: "Екатеринбург" },
    experience: { id: "exp-002", name: "От 1 года до 3 лет" },
    schedule: { id: "schedule-001", name: "Полный день" },
    employer: { id: "employer-004", name: "IT Service Corp" },
    alternate_url: "https://hh.ru/vacancy/004"
  },
  {
    id: "vacancy-005",
    name: "Менеджер по продажам B2B",
    salary: { from: null, to: 150000, currency: "RUR", gross: false },
    area: { id: "area-001", name: "Москва" },
    experience: { id: "exp-002", name: "От 1 года до 3 лет" },
    schedule: { id: "schedule-003", name: "Гибкий график" },
    employer: { id: "employer-005", name: "SalesPro Ltd" },
    snippet: { requirement: "Опыт продаж от 1 года, умение вести переговоры." },
    alternate_url: "https://hh.ru/vacancy/005"
  },
  // ...
  {
    id: "5",
    name: "Копирайтер/Контент‑менеджер",
    salary: { from: 40000, to: 60000, currency: "RUR", gross: true },
    area: { id: "area-005", name: "Краснодар" },
    experience: { id: "exp-001", name: "Нет опыта" },
    schedule: { id: "schedule-002", name: "Удаленная работа" },
    employer: { id: "employer-030", name: "ContentWave" },
    snippet: { responsibility: "Написание статей, ведение соцсетей, SEO‑оптимизация." },
    alternate_url: "https://hh.ru/vacancy-030"
  }
];

export default VacanciesData