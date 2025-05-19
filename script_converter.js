// script_converter.js

// Получаем ссылки на все необходимые HTML элементы
const colorPreview = document.getElementById('colorPreview');
const rgbRedInput = document.getElementById('rgbRed');
const rgbGreenInput = document.getElementById('rgbGreen');
const rgbBlueInput = document.getElementById('rgbBlue');
const hexOutputInput = document.getElementById('hexOutput');
const hexInput = document.getElementById('hexInput');
const rgbOutputRedInput = document.getElementById('rgbOutputRed');
const rgbOutputGreenInput = document.getElementById('rgbOutputGreen');
const rgbOutputBlueInput = document.getElementById('rgbOutputBlue');

// Функция для обновления цвета в пробнике и добавления анимации
function updateColorPreview(color) {
    colorPreview.style.backgroundColor = color;

    // Добавляем класс для запуска CSS анимации
    colorPreview.classList.add('color-updated');

    // Удаляем класс через 300 миллисекунд, чтобы анимация могла сработать снова при следующем изменении
    setTimeout(() => {
        colorPreview.classList.remove('color-updated');
    }, 300);
}

// Функция для конвертации из RGB в HEX
function rgbToHex() {
    // Получаем значения из полей ввода и преобразуем их в числа
    const r = parseInt(rgbRedInput.value);
    const g = parseInt(rgbGreenInput.value);
    const b = parseInt(rgbBlueInput.value);

    // Проверяем корректность введенных значений RGB
    if (isNaN(r) || isNaN(g) || isNaN(b) || r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
        // Если значения некорректны, выводим предупреждение и останавливаем выполнение функции
        alert('Пожалуйста, введите корректные значения RGB (0-255).');
        // Очищаем поле вывода HEX и пробник, или устанавливаем цвет по умолчанию
        hexOutputInput.value = '';
        updateColorPreview('#ffffff'); // Белый или другой цвет по умолчанию
        return;
    }

    // Преобразуем каждое десятичное значение в шестнадцатеричное и добавляем ведущий ноль, если нужно
    const hexR = r.toString(16).padStart(2, '0');
    const hexG = g.toString(16).padStart(2, '0');
    const hexB = b.toString(16).padStart(2, '0');

    // Объединяем шестнадцатеричные значения в HEX-код
    const hexColor = `#${hexR}${hexG}${hexB}`;

    // Выводим полученный HEX-код в поле вывода (в верхнем регистре)
    hexOutputInput.value = hexColor.toUpperCase();

    // Обновляем цвет в пробнике
    updateColorPreview(hexColor);
}

// Функция для конвертации из HEX в RGB
function hexToRgb() {
    // Получаем значение из поля ввода HEX и удаляем лишние пробелы
    const hex = hexInput.value.trim();

    // Проверяем корректность формата HEX-кода
    if (!/^#([0-9A-Fa-f]{3}){1,2}$/.test(hex)) {
        // Если формат некорректен, выводим предупреждение и останавливаем выполнение функции
        alert('Пожалуйста, введите корректный HEX-код (например, #FF0000 или #F00).');
        // Очищаем поля вывода RGB и пробник, или устанавливаем цвет по умолчанию
        rgbOutputRedInput.value = '';
        rgbOutputGreenInput.value = '';
        rgbOutputBlueInput.value = '';
        updateColorPreview('#ffffff'); // Белый или другой цвет по умолчанию
        return;
    }

    // Удаляем символ '#' из начала строки
    let hexValue = hex.substring(1);

    // Если HEX-код в сокращенном формате (3 символа), дублируем каждый символ
    if (hexValue.length === 3) {
        hexValue = hexValue[0] + hexValue[0] + hexValue[1] + hexValue[1] + hexValue[2] + hexValue[2];
    }

    // Преобразуем каждую пару шестнадцатеричных символов в десятичное значение RGB
    const r = parseInt(hexValue.substring(0, 2), 16);
    const g = parseInt(hexValue.substring(2, 4), 16);
    const b = parseInt(hexValue.substring(4, 6), 16);

    // Выводим полученные значения RGB в соответствующие поля вывода
    rgbOutputRedInput.value = r;
    rgbOutputGreenInput.value = g;
    rgbOutputBlueInput.value = b;

    // Обновляем цвет в пробнике (используем полный HEX-код для точности)
    updateColorPreview(`#${hexValue}`);
}

// --- Добавляем обработчики событий для автоматического обновления и конвертации при вводе ---

// При вводе в любое поле RGB
rgbRedInput.addEventListener('input', () => {
    // Проверяем, заполнены ли все три поля RGB
    if (rgbGreenInput.value !== '' && rgbBlueInput.value !== '') {
         // Проверяем корректность значений и конвертируем в HEX
         const r = parseInt(rgbRedInput.value);
         const g = parseInt(rgbGreenInput.value);
         const b = parseInt(rgbBlueInput.value);
         if (!isNaN(r) && !isNaN(g) && !isNaN(b) && r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
            rgbToHex(); // Вызываем функцию конвертации RGB в HEX
         } else {
             // Если значения некорректны, просто обновляем пробник (может быть неточным)
             updateColorPreview(`rgb(${r || 0}, ${g || 0}, ${b || 0})`);
             hexOutputInput.value = '---'; // Показываем, что HEX невалиден
         }
    } else {
         // Если не все поля RGB заполнены, просто обновляем пробник (предполагая 0 для пустых)
         const r = parseInt(rgbRedInput.value) || 0;
         const g = parseInt(rgbGreenInput.value) || 0;
         const b = parseInt(rgbBlueInput.value) || 0;
         // Дополнительная проверка диапазона для обновления пробника
         if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
              updateColorPreview(`rgb(${r}, ${g}, ${b})`);
         } else {
             // Если значения вне диапазона, можно установить цвет по умолчанию или оставить как есть
             updateColorPreview('#ffffff'); // Белый или другой цвет по умолчанию
         }
         hexOutputInput.value = ''; // Очищаем поле HEX, если не все поля RGB заполнены
    }
});

rgbGreenInput.addEventListener('input', () => {
    if (rgbRedInput.value !== '' && rgbBlueInput.value !== '') {
         const r = parseInt(rgbRedInput.value);
         const g = parseInt(rgbGreenInput.value);
         const b = parseInt(rgbBlueInput.value);
         if (!isNaN(r) && !isNaN(g) && !isNaN(b) && r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
            rgbToHex();
         } else {
             updateColorPreview(`rgb(${r || 0}, ${g || 0}, ${b || 0})`);
             hexOutputInput.value = '---';
         }
    } else {
         const r = parseInt(rgbRedInput.value) || 0;
         const g = parseInt(rgbGreenInput.value) || 0;
         const b = parseInt(rgbBlueInput.value) || 0;
          if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
              updateColorPreview(`rgb(${r}, ${g}, ${b})`);
         } else {
             updateColorPreview('#ffffff');
         }
         hexOutputInput.value = '';
    }
});

rgbBlueInput.addEventListener('input', () => {
     if (rgbRedInput.value !== '' && rgbGreenInput.value !== '') {
         const r = parseInt(rgbRedInput.value);
         const g = parseInt(rgbGreenInput.value);
         const b = parseInt(rgbBlueInput.value);
         if (!isNaN(r) && !isNaN(g) && !isNaN(b) && r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
            rgbToHex();
         } else {
             updateColorPreview(`rgb(${r || 0}, ${g || 0}, ${b || 0})`);
             hexOutputInput.value = '---';
         }
    } else {
         const r = parseInt(rgbRedInput.value) || 0;
         const g = parseInt(rgbGreenInput.value) || 0;
         const b = parseInt(rgbBlueInput.value) || 0;
          if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
              updateColorPreview(`rgb(${r}, ${g}, ${b})`);
         } else {
             updateColorPreview('#ffffff');
         }
         hexOutputInput.value = '';
    }
});


// При вводе в поле HEX
hexInput.addEventListener('input', () => {
    const hex = hexInput.value.trim();
    // Проверяем формат HEX-кода
    if (/^#([0-9A-Fa-f]{3}){1,2}$/.test(hex)) {
        hexToRgb(); // Если формат корректен, конвертируем в RGB
    } else {
        // Если формат некорректен, очищаем поля RGB и обновляем пробник
        rgbOutputRedInput.value = '';
        rgbOutputGreenInput.value = '';
        rgbOutputBlueInput.value = '';
        updateColorPreview('#ffffff'); // Цвет по умолчанию для невалидного ввода
    }
});


// Инициализация: установим начальный цвет пробника при загрузке страницы
updateColorPreview('#ffffff'); // Белый цвет по умолчанию