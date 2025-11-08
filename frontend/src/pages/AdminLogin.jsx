import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./styles/AdminLogin.scss";

const AdminLogin = () => {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include', // 쿠키/JWT 포함
      });

      if (!res.ok) {
        const err = await res.json();
        setError({ message: err.message || '로그인 실패' });
        return;
      }

      const data = await res.json();
      console.log("로그인 성공:", data);

      // 로그인 성공 시 관리자 페이지로 이동
      nav("/admin/post");
    } catch (error) {
      console.error("서버 요청 실패:", error);
      setError({ message: '서버와 통신 중 오류가 발생했습니다.' });
    }
  };

  return (
    <div className='login-container'>
      <div className='login-header'>
        <h3>관리자 로그인</h3>
        <p>관리자 전용 페이지 입니다.</p>
      </div>

      <form className='login-form' onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="username">관리자 아이디 :</label>
          <input
            type="text"
            name='username'
            id='username'
            value={formData.username}
            onChange={handleChange}
            required
            placeholder='관리자 아이디'
          />
        </div>

        <div className="form-field">
          <label htmlFor="password">관리자 비밀번호 :</label>
          <input
            type="password"
            id='password'
            name='password'
            required
            value={formData.password}
            onChange={handleChange}
            placeholder='관리자 비밀번호'
          />
        </div>

        {error && (
          <div className="error-box">
            <p style={{ color: "red" }}>{error.message}</p>
          </div>
        )}

        <button type='submit'>로그인</button>
      </form>
    </div>
  );
};

export default AdminLogin;
