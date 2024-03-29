const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


const tab = $$('.tab-item');
const tabPane = $$('.tab-pane');
const tab_active = $('.tab-item.active');
const tab_line = $('.tabs .line');



tab.forEach((tabItem, index) => {
    const pane = tabPane[index];
    tabItem.onclick = function() {
        $('.tab-item.active').classList.remove('active');
        this.classList.add('active');
        $('.tab-pane.active').classList.remove('active');
        pane.classList.add('active');


        tab_line.style.left = this.offsetLeft + 'px';
        tab_line.style.width = this.offsetWidth + 'px';
    }
})