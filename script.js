// Ambil elemen-elemen yang diperlukan dari DOM
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
  var1Select.value = '';
  var2Select.value = '';
  var2Container.style.display = 'none';
  additionalOptions.innerHTML = '';
  additionalOptions.style.display = 'none';
  resultDiv.style.display = 'none';
  testResult.textContent = '';
  explanationButton.style.display = 'none';
}

// Event listener untuk tombol reset
resetButton.addEventListener('click', resetForm);

// Event listener untuk Variabel 1
var1Select.addEventListener('change', function () {
  const var1Value = var1Select.value;

  if (var1Value === 'kategorik' || var1Value === 'kontinyu') {
    var2Container.style.display = 'block';
  } else {
    resetForm();
  }
});

// Event listener untuk Variabel 2
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
      <label for="jumlahKelompok">Jumlah Kelompok Variabel 2:</label>
      <select id="jumlahKelompok" name="jumlahKelompok">
        <option value="">Pilih Opsi</option>
        <option value="2">2</option>
        <option value=">=3">>=3</option>
      </select>
    `;
    additionalOptions.style.display = 'block';
  } else if (var1Value === 'kontinyu' && var2Value === 'kategorik') {
    additionalOptions.innerHTML = `
      <label for="jumlahKelompok">Jumlah Kelompok Variabel 2:</label>
      <select id="jumlahKelompok" name="jumlahKelompok">
        <option value="">Pilih Opsi</option>
        <option value="2">2</option>
        <option value=">=3">>=3</option>
      </select>
    `;
    additionalOptions.style.display = 'block';
  } else if (var1Value === 'kontinyu' && var2Value === 'kontinyu') {
    additionalOptions.innerHTML = `
      <label for="distribusi_jumlah">Distribusi/Jumlah Sampel:</label>
      <select id="distribusi_jumlah" name="distribusi_jumlah">
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

// Event listener untuk opsi tambahan
additionalOptions.addEventListener('change', function (e) {
  const var1Value = var1Select.value;
  const var2Value = var2Select.value;
  let testName = '';
  let explanationLink = '';

  if (e.target.id === 'yangDicari') {
    const yangDicari = e.target.value;
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
  } else if (e.target.id === 'jumlahKelompok') {
    const jumlahKelompok = e.target.value;
    if (jumlahKelompok === '2' || jumlahKelompok === '>=3') {
      additionalOptions.innerHTML += `
        <label for="distribusi">Distribusi Data:</label>
        <select id="distribusi" name="distribusi">
          <option value="">Pilih Opsi</option>
          <option value="normal">Normal</option>
          <option value="tidak_normal">Tidak Normal</option>
        </select>
      `;
    }
  } else if (e.target.id === 'distribusi') {
    const distribusi = e.target.value;
    if (distribusi === 'normal' || distribusi === 'tidak_normal') {
      additionalOptions.innerHTML += `
        <label for="sifatSampel">Sifat Sampel:</label>
        <select id="sifatSampel" name="sifatSampel">
          <option value="">Pilih Opsi</option>
          <option value="dependen">Dependen</option>
          <option value="independen">Independen</option>
        </select>
      `;
    }
  } else if (e.target.id === 'sifatSampel') {
    const sifatSampel = e.target.value;
    const distribusi = document.getElementById('distribusi').value;
    const jumlahKelompok = document.getElementById('jumlahKelompok').value;

    if (jumlahKelompok && distribusi && sifatSampel) {
      if (jumlahKelompok === '2') {
        if (distribusi === 'normal') {
          if (sifatSampel === 'dependen') {
            testName = 't-paired';
            explanationLink = 'https://en.wikipedia.org/wiki/Paired_difference_test';
          } else if (sifatSampel === 'independen') {
            testName = 't-independent';
            explanationLink = 'https://en.wikipedia.org/wiki/Student%27s_t-test';
          }
        } else if (distribusi === 'tidak_normal') {
          if (sifatSampel === 'dependen') {
            testName = 'Wilcoxon Match Pair';
            explanationLink = 'https://en.wikipedia.org/wiki/Wilcoxon_signed-rank_test';
          } else if (sifatSampel === 'independen') {
            testName = 'Mann-Whitney U';
            explanationLink = 'https://en.wikipedia.org/wiki/Mann%E2%80%93Whitney_U_test';
          }
        }
      } else if (jumlahKelompok === '>=3') {
        if (distribusi === 'normal') {
          if (sifatSampel === 'independen') {
            testName = 'ANOVA';
            explanationLink = 'https://en.wikipedia.org/wiki/Analysis_of_variance';
          }
        } else if (distribusi === 'tidak_normal') {
          if (sifatSampel === 'dependen') {
            testName = 'Friedman';
            explanationLink = 'https://en.wikipedia.org/wiki/Friedman_test';
          } else if (sifatSampel === 'independen') {
            testName = 'Kruskal Wallis H';
            explanationLink = 'https://en.wikipedia.org/wiki/Kruskal%E2%80%93Wallis_one-way_analysis_of_variance';
          }
        }
      }
    }
  } else if (e.target.id === 'distribusi_jumlah') {
    const distribusiJumlah = e.target.value;
    if (distribusiJumlah === 'normal_besar') {
      testName = 'Korelasi Pearson atau Regresi';
      explanationLink = 'https://en.wikipedia.org/wiki/Pearson_correlation_coefficient';
    } else if (distribusiJumlah === 'tidak_normal_kecil') {
      testName = 'Korelasi Spearman';
      explanationLink = 'https://en.wikipedia.org/wiki/Spearman%27s_rank_correlation_coefficient';
    }
  }

  // Tampilkan hasil hanya jika semua dropdown terjawab
  if (testName) {
    testResult.textContent = testName;
    explanationButton.href = explanationLink;
    explanationButton.style.display = 'block';
    resultDiv.style.display = 'block';
  } else {
    resultDiv.style.display = 'none';
    explanationButton.style.display = 'none';
  }
});
