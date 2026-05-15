// src/routes/vacanciesLoader.ts
import mockVacancies from './../../pages/data/vacancies';

const HH_VACANCIES_URL = 'https://api.hh.ru/openapi/redoc#tag/Poisk-vakansij/operation/get-vacancies?industry=7&professional_role=96';

export async function vacanciesLoader() {
  try {
    const response = await fetch(HH_VACANCIES_URL);

    if (!response.ok) {
      // Ожидаем 403 от HH
      if (response.status === 403) {
        return {
          vacancies: mockVacancies,
          error: 'Не удалось подключиться к HH (403). Показаны подготовленные вакансии.',
        };
      }

      // Другие ошибки — уже «жёсткие»
      throw new Response('Ошибка загрузки вакансий', { status: response.status });
    }

    const remoteData = await response.json();

    return { remoteData, error: null };
  } catch (e) {
    return {
      vacancies: mockVacancies,
      error: 'Ошибка сети при обращении к HH. Показаны подготовленные вакансии.',
    };
  }
}