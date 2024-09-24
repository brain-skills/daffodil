// Получаем элементы управления
const fontSlider = document.getElementById('font-slider');
const decreaseBtn = document.getElementById('font-decrease');
const increaseBtn = document.getElementById('font-increase');

// Храним начальные размеры шрифтов
const initialFontSizes = {};
const elements = document.querySelectorAll('h4, h5, h6, p, li');

elements.forEach(el => {
  const tagName = el.tagName.toLowerCase();
  initialFontSizes[tagName] = parseFloat(window.getComputedStyle(el).fontSize);
});

// Функция для изменения размера шрифта в процентах
function adjustFontSize(percentageChange) {
  elements.forEach(el => {
    const tagName = el.tagName.toLowerCase();
    const initialSize = initialFontSizes[tagName]; // Получаем начальный размер шрифта
    const newFontSize = initialSize * (1 + percentageChange / 100); // Вычисляем новый размер

    // Применяем новый размер шрифта
    el.style.fontSize = newFontSize + 'px';
  });
}

// Функция для сохранения процента изменения в localStorage
function saveFontSizeChange(percentageChange) {
  localStorage.setItem('fontSizeChange', percentageChange);
}

// Функция для обновления ползунка и применения изменения
function updateFontSizeChange(percentageChange) {
  fontSlider.value = percentageChange;
  adjustFontSize(percentageChange);
  saveFontSizeChange(percentageChange);
}

// Проверяем, есть ли сохраненное значение изменения шрифта в localStorage
document.addEventListener('DOMContentLoaded', () => {
  const savedPercentage = localStorage.getItem('fontSizeChange');
  const initialPercentage = savedPercentage ? parseFloat(savedPercentage) : 0; // По умолчанию 0%
  updateFontSizeChange(initialPercentage);
});

// Обработчики событий для кнопок уменьшения и увеличения
decreaseBtn.addEventListener('click', () => {
  let currentPercentage = parseFloat(fontSlider.value);
  if (currentPercentage > 0) {
    currentPercentage -= 10; // Уменьшение шрифта на 10%
    if (currentPercentage < 0) currentPercentage = 0; // Не даем уменьшаться ниже 0%
    updateFontSizeChange(currentPercentage);
  }
});

increaseBtn.addEventListener('click', () => {
  let currentPercentage = parseFloat(fontSlider.value);
  if (currentPercentage < 50) {
    currentPercentage += 10; // Увеличение шрифта на 10%
    if (currentPercentage > 50) currentPercentage = 50; // Не даем увеличиваться выше 50%
    updateFontSizeChange(currentPercentage);
  }
});

// Обработчик события изменения ползунка
fontSlider.addEventListener('input', () => {
  const percentage = parseFloat(fontSlider.value);
  updateFontSizeChange(percentage);
});

// Предотвращаем увеличение шрифта при долгом нажатии на кнопку уменьшения
decreaseBtn.addEventListener('mousedown', (event) => {
  event.preventDefault(); // Предотвращаем нежелательное поведение
});