var my_module = require('./my_module');
console.log((function(settings){
return settings.split('').reverse().join('')
})(my_module.name));