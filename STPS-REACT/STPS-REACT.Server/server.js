const express = require('express');
const sql = require('mssql');
const app = express();

// Cấu hình kết nối với SQL Server bằng Windows Authentication
const dbConfig = {
  user: '', // Không cần nhập tên người dùng
  password: '', // Không cần mật khẩu
  server: 'localhost', // Tên máy chủ SQL Server của bạn
  database: 'master', // Cơ sở dữ liệu muốn kết nối (ở đây là 'master')
  options: {
    encrypt: true, // Bật mã hóa kết nối (thường dùng nếu bạn kết nối tới Azure SQL)
    trustServerCertificate: true, // Tin tưởng chứng chỉ server (dành cho localhost)
  },
  // Dùng Windows Authentication, bỏ qua user và password
  authentication: {
    type: 'ntlm', // Chọn NTLM để sử dụng Windows Authentication
  },
};

// Kết nối tới cơ sở dữ liệu SQL Server
sql.connect(dbConfig)
  .then(pool => {
    app.locals.pool = pool; // Lưu kết nối pool để sử dụng sau
  })
  .catch(err => console.error('SQL connection error: ', err));

// API để lấy dữ liệu từ bảng
app.get('/api/tours', async (req, res) => {
  try {
    const result = await app.locals.pool.request().query('SELECT * FROM Tours');
    res.json(result.recordset); // Trả về dữ liệu dưới dạng JSON
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Khởi động server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
