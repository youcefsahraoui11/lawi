# Walkthrough: HA9I Mobile App Architecture & UI/UX

We have successfully designed and built the complete frontend architecture and an interactive web simulator for **HA9I**, the Algerian Legal Assistance Platform.

---

## 📂 Project Architecture

Here is a summary of the architectural modules created:

### 1. Configuration & Styles
* **package.json**: Lists production-ready dependencies for Expo, Zustand, Axios, and React Navigation.
* **app.json**: Configures the Expo project name, slug, portrait locks, splash screens, and icons.
* **tsconfig.json**: Sets strict TypeScript compile rules and path aliases (`@/*`).
* **src/styles/colors.ts**: Holds the primary official blue (`#0B5ED7`), secondary slate (`#1E293B`), and status colors.
* **src/styles/theme.ts**: Sets typographic weights, rounding metrics, and shadow styles.

### 2. Internationalization (i18n) & RTL Setup
* **Translation Resources**:
  - `ar.json` (Arabic - Default)
  - `fr.json` (French)
  - `en.json` (English)
* **src/i18n/index.ts**: Configures `i18next` and defines the `configureLanguageDirection` helper to dynamically toggle React Native's `I18nManager` for RTL rendering.

### 3. State Management (Zustand)
* **useLanguageStore.ts**: Stores the current locale and updates layout directions.
* **useAuthStore.ts**: Manages user profile details, authenticated tokens, and session states (using `window.localStorage` on Web and `AsyncStorage` on mobile for cross-platform compatibility).
* **useComplaintStore.ts**: Manages local citizen complaints, tracking statuses, and submission lists.

### 4. API Integration Layer (Axios client)
* **client.ts**: An Axios client configured with automatic request/response interceptors to handle the JWT token header.
* **auth.ts**: Endpoints for login and registration.
* **chat.ts**: Connects user questions to the `POST /api/chat/` endpoint (for backend RAG integration).
* **complaints.ts**: Handles electronic complaint form submissions.

---

## 📱 How to Run the Mobile App (Web Mode)

To run the mobile app in your web browser (highly recommended for local evaluation to bypass Expo Go compatibility issues):

1. **Install DOM and Web support**:
   ```bash
   npm install react-dom@18.2.0 react-native-web --legacy-peer-deps
   ```
2. **Boot Metro Dev Server in Web mode**:
   ```bash
   npx expo start --web
   ```

---

## ⚙️ Django REST Framework Backend Architecture

Here is a summary of the components implemented:

### 1. Project Configurations
* **requirements.txt**: Lists Django, Django REST Framework, SimpleJWT, and django-cors-headers.
* **settings.py**: Setup Custom User model routing, SimpleJWT lifetime configurations, CORS controls, and RAG service URL configuration placeholders.
* **urls.py**: Exposes base API endpoints (`/api/v1/auth/`, `/api/v1/complaints/`, `/api/v1/lawyers/`, `/api/v1/resources/`, `/api/v1/chat/`).

### 2. Citizens Auth App (`authentication`)
* **models.py**: Custom `User` model inheriting from Django's AbstractUser. Enforces that either a National ID (NIN) or a Passport Number must be provided, validating that NIN consists of exactly 18 digits.
* **views.py** & **urls.py**: Endpoints for registering a citizen, logging in (via SimpleJWT TokenObtainPair), token refreshing, and retrieving user profiles.

### 3. Electronic Complaints App (`complaints`)
* **models.py**: Database schema covering the 7 form sections (Complainant, Birth, Family, National ID, Doc proof, Residence, and Contact details) and state machine statuses.
* **views.py**: Citizen-scoped filtering (citizens can only retrieve their own complaints, while staff can inspect all submissions). Exposes a custom `update_status` action view for staff to change complaint progress.

### 4. Lawyers Directory App (`lawyers`)
* **models.py**: Stores lawyers information including office address, contact numbers, and GPS coordinates.
* **views.py**: Open endpoint allowing users to search lawyers and filter them by Wilaya and Specialization.

### 5. Pluggable RAG Assistant App (`chat`)
* **views.py**: Implements `POST /api/chat/`. 
  - **Pluggable Integration block**: If `settings.RAG_SERVICE_URL` is configured, it forwards user queries as a REST POST request to your external RAG pipeline with safety headers.
  - **Graceful Fallback**: If the RAG microservice is offline, unconfigured, or times out, it intercepts the error and returns a realistic legal guidance prompt tailored to the logged-in citizen without failing!

---

## 🛠️ How to Run and Test the Backend

To boot the backend service locally on your machine, follow these steps:

1. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
2. **Perform migrations**:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
3. **Boot Development Server**:
   ```bash
   python manage.py runserver 0.0.0.0:8000
   ```
   *This starts the API endpoints at `http://localhost:8000/api/v1/`.*

---

## ⚖️ Legal RAG API Service & E2E Integration

We have successfully refactored and integrated the legal RAG service with the Django backend. Here are the details of the refactored architecture:

### 1. Swapped Local LLM/Llama to Google Gemini API
- **SDK**: Migrated from local models to the official Google GenAI SDK (`google-genai`).
- **Text Generation**: Configured `client.models.generate_content` using the `gemini-2.5-flash` model for high-speed, accurate legal Q&A.
- **Embeddings**: Replaced local/HuggingFace embeddings with Gemini's `text-embedding-004` model.
- **Client Initialization**: Securely initialized the Gemini client using `genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))`.

### 2. FastAPI Microservice Wrapper (`legal_rag/main.py`)
- Exposes `POST /api/chat` accepting both `query` and `message` request bodies.
- Fully enables CORS allowing all origins (`"*"`) for clean communication with mobile devices, simulators, and local environments.
- Implements a `/health` endpoint to quickly verify service health.

### 3. E2E Django Gateway Integration
- Configured Django settings in `settings.py` to point to the FastAPI microservice at `http://localhost:8001/api/chat`.
- Integrated requests in `chat/views.py` with graceful offline fallback to guarantee zero frontend crashes.

---

## 📱 Mobile frontend hookup & API Details

To connect your mobile app (built with Expo / React Native) to this backend, use the following details:

### 1. Exposing the Servers to Your Local Wi-Fi Network
When running the servers locally, you must bind them to `0.0.0.0` so that external devices (like mobile phones or emulators) on the same Wi-Fi network can connect to them.

- **Start the FastAPI RAG service**:
  ```bash
  export GEMINI_API_KEY="your_api_key_here"
  ./.venv/bin/python legal_rag/main.py
  ```
  *(This automatically binds to `0.0.0.0:8001`)*

- **Start the Django backend server**:
  ```bash
  ./.venv/bin/python manage.py runserver 0.0.0.0:8000
  ```
  *(Binds to `0.0.0.0:8000`)*

### 2. Base URL Configuration on the Mobile Client
Depending on where you are running the mobile client, configure the API base URL as follows:

| Environment | Host IP | Django API Base URL |
| :--- | :--- | :--- |
| **Android Emulator** | `10.0.2.2` | `http://10.0.2.2:8000/api/v1/` |
| **iOS Simulator** | `localhost` | `http://127.0.0.1:8000/api/v1/` |
| **Physical Device (Expo Go)** | `10.124.186.116` | `http://10.124.186.116:8000/api/v1/` |

### 3. API Request/Response Payloads

#### **A. User Authentication (Obtain JWT Token)**
- **Endpoint**: `POST /api/v1/auth/token/`
- **Request Payload**:
  ```json
  {
    "email": "citizen@mail.dz",
    "password": "password123"
  }
  ```
- **Response Payload**:
  ```json
  {
    "access": "<access_jwt_token>",
    "refresh": "<refresh_jwt_token>"
  }
  ```

#### **B. Legal Chat Assistant (RAG Chat)**
- **Endpoint**: `POST /api/v1/chat/`
- **Headers**:
  ```http
  Authorization: Bearer <access_jwt_token>
  Content-Type: application/json
  ```
- **Request Payload**:
  ```json
  {
    "message": "كيف يمكنني تقديم شكوى بخصوص عقار؟"
  }
  ```
- **Response Payload**:
  ```json
  {
    "response": "طبقاً للمادة 54 من القانون المدني الجزائري..."
  }
  ```

