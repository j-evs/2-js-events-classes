'use strict';

class Application {
  constructor() {
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    this.info = document.getElementById('length');
    this.image = document.getElementById('image');
    startButton.addEventListener('click', this.on.bind(this));
    stopButton.addEventListener('click', this.off.bind(this));
  }

  on() {
    this.off();

    let bodyWidth = document.body.clientWidth;
    let bodyHeight = document.body.clientHeight;
    let moveLength = calculateMoveLength(10, 50);
    this.info.innerHTML = `Двигаем на ${moveLength} пикселей`;

    function calculateMoveLength (bottomLimit, topLimit) {
      let moveLength;
      let inputValue = parseInt(document.getElementsByTagName('input')[0].value || bottomLimit);
        if (inputValue > topLimit) {
          moveLength = topLimit;
        } else if (inputValue < bottomLimit) {
          moveLength = bottomLimit;
        } else {
          moveLength = inputValue;
        }

        return moveLength;
    }

    let handleShiftPress = (keyCode) => {
      let rotationAngle = +this.image.style.transform.match(/-?\d+/g)[0];
      if (keyCode === 37) {
        this.image.style.transform = `rotate(${rotationAngle - 5}deg)`;
      }
      else {
        this.image.style.transform = `rotate(${rotationAngle + 5}deg)`;
      }
    }

    let keyPressHandler = (event) => {
      let top = parseInt(this.image.style.top);
      let left = parseInt(this.image.style.left);

      switch (event.keyCode) {
        case 37:
          if (event.shiftKey) {
            handleShiftPress(event.keyCode);
            return;
          }
          this.image.style.left = (left > 0) ? `${left - moveLength}px`: `${left}px`;
          break;
        case 39:
          if (event.shiftKey) {
            handleShiftPress(event.keyCode);
            return;
          }
          this.image.style.left = (bodyWidth - left > 190) ? `${left + moveLength}px` : `${left}px`;
          break;
        case 38:
          this.image.style.top = (top > 0) ? `${top - moveLength}px` : `${top}px`;
          break;
        case 40:
          this.image.style.top = (bodyHeight - top > 150) ? `${top + moveLength}px` : `${top}px`;
          break;
      }
    }

    this.handler = keyPressHandler;
    document.body.addEventListener('keydown', keyPressHandler);
  }

  off() {
    if (!this.handler) return;
    document.body.removeEventListener('keydown', this.handler);
    this.info.innerHTML = 'Нажмите старт';
  }
}

const app = new Application();
