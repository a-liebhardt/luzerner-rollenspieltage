exports.init = (() => {
  const flipReset = () => {
    document.querySelectorAll('.panel4 .flipper').forEach((flipper) => {
      flipper.classList.remove('no-flip');
      flipper.classList.remove('flip');
      flipper.closest('[class*="col-"]').classList.remove('is-flipped');
      flipper.closest('[class*="col-"]').classList.remove('is-not-flipped');
    });
  };

  const flip = (e) => {
    document.querySelectorAll('.panel4 .flipper').forEach((flipper) => {
      flipper.classList.add('no-flip');
      flipper.classList.remove('flip');
      flipper.closest('[class*="col-"]').classList.add('is-not-flipped');
      flipper.closest('[class*="col-"]').classList.remove('is-flipped');
    });
    e.target.closest('.flipper').classList.add('flip');
    e.target.closest('.flipper').classList.remove('no-flip');
    e.target.closest('[class*="col-"]').classList.add('is-flipped');
    e.target.closest('[class*="col-"]').classList.remove('is-not-flipped');
  };

  const panel = document.querySelector('.panel4');
  if (panel) {
    const fronts = panel.querySelectorAll('.flip-front');
    if (fronts) {
      fronts.forEach((flipFront) => {
        flipFront.addEventListener('click', flip);
      });
    }

    const resets = panel.querySelectorAll('[flip-reset]');
    if (resets) {
      resets.forEach((reset) => {
        reset.addEventListener('click', flipReset);
      });
    }
  }
});
