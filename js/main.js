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
        },

        changeCat: function() {
            model.updateCurrentCatId();
            view.renderCat();
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
            this.renderList();
            this.renderCat();
            $(window).on('hashchange', octopus.changeCat);
            this.catImage.on('click', octopus.incrementCount);
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
        }
    };

    octopus.init();
});
