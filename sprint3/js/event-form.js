import { events } from './data.js';
const form = document.getElementById('etkinlik-formu');
const basariKutusu = document.getElementById('form-basari-mesaji');
// --- GÜNCELLEME SAYFASI KONTROLLERİ ---
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const formAlani = document.getElementById('form-alani');
const hataDurumu = document.getElementById('hata-durumu');

if (formAlani && hataDurumu) {
    if (!id) {
        // ID yoksa formu gizle, hatayı göster
        formAlani.style.display = 'none';
        hataDurumu.style.display = 'block';
    } else {
        // ID varsa etkinliği bul ve kutuları doldur
        const etkinlik = events.find(e => e.id === id);
        if (etkinlik) {
            // HTML'de ister eski Türkçe (ad) ister yeni İngilizce (title) id kullanılmış olsun, yakalar
            const inputAd = document.getElementById('title') || document.getElementById('ad');
            if (inputAd) inputAd.value = etkinlik.title || '';

            const inputKategori = document.getElementById('category') || document.getElementById('kategori');
            if (inputKategori) inputKategori.value = etkinlik.category || '';

            // Tarih ve Saat 
            const inputTarih = document.getElementById('tarih');
            if (inputTarih) {
                inputTarih.value = `${etkinlik.date}T${etkinlik.time}`; // Tek kutulu tarih için
            } else {
                if(document.getElementById('date')) document.getElementById('date').value = etkinlik.date || '';
                if(document.getElementById('time')) document.getElementById('time').value = etkinlik.time || '';
            }

            if(document.getElementById('location')) document.getElementById('location').value = etkinlik.location || '';
            if(document.getElementById('capacity')) document.getElementById('capacity').value = etkinlik.capacity || '';
            
            const inputAciklama = document.getElementById('description') || document.getElementById('aciklama');
            if (inputAciklama) inputAciklama.value = etkinlik.description || '';
        }
    }
}
// --------------------------------------

function hataGoster(inputId, mesaj) {
    const input = document.getElementById(inputId);
    const hataDivi = document.getElementById(`error-${inputId}`);
    if (input && hataDivi) {
        input.style.border = '1px solid red';
        hataDivi.textContent = mesaj;
    }
}

function hatalariTemizle(inputId) {
    const input = document.getElementById(inputId);
    const hataDivi = document.getElementById(`error-${inputId}`);
    if (input && hataDivi) {
        input.style.border = '';
        hataDivi.textContent = '';
    }
}

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        const alanlar = ['title', 'category', 'date', 'time', 'location', 'capacity'];
        
        alanlar.forEach(hatalariTemizle);
        if(basariKutusu) basariKutusu.innerHTML = '';

        const formData = new FormData(form);
        const veri = Object.fromEntries(formData.entries());
        let hataVar = false;

        if (!veri.title || veri.title.trim().length < 3) {
            hataGoster('title', 'Etkinlik adı en az 3 karakter olmalı.');
            hataVar = true;
        }
        if (!veri.category || veri.category === "") {
            hataGoster('category', 'Bir kategori seçin.');
            hataVar = true;
        }
        if (!veri.date) {
            hataGoster('date', 'Tarih seçin.');
            hataVar = true;
        }
        if (!veri.time) {
            hataGoster('time', 'Saat seçin.');
            hataVar = true;
        }
        if (!veri.location || veri.location.trim() === "") {
            hataGoster('location', 'Yer bilgisini yazın.');
            hataVar = true;
        }

        if (!hataVar) {
            // Rastgele bir id oluşturup nesnenin en başına ekliyoruz
            const rastgeleId = Math.floor(Math.random() * 1000);
            const sonNesne = {
                id: `event-${rastgeleId}`,
                ...veri
            };

            // Hocanın istediği yeşil kutulu tasarımı ve JSON çıktısını ekrana basıyoruz
            if(basariKutusu) {
                basariKutusu.innerHTML = `
                    <div style="border: 2px solid #2e7d32; padding: 15px; border-radius: 5px; margin-top: 20px; background-color: #f9fff9;">
                        <p style="color: #2e7d32; margin-top: 0; margin-bottom: 10px;">Etkinlik oluşturuldu (bu sprintte kaydedilmez):</p>
                        <pre style="margin: 0; white-space: pre-wrap; font-family: monospace; color: #333;">${JSON.stringify(sonNesne, null, 2)}</pre>
                    </div>
                `;
            }
            
            form.reset();
        }
    });
}