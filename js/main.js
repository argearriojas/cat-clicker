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
        },
        getAllCats: function() {
            return this.cats;
        },
        getCat: function(id) {
            return this.cats[id];
        },

        incrementCatClicks: function(id) {
            return ++this.cats[id]["clicks"];
        }
    };

    var octopus = {
        getCats: function() {
            return model.getAllCats();
        },

        getCat: function(id) {
            return model.getCat(id);
        },

        clickHandler: function() {
            var catId = window.location.hash.substring(1);
            if (catId.length > 0) {
                model.incrementCatClicks(catId);
                view.renderCat();
            }
        },

        init: function() {
            model.init();
            view.init();
        }
    };

    var view = {
        init: function() {
            this.renderList();
            this.renderCat();
            $(window).on('hashchange', this.renderCat);
            $('#cat-box').on('click', octopus.clickHandler);
        },
        renderList: function() {
            var htmlStr = '';
            octopus.getCats().forEach(function(cat, index){
                htmlStr += '<a class="item" href="#' + index + '">' + cat["name"] + '</a>';
            });
            $('#cat-list').html(htmlStr);
        },
        renderCat: function(){
            var htmlStr = '';
            var catId = window.location.hash.substring(1);
            if (catId.length > 0) {
                var cat = octopus.getCat(catId);
                htmlStr += '<div class="cat">\
                    <h1 class="name">' + cat["name"] + '</h1>\
                    <img src="' + cat["url"] + '" alt="' + cat["name"] + ' the cat" />\
                    <span class="count"> ' + cat["clicks"] + ' </span>\
                </div>'
            }
            $('#cat-box').html( htmlStr );
        }
    };

    octopus.init();
});
