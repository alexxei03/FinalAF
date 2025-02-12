# **Learning Platform**  
### **Современная образовательная платформа на React и Django**  

## **Описание проекта**  
Данный проект представляет собой веб-приложение для онлайн-обучения, предоставляющее пользователям возможность записываться на курсы, изучать материалы, отслеживать прогресс и получать сертификаты.  

Приложение разработано с использованием **React (Frontend)** и **Django (Backend)**. Реализована поддержка **ролевой системы** (менторы и студенты), адаптивный дизайн, поддержка нескольких языков, а также API-интеграция.  

---

## **Функциональность**
✅ Регистрация и аутентификация пользователей (JWT-токены)  
✅ Разделение ролей (менторы, студенты)  
✅ Управление курсами (создание, редактирование, удаление)  
✅ Загрузка изображений и сертификатов  
✅ Поиск и фильтрация курсов по категориям  
✅ Lazy loading и оптимизированная загрузка данных  
✅ Система отзывов и рейтингов  
✅ Интернационализация (i18n)  
✅ Адаптивный и доступный UI (ARIA-атрибуты)  
✅ Unit и интеграционные тесты (Jest, React Testing Library)  

---

## **Технологический стек**
### **Frontend:**
- **React** (18+)  
- **React Router**  
- **Context API (Auth, Theme)**  
- **Lazy Loading (React.lazy, Suspense)**  
- **Tailwind CSS** / **Custom CSS**  
- **Recharts (графики и статистика)**  
- **i18next (мультиязычность)**  
- **Jest / React Testing Library (тестирование)**  

### **Backend:**
- **Django + Django REST Framework**  
- **PostgreSQL**  
- **JWT аутентификация**  
- **Django ORM**  
- **Celery + Redis (задания в фоне)**  
- **Swagger (документация API)**  

---

## **Установка и запуск**
### **1. Клонирование репозитория**
```bash
git clone https://github.com/your-repo/learning-platform.git
cd learning-platform
```

### **2. Запуск Backend (Django)**
Установите зависимости и создайте `.env` файл с настройками.  
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
Теперь API доступно по адресу: `http://127.0.0.1:8000/api/`

### **3. Запуск Frontend (React)**
Перейдите в папку `frontend`, установите зависимости и запустите проект.
```bash
cd frontend
npm install
npm start
```
Приложение будет запущено на `http://localhost:3000`

---

## **Структура проекта**
```
learning-platform/
│── backend/                 # Серверная часть (Django)
│   ├── api/                 # Основное API
│   ├── courses/             # Модуль управления курсами
│   ├── users/               # Модуль аутентификации
│   ├── settings.py          # Настройки Django
│   └── ...
│── frontend/                # Клиентская часть (React)
│   ├── src/
│   │   ├── components/      # UI-компоненты
│   │   ├── pages/           # Страницы приложения
│   │   ├── hooks/           # Кастомные хуки
│   │   ├── context/         # Глобальное состояние
│   │   ├── apiService.js    # API-запросы
│   │   ├── App.js           # Главный компонент
│   │   └── ...
│── docs/                    # Документация проекта
│── .env                     # Переменные окружения
│── README.md                 # Описание проекта
│── package.json              # Зависимости frontend
│── requirements.txt          # Зависимости backend
└── ...
```

---

## **API (Краткое описание)**
### **Авторизация**
`POST /auth/register/` – регистрация пользователя  
`POST /auth/login/` – вход в систему  
`POST /auth/token/refresh/` – обновление JWT-токена  

### **Курсы**
`GET /courses/` – список курсов  
`GET /courses/{id}/` – детальная информация о курсе  
`POST /courses/create/` – создание курса (для менторов)  
`PUT /courses/{id}/update/` – редактирование курса  
`DELETE /courses/{id}/delete/` – удаление курса  

### **Отзывы**
`POST /courses/{id}/reviews/` – добавление отзыва  
`GET /courses/{id}/reviews/` – список отзывов  

---

## **Тестирование**
Для тестирования на **Frontend** используются **Jest** и **React Testing Library**:
```bash
cd frontend
npm test
```
Для тестирования **Backend** используются **Django Tests**:
```bash
cd backend
python manage.py test
```

---

## **Оптимизация и доступность**
- **Lazy loading** (React.lazy + Suspense) для оптимизации загрузки страниц.
- **ARIA-атрибуты** и доступные компоненты для лучшего UX.
- **Мемоизация (useMemo, useCallback)** для уменьшения лишних ререндеров.
- **Code splitting** (`React.lazy()` + `Suspense`) для динамической загрузки страниц.
- **Оптимизация запросов** на сервер (`useEffect` + `apiGet`).
- **Lighthouse-анализ** показывает высокие показатели по `Performance` и `Accessibility`.

---

---

## **Лицензия**
Этот проект распространяется под лицензией **MIT License**.
