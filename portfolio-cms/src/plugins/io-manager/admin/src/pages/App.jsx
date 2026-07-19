import React, { useState, useRef } from 'react';

// Relative to the Strapi admin host (works in local + deployed CMS)
const STRAPI = '/api';

const COLLECTIONS = [
  { name: 'Hero',         endpoint: 'heroes'        },
  { name: 'About',        endpoint: 'abouts'        },
  { name: 'Project',      endpoint: 'projects'      },
  { name: 'StackItem',    endpoint: 'stack-items'   },
  { name: 'Service',      endpoint: 'services'      },
  { name: 'Contact',      endpoint: 'contacts'      },
  { name: 'SiteSettings', endpoint: 'site-settings' },
];

const ENDPOINT_MAP = {
  heroes: 'Hero',
  abouts: 'About',
  projects: 'Project',
  'stack-items': 'StackItem',
  services: 'Service',
  contacts: 'Contact',
  'site-settings': 'SiteSettings',
};

const META_FIELDS = new Set([
  'id',
  'documentId',
  'createdAt',
  'updatedAt',
  'publishedAt',
  'locale',
  'createdBy',
  'updatedBy',
  'localizations',
]);

function detectCollection(data) {
  if (!data || !Array.isArray(data) || data.length === 0) return null;
  const first = data[0];
  const keys = Object.keys(first);
  if (keys.includes('heroWord')) return 'heroes';
  if (keys.includes('heading') && keys.includes('para1')) return 'abouts';
  if (keys.includes('title') && keys.includes('techStack')) return 'projects';
  if (keys.includes('cricketRole')) return 'stack-items';
  if (keys.includes('number') && keys.includes('description')) return 'services';
  if (keys.includes('email') && keys.includes('github')) return 'contacts';
  if (keys.includes('seoTitle')) return 'site-settings';
  return null;
}

function getDocumentId(item) {
  return item.documentId || item.id;
}

function stripMeta(item) {
  if (item.attributes) {
    return { ...item.attributes };
  }

  const clean = {};
  for (const [key, value] of Object.entries(item)) {
    if (!META_FIELDS.has(key)) {
      clean[key] = value;
    }
  }
  return clean;
}

const s = {
  page:       { padding: '32px', fontFamily: 'system-ui,sans-serif', background: '#0f0f0f', minHeight: '100vh', color: '#f0f0f0' },
  header:     { fontSize: '22px', fontWeight: '700', marginBottom: '4px' },
  sub:        { color: '#666', fontSize: '13px', marginBottom: '20px' },
  tokenRow:   { display: 'flex', gap: '10px', marginBottom: '20px' },
  tokenInput: { flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #2a2a2a', background: '#1a1a1a', color: '#f0f0f0', fontSize: '13px', fontFamily: 'monospace' },
  saveBtn:    { padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#7c3aed', color: 'white', cursor: 'pointer', fontSize: '13px', fontWeight: '500' },
  uploadBox:  { background: '#1a1a1a', border: '2px dashed #2a2a2a', borderRadius: '12px', padding: '20px', marginBottom: '20px', cursor: 'pointer', transition: 'border-color 0.2s', display: 'flex', alignItems: 'center', gap: '16px' },
  uploadBoxHover: { borderColor: '#7c3aed' },
  uploadIcon: { fontSize: '32px', marginBottom: '8px' },
  uploadTitle:{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' },
  uploadSub:  { fontSize: '12px', color: '#666' },
  uploadResult:{ marginTop: '12px', padding: '12px', background: '#111', borderRadius: '8px', textAlign: 'left' },
  masterBar:  { background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '20px', marginBottom: '32px' },
  masterTitle:{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' },
  masterBtns: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  mBtn: (bg) => ({ padding: '10px 20px', borderRadius: '8px', border: 'none', background: bg, color: 'white', cursor: 'pointer', fontSize: '13px', fontWeight: '600', whiteSpace: 'nowrap' }),
  progressBar:{ height: '4px', background: '#2a2a2a', borderRadius: '4px', marginTop: '12px', overflow: 'hidden' },
  progressFill:(pct) => ({ height: '100%', background: '#7c3aed', borderRadius: '4px', width: `${pct}%`, transition: 'width 0.3s ease' }),
  masterStatus:{ fontSize: '12px', color: '#60a5fa', marginTop: '8px' },
  grid:       { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' },
  card:       { background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '18px' },
  cardTitle:  { fontSize: '15px', fontWeight: '600', marginBottom: '2px' },
  cardEp:     { fontSize: '11px', color: '#555', fontFamily: 'monospace', marginBottom: '12px' },
  btnGrid:    { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '8px' },
  btn: (bg)  => ({ padding: '8px 0', borderRadius: '7px', border: 'none', background: bg, color: 'white', cursor: 'pointer', fontSize: '12px', fontWeight: '500' }),
  status: (t)=> ({ fontSize: '12px', marginTop: '6px', color: t==='ok'?'#34d399':t==='err'?'#f87171':t==='warn'?'#fbbf24':'#60a5fa' }),
  textarea:   { width: '100%', marginTop: '8px', padding: '10px', background: '#111', border: '1px solid #333', borderRadius: '6px', color: '#f0f0f0', fontFamily: 'monospace', fontSize: '12px', minHeight: '80px', resize: 'vertical', boxSizing: 'border-box' },
  customBtn:  { width: '100%', marginTop: '6px', padding: '8px', borderRadius: '6px', border: 'none', background: '#1d4ed8', color: 'white', cursor: 'pointer', fontSize: '12px' },
  toggleBtn:  { width: '100%', marginTop: '6px', padding: '7px', borderRadius: '6px', border: '1px solid #333', background: 'transparent', color: '#888', cursor: 'pointer', fontSize: '12px' },
  sectionLabel:{ fontSize: '11px', color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' },
};

export default function App() {
  const [token, setToken]           = useState(localStorage.getItem('strapi_io_token') || '');
  const [statuses, setStatuses]     = useState({});
  const [masterStatus, setMasterStatus] = useState('');
  const [masterProgress, setMasterProgress] = useState(0);
  const [isBusy, setIsBusy]         = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileRef = useRef();
  const cardFileRefs = useRef({});

  function getCardRef(endpoint) {
    if (!cardFileRefs.current[endpoint]) {
      cardFileRefs.current[endpoint] = React.createRef();
    }
    return cardFileRefs.current[endpoint];
  }

  function saveToken() {
    localStorage.setItem('strapi_io_token', token);
    alert('Token saved!');
  }

  function hdrs() {
    return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
  }

  function setSt(key, msg, type = 'info') {
    setStatuses(p => ({ ...p, [key]: { msg, type } }));
  }

  async function exportData(endpoint, name, key) {
    setSt(key, 'Exporting...');
    try {
      const r = await fetch(`${STRAPI}/${endpoint}?pagination[limit]=100&populate=*&status=published`, { headers: hdrs() });
      const json = await r.json();
      const data = (json.data || []).map(stripMeta);
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `${name.toLowerCase()}.json`; a.click();
      URL.revokeObjectURL(url);
      setSt(key, `✓ ${data.length} entries exported`, 'ok');
    } catch { setSt(key, 'Export failed', 'err'); }
  }

  async function publishAll(endpoint, key) {
    setSt(key, 'Publishing...');
    try {
      const r = await fetch(`${STRAPI}/${endpoint}?pagination[limit]=100&status=draft`, { headers: hdrs() });
      const json = await r.json();
      let pub = 0;
      for (const item of (json.data || [])) {
        const documentId = getDocumentId(item);
        const res = await fetch(`${STRAPI}/${endpoint}/${documentId}`, {
          method: 'PUT', headers: hdrs(),
          body: JSON.stringify({ data: {}, status: 'published' }),
        });
        if (res.ok) pub++;
      }
      setSt(key, `✓ ${pub} entries published`, 'ok');
      return pub;
    } catch { setSt(key, 'Publish failed', 'err'); return 0; }
  }

  async function unpublishAll(endpoint, key) {
    if (!window.confirm(`Unpublish ALL entries in ${ENDPOINT_MAP[endpoint] || endpoint}?`)) return;
    setSt(key, 'Unpublishing...');
    try {
      const r = await fetch(`${STRAPI}/${endpoint}?pagination[limit]=100&status=published`, { headers: hdrs() });
      const json = await r.json();
      let done = 0;
      for (const item of (json.data || [])) {
        const documentId = getDocumentId(item);
        const res = await fetch(`${STRAPI}/${endpoint}/${documentId}`, {
          method: 'PUT', headers: hdrs(),
          body: JSON.stringify({ data: {}, status: 'draft' }),
        });
        if (res.ok) done++;
      }
      setSt(key, `✓ ${done} entries unpublished`, 'warn');
      return done;
    } catch { setSt(key, 'Unpublish failed', 'err'); return 0; }
  }

  async function deleteAll(endpoint, key) {
    if (!window.confirm(`⚠️ DELETE ALL entries in ${ENDPOINT_MAP[endpoint] || endpoint}? This cannot be undone!`)) return;
    setSt(key, 'Deleting...');
    try {
      const r = await fetch(`${STRAPI}/${endpoint}?pagination[limit]=100`, { headers: hdrs() });
      const json = await r.json();
      let del = 0;
      for (const item of (json.data || [])) {
        const documentId = getDocumentId(item);
        const res = await fetch(`${STRAPI}/${endpoint}/${documentId}`, {
          method: 'DELETE', headers: hdrs(),
        });
        if (res.ok) del++;
      }
      setSt(key, `🗑 ${del} entries deleted`, 'err');
      return del;
    } catch { setSt(key, 'Delete failed', 'err'); return 0; }
  }

  async function handleFile(file) {
    if (!token) {
      setUploadStatus({ msg: 'Save your API token first', type: 'err' });
      return;
    }
    if (!file || !file.name.endsWith('.json')) {
      setUploadStatus({ msg: 'Please upload a .json file', type: 'err' });
      return;
    }
    setUploadStatus({ msg: `Reading ${file.name}...`, type: 'info' });
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);

      if (Array.isArray(parsed)) {
        const detected = detectCollection(parsed);
        if (!detected) {
          setUploadStatus({ msg: '❓ Could not detect collection. Use individual card browse buttons instead.', type: 'err' });
          return;
        }
        const colName = ENDPOINT_MAP[detected];
        setUploadStatus({ msg: `Detected: ${colName} — importing ${parsed.length} entries...`, type: 'info' });
        let ok = 0;
        for (const item of parsed) {
          try {
            const r = await fetch(`${STRAPI}/${detected}`, {
              method: 'POST', headers: hdrs(),
              body: JSON.stringify({ data: item, status: 'published' }),
            });
            if (r.ok) ok++;
          } catch {}
        }
        setUploadStatus({ msg: `✓ ${ok}/${parsed.length} entries imported into ${colName}`, type: 'ok' });
        setSt(detected, `✓ ${ok}/${parsed.length} imported via file`, 'ok');

      } else if (typeof parsed === 'object' && parsed !== null) {
        const keys = Object.keys(parsed);
        const validKeys = keys.filter(k => ENDPOINT_MAP[k]);
        if (validKeys.length === 0) {
          setUploadStatus({ msg: '❓ No valid collection keys found in file', type: 'err' });
          return;
        }
        setUploadStatus({ msg: `Found ${validKeys.length} collections — importing all...`, type: 'info' });
        let totalOk = 0;
        let totalAll = 0;
        for (const key of validKeys) {
          const items = parsed[key];
          if (!Array.isArray(items)) continue;
          totalAll += items.length;
          let ok = 0;
          for (const item of items) {
            try {
              const r = await fetch(`${STRAPI}/${key}`, {
                method: 'POST', headers: hdrs(),
                body: JSON.stringify({ data: item, status: 'published' }),
              });
              if (r.ok) ok++;
            } catch {}
          }
          totalOk += ok;
          setSt(key, `✓ ${ok}/${items.length} imported`, 'ok');
        }
        setUploadStatus({
          msg: `✓ Done! ${totalOk}/${totalAll} total entries imported across ${validKeys.length} collections`,
          type: 'ok',
        });
      } else {
        setUploadStatus({ msg: 'Invalid JSON format', type: 'err' });
      }
    } catch {
      setUploadStatus({ msg: 'Invalid JSON file — check format', type: 'err' });
    }
  }

  function onFileChange(e) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function onDrop(e) {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  async function handleCardFile(endpoint, file) {
    const key = endpoint;
    if (!file || !file.name.endsWith('.json')) {
      setSt(key, 'Please select a .json file', 'err');
      return;
    }
    setSt(key, `Reading ${file.name}...`, 'info');
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      setSt(key, `Importing ${arr.length} entries from ${file.name}...`, 'info');
      let ok = 0;
      for (const item of arr) {
        try {
          const r = await fetch(`${STRAPI}/${endpoint}`, {
            method: 'POST',
            headers: hdrs(),
            body: JSON.stringify({ data: item, status: 'published' }),
          });
          if (r.ok) ok++;
          else {
            const e = await r.json();
            console.error(e);
          }
        } catch (e) {
          console.error(e);
        }
      }
      setSt(key, `✓ ${ok}/${arr.length} entries imported from ${file.name}`, 'ok');
    } catch {
      setSt(key, 'Invalid JSON file', 'err');
    }
  }

  async function exportAllCollections() {
    if (isBusy) return;
    if (!token) { alert('Save your API token first!'); return; }
    setIsBusy(true);
    setMasterStatus('Exporting all...');
    for (let i = 0; i < COLLECTIONS.length; i++) {
      const col = COLLECTIONS[i];
      setMasterStatus(`Exporting ${col.name}...`);
      await exportData(col.endpoint, col.name, col.endpoint);
      setMasterProgress(Math.round(((i + 1) / COLLECTIONS.length) * 100));
      await new Promise(r => setTimeout(r, 400));
    }
    setMasterStatus('✓ All collections exported');
    setIsBusy(false);
  }

  async function publishAllCollections() {
    if (isBusy) return;
    if (!token) { alert('Save your API token first!'); return; }
    setIsBusy(true);
    setMasterStatus('Publishing all...');
    setMasterProgress(0);
    let total = 0;
    for (let i = 0; i < COLLECTIONS.length; i++) {
      const col = COLLECTIONS[i];
      setMasterStatus(`Publishing ${col.name}...`);
      const ok = await publishAll(col.endpoint, col.endpoint);
      total += ok;
      setMasterProgress(Math.round(((i + 1) / COLLECTIONS.length) * 100));
    }
    setMasterStatus(`✓ ${total} entries published`);
    setIsBusy(false);
  }

  async function unpublishAllCollections() {
    if (isBusy) return;
    if (!window.confirm('Unpublish ALL entries across ALL collections?')) return;
    if (!token) { alert('Save your API token first!'); return; }
    setIsBusy(true);
    setMasterStatus('Unpublishing all...');
    setMasterProgress(0);
    let total = 0;
    for (let i = 0; i < COLLECTIONS.length; i++) {
      const col = COLLECTIONS[i];
      setMasterStatus(`Unpublishing ${col.name}...`);
      const r = await fetch(`${STRAPI}/${col.endpoint}?pagination[limit]=100&status=published`, { headers: hdrs() });
      const json = await r.json();
      for (const item of (json.data || [])) {
        const documentId = getDocumentId(item);
        const res = await fetch(`${STRAPI}/${col.endpoint}/${documentId}`, {
          method: 'PUT', headers: hdrs(),
          body: JSON.stringify({ data: {}, status: 'draft' }),
        });
        if (res.ok) total++;
      }
      setSt(col.endpoint, '✓ Unpublished', 'warn');
      setMasterProgress(Math.round(((i + 1) / COLLECTIONS.length) * 100));
    }
    setMasterStatus(`⚠ ${total} entries unpublished`);
    setIsBusy(false);
  }

  async function deleteAllCollections() {
    if (isBusy) return;
    if (!window.confirm('⚠️ DELETE ALL entries across ALL collections? This CANNOT be undone!')) return;
    if (!window.confirm('Are you absolutely sure? All data will be permanently deleted.')) return;
    if (!token) { alert('Save your API token first!'); return; }
    setIsBusy(true);
    setMasterStatus('Deleting all...');
    setMasterProgress(0);
    let total = 0;
    for (let i = 0; i < COLLECTIONS.length; i++) {
      const col = COLLECTIONS[i];
      setMasterStatus(`Deleting ${col.name}...`);
      const r = await fetch(`${STRAPI}/${col.endpoint}?pagination[limit]=100`, { headers: hdrs() });
      const json = await r.json();
      for (const item of (json.data || [])) {
        const documentId = getDocumentId(item);
        const res = await fetch(`${STRAPI}/${col.endpoint}/${documentId}`, {
          method: 'DELETE', headers: hdrs(),
        });
        if (res.ok) total++;
      }
      setSt(col.endpoint, '🗑 Deleted', 'err');
      setMasterProgress(Math.round(((i + 1) / COLLECTIONS.length) * 100));
    }
    setMasterStatus(`🗑 ${total} entries deleted across all collections`);
    setIsBusy(false);
  }

  const busy = (fn) => isBusy ? undefined : fn;

  return (
    <div style={s.page}>
      <div style={s.header}>IO Manager</div>
      <div style={s.sub}>Import · Export · Publish · Unpublish · Delete — Rithik Sharon A Portfolio</div>

      <div style={s.tokenRow}>
        <input
          style={s.tokenInput}
          type="password"
          placeholder="Paste Full Access API token..."
          value={token}
          onChange={e => setToken(e.target.value)}
        />
        <button style={s.saveBtn} onClick={saveToken}>Save Token</button>
      </div>

      <div style={s.sectionLabel}>Import all collections from one file</div>
      <div
        style={{ ...s.uploadBox, ...(isDragOver ? s.uploadBoxHover : {}) }}
        onClick={() => fileRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={onDrop}
      >
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '2px' }}>
            portfolio-data.json — drop here or click to browse
          </div>
          <div style={{ fontSize: '11px', color: '#555' }}>
            Single file containing all 7 collections · auto-imports everything at once
          </div>
          {uploadStatus && (
            <div style={{
              marginTop: '6px',
              fontSize: '12px',
              color: uploadStatus.type === 'ok' ? '#34d399' : uploadStatus.type === 'err' ? '#f87171' : '#60a5fa',
            }}>
              {uploadStatus.msg}
            </div>
          )}
        </div>
        <button
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            background: '#7c3aed',
            color: 'white',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '600',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
          onClick={e => { e.stopPropagation(); fileRef.current?.click(); }}
        >
          📂 Browse File
        </button>
        <input ref={fileRef} type="file" accept=".json" style={{ display: 'none' }} onChange={onFileChange} />
      </div>

      <div style={s.sectionLabel}>Master controls — all collections at once</div>
      <div style={s.masterBar}>
        <div style={s.masterTitle}>All 7 Collections</div>
        <div style={s.masterBtns}>
          <button style={{ ...s.mBtn('#065f46'), opacity: isBusy ? 0.5 : 1 }} onClick={busy(exportAllCollections)} disabled={isBusy}>
            ↑ Export All
          </button>
          <button style={{ ...s.mBtn('#92400e'), opacity: isBusy ? 0.5 : 1 }} onClick={busy(publishAllCollections)} disabled={isBusy}>
            ✓ Publish All
          </button>
          <button style={{ ...s.mBtn('#854d0e'), opacity: isBusy ? 0.5 : 1 }} onClick={busy(unpublishAllCollections)} disabled={isBusy}>
            ✕ Unpublish All
          </button>
          <button style={{ ...s.mBtn('#7f1d1d'), opacity: isBusy ? 0.5 : 1 }} onClick={busy(deleteAllCollections)} disabled={isBusy}>
            🗑 Delete All
          </button>
        </div>
        {masterStatus && (
          <>
            <div style={s.progressBar}>
              <div style={s.progressFill(masterProgress)} />
            </div>
            <div style={s.masterStatus}>{masterStatus}</div>
          </>
        )}
      </div>

      <div style={s.sectionLabel}>Individual collections</div>
      <div style={s.grid}>
        {COLLECTIONS.map((col) => {
          const key = col.endpoint;
          const st = statuses[key];
          const cardRef = getCardRef(col.endpoint);
          return (
            <div key={key} style={s.card}>
              <div style={s.cardTitle}>{col.name}</div>
              <div style={s.cardEp}>/api/{col.endpoint}</div>
              <div style={s.btnGrid}>

                <button
                  style={{
                    ...s.btn('#7c3aed'),
                    gridColumn: 'span 2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                  onClick={() => cardRef.current?.click()}
                >
                  📂 Browse & Import JSON
                </button>
                <input
                  ref={cardRef}
                  type="file"
                  accept=".json"
                  style={{ display: 'none' }}
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) handleCardFile(col.endpoint, file);
                    e.target.value = '';
                  }}
                />

                <button style={s.btn('#065f46')} onClick={() => exportData(col.endpoint, col.name, key)}>↑ Export</button>
                <button style={s.btn('#92400e')} onClick={() => publishAll(col.endpoint, key)}>✓ Publish All</button>
                <button style={s.btn('#854d0e')} onClick={() => unpublishAll(col.endpoint, key)}>✕ Unpublish All</button>
                <button style={{ ...s.btn('#7f1d1d'), gridColumn: 'span 2' }} onClick={() => deleteAll(col.endpoint, key)}>🗑 Delete All</button>
              </div>
              {st && <div style={s.status(st.type)}>{st.msg}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
