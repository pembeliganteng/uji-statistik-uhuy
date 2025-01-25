const var1Select = document.getElementById('var1');
const var2Container = document.getElementById('var2Container');
const var2Select = document.getElementById('var2');
const additionalOptions = document.getElementById('additionalOptions');
const resultDiv = document.getElementById('result');
const testResult = document.getElementById('testResult');
const resetButton = document.getElementById('resetButton');
const explanationButton = document.getElementById('explanationButton');

// Fungsi untuk mereset form
function resetForm() {
  var1Select.value = ''; // Reset Variabel 1
  var2Select.value = ''; // Reset Variabel 2
  var2Container.style.display = 'none'; // Sembunyikan Variabel 2
  additionalOptions.innerHTML = ''; // Hapus opsi tambahan
  additionalOptions.style.display = 'none'; // Sembunyikan opsi tambahan
  resultDiv.style.display = 'none'; // Sembunyikan hasil
  testResult.textContent = ''; // Kosongkan teks hasil
  explanationButton.style.display = 'none'; // Sembunyikan tombol penjelasan
}

// Event listener untuk tombol reset
resetButton.addEventListener('click', resetForm);

// Logika sebelumnya (tetap dipertahankan)
var1Select.addEventListener('change', function () {
  const var1Value = var1Select.value;

  if (var1Value === 'kategorik' || var1Value === 'kontinyu') {
    var2Container.style.display = 'block';
  } else {
    var2Container.style.display = 'none';
    additionalOptions.style.display = 'none';
    resultDiv.style.display = 'none';
  }
});

var2Select.addEventListener('change', function () {
  const var1Value = var1Select.value;
  const var2Value = var2Select.value;

  if (var1Value === 'kategorik' && var2Value === 'kategorik') {
    additionalOptions.innerHTML = `
      <label for="yangDicari">Yang Dicari:</label>
      <select id="yangDicari" name="yangDicari">
        <option value="">Pilih Opsi</option>
        <option value="asosiasi">Asosiasi</option>
        <option value="kesepakatan">Kesepakatan</option>
        <option value="derajat_hubungan">Derajat Hubungan/Risk</option>
        <option value="komparasi_2x2">Komparasi Ordinal 2x2</option>
        <option value="komparasi_>2">Komparasi Ordinal >2</option>
      </select>
    `;
    additionalOptions.style.display = 'block';
  } else if (var1Value === 'kategorik' && var2Value === 'kontinyu') {
    additionalOptions.innerHTML = `
      <label for="distribusi">Distribusi/Jumlah Sampel:</label>
      <select id="distribusi" name="distribusi">
        <option value="">Pilih Opsi</option>
        <option value="normal_besar">Normal/Besar (>30)</option>
        <option value="tidak_normal_kecil">Tidak Normal/Kecil (<30)</option>
      </select>
    `;
    additionalOptions.style.display = 'block';
  } else {
    additionalOptions.style.display = 'none';
  }
});

additionalOptions.addEventListener('change', function (e) {
  if (e.target.id === 'yangDicari') {
    const yangDicari = e.target.value;
    let testName = '';
    let explanationLink = '';

    switch (yangDicari) {
      case 'asosiasi':
        testName = 'Chi-Square';
        explanationLink = 'https://en.wikipedia.org/wiki/Chi-squared_test';
        break;
      case 'kesepakatan':
        testName = 'Kappa';
        explanationLink = 'https://en.wikipedia.org/wiki/Cohen%27s_kappa';
        break;
      case 'derajat_hubungan':
        testName = 'OR/RR';
        explanationLink = 'https://en.wikipedia.org/wiki/Odds_ratio';
        break;
      case 'komparasi_2x2':
        testName = 'McNemar';
        explanationLink = 'https://en.wikipedia.org/wiki/McNemar%27s_test';
        break;
      case 'komparasi_>2':
        testName = 'Cochran Q';
        explanationLink = 'https://en.wikipedia.org/wiki/Cochran%27s_Q_test';
        break;
      default:
        testName = '';
        explanationLink = '#';
    }

    testResult.textContent = testName;
    explanationButton.href = explanationLink;
    explanationButton.style.display = 'block';
    resultDiv.style.display = 'block';
  } else if (e.target.id === 'distribusi') {
    const distribusi = e.target.value;
    let testName = '';
    let explanationLink = '';

    switch (distribusi) {
      case 'normal_besar':
        testName = 'Korelasi Pearson atau Regresi';
        explanationLink = 'https://en.wikipedia.org/wiki/Pearson_correlation_coefficient';
        break;
      case 'tidak_normal_kecil':
        testName = 'Korelasi Spearman';
        explanationLink = 'https://en.wikipedia.org/wiki/Spearman%27s_rank_correlation_coefficient';
        break;
      default:
        testName = '';
        explanationLink = '#';
    }

    testResult.textContent = testName;
    explanationButton.href = explanationLink;
    explanationButton.style.display = 'block';
    resultDiv.style.display = 'block';
  }
});