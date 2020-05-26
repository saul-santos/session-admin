!function(){"use strict";function e(e){e?Logger.useDefaults():Logger.setLevel(Logger.OFF)}angular.module("manager",["ui.router","ngMessages","ngCookies"]).run(e),e.$inject=["LOGGER"]}(),function(){"use strict";function e(e,t){t.otherwise("/login");e.state({name:"login",url:"/login",component:"login",data:{}}),e.state({name:"home",url:"/home",component:"home",data:{permissions:{rol:["ADMIN","OPERATOR"],token:!0}}}),e.state({name:"report",url:"/report",component:"report",data:{permissions:{rol:["ADMIN","OPERATOR"],token:!0}}}),e.state({name:"settings",url:"/settings",component:"settings",data:{permissions:{rol:["ADMIN"],token:!0}}})}function t(e){e.onStart({},function(e){var t=e.injector().get("AuthService"),n=e.to().data.permissions||null;if(n)return t.isLoggedIn()?t.rolHasAccess(n.rol):e.router.stateService.target("login")})}angular.module("manager").config(e).run(t),e.$inject=["$stateProvider","$urlRouterProvider"],t.$inject=["$transitions"]}(),function(){"use strict";angular.module("manager").constant("DEFAULT",{USER_NAME:"Sin usuario"}).constant("E_TYPES",{CONSOLE:"console",PC:"pc"}).constant("S_ACTION",{INIT:"Iniciar",END:"Finalizar"}).constant({TOKEN_PREFIX:"token"}).constant({LOGGER:!0}).constant("toastr",toastr).constant("moment",moment)}(),function(){"use strict";angular.module("manager").filter("minutes",function(){return function(e){return(e=e||0)+" mins"}}).filter("cost",function(){return function(e){return"$"+(e=e||0)}})}(),function(){"use strict";function e(e){this.logout=function(){e.logout()}}angular.module("manager").component("navbar",{templateUrl:"app/layouts/navbar/navbar.html",controller:e,controllerAs:"vm"}),e.$inject=["AuthService"]}(),function(){"use strict";function e(t,n,i){this.onSubmit=function(e){t.login(e).then(function(e){e&&n.go("home")}).catch(function(e){i.error(e.message||"Hubo un problema al efectuar la operación :(","Error")})}}angular.module("manager").component("login",{templateUrl:"app/login/login.html",controller:e,controllerAs:"vm"}),e.$inject=["AuthService","$state","toastr"]}(),function(){"use strict";function e(n,e,t,i,r,o,a,s){var u,c=this,m={};function d(){c.time=new Date,c.timeMs=moment().unix(),angular.forEach(c.equipments,function(e){var t=document.getElementById("footer-section-"+e._id);if(e.sessionId&&e.sessionId.initialTime){var n=function(e,t){if(!e||!t)return 0;var n=moment.unix(e),i=moment.unix(t);return moment.duration(i.diff(n))}(e.sessionId.initialTime,c.timeMs);e.timeElapsed=Math.round(n.asMinutes()),e.timeLeft=Math.round(e.sessionId.duration-n.asMinutes()),30<=n.asMinutes()&&(e.sessionId.cost=o.roundCost(n.asHours()*m[e.type].hour)),4<e.timeLeft&&e.timeLeft<6&&!e.timeAlertLowFired?(s.warning(e.name+": Restan "+e.timeLeft+" minutos","Advertencia"),e.timeAlertLowFired=!0):2<e.timeLeft&&e.timeLeft<4&&!e.timeAlertMediumFired?(s.warning(e.name+": Restan "+e.timeLeft+" minutos","Advertencia"),e.timeAlertMediumFired=!0):e.timeLeft<=0&&!e.timeAlertHighFired&&(s.error(e.name+": Tiempo agotado","Advertencia"),e.timeAlertHighFired=!0),e.action=i.END,t.style.backgroundColor="#FF0000"}else e.action=i.INIT,t.style.backgroundColor="#00FF00"})}function l(e){return a.saveSession(e)}function f(e,t){var n=e,i=t;r.saveEquipment(n).then(function(){var e=c.equipments.findIndex(function(e){return e._id===n._id});n.sessionId=i,c.equipments[e]=n}).finally(function(){$("#iSessionModal").modal("hide"),$("#eSessionModal").modal("hide")})}c.E_TYPES=t,c.time=new Date,c.timeMs=moment().unix(),c.equipments=[],c.equipment={},c.timeLeft=null,c.calcCost=function(e){e.duration<=30?e.cost=m.initial:e.cost=o.roundCost(e.duration/60*m.hour)},c.endSession=function(e){var t=e;t.sessionId.finalTime=c.timeMs,t.sessionId.duration=t.timeElapsed,l(t.sessionId).then(function(){t.sessionId=null,f(t,null)})},c.initSession=function(e){var t=e;t.sessionId.equipmentId=t._id,t.sessionId.finalTime=null,t.sessionId.initialTime=c.timeMs,t.sessionId.cost=m[t.type].initial,t.sessionId.userName=t.sessionId.userName||n.USER_NAME,l(t.sessionId).then(function(e){t.sessionId=e._id,f(t,e)})},c.sessionModal=function(e,t){c.equipment=e,t===i.INIT?$("#iSessionModal").modal("show"):$("#eSessionModal").modal("show")},c.$onInit=function(){o.getFares().then(function(e){return m=e,r.getEquipments().then(function(e){return c.equipments=e,c.equipments})}),u=e(d,1e3)},c.$onDestroy=function(){e.cancel(u)}}angular.module("manager").component("home",{templateUrl:"app/home/home.html",controller:e,controllerAs:"vm"}),e.$inject=["DEFAULT","$interval","E_TYPES","S_ACTION","EquipmentService","FaresService","SessionService","toastr"]}(),function(){"use strict";function e(n){var i=this;function t(e){e||(e={start:moment(document.getElementById("dateStart").value,"MM/DD/YYYY hh:mm A"),end:moment(document.getElementById("dateEnd").value,"MM/DD/YYYY hh:mm A").add(1,"minutes")});var t={start:e.start.unix(),end:e.end.unix()};n.getSessions(t).then(function(e){i.sessions=e}).catch(function(e){Logger.error(e)})}i.$onInit=function(){var e={start:moment().startOf("day"),end:moment()};$(function(){$("#dateFormStart").datetimepicker({icons:{time:"far fa-clock"},defaultDate:e.start}),$("#dateFormEnd").datetimepicker({icons:{time:"far fa-clock"},defaultDate:e.end})}),t(e)},i.sessions=[],i.equipments=[],i.dateForm={},i.getSessions=t}angular.module("manager").component("report",{templateUrl:"app/report/report.html",controller:e,controllerAs:"vm"}),e.$inject=["SessionService"]}(),function(){"use strict";function e(t,n,i){var r=this;function o(){return n.getEquipments().then(function(e){return r.equipments=e,r.equipments})}r.E_TYPES=t,r.eType=t.CONSOLE,r.fares={},r.equipments=[],r.equipment,r.$onInit=function(){i.getFares().then(function(e){return r.fares=e,o()})},r.saveE=function(e){e.type=r.eType,n.saveEquipment(e).then(function(){toastr.success("Equipo guardado","Exito"),o(),$("#eModal").modal("hide")})},r.removeE=function(e){if(e.sessionId)return void toastr.warning(e.name+" tiene una sesión abierta.","Advertencia");return n.deleteEquipment(e._id).then(function(e){var t,n;t=e,n=r.equipments.findIndex(function(e){return e._id===t._id}),delete r.equipments[n],toastr.success("Equipo removido","Exito")})},r.updateFares=function(e){e[r.eType].initial?0<e[r.eType].initial&&e[r.eType].initial<100&&(e[r.eType].hour?0<e[r.eType].hour&&e[r.eType].hour<100&&(t=e,i.saveFares(t).then(function(e){r.fares=e,toastr.success("Tarifas guardadas","Exito")})):toastr.warning("Ingrese tarifa hora","Advertencia")):toastr.warning("Ingrese tarifa inicial","Advertencia");var t},r.exchangeEType=function(e){return e=e===t.CONSOLE?t.PC:t.CONSOLE,r.eType=e},r.openEModal=function(e){r.equipment=e||{},$("#eModal").modal("show")}}angular.module("manager").component("settings",{templateUrl:"app/settings/settings.html",controller:e,controllerAs:"vm"}),e.$inject=["E_TYPES","EquipmentService","FaresService"]}(),function(){"use strict";function e(n,e,t,i,r){var o={register:function(e){return t.post("/api/register",e).then(s).catch(u)},login:function(e){return t.post("/api/login",e).then(s).catch(u)},isLoggedIn:function(){var e=a();return!!e&&e.exp>Date.now()/1e3}};return o.getUserDetails=a,o.rolHasAccess=function(e){var t=a();if(t)for(var n in e)if(t.rol===e[n])return!0;return!1},o.logout=function(){i.remove(n),e.go("login")},o;function a(){var e,t=i.get(n);return t?(e=t.split(".")[1],e=window.atob(e),JSON.parse(e)):null}function s(e){var t;return e.data&&e.data.token?(t=e.data.token,i.put(n,t)):u({error:{data:"Fallo al obtener token del servidor."}}),r.resolve(a())}function u(e){return Logger.error("XHR Failed for Authentication Service: "+e.data.message),r.reject(e.data)}}angular.module("manager").factory("AuthService",e),e.$inject=["TOKEN_PREFIX","$state","$http","$cookies","$q"]}(),function(){"use strict";function e(o,a){var e={getSessions:function(e){var t=a.defer();return o.get("/api/sessions/"+e.start+"/"+e.end).then(function(e){t.resolve(e.data)}).catch(function(e){s(e)}),t.promise},getSession:function(e){var t=a.defer();return o.get("/api/session/"+e).then(function(e){t.resolve(e.data)}).catch(function(e){s(e)}),t.promise},saveSession:function(e){return e._id?(i=e,r=a.defer(),o.put("/api/session/"+i._id,i).then(function(e){r.resolve(e.data)}).catch(function(e){s(e)}),r.promise):(t=e,n=a.defer(),o.post("/api/session",t).then(function(e){n.resolve(e.data)}).catch(function(e){s(e)}),n.promise);var t,n;var i,r},delSession:function(e){var t=a.defer();return o.delete("/api/session/"+e).then(function(e){t.resolve(e.data)}).catch(function(e){s(e)}),t.promise}};return e;function s(e){return Logger.error("XHR Failed for Session Service: "+e.data.message),a.reject(e.data)}}angular.module("manager").factory("SessionService",e),e.$inject=["$http","$q"]}(),function(){"use strict";function e(o,a){var e={getEquipments:function(){var t=a.defer();return o.get("/api/equipments").then(function(e){t.resolve(e.data)}).catch(function(e){s(e)}),t.promise},getEquipment:function(e){var t=a.defer();return o.get("/api/equipment/"+e).then(function(e){t.resolve(e.data)}).catch(function(e){s(e)}),t.promise},saveEquipment:function(e){return e._id?(i=e,r=a.defer(),o.put("/api/equipment/"+i._id,i).then(function(e){r.resolve(e.data)}).catch(function(e){s(e)}),r.promise):(t=e,n=a.defer(),o.post("/api/equipment",t).then(function(e){n.resolve(e.data)}).catch(function(e){s(e)}),n.promise);var t,n;var i,r},deleteEquipment:function(e){var t=a.defer();return o.delete("/api/equipment/"+e).then(function(e){t.resolve(e.data)}).catch(function(e){s(e)}),t.promise}};return e;function s(e){return Logger.error("XHR Failed for Equipment Service: "+e.data.message),a.reject(e.data)}}angular.module("manager").factory("EquipmentService",e),e.$inject=["$http","$q"]}(),function(){"use strict";function e(a,s){var e={getFares:function(){var t=s.defer();return a.get("/api/fares").then(function(e){t.resolve(e.data)}).catch(function(e){u(e)}),t.promise},saveFares:function(e){return e._id?(r=e,o=s.defer(),a.post("/api/fares",r).then(function(e){o.resolve(e.data)}).catch(function(e){u(e)}),o.promise):(t=e,i=s.defer(),a.put("/api/fares/"+n,t).then(function(e){i.resolve(e.data)}).catch(function(e){u(e)}),i.promise);var t,n,i;var r,o},roundCost:function(e){var t,n=e.toString(),i=e;n.includes(".")&&(i=parseInt(n.substring(0,n.indexOf("."))),t=parseFloat(n.substring(n.indexOf("."))),i+=.2<t&&t<.8?.5:1);return i}};return e;function u(e){return Logger.error("XHR Failed for Fares Service: "+e.data.message),s.reject(e.data)}}angular.module("manager").factory("FaresService",e),e.$inject=["$http","$q"]}(),function(){"use strict";var e=angular.module("manager");function t(t,n,i,r){return{request:function(e){e.headers=e.headers||{};var t=n.get(r);return t&&(e.headers.Authorization="Bearer "+t),e},responseError:function(e){return 401===e.status&&(n.remove(r),i.go("login")),t.reject(e)}}}function n(e){e.interceptors.push("AuthInterceptorService")}e.factory("AuthInterceptorService",t),t.$inject=["$q","$cookies","$state","TOKEN_PREFIX"],e.config(n),n.$inject=["$httpProvider"]}();