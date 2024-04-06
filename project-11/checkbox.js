document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('[type="checkbox"]');
    console.log(checkboxes);

    let lastChecked;

    function eventHandler(event) {
        console.log(event);

        if (event.shiftKey && this.checked) {
            let notChecked = false;

            checkboxes.forEach(checkbox => {
                if (checkbox === this || checkbox === lastChecked) {
                    notChecked = !notChecked;
                    console.log('checking', checkbox);
                }

                if (notChecked) {
                    checkbox.checked = true;
                }
            });
        }

        lastChecked = this;
    }

    checkboxes.forEach(checkbox => checkbox.addEventListener('click', eventHandler));
});
