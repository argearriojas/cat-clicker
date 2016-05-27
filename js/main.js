$(function(){
    var model = {
        init: function() {
            this.cats = [
                {"name":"Misu", "url":"img/cat.jpg", "clicks":0},
                {"name":"Pelusa", "url":"img/cat2.jpg", "clicks":0},
                {"name":"Dormilón", "url":"img/cat3.jpg", "clicks":0},
                {"name":"Bigotes", "url":"img/cat4.jpg", "clicks":0},
                {"name":"Púrpura", "url":"img/cat5.jpg", "clicks":0},
                {"name":"Travieso", "url":"img/cat6.jpg", "clicks":0}
            ];
            this.currentCatId = null;
            this.updateCurrentCatId();
            this.AdminVisibility = false;
        },
        getAllCats: function() {
            return this.cats;
        },
        getCat: function(id) {
            return this.cats[id];
        },
        incrementCount: function(id) {
            return ++this.cats[id]["clicks"];
        },
        updateCurrentCatId: function() {
            var id = window.location.hash.substring(1);
            this.currentCatId = id && (id < this.cats.length) ? id : 0;
        },
        hideAdmin: function() {
            this.AdminVisibility = false;
        },
        showAdmin: function() {
            this.AdminVisibility = true;
        },
        updateCatInfo: function(data) {
            var cat = this.cats[this.currentCatId];
            cat.name = data.name;
            cat.url = data.url;
            cat.clicks = data.clicks;
        }
    };

    var octopus = {
        getCats: function() {
            return model.getAllCats();
        },

        getCurrentCat: function() {
            return model.getCat(model.currentCatId);
        },

        incrementCount: function() {
            model.incrementCount(model.currentCatId);
            view.renderCat();
            view.renderForms();
        },

        changeCat: function() {
            model.updateCurrentCatId();
            model.hideAdmin();
            view.renderCat();
            view.renderForms();
        },

        showAdmin: function() {
            model.showAdmin();
            view.renderForms();
        },

        getAdminVisibility: function() {
            return model.AdminVisibility;
        },

        resetAdminForm: function() {
            model.hideAdmin();
            view.renderForms();
        },

        saveCatInfo: function() {
            model.updateCatInfo({
                    name: view.nameInput.val(),
                    url: view.urlInput.val(),
                    clicks: view.counterInput.val()
                });
            model.hideAdmin();
            view.renderCat();
            view.renderForms();
        },

        init: function() {
            model.init();
            view.init();
        }
    };

    var view = {
        init: function() {
            this.catList = $('#cat-list');

            this.catName = $('#cat-name');
            this.catImage = $('#cat-img');
            this.catCount = $('#cat-count');

            this.adminButton = $('#admin-button input');

            this.catAdmin = $('#cat-admin');
            this.nameInput = $('#cat-admin input[name="name"]');
            this.urlInput = $('#cat-admin input[name="url"]');
            this.counterInput = $('#cat-admin input[name="count"]');
            this.saveButton = $('#cat-admin input[name="save"]');
            this.cancelButton = $('#cat-admin input[name="cancel"]');

            this.renderList();
            this.renderCat();
            this.renderForms();
            $(window).on('hashchange', octopus.changeCat);
            this.catImage.on('click', octopus.incrementCount);
            this.adminButton.on('click', octopus.showAdmin);
            this.cancelButton.on('click', octopus.resetAdminForm);
            this.catAdmin.on('submit', function(e){
                octopus.saveCatInfo();
                e.preventDefault();
            });
        },
        renderList: function() {
            var htmlStr = '';
            octopus.getCats().forEach(function(cat, index){
                htmlStr += '<a class="item" href="#' + index + '">' + cat["name"] + '</a>';
            });
            this.catList.html(htmlStr);
        },
        renderCat: function(){
            var cat = octopus.getCurrentCat();
            this.catName.html(cat["name"]);
            this.catImage.attr('src', cat["url"]);
            this.catImage.attr('alt', cat["name"] + ' the cat');
            this.catCount.html(cat["clicks"]);
        },
        renderForms: function(){
            var cat = octopus.getCurrentCat();
            this.nameInput.val(cat["name"]);
            this.urlInput.val(cat["url"]);
            this.counterInput.val(cat["clicks"]);
            if (octopus.getAdminVisibility()) {
                this.adminButton.css('display', 'none');
                this.catAdmin.css('display', 'block');
            } else {
                this.adminButton.css('display', 'block');
                this.catAdmin.css('display', 'none');
            }
        }
    };

    octopus.init();
});
