// Находим все строки таблицы (кроме заголовка)
const rows = document.querySelectorAll("table tbody tr");

// Создаем объект для хранения баллов по каждому предмету
const subjectScores = {};

// Проходим по всем строкам таблицы
rows.forEach((row) => {
  // Извлекаем ячейки из строки
  const cells = row.querySelectorAll("td");

  // Получаем название предмета
  const subject = cells[1].textContent.trim();

  // Получаем баллы (например, "0 / 0")
  const scoreText = cells[5].textContent.trim();

  // Преобразуем баллы в числовые значения, если это возможно
  let obtained = 0;
  let max = 0;

  if (scoreText.includes("/")) {
    // Если баллы представлены как "x / y"
    const scores = scoreText.split("/");
    obtained = parseInt(scores[0].trim(), 10);
    max = parseInt(scores[1].trim(), 10);
  } else {
    // Если баллы представлены как одно число
    obtained = parseInt(scoreText, 10);
    max = obtained;
  }

  // Если предмет уже есть в объекте, суммируем баллы
  if (subjectScores[subject]) {
    subjectScores[subject].obtained += obtained;
    subjectScores[subject].max += max;
  } else {
    // Иначе добавляем новый предмет с баллами
    subjectScores[subject] = { obtained, max };
  }
});

// Находим элемент с классами card shadow-sm card-filter
const card = document.querySelector(".card.shadow-sm.card-filter");

// Создаем новый элемент
const newElement = document.createElement("div");
newElement.classList.add("card", "shadow-sm", "mt-3");

// Создаем контейнер для результата
let scoresHtml = `<div class="card-body"><div class="m-2 card-title h4 fw-bold">Баллы по предметам:</div><ul class="list-group list-group-flush">`;

for (const [subject, score] of Object.entries(subjectScores)) {
  scoresHtml += `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span class="">${subject}</span>
      <div>
        <span class="badge bg-secondary me-2 fs-6">
          Получено: <span class="fw-bold">${score.obtained}</span>
        </span>
        <span class="badge bg-info fs-6">
          Максимум: <span class="fw-bold">${score.max}</span>
        </span>
      </div>
    </li>
  `;
}

scoresHtml += "</ul></div>";

// Вставляем HTML в новый элемент
newElement.innerHTML = scoresHtml;

// Вставляем новый элемент сразу после найденного элемента
card.insertAdjacentElement("afterend", newElement);

// Выводим объект с результатами для отладки
console.log(subjectScores);
