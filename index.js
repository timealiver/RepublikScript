// ==UserScript==
// @name     Автоматизация нажатия кнопок Follow (проверка каждую секунду)
// @namespace  http://tampermonkey.net/
// @version   0.1
// @description Нажимает кнопки с надписью "Follow" на странице с разной периодичностью и интервалом
// @author    Ваше имя
// @match    https://app.republik.gg/*
// @grant    none
// ==/UserScript==

(function() {
  'use strict';

  let clicksCount = 0; // Счетчик нажатий
  let followBackClicks = 0; // Счетчик нажатий на кнопку "Follow Back"

  const maxClicks = Math.floor(Math.random() * (199 - 180 + 1)) + 180; // Генерация случайного значения clicksCount в диапазоне от 180 до 199. Можно изменить на собственные ( помним, что максимум для сайта - 200).

  function clickFollowButtons() {
    const followButtons = document.querySelectorAll('ion-button.m-0');
    if (!followButtons) {
      return;
    }
    let index = 0;

    function clickNextButton() {
      if (index < followButtons.length) {
        const button = followButtons[index];
        console.log(button);
        const descriptionElement = button.parentElement.querySelector('.text-xs.block.text-ellipsis.overflow-hidden');
        const accountNameElement = button.parentElement.querySelector('.block.text-ellipsis.overflow-hidden.text-white.undefined.block.font-medium.text-sm');
        if (!descriptionElement || !accountNameElement) {

          index++;
          return;
        }
        const description = descriptionElement.textContent.toLowerCase();
        const accountName = accountNameElement.textContent.trim().toLowerCase();
        const accountNameWithoutSymbol = accountName.slice(1); // Убираем символ '@' из названия аккаунта
        console.log(accountName, description);
        if (button.textContent.trim() === 'Follow') {
          if (clicksCount < maxClicks && description !== accountNameWithoutSymbol) {
            button.click();
            console.log('Follow clicked');
            clicksCount++; // Увеличиваем счетчик нажатий
          }
        } else if (button.textContent.trim() === 'Follow Back') {
          if (followBackClicks < 30 && description !== accountNameWithoutSymbol) {
            button.click();
            console.log('FollowBack clicked');
            followBackClicks++; // Увеличиваем счетчик нажатий на кнопку "Follow Back"
          }
        }
        index++;
        const randomInterval = Math.floor(Math.random() * (1000 - 500 + 1)) + 500; // Генерация случайного интервала от 500 до 1000 миллисекунд ( то есть кнопка нажимается раз в 0.5-1 секунды. Так мы имитируем пользователя, который никогда не нажимает с одинаковым интервалом)
        setTimeout(clickNextButton, randomInterval);
      } else {
        index = 0; // Сбрасываем индекс, чтобы начать сначала
        clickFollowButtons(); // Вызываем функцию заново
      }
    }

    clickNextButton();
  }

  setInterval(clickFollowButtons, 5000); // Запускаем функцию с интервалом 5000 миллисекунд (5 секунд). Это значит, что список пользователей, через которые пробегается скрипт, будет обновляться раз в 5 секунд. Мне этого достаточно было, можно изменить под себя.
})();

