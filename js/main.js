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

            // This will determine which cat is going to be displayed
            this.currentCatId = null;

            // Gets the current cat id from the url hash
            // and updates currentCatId value
            this.updateCurrentCatId();

            // This determines whether the admin area is visible or not
            this.AdminVisibility = false;
        },
        getAllCats: function() {
            return this.cats;
        },
        getCurrentCat: function() {
            return this.cats[this.currentCatId];
        },
        incrementCount: function() {
            var cat = this.getCurrentCat();
            return cat["clicks"]++;
        },
        updateCurrentCatId: function() {
            // Get the cat to display from url hash
            var id = window.location.hash.substring(1);

            // If url hash is not set, set id to 0
            // if the number is greater than the lenght of the cats array,
            // then set the id to 0
            this.currentCatId = id && (id < this.cats.length) ? id : 0;
        },
        hideAdmin: function() {
            this.AdminVisibility = false;
        },
        showAdmin: function() {
            this.AdminVisibility = true;
        },
        updateCatInfo: function(data) {
            // Current Cat
            var cat = this.getCurrentCat();

            // Set new values for the current cat
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
            return model.getCurrentCat();
        },

        incrementCount: function() {
            model.incrementCount();
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
            view.renderList();
            view.renderCat();
            view.renderForms();
        },

        init: function() {
            // Initialize everything
            model.init();
            view.init();
        }
    };

    var view = {
        init: function() {
            // This is the cat list that allows to change current cat
            this.catList = $('#cat-list');

            // Cat elements
            this.catName = $('#cat-name');
            this.catImage = $('#cat-img');
            this.catCount = $('#cat-count');

            // Admin button that displays the admin form
            this.adminButton = $('#admin-button input');

            // This is the admin form
            this.catAdmin = $('#cat-admin');

            // These are the inputs inside the Admin Form
            this.nameInput = $('#cat-admin input[name="name"]');
            this.urlInput = $('#cat-admin input[name="url"]');
            this.counterInput = $('#cat-admin input[name="count"]');
            this.saveButton = $('#cat-admin input[name="save"]');
            this.cancelButton = $('#cat-admin input[name="cancel"]');

            // Render all elements
            this.renderList();
            this.renderCat();
            this.renderForms();

            // Every time hash changes we change the cat
            $(window).on('hashchange', octopus.changeCat);

            // The rock star feature. Increment click counts
            this.catImage.on('click', octopus.incrementCount);

            this.adminButton.on('click', octopus.showAdmin);

            // When hitting cancel, the admin form disapears
            this.cancelButton.on('click', octopus.resetAdminForm);

            // Submit the Admin Form to Update Cat Data
            this.catAdmin.on('submit', function(e){
                octopus.saveCatInfo();
                e.preventDefault();
            });
        },
        renderList: function() {
            var htmlStr = '';
            octopus.getCats().forEach(function(cat, index){
                // Each cat has its own link
                // number sent at the hash corresponds to each cat's id
                // When the link is pressed, the hash change will trigger the event
                // that will end up rendering the corresponding cat
                htmlStr += '<a class="item" href="#' + index + '">' + cat["name"] + '</a>';
            });

            // Set the list content
            this.catList.html(htmlStr);
        },
        renderCat: function() {
            // The current cat
            var cat = octopus.getCurrentCat();

            // Set the right content and attributes for the corresponding elements
            this.catName.html(cat["name"]);
            this.catImage.attr('src', cat["url"]);
            this.catImage.attr('alt', cat["name"] + ' the cat');
            this.catCount.html(cat["clicks"]);
        },
        renderForms: function() {
            // The current cat
            var cat = octopus.getCurrentCat();

            // Set input values
            this.nameInput.val(cat["name"]);
            this.urlInput.val(cat["url"]);
            this.counterInput.val(cat["clicks"]);

            // Check for the visibility status and decide
            // what to show or to hide
            if (octopus.getAdminVisibility()) {
                this.adminButton.css('display', 'none');
                this.catAdmin.css('display', 'block');
            } else {
                this.adminButton.css('display', 'block');
                this.catAdmin.css('display', 'none');
            }
        }
    };

    // Run the app
    octopus.init();
});
