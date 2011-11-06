Ext.application({
	name: 'Tacofindr',
	launch: function(){
		var apiUrl;			
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
			html: '<div id="homeContentWrap"><div id="badge"></div><div id="logo"></div></div><p class="contentStyle">Tacofindr helps find the nearest taco joints within 3 miles of your phones current location</p>'
		});
		
		var store = Ext.create('Ext.data.Store',{
			model: "Places",
			fields: ['name', 'rating_img_url_small', 'longitude', 'latitude', 'address1', 'city', 'state', 'zip', 'photo_url'],
			proxy: {
					type: 'jsonp',
					//url: 'business_review_search.json',
					//url: 'http://api.yelp.com/business_review_search?term=taco&lat=32.802955&long=-96.769923&radius=2&limit=5&ywsid=-sS9ARVeXV9ziC576Zkrtw&category=mexican',
					//url: apiUrl,
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
			items:[{
				xtype: 'toolbar',
				docked: 'top',
				title: 'Results',
				cls: 'resultsToolBar',
				items: [{
					xtype: 'button',
					text: 'Back',
					ui: 'back',
					handler: backBtn
				}]
			}],
			itemTpl: '<div class="place"><img src="{photo_url}" style="float:right;margin-top:8px;border:solid #ccc 1px;padding:2px;" /><h2>{name}</h2> <span>Rating: <img src="{rating_img_url_small}" /><p style="margin:5px 0 10px 0;"><p>{address1}<br />{city}, {state} {zip}</p><a href="http://maps.google.com/maps?q={latitude},{longitude}" onclick="return false;" class="minimal"><img src="mapBtn.png" class="btnImg" /></a><br /></div>',
			 listeners: {
                itemtap: function (list, index, item, e) {
					if (e.getTarget('.minimal') ){
						var url = e.getTarget('.minimal').getAttribute('href');
						document.location.href = url;
                     }
                }
            }  
		});
		
	function backBtn(){
		viewport.setActiveItem(appView);
	}
		
		
		var findBtn = Ext.create('Ext.Button', {
			text: '',
			cls: 'findBtn',
			width: '263px',
			height:'50px',
			handler: function(){
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(function(position) {  
					apiUrl = 'http://api.yelp.com/business_review_search?term=taco&lat='+position.coords.latitude+'&long='+position.coords.longitude+'&radius=3&limit=5&ywsid=-sS9ARVeXV9ziC576Zkrtw&category=mexican';
					store.proxy.url = apiUrl;
					viewport.setActiveItem(resultsView);
					store.load();
				}); 
				} else {
				  alert("I'm sorry, but geolocation services are not supported by your browser.");
				}				
			},
			renderTo: Ext.get("homeContentWrap")
		});
		
		viewport.add([appView, resultsView]);
		//viewport.setActiveItem(resultsView);
	
	}
});


