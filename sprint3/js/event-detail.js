import { events } from './data.js';

const detayKutusu = document.getElementById('detay-icerik');

// URL'deki ?id= kısmını yakalıyoruz
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// data.js içinde bu id'ye sahip etkinliği arıyoruz
const etkinlik = events.find(e => e.id === id);

if (etkinlik) {
    // Etkinlik bulunduysa, sayfa başlığını ve içeriğini doldur
    document.title = etkinlik.title + " - Kampüs Etkinlikleri";
    
    detayKutusu.innerHTML = `
        <article class="detay-karti">
            <h2>${etkinlik.title}</h2>
            <figure>
            <img src="${etkinlik.image}" alt="${etkinlik.title} Afişi" width="300">
        </figure>
            <div class="detay-bilgileri">
                <p><strong>Tarih:</strong> ${etkinlik.date}</p>
                <p><strong>Saat:</strong> ${etkinlik.time}</p>
                <p><strong>Yer:</strong> ${etkinlik.location}</p>
                <p><strong>Kategori:</strong> ${etkinlik.category}</p>
                <p><strong>Kontenjan:</strong> ${etkinlik.capacity} kişi</p>
            </div>
            <div class="detay-aciklama">
                <h3>Açıklama</h3>
                <p>${etkinlik.description}</p>
            </div>
            <a href="etkinlik-guncelle.html?id=${etkinlik.id}" class="buton">Bu Etkinliği Güncelle</a>
        </article>
    `;
} else {
    // Eğer adres çubuğuna elle geçersiz bir id yazıldıysa hata göster
    detayKutusu.innerHTML = `
        <div class="hata-mesaji">
            <h2>Hata: Etkinlik Bulunamadı</h2>
            <p>Aradığınız etkinliğe ulaşılamıyor veya böyle bir etkinlik mevcut değil.</p>
            <a href="etkinlikler.html" class="buton">Listeye Dön</a>
        </div>
    `;
}