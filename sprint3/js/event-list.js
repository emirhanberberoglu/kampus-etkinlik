import { events } from './data.js';

const container = document.getElementById('etkinlik-listesi');
const aramaKutusu = document.getElementById('arama-kutusu');
const kategoriSecimi = document.getElementById('kategori-secimi');
const sonucMetni = document.getElementById('sonuc-metni');

if (container) {
    const limit = container.dataset.limit ? parseInt(container.dataset.limit) : events.length;

    // Kartları ekrana basan ana fonksiyon
    function kartlariGoster(veriListesi) {
        // Eğer arama sonucu boş dönerse
        if (veriListesi.length === 0) {
            container.innerHTML = '<p>Aradığınız kritere uygun etkinlik bulunamadı.</p>';
            if(sonucMetni) sonucMetni.textContent = '0 sonuç bulundu.';
            return;
        }

        const kartlarHTML = veriListesi.slice(0, limit).map(etkinlik => `
            <article class="etkinlik-kart">
                <h2>${etkinlik.title}</h2>
                <p>${etkinlik.category} - <time datetime="${etkinlik.date}">${etkinlik.date}</time></p>
                <p>${etkinlik.location}</p>
                <a href="etkinlik-detay.html?id=${etkinlik.id}">Detayları gör →</a>
            </article>
        `).join('');

        container.innerHTML = kartlarHTML;
        
        // Sonuç sayısını ekrana yazdır
        if(sonucMetni) {
            sonucMetni.textContent = `${veriListesi.length} etkinlik listeleniyor.`;
        }
    }

    // Sayfa ilk açıldığında tüm etkinlikleri göster
    kartlariGoster(events);

    // Kullanıcı arama yaptığında veya kategori seçtiğinde çalışacak filtre fonksiyonu
    function filtrele() {
        const arananKelime = aramaKutusu.value.toLowerCase();
        const secilenKategori = kategoriSecimi.value;

        const filtrelenmis = events.filter(etkinlik => {
            const kelimeUyuyor = etkinlik.title.toLowerCase().includes(arananKelime);
            const kategoriUyuyor = secilenKategori === "" || etkinlik.category === secilenKategori;
            return kelimeUyuyor && kategoriUyuyor;
        });

        kartlariGoster(filtrelenmis);
    }

    // Arama kutusuna yazıldıkça (input) ve kategori değiştikçe (change) filtrelemeyi tetikle
    if (aramaKutusu && kategoriSecimi) {
        aramaKutusu.addEventListener('input', filtrele);
        kategoriSecimi.addEventListener('change', filtrele);
    }
}