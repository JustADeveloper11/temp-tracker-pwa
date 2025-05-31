const tempForm = document.getElementById('tempForm');
const tempInput = document.getElementById('tempInput');
const tempList = document.getElementById('tempList');

let temperatures = JSON.parse(localStorage.getItem('temperatures') || '[]');

function renderTemps() {
  tempList.innerHTML = '';
  temperatures.forEach((t, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div>
        <strong>${t.value.toFixed(1)}°C</strong><br>
        <small>${new Date(t.date).toLocaleString()}</small>
      </div>
      <button onclick="deleteTemp(${index})">🗑</button>
    `;
    tempList.appendChild(li);
  });
}

function saveTemps() {
  localStorage.setItem('temperatures', JSON.stringify(temperatures));
}

function deleteTemp(index) {
  temperatures.splice(index, 1);
  saveTemps();
  renderTemps();
}

tempForm.addEventListener('submit', e => {
  e.preventDefault();
  const value = parseFloat(tempInput.value);
  if (!isNaN(value)) {
    temperatures.push({ date: new Date().toISOString(), value });
    saveTemps();
    renderTemps();
    tempInput.value = '';
  }
});

renderTemps();
