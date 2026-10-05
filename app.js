async function showRelease() {
  try {
    const response = await fetch('release.json', { cache: 'no-store' });
    if (!response.ok) return;
    const envelope = await response.json();
    const release = JSON.parse(atob(envelope.payload));
    if (release.schema !== 1 || !/^\d+\.\d+\.\d+\.\d+$/.test(release.version)) return;
    document.getElementById('release-version').textContent = 'Версия ' + release.version;
    document.getElementById('game-size').textContent = Math.ceil(release.archiveSize / 1048576) + ' МБ';
  } catch { /* Download and instructions stay usable when version lookup fails. */ }
}
showRelease();
