const books = [
  {title: 'بوف کور', author: 'صادق هدایت', price: 180000},
  {title: 'سمفونی مردگان', author: 'عباس معروفی', price: 240000},
];

const toman = value => `${new Intl.NumberFormat('fa-IR').format(value)} تومان`;

export function render(list = books) {
  document.getElementById('books').innerHTML = list
    .map(book => `<li><strong>${book.title}</strong> — ${book.author}<span class="price">${toman(book.price)}</span></li>`)
    .join('');
}

render();
