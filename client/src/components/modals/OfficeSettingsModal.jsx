import React from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/helpers';

export default function OfficeSettingsModal({ editOfficeData, setEditOfficeData, setOfficeSettings, workDays, setWorkDays, setStatusMsg, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content animate-fadeInUp">
        <div className="modal-header">
          <h3>Office Location Settings</h3>
          <button className="modal-close" onClick={onClose}><span className="material-icons-outlined">close</span></button>
        </div>
        <form onSubmit={async (e) => {
          e.preventDefault();
          try {
            const res = await axios.put(`${API_URL}/api/settings/office`, editOfficeData);
            if (res.data.success) {
              setOfficeSettings(res.data.data);
              onClose();
              setStatusMsg({ type: 'success', text: 'Lokasi kantor diperbarui!' });
              setTimeout(() => setStatusMsg(null), 3000);
            }
          } catch (err) { console.error('Error saving office:', err); }
        }} className="edit-profile-form" style={{ maxHeight: '75vh', overflowY: 'auto', padding: '16px 20px', gap: '12px' }}>
          <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label style={{ fontSize: '11px' }}>Office Name</label>
              <input value={editOfficeData.name} onChange={e => setEditOfficeData({ ...editOfficeData, name: e.target.value })} placeholder="e.g. EMS Head Office" required style={{ padding: '8px 10px', fontSize: '13px' }} />
            </div>
            <div className="form-group">
              <label style={{ fontSize: '11px' }}>Radius (m)</label>
              <input type="number" value={editOfficeData.radius} onChange={e => setEditOfficeData({ ...editOfficeData, radius: e.target.value })} min="10" max="1000" required style={{ padding: '8px 10px', fontSize: '13px' }} />
            </div>
          </div>

          <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label style={{ fontSize: '11px' }}>Latitude</label>
              <input type="number" step="any" value={editOfficeData.lat} onChange={e => setEditOfficeData({ ...editOfficeData, lat: e.target.value })} required style={{ padding: '8px 10px', fontSize: '13px' }} />
            </div>
            <div className="form-group">
              <label style={{ fontSize: '11px' }}>Longitude</label>
              <input type="number" step="any" value={editOfficeData.lng} onChange={e => setEditOfficeData({ ...editOfficeData, lng: e.target.value })} required style={{ padding: '8px 10px', fontSize: '13px' }} />
            </div>
          </div>

          <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>
            💡 Tip: Buka Google Maps, klik kanan pada lokasi kantor, lalu salin koordinatnya.
          </p>

          <div className="form-group" style={{ marginTop: '10px', padding: '12px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', fontWeight: 'bold', fontSize: '12px' }}>
              <span className="material-icons-outlined" style={{ fontSize: '16px' }}>calendar_month</span> Pengaturan Hari Kerja
            </label>
            <div className="workdays-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((shortDay, idx) => {
                const fullDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                const day = fullDays[idx];
                const isSelected = workDays.includes(day);
                return (
                  <label key={day} style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontSize: '11px', background: isSelected ? '#eff6ff' : 'white', padding: '4px 8px', borderRadius: '8px', border: isSelected ? '1px solid #3b82f6' : '1px solid #e2e8f0', color: isSelected ? '#1d4ed8' : '#64748b', fontWeight: isSelected ? '600' : '400' }}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      style={{ margin: 0, width: '13px', height: '13px' }}
                      onChange={async (e) => {
                        let newDays;
                        if (e.target.checked) newDays = [...workDays, day];
                        else newDays = workDays.filter(d => d !== day);
                        setWorkDays(newDays);
                        try {
                          await axios.put(`${API_URL}/api/settings/workdays`, { days: newDays });
                        } catch (err) { console.error('Error saving workdays:', err); }
                      }}
                    />
                    {shortDay}
                  </label>
                );
              })}
            </div>
          </div>

          <div className="modal-footer" style={{ marginTop: '10px', padding: 0 }}>
            <button type="button" className="btn-cancel" onClick={onClose} style={{ padding: '8px 16px', fontSize: '13px' }}>Cancel</button>
            <button type="submit" className="btn-save" style={{ padding: '8px 16px', fontSize: '13px' }}>Save Location</button>
          </div>
        </form>
      </div>
    </div>
  );
}
