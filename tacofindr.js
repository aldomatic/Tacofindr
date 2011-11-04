Ext.application({
	name: 'Tacofindr',
	launch: function(){
					
		var viewport = Ext.create('Ext.Panel',{
			fullscreen: true,
			cls: 'mainview',
			layout: {
				type: 'card',
				animation:{type: 'slide', direction: 'left'}
			}
		});
		
		
		
		var appView = Ext.create('Ext.Panel',{
			fullscreen: true,
			scrollable: true,
			cls: 'mainview',
			html: '<div id="homeContentWrap"><div id="badge"></div><div id="logo"></div></div>'
		});
		
		
		var store = Ext.create('Ext.data.Store',{
			model: "Places",
			fields: ['name', 'rating_img_url_small', 'longitude', 'latitude', 'address1', 'city', 'state', 'zip', 'photo_url'],
			proxy: {
					type: 'jsonp',
					url: 'business_review_search.json',
					//url: 'http://api.yelp.com/business_review_search?term=taco&lat=32.802955&long=-96.769923&radius=2&limit=7&ywsid=-sS9ARVeXV9ziC576Zkrtw&category=mexican',
					reader: {
						type: 'json',
						root: 'businesses'
					}
			}
		});

		
		var resultsView = Ext.create('Ext.DataView',{
			scrollable: true,
			cls: 'mainview, results',
			store: store,
			//itemTpl: '<div class="place"><h2>{name}</h2> <span>Rating: <img src="{rating_img_url_small}" /><p style="margin:5px 0 10px 0;"><img src="{photo_url}" /></p><p>{address1}<br />{city}, {state} {zip}</p><p class="map"><img src="http://maps.googleapis.com/maps/api/staticmap?center={latitude},{longitude}&zoom=15&size=275x110&markers=color:orange|label:T|{latitude},{longitude}&sensor=false&mobile=true" /></p></div>',
			itemTpl: '<div class="place"><h2>{name}</h2> <span>Rating: <img src="{rating_img_url_small}" /><p style="margin:5px 0 10px 0;"><p>{address1}<br />{city}, {state} {zip}</p><br /><a href="http://google.com" class="minimal">Map It</a><br /><br /><div id="btn"></div></div>',
			listeners:{
                    afterrender:function(){
                    alert("aldo");
                    }
               }
		});
		
		
		var findBtn = Ext.create('Ext.Button', {
			text: '',
			cls: 'findBtn',
			width: '263px',
			height:'50px',
			handler: function(){
				viewport.setActiveItem(resultsView);
				store.load();
			},
			renderTo: Ext.get("homeContentWrap")
		});
		
		viewport.add([appView, resultsView]);
	
	}
});


