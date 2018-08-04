require=function t(e,i,s){function n(a,r){if(!i[a]){if(!e[a]){var c="function"==typeof require&&require;if(!r&&c)return c(a,!0);if(o)return o(a,!0);var h=new Error("Cannot find module '"+a+"'");throw h.code="MODULE_NOT_FOUND",h}var _=i[a]={exports:{}};e[a][0].call(_.exports,function(t){var i=e[a][1][t];return n(i||t)},_,_.exports,t,e,i,s)}return i[a].exports}for(var o="function"==typeof require&&require,a=0;a<s.length;a++)n(s[a]);return n}({bullet:[function(t,e,i){"use strict";cc._RF.push(e,"c7d8cUrLUlHbbQ28f9RYUJi","bullet"),cc.Class({extends:cc.Component,properties:{},start:function(){this.enemy_set=cc.find("Canvas").getComponent("game_scene").enemy_set,this.speed_x=0,this.speed_y=500},hit_enemy_test:function(t,e){if(0!=e.status_state)return!1;var i=e.node.getBoundingBoxToWorld();return t.intersects(i)},update:function(t){var e=this.speed_x*t,i=this.speed_y*t;if(this.node.x+=e,this.node.y+=i,this.node.y>=320)this.node.removeFromParent();else for(var s=this.node.getBoundingBoxToWorld(),n=0;n<this.enemy_set.length;n++){var o=this.enemy_set[n].getComponent("enemy");this.hit_enemy_test(s,o)&&(o.on_bullet_hit(),this.node.removeFromParent())}}}),cc._RF.pop()},{}],enemy:[function(t,e,i){"use strict";cc._RF.push(e,"20402fExNpDtK04Sn8xHuXg","enemy");t("player");cc.Class({extends:cc.Component,properties:{enemy_skin:{type:cc.SpriteFrame,default:[]},bomb_anim:{type:cc.SpriteFrame,default:[]},bomb_duration:.1,player_path:"Canvas/player"},start:function(){this.player=cc.find(this.player_path),this.anim=this.node.getChildByName("anim"),this.anim_com=this.anim.addComponent("frame_anim"),this.game_scene=cc.find("Canvas").getComponent("game_scene"),this._set_enemy_idle(),this.speed_x=0,this.speed_y=-200,this.status_state=0},_set_enemy_idle:function(){var t=Math.floor(9*Math.random()+1);t>=10&&(t=9),this.anim.getComponent("cc.Sprite").spriteFrame=this.enemy_skin[t-1]},remove_enemy:function(){this.game_scene.remove_enemy(this.node),this.node.removeFromParent()},_play_bomb_anim:function(){this.anim_com.sprite_frames=this.bomb_anim,this.anim_com.duration=this.bomb_duration,this.anim_com.play_once(function(){this.remove_enemy()}.bind(this))},on_bullet_hit:function(){0==this.status_state&&(this.game_scene.add_score(),this.status_state=1,this._play_bomb_anim())},update:function(t){var e=this.speed_x*t,i=this.speed_y*t;if(this.node.x+=e,this.node.y+=i,1!=this.status_state){var s=this.player.getBoundingBoxToWorld();this.node.getBoundingBoxToWorld().intersects(s)&&this.player.getComponent("player").on_hit_enemy();var n=this.node.convertToWorldSpaceAR(cc.p(0,0));(n.y<-100||n.x<-100||n.x>500)&&this.remove_enemy()}}}),cc._RF.pop()},{player:"player"}],frame_anim:[function(t,e,i){"use strict";cc._RF.push(e,"e037801vJRNuqlJSGm8ZQpD","frame_anim"),cc.Class({extends:cc.Component,properties:{sprite_frames:{default:[],type:cc.SpriteFrame},duration:.1,loop:!1,play_onload:!1},onLoad:function(){var t=this.node.getComponent(cc.Sprite);t||(t=this.node.addComponent(cc.Sprite)),this.sprite=t,this.is_playing=!1,this.play_time=0,this.is_loop=!1,this.end_func=null,this.play_onload&&(this.sprite.spriteFrame=this.sprite_frames[0],this.loop?this.play_loop():this.play_once(null))},play_once:function(t){this.play_time=0,this.is_playing=!0,this.is_loop=!1,this.end_func=t},play_loop:function(){this.play_time=0,this.is_playing=!0,this.is_loop=!0},stop_anim:function(){this.play_time=0,this.is_playing=!1,this.is_loop=!1},start:function(){},update:function(t){if(!1!==this.is_playing){this.play_time+=t;var e=Math.floor(this.play_time/this.duration);if(!1===this.is_loop){if(e>=this.sprite_frames.length)return this.sprite.spriteFrame=this.sprite_frames[this.sprite_frames.length-1],this.is_playing=!1,this.play_time=0,void(this.end_func&&this.end_func());this.sprite.spriteFrame=this.sprite_frames[e]}else{for(;e>=this.sprite_frames.length;)e-=this.sprite_frames.length,this.play_time-=this.duration*this.sprite_frames.length;this.sprite.spriteFrame=this.sprite_frames[e]}}}}),cc._RF.pop()},{}],game_scene:[function(t,e,i){"use strict";cc._RF.push(e,"7d7adLlfzdPQZkEexSDS6k3","game_scene"),cc.Class({extends:cc.Component,properties:{groups_prefab:{type:cc.Prefab,default:[]}},onLoad:function(){},start:function(){this.enemy_set=[],this._gen_random_grounp(),this.score_value=0,this.score=this.node.getChildByName("score").getComponent(cc.Label),this.score.string=""+this.score_value},add_score:function(){this.score_value++,this.score.string=""+this.score_value},remove_enemy:function(t){var e=this.enemy_set.indexOf(t);e>=-1&&this.enemy_set.splice(e,1)},_gen_random_grounp:function(){var t=this.groups_prefab.length,e=Math.floor(Math.random()*t+1);e>=t&&(e=t);var i=cc.instantiate(this.groups_prefab[e-1]);this.node.addChild(i);for(var s=0;s<i.children.length;s++)this.enemy_set.push(i.children[s]);i.x=200*(Math.random()-.5),i.y=100*Math.random()+500,this.scheduleOnce(this._gen_random_grounp.bind(this),2*Math.random()+1)}}),cc._RF.pop()},{}],home_scene:[function(t,e,i){"use strict";cc._RF.push(e,"52568FiUGFEkq2bk7yaSVB+","home_scene"),cc.Class({extends:cc.Component,properties:{},start:function(){this.started=!1},on_start_click:function(){this.started||(this.started=!0,cc.director.loadScene("game_scene"))}}),cc._RF.pop()},{}],player:[function(t,e,i){"use strict";cc._RF.push(e,"0c7634WyLRFEaEGX6BwMorT","player"),cc.Class({extends:cc.Component,properties:{bomb_anim:{type:cc.SpriteFrame,default:[]},bomb_anim_duration:.1,plane_idle:{type:cc.SpriteFrame,default:null},bullet_prefab:{type:cc.Prefab,default:null},game_scene:{type:cc.Node,default:null}},start:function(){this.anim=this.node.getChildByName("anim"),this.anim_com=this.anim.addComponent("frame_anim"),this.node.on(cc.Node.EventType.TOUCH_MOVE,function(t){var e=t.getDelta();this.node.x+=e.x,this.node.y+=e.y},this),this.status_state=0,this.schedule(this.shoot_bullet.bind(this),.2)},shoot_bullet:function(){if(1!=this.status_state){var t=cc.instantiate(this.bullet_prefab);this.node.parent.addChild(t),t.x=this.node.x,t.y=this.node.y+this.node.width/2,t.setLocalZOrder(-1e3)}},_play_bomb_anim:function(){this.anim_com.sprite_frames=this.bomb_anim,this.anim_com.duration=this.bomb_anim_duration,this.anim_com.play_once(this.new_life.bind(this)),console.log(this.game_scene),this.game_scene.getComponent("game_scene").score.string=0},new_life:function(){this.anim.scale=0,this.scheduleOnce(function(){this.anim.scale=1,this.status_state=2,this.anim.getComponent(cc.Sprite).spriteFrame=this.plane_idle,this.node.x=0,this.node.y=-310;var t=cc.moveTo(.5,cc.p(0,-186)),e=cc.sequence([cc.fadeTo(.1,128),cc.fadeTo(.1,255)]),i=cc.repeatForever(e);this.anim.runAction(i),this.node.runAction(t)}.bind(this),1),this.scheduleOnce(function(){this.status_state=0,this.anim.opacity=255,this.anim.stopAllActions()}.bind(this),3)},on_hit_enemy:function(){0==this.status_state&&(this.status_state=1,this._play_bomb_anim())}}),cc._RF.pop()},{}],star_sky:[function(t,e,i){"use strict";cc._RF.push(e,"02b733QG29Pc6+gdrzuIW14","star_sky"),cc.Class({extends:cc.Component,properties:{},start:function(){this.bg1=this.node.getChildByName("bg1"),this.bg2=this.node.getChildByName("bg2"),this.bottom_bg=this.bg1,this.speed=-100,this.node.setLocalZOrder(-1010)},update:function(t){var e=t*this.speed;this.bg1.y+=e,this.bg2.y+=e,this.bottom_bg.y<=-1669&&(this.bottom_bg==this.bg1?(this.bg1.y=this.bg2.y+1369,this.bottom_bg=this.bg2):(this.bg2.y=this.bg1.y+1369,this.bottom_bg=this.bg1))}}),cc._RF.pop()},{}]},{},["bullet","enemy","frame_anim","game_scene","home_scene","player","star_sky"]);