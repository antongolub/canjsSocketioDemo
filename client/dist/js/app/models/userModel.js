define(["models/defaultModel"],function(e){return e("api/users",{attributes:{name:"string",email:"string",id:"number"},init:function(){this.validate("email",function(e){return e&&e.length?/^([a-zA-Z0-9_.+\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(e)?null:"correct email required":"email required"}),this.validate("name",function(e){return e&&e.length?null:"name required"})}})});