import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/app/hooks";

import {
  login,
  clearError,
  selectSessionLoading,
  selectSessionError,
} from "@/entities/session";

import { ROUTES } from "@/shared/config";
import { Button, Input, Checkbox } from "@/shared/ui";

import styles from "./LoginPage.module.css";

function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectSessionLoading);
  const serverError = useAppSelector(selectSessionError);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const validate = (): boolean => {
    const next: typeof errors = {};
    if (!username.trim()) next.username = "Введите логин";
    if (!password.trim()) next.password = "Введите пароль";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());

    if (!validate()) return;

    const result = await dispatch(
      login({ credentials: { username, password }, remember }),
    );

    if (login.fulfilled.match(result)) {
      navigate(ROUTES.PRODUCTS, { replace: true });
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Вход</h1>
        <p className={styles.subtitle}>
          Тестовые данные: <code>emilys</code> / <code>emilyspass</code>
        </p>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="username">
            Логин
          </label>
          <Input
            id="username"
            placeholder="Введите логин"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <span className={styles.error}>{errors.username}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="password">
            Пароль
          </label>
          <Input
            id="password"
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span className={styles.error}>{errors.password}</span>}
        </div>

        <Checkbox
          checked={remember}
          onChange={() => setRemember((v) => !v)}
          label="Запомнить меня"
        />

        {serverError && <div className={styles.serverError}>{serverError}</div>}

        <Button type="submit" variant="primary" size="lg" fullWidth disabled={loading}>
          {loading ? "Вход…" : "Войти"}
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;
