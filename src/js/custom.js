const f = function (str) {
  return function (arg) {
    return [str, [str, str], arg];
  };
};

f('Сейчас будет ошибка')()[1, 2].forEach(alert)