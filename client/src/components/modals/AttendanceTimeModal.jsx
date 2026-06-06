import React from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/helpers';

export default function AttendanceTimeModal({ editOfficeData, setEditOfficeData, setOfficeSettings, setStatusMsg, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content animate-fadeInUp" style={{ maxWidth: '450px' }}>
        <div className="modal-header">
          <h3>Attendance Time Rules Settings</h3>
          <button className="modal-close" onClick={onClose}><span className="material-icons-outlined">close</span></button>
        </div>
        <form onSubmit={async (e) => {
          e.preventDefault();
          try {
            const res = await axios.put(`${API_URL}/api/settings/office`, editOfficeData);
            if (res.data.success) {
              setOfficeSettings(res.data.data);
              onClose();
              setStatusMsg({ type: 'success', text: 'Aturan waktu absensi diperbarui!' });
              setTimeout(() => setStatusMsg(null), 3000);
            }
          } catch (err) { console.error('Error saving time rules:', err); }
        }} className="edit-profile-form">
          <div className="form-group" style={{ padding: '15px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontWeight: 'bold' }}>
              <span className="material-icons-outlined">schedule</span> Aturan Waktu Absensi
            </label>
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div className="form-group">
                <label>Mulai Absen Masuk</label>
                <input type="time" value={editOfficeData.clockInStart || '07:00'} onChange={e => setEditOfficeData({ ...editOfficeData, clockInStart: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Batas Absen Masuk</label>
                <input type="time" value={editOfficeData.clockInLimit || '08:00'} onChange={e => setEditOfficeData({ ...editOfficeData, clockInLimit: e.target.value })} required />
              </div>
            </div>
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
              <div className="form-group">
                <label>Batas Waktu Telat</label>
                <input type="time" value={editOfficeData.lateThreshold || '09:15'} onChange={e => setEditOfficeData({ ...editOfficeData, lateThreshold: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Jam Pulang Minimal</label>
                <input type="time" value={editOfficeData.clockOutMin || '17:00'} onChange={e => setEditOfficeData({ ...editOfficeData, clockOutMin: e.target.value })} required />
              </div>
            </div>
          </div>

          <div className="modal-footer" style={{ marginTop: '20px' }}>
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-save">Save Settings</button>
          </div>
        </form>
      </div>
    </div>
  );
}
