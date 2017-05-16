
Vue.component('nav-bar', {
    template: '<div style="background:#5F2240;" data-role="header" data-position="top" data-theme="a"><a href="#pageone" data-direction="reverse" data-icon="home">koti</a><h3>demo pizzeria</h3><a href="#pagethree" data-icon="star">ostoskori</a></div>'
});

// var bus = new Vue({})

var pageone = new Vue({
    el: '#pageone',
        data: {
          query: '',
          items: [
            { "backgroundColor":"#000","id":1,"category_id":"0","name":"Pepperoni Pizza","norm":"7","big":"13","edit":"1","info":null,"available":"1","toppings":["pepperonimakkara","tonnikala"]},
            { "backgroundColor":"#000","id":2,"category_id":"0","name":"Margareta","norm":"8","big":"14","edit":"1","info":null,"available":"0","toppings":["kinkku","jauheliha","salami"]},
            { "backgroundColor":"#000","id":3,"category_id":"0","name":"Al Tonno","norm":"9","big":"15","edit":"1","info":null,"available":"0","toppings":["jauheliha"]},
            { "backgroundColor":"#000","id":4,"category_id":"0","name":"Bolognese","norm":"10","big":"16","edit":"1","info":null,"available":"1","toppings":["kinkku","salami","kinkku"]},
            { "backgroundColor":"#000","id":5,"category_id":"0","name":"Milano","norm":"11","big":"17","edit":"1","info":null,"available":"1","toppings":["salami","kinkku","salami"]},
            { "backgroundColor":"#000","id":6,"category_id":"0","name":"Hawai","norm":"12","big":"18","edit":"1","info":null,"available":"1","toppings":["ananas","kinkku","banaani"]}
          ],
          selectedItem: 0,
        },
        created: function() {
            
        },
        watch: {
          selectedItem(newItem) {
            Vue.set(pagetwo, 'product', this.items[newItem])
          }
        },
        components: {
          'product-item': {
              props: ['item', 'index'],
              template: '<li><span>{{ item.name }} <br><b v-for="top in item.toppings">{{top}}, </b></span> <a href="#pagetwo" data-transition="slide" @click="clicked"></a></li>',
              methods: {
                  clicked: function() {
                    this.$nextTick(function () {
                      Vue.set(pageone, 'selectedItem', this.index)
                    })
                  }
              },
              
          }
          
        },
        
})

var pagetwo = new Vue({
    el: '#pagetwo',
    data: {
      product: {"id":1,"name":"Pepperoni Pizza","norm":"7","big":"12.5","toppings":["pepperonimakkara","tonnikala"], 'counter': 1},
      toppings: [
        'kinkku', 'salami', 'jauheliha', 'tonnikala', 'kebabliha', 'pepperonimakkara', 'herkkusieni', 'ananas', 'katkarapu', 'tomaatti', 
        'paprika', 'sipuli', 'kana', 'oliivi', 'aurajuusto', 'pekoni', 'banaani', 'tuplajuusto', 'fetajuusto', 'jalopeno', 'mozzarella',
        'curry', 'turkinpippurisekoitus', 'chili'
      ],
      spices: ['oregano', 'valkosipuli', 'gluteeniton'],
      price: 0
    },
    components: {
        'topping-select': {
            name: 'topping-select',
            props: ['toppings', 'top'],
            template: '<select v-model="top"><option>-- lisää täyte --</option>  <option v-for="tops in toppings" :value="tops">{{ tops }}</option></select>',
        }
    },
    methods: {
        addToCart: function() {
            pagethree.products.push(this.product)                                                                   
        },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
        add: function() {
            this.product.counter += 1;
        }
    }
})


var pagethree = new Vue({
    el: '#pagethree',
    data: {
        products: [{ }],
    },
    components: {
    
    },
    methods: {
      topps: function(item) {
          return item.toppings.join()
      }
    }
});

var pagefour = new Vue({
        el: '#pagefour',
        data: {},
        methods: {
          fetchMapData() {
              var apiKey = "AIzaSyAF-kNLFjGiDq-rrtUv2VlWnntHvHM-HM4"
              var mapPoints = []
              $.get('http://maps.googleapis.com/maps/api/directions/json?origin=Grodno&destination=Minsk&mode=driving', function(data) {
                  data.routes.forEach(function(route) {
                      mapPoints.push(route.overview_polyline.points)
                  }, this)
                  newMapSrc = 'https://maps.googleapis.com/maps/api/staticmap?size=600x600&path=enc%3A' + mapPoints + '&key=' + apiKey
                  console.log(newMapSrc)
                  $('#theMap').attr('src', newMapSrc)
              })
          }
        },
        created: function() {
            
        },
})