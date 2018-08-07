exports.init = (() => {
  const flipReset = () => {
    document.querySelectorAll('.panel3 .flipper').forEach((flipper) => {
      flipper.classList.remove('no-flip');
      flipper.classList.remove('flip');
    });
  };

  const flip = (e) => {
    document.querySelectorAll('.panel3 .flipper').forEach((flipper) => {
      flipper.classList.add('no-flip');
      flipper.classList.remove('flip');
    });
    e.target.closest('.flipper').classList.add('flip');
    e.target.closest('.flipper').classList.remove('no-flip');
  };

  const panel = document.querySelector('.panel3');
  panel.querySelectorAll('.flip-front').forEach((flipFront) => {
    flipFront.addEventListener('click', flip);
  });
  panel.querySelectorAll('[flip-reset]').forEach((reset) => {
    reset.addEventListener('click', flipReset);
  });
});
