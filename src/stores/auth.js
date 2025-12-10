import { defineStore } from "pinia";
import axios from "axios";

const API_BASE = "https://69393fcec8d59937aa070755.mockapi.io/yaroslav";
const REGISTER_URL = `${API_BASE}/register`;
const LOGIN_URL = `${API_BASE}/login`;

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password, repeatPassword) {
  if (password.length < 6) return false;
  return password === repeatPassword;
}

function validateName(fName, lName) {
  return fName.length >= 2 && lName.length >= 2;
}

const useAuthUserState = defineStore("auth", {
  state: () => ({
    firstName: null,
    lastName: null,
    email: null,
    userId: null,
    token: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
  }),

  actions: {
    initialize() {
      this.restoreFromStorage();
    },

    restoreFromStorage() {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");

      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          this.userId = user.id;
          this.firstName = user.firstName;
          this.lastName = user.lastName;
          this.email = user.email;
          this.token = token;
          this.isAuthenticated = true;
          console.log("Сессия восстановлена из localStorage");
        } catch (error) {
          console.error("Ошибка при восстановлении сессии:", error);
          this.clearStorage();
        }
      }
    },

    saveToStorage(userId, firstName, lastName, email) {
      const mockToken = `mock-token-${Date.now()}-${userId}`;

      this.userId = userId;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.token = mockToken;
      this.isAuthenticated = true;

      localStorage.setItem("token", mockToken);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: userId,
          firstName: firstName,
          lastName: lastName,
          email: email,
          savedAt: new Date().toISOString(),
        })
      );
    },

    clearStorage() {
      this.firstName = null;
      this.lastName = null;
      this.email = null;
      this.userId = null;
      this.token = null;
      this.isAuthenticated = false;
      this.error = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    async register(formData) {
      this.isLoading = true;
      this.error = null;

      const { fname, lname, email, password, repeatPassword } = formData;

      if (!validateEmail(email)) {
        this.error = "Некорректный email";
        this.isLoading = false;
        return { success: false, error: "Некорректный email" };
      }

      if (!validateName(fname, lname)) {
        this.error = "Имя и фамилия должны содержать минимум 2 символа";
        this.isLoading = false;
        return {
          success: false,
          error: "Имя и фамилия должны содержать минимум 2 символа",
        };
      }

      if (!validatePassword(password, repeatPassword)) {
        this.error =
          "Пароли не совпадают или слишком короткие (минимум 6 символов)";
        this.isLoading = false;
        return {
          success: false,
          error: "Пароли не совпадают или слишком короткие",
        };
      }

      try {
        console.log("Отправка запроса на регистрацию...", formData);

        // Проверяем, существует ли уже пользователь с таким email
        const checkResponse = await axios.get(REGISTER_URL, {
          params: { email: email },
        });

        if (checkResponse.data && checkResponse.data.length > 0) {
          throw new Error("Пользователь с таким email уже существует");
        }

        const response = await axios.post(REGISTER_URL, {
          firstName: fname,
          lastName: lname,
          fullName: `${fname} ${lname}`,
          email: email,
          password: password,
          createdAt: new Date().toISOString(),
        });

        console.log("Ответ от сервера:", response.data);

        this.firstName = fname;
        this.lastName = lname;
        this.email = email;
        this.userId = response.data.id;
        this.isAuthenticated = true;

        // Создаем токен
        const mockToken = `mock-token-${Date.now()}-${response.data.id}`;
        this.token = mockToken;

        // Сохраняем в localStorage
        localStorage.setItem("token", mockToken);
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: response.data.id,
            firstName: fname,
            lastName: lname,
            email: email,
            createdAt: response.data.createdAt,
          })
        );

        this.isLoading = false;
        this.saveToStorage(response.data.id, fname, lname, email);
        return {
          success: true,
          data: response.data,
          user: {
            id: response.data.id,
            firstName: fname,
            lastName: lname,
            email: email,
            fullName: `${fname} ${lname}`,
          },
        };
      } catch (error) {
        console.error("Ошибка при регистрации:", error);

        let errorMessage = "Ошибка регистрации";

        if (error.response) {
          console.error("Данные ошибки:", error.response.data);
          errorMessage =
            error.response.data.message ||
            error.response.data.error ||
            errorMessage;
        } else if (error.message) {
          errorMessage = error.message;
        }

        this.error = errorMessage;
        this.isLoading = false;

        return {
          success: false,
          error: errorMessage,
        };
      }
    },

    async login({ email, password }) {
      this.isLoading = true;
      this.error = null;

      try {
        console.log("Отправка запроса на вход...", { email, password });

        if (!validateEmail(email)) {
          throw new Error("Некорректный email");
        }

        // Ищем пользователя по email в базе зарегистрированных
        const response = await axios.get(REGISTER_URL, {
          params: { email: email },
        });

        console.log("Найденные пользователи:", response.data);

        // MockAPI возвращает массив, даже если один элемент
        let user = null;
        if (response.data && Array.isArray(response.data)) {
          user = response.data.find((u) => u.email === email);
        } else if (response.data && response.data.email === email) {
          // Если вернулся один объект
          user = response.data;
        }

        if (!user) {
          throw new Error("Пользователь не найден");
        }

        // Проверяем пароль
        if (user.password !== password) {
          throw new Error("Неверный пароль");
        }

        // Создаем фиктивный токен
        const mockToken = `mock-token-${Date.now()}-${user.id}`;

        // Определяем имя и фамилию
        let firstName = user.firstName;
        let lastName = user.lastName;

        if (!firstName && user.fullName) {
          const nameParts = user.fullName.split(" ");
          firstName = nameParts[0];
          lastName = nameParts[1] || "";
        }

        // Обновляем состояние
        this.userId = user.id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = user.email;
        this.token = mockToken;
        this.isAuthenticated = true;

        // Сохраняем в localStorage
        localStorage.setItem("token", mockToken);
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: user.id,
            firstName: firstName,
            lastName: lastName,
            email: user.email,
            fullName: user.fullName,
            createdAt: user.createdAt,
          })
        );

        // Создаем запись в логе входов
        try {
          await axios.post(LOGIN_URL, {
            userId: user.id,
            email: user.email,
            loginTime: new Date().toISOString(),
          });
        } catch (logError) {
          console.warn("Не удалось сохранить запись о входе:", logError);
        }

        this.isLoading = false;
        this.saveToStorage(user.id, firstName, lastName, user.email);
        return {
          success: true,
          data: {
            user: user,
            token: mockToken,
          },
        };
      } catch (error) {
        console.error("Ошибка входа:", error);
        this.error = error.message || "Ошибка входа";
        this.isLoading = false;
        return {
          success: false,
          error: this.error,
        };
      }
    },

    logout() {
      this.clearStorage();
    },

    checkAuth() {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");

      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          this.userId = user.id;
          this.firstName = user.firstName;
          this.lastName = user.lastName;
          this.email = user.email;
          this.token = token;
          this.isAuthenticated = true;
          return true;
        } catch (error) {
          console.error("Ошибка при восстановлении сессии:", error);
          this.logout();
        }
      }
      return false;
    },
  },

  getters: {
    fullName: (state) => {
      return state.firstName && state.lastName
        ? `${state.firstName} ${state.lastName}`
        : state.firstName || state.email || null;
    },
  },
});

export { useAuthUserState };
