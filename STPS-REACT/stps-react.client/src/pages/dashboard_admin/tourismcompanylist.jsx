import React, { useEffect, useState } from 'react';
import {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany
} from '../../services/TourismCompanyService';
import { UTIL_VARIABLE } from '../../utils/UtilVariable';
import { FaBuilding, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import './style/modern-dashboard.css';

function TourismCompanyList() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    companyId: '',
    companyName: '',
    representativeName: '',
    email: '',
    phoneNumber: '',
    taxCode: ''
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      console.log('Fetching companies from:', UTIL_VARIABLE.REACT_BASE_URL+'/TourismCompanies');
      const response = await getCompanies();
      console.log('Companies API response:', response);
      if (response.data && response.data.data) {
        setCompanies(response.data.data);
        console.log('Companies loaded:', response.data.data);
      } else {
        console.warn('No companies data found in response');
      }
    } catch (error) {
      console.error('Lỗi khi tải danh sách công ty du lịch:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    // Kiểm tra companyId là số nguyên hợp lệ
    if (!formData.companyId.toString().trim()) {
      errors.companyId = 'ID công ty không được để trống';
    } else if (isNaN(parseInt(formData.companyId))) {
      errors.companyId = 'ID công ty phải là số nguyên';
    } else if (parseInt(formData.companyId) <= 0) {
      errors.companyId = 'ID công ty phải là số nguyên dương';
    }

    // Validate company name
    if (!formData.companyName.trim()) {
      errors.companyName = 'Tên công ty không được để trống';
    }

    if (!formData.representativeName.trim()) errors.representativeName = 'Tên người đại diện không được để trống';
    if (!formData.email.trim()) errors.email = 'Email không được để trống';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email không hợp lệ';
    if (!formData.phoneNumber.trim()) errors.phoneNumber = 'Số điện thoại không được để trống';
    if (!formData.taxCode.trim()) errors.taxCode = 'Mã số thuế không được để trống';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      if (modalMode === 'add') {
        // Chuyển đổi companyId thành số nguyên
        const createData = {
          ...formData,
          companyId: parseInt(formData.companyId)
        };

        console.log('Creating new company with data:', createData);
        try {
          const response = await createCompany(createData);
          console.log('Create company response:', response);
          alert('Thêm công ty du lịch mới thành công!');
        } catch (error) {
          console.error('Error creating company:', error);
          console.error('Error response:', error.response);
          alert(`Lỗi khi thêm công ty: ${error.response?.data?.message || error.message}`);
          throw error; // Re-throw để catch bên ngoài xử lý
        }
      } else {
        // Đảm bảo chỉ gửi các trường cần thiết cho API cập nhật
        const updateData = {
          id: selectedCompany.id,
          representativeName: formData.representativeName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          taxCode: formData.taxCode
        };

        console.log('Updating company with ID:', selectedCompany.id);
        console.log('Update data:', updateData);

        const response = await updateCompany(selectedCompany.id, updateData);
        console.log('Update company response:', response);
        alert('Cập nhật công ty du lịch thành công!');
      }

      closeModal();
      fetchCompanies();
    } catch (error) {
      console.error('Lỗi khi lưu thông tin công ty du lịch:', error);
      alert('Có lỗi xảy ra khi lưu thông tin công ty du lịch. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa công ty du lịch này?')) {
      try {
        setLoading(true);
        await deleteCompany(id);
        fetchCompanies();
      } catch (error) {
        console.error('Lỗi khi xóa công ty du lịch:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const openAddModal = () => {
    setFormData({
      companyId: '',
      companyName: '',
      representativeName: '',
      email: '',
      phoneNumber: '',
      taxCode: ''
    });
    setFormErrors({});
    setModalMode('add');
    setShowModal(true);
  };

  const openEditModal = async (id) => {
    try {
      setLoading(true);
      const response = await getCompanyById(id);

      if (response.data && response.data.data) {
        const company = response.data.data;
        setSelectedCompany(company);
        setFormData({
          companyId: company.companyId,
          companyName: company.companyName,
          representativeName: company.representativeName,
          email: company.email,
          phoneNumber: company.phoneNumber,
          taxCode: company.taxCode
        });
        setFormErrors({});
        setModalMode('edit');
        setShowModal(true);

        // Log để kiểm tra dữ liệu
        console.log('Company data loaded for editing:', company);
      }
    } catch (error) {
      console.error('Lỗi khi tải thông tin công ty du lịch:', error);
      alert('Không thể tải thông tin công ty du lịch. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const filteredCompanies = companies.filter(company =>
    company.representativeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.phoneNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.taxCode?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Quản lý công ty du lịch</h2>
        <div className="header-actions">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Tìm kiếm công ty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-secondary" onClick={openAddModal}>
            <FaBuilding /> Thêm công ty du lịch
          </button>
        </div>
      </div>

      {loading && <div className="loading-spinner">Đang tải...</div>}

      <div className="table-container">
        <table className="modern-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Mã công ty</th>
              <th>Tên công ty</th>
              <th>Người đại diện</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Mã số thuế</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map(company => (
                <tr key={company.id}>
                  <td>{company.id}</td>
                  <td>{company.companyId}</td>
                  <td>{company.companyName}</td>
                  <td>{company.representativeName}</td>
                  <td>{company.email}</td>
                  <td>{company.phoneNumber}</td>
                  <td>{company.taxCode}</td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="btn btn-icon btn-primary"
                        onClick={() => openEditModal(company.id)}
                        title="Chỉnh sửa"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-icon btn-danger"
                        onClick={() => handleDelete(company.id)}
                        title="Xóa"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{textAlign: 'center', padding: '2rem'}}>
                  {loading ? 'Đang tải dữ liệu...' : 'Không có dữ liệu công ty du lịch'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{modalMode === 'add' ? 'Thêm công ty du lịch mới' : 'Chỉnh sửa công ty du lịch'}</h3>
              <button className="modal-close" onClick={closeModal}>
                <IoMdClose />
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="companyId">Mã công ty</label>
                  <input
                    type="text"
                    id="companyId"
                    name="companyId"
                    value={formData.companyId}
                    onChange={handleInputChange}
                    className={`form-control ${formErrors.companyId ? 'error' : ''}`}
                  />
                  {formErrors.companyId && <div className="form-error">{formErrors.companyId}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="companyName">Tên công ty</label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className={`form-control ${formErrors.companyName ? 'error' : ''}`}
                  />
                  {formErrors.companyName && <div className="form-error">{formErrors.companyName}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="representativeName">Người đại diện</label>
                  <input
                    type="text"
                    id="representativeName"
                    name="representativeName"
                    value={formData.representativeName}
                    onChange={handleInputChange}
                    className={`form-control ${formErrors.representativeName ? 'error' : ''}`}
                  />
                  {formErrors.representativeName && <div className="form-error">{formErrors.representativeName}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-control ${formErrors.email ? 'error' : ''}`}
                  />
                  {formErrors.email && <div className="form-error">{formErrors.email}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phoneNumber">Số điện thoại</label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={`form-control ${formErrors.phoneNumber ? 'error' : ''}`}
                  />
                  {formErrors.phoneNumber && <div className="form-error">{formErrors.phoneNumber}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="taxCode">Mã số thuế</label>
                  <input
                    type="text"
                    id="taxCode"
                    name="taxCode"
                    value={formData.taxCode}
                    onChange={handleInputChange}
                    className={`form-control ${formErrors.taxCode ? 'error' : ''}`}
                  />
                  {formErrors.taxCode && <div className="form-error">{formErrors.taxCode}</div>}
                </div>

                <div className="form-actions">
                  <button type="button" className="btn btn-outline" onClick={closeModal}>Hủy</button>
                  <button type="submit" className="btn btn-primary">
                    {modalMode === 'add' ? 'Thêm mới' : 'Cập nhật'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TourismCompanyList;