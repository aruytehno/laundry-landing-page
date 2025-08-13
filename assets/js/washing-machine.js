(function(){
  const root = document.querySelector('.lavanda-wm');
  const washingMachine = root.querySelector('.lavanda-wm__machine');
  const screen = root.querySelector('.lavanda-wm__controls');

  const status = {
    opening: {
      isActive: true,
      statusClass: 'isOpen',
      controller: root.querySelector('.lavanda-wm__opening'),
      controllerLabel: ["ЗАКРЫТЬ", "ОТКРЫТЬ"]
    },
    content: {
      isActive: true,
      statusClass:'isFilled',
      controller: root.querySelector('.lavanda-wm__content'),
      controllerLabel: ["ДОСТАТЬ", "ЗАГРУЗИТЬ"]
    },
    power: {
      isActive: false,
      statusClass: 'isWashing',
      controller: root.querySelector('.lavanda-wm__power'),
      controllerLabel: ["СТОП", "СТАРТ"]
    }
  };

  const washSpeed = 600;

  for (let action in status) {
    const { statusClass, controller, controllerLabel } = status[action];

    controller.addEventListener('click', function() {
      const { isActive } = status[action];
      washingMachine.classList.toggle(statusClass);
      this.innerHTML = controllerLabel[isActive*1];

      if(action === "power" && !isActive) {
        washingMachine.classList.add(statusClass);
        washingMachine.classList.add("isStarting");
        setTimeout(() => { washingMachine.classList.remove("isStarting"); }, washSpeed * 2);
      }

      status[action].isActive = !isActive;
      setTimeout(updateMachine, 100);
    });
  }

  function updateMachine() {
    const { opening, content, power } = status;
    opening.controller.disabled = power.isActive;
    content.controller.disabled = !opening.isActive;
    power.controller.disabled = opening.isActive || !content.isActive;

    if(power.isActive) {
      screen.innerHTML = "💦"
    } else if(!content.isActive) {
      screen.innerHTML = "EMPTY";
    } else if (opening.isActive) {
      screen.innerHTML = "🙃";
    } else {
      screen.innerHTML = "READY";
    }
  }
})();
